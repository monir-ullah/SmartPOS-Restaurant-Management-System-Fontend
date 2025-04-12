import { Button, Form, Input, Select, InputNumber, Space, Row, Col } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useGetFoodItemsQuery } from "../../../redux/features/fooditem/foodItemAPi";
import { useCreateOrderMutation, useGetSingleOrderQuery } from "../../../redux/features/order/orderApi";
import { toast } from "react-toastify";
import { useGetTablesQuery } from "../../../redux/features/table/tableApi";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Item from "antd/es/list/Item";

const { Option } = Select;

const UpdateOrder = () => {
  const { orderId } = useParams();
  const [form] = Form.useForm();
  const [createOrder] = useCreateOrderMutation();
  const { data: foodItems } = useGetFoodItemsQuery({ page: 1, limit: 100 });

  const {data: orderData} = useGetSingleOrderQuery(orderId);
  console.log(orderData?.data?.customerName);
  const { data: tableData, isLoading } = useGetTablesQuery({
    page : 1,
    limit:  10,
  });

  useEffect(() => {
    if (orderData) {
      form.setFieldsValue({
        customerName: orderData.data.customerName,
        orderType: orderData.data.orderType,
        tableId: orderData.data.tableId.tableId,
        selectedId: orderData.data.items[0]?.foodId,
        items: orderData.data.items.map((item: any) => ({
          foodId: item.foodId,
          name: item.name,
          price: item.price,
          imageUrl: item.imageUrl,
          quantity: item.quantity,
          specialInstructions: item.specialInstructions || "",
        })),
      });
    }
  }, [orderData,foodItems, form]);
// make this ready for 

console.log(form?.getFieldsValue());  
  const onFinish = async (values: any) => {
    try {
      const response = await createOrder(values).unwrap();
      if (response.success) {
        toast.success("Order created successfully!");
        form.resetFields();
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create order");
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2 style={{ fontSize: "1.875rem", fontWeight: "bold", marginBottom: "1rem" }}>
        Update Order
      </h2>
      
      <Form
        form={form}
        name="updateOrder"
        onFinish={onFinish}
        layout="vertical"
        style={{ maxWidth: 1200 }}  // Increased max width
      >
        <div style={{ 
          background: '#f9f9f9',  // Semi-transparent white background for better visibility
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '20px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <Row gutter={16}>
            <Col span={10}>
              <Form.Item
                name="customerName"
                label="Customer Name"
                initialValue={orderData?.data?.customerName}
                rules={[{ required: true, message: "Please input customer name!" }]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="tableId"
                label="Table Number"
                
                rules={[{ required: true, message: "Please select table!" }]}
              >
                <Select 
                  placeholder="Select table"
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    String(option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                >
                  {[...(tableData?.data?.data || [])].sort((a, b) => a.tableNumber - b.tableNumber).map((table: any) => (
                    <Option key={table.tableId} value={table.tableId} label={`Table ${table.tableNumber}`}>
                      {`Table ${table.tableNumber}`}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={6}> 
              <Form.Item
                name="orderType"
                label="Order Type"
                rules={[{ required: true, message: "Please select order type!" }]}
              >
                <Select 
                  placeholder="Select order type"
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    String(option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                >
                  <Option value="dine-in" label="Dine In">Dine In</Option>
                  <Option value="takeaway" label="Takeaway">Takeaway</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </div>

        <Form.List
          name="items"
          rules={[
            {
              validator: async (_, items) => {
                if (!items || items.length < 1) {
                  return Promise.reject(new Error("At least one item is required"));
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }) => (
            <div style={{ 
              background: 'rgb(239 243 243 / 51%)', // Semi-transparent white background for better visibility
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)', // Subtle shadow for depth
              border: '1px solid #f0f0f0', // Light border for a more natural look
              borderRadius: '8px', // Rounded corners for a modern look
              padding: '20px',
              marginTop: '20px'
            }}>
              <h3 style={{ 
                fontSize: '1.2rem', 
                marginBottom: '20px',
                color: '#333'
              }}>
                Order Items
              </h3>

              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: "flex", marginBottom: 8 }} align="baseline">
                  <Form.Item
                    {...restField}
                    name={[name, "foodId"]}
                    rules={[{ required: true, message: "Missing food item" }]}
                  >
                    <Select 
                      placeholder="Select food item" 
                      style={{ width: 350 }}
                      showSearch
                      
                      optionFilterProp="children"
                      optionLabelProp="label"
                      filterOption={(input, option) => {
                        const food = foodItems?.data?.find((item: any) => item.foodId === option?.value);
                        return food?.name.toLowerCase().includes(input.toLowerCase());
                      }}
                      onChange={(value) => {
                        const food = foodItems?.data?.find((item: any) => item.foodId === value);
                        if (food) {
                          form.setFieldsValue({
                            items: {
                              [name]: {
                                foodId: food.foodId,
                                name: food.name,
                                price: food.price,
                                quantity: form.getFieldValue(['items', name, 'quantity']) || 1
                              }
                            }
                          });
                        }
                      }}
                    >
                      {[...(foodItems?.data || [])].sort((a, b) => 
                        a.name.localeCompare(b.name)
                      ).map((food: any) => {
                        const label = (
                          <>
                            {food.name} - <span style={{ color: '#52c41a' }}>৳{food.price}</span>
                          </>
                        );
                        return (
                          <Option 
                            key={food.foodId} 
                            value={food.foodId}
                            label={label}
                           
                          >
                            <Space align="center" style={{ width: '100%' }}>
                              <img 
                                src={food.imageUrl} 
                                alt={food.name} 
                                style={{ 
                                  width: 32, 
                                  height: 32, 
                                  objectFit: 'cover',
                                  borderRadius: '4px',
                                  flexShrink: 0
                                }} 
                              />
                              <span style={{ flex: 1 }}>{food.name}</span>
                              <span style={{ color: '#52c41a', marginLeft: 'auto' }}>৳{food.price}</span>
                            </Space>
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "quantity"]}
                    rules={[{ required: true, message: "Missing quantity" }]}
                  >
                    <InputNumber 
                      min={1} 
                      defaultValue={1} 
                      placeholder="Quantity"
                      onChange={(value) => {
                        const foodId = form.getFieldValue(['items', name, 'foodId']);
                        const food = foodItems?.data?.find((item: any) => item.foodId === foodId);
                        if (food && value) {
                          form.setFieldsValue({
                            items: {
                              [name]: {
                                name: food.name,
                                price: food.price,
                                quantity: value
                              }
                            }
                          });
                        }
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "specialInstructions"]}
                  >
                    <Input placeholder="Special instructions" />
                  </Form.Item>

                  <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) => {
                      return (
                        prevValues?.items?.[name]?.quantity !== currentValues?.items?.[name]?.quantity ||
                        prevValues?.items?.[name]?.foodId !== currentValues?.items?.[name]?.foodId
                      );
                    }}
                  >
                    {({ getFieldValue }) => {
                      const foodId = getFieldValue(['items', name, 'foodId']);
                      const quantity = getFieldValue(['items', name, 'quantity']) || 0;
                      const food = foodItems?.data?.find((item: any) => item.foodId === foodId);
                      return (
                        <div style={{ 
                          marginLeft: '10px', 
                          color: '#52c41a', 
                          minWidth: '100px',
                          fontSize: '14px'
                        }}>
                          {food ? `Total: ৳${(food.price * quantity).toFixed(2)}` : ''}
                        </div>
                      );
                    }}
                  </Form.Item>

                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}

              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add Food Item
                </Button>
              </Form.Item>

              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) => {
                  return JSON.stringify(prevValues?.items) !== JSON.stringify(currentValues?.items);
                }}
              >
                {({ getFieldsValue }) => {
                  const { items } = getFieldsValue();
                  const total = items?.reduce((acc: number, item: any) => {
                    const food = foodItems?.data?.find((f: any) => f.foodId === item?.foodId);
                    return acc + (food?.price || 0) * (item?.quantity || 0);
                  }, 0);

                  return (
                    <div style={{ 
                      textAlign: 'right',
                      padding: '20px 0',
                      borderTop: '1px solid #f0f0f0',
                      marginTop: '20px'
                    }}>
                      <span style={{ 
                        fontSize: '16px',
                        fontWeight: 'bold'
                      }}>
                        Grand Total: <span style={{ color: '#52c41a' }}>৳{total?.toFixed(2) || '0.00'}</span>
                      </span>
                    </div>
                  );
                }}
              </Form.Item>
            </div>
          )}
        </Form.List>

        <Form.Item style={{ marginTop: '20px' }}>
          <Button type="primary" htmlType="submit" size="large">
            Create Order
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateOrder;