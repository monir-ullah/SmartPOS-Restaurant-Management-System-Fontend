import { Button, Form, Input, Select, InputNumber, Space, Row, Col } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useGetFoodItemsQuery } from "../../../redux/features/fooditem/foodItemAPi";
import { useCreateOrderMutation } from "../../../redux/features/order/orderApi";
import { toast } from "react-toastify";
import { useGetTablesQuery } from "../../../redux/features/table/tableApi";

const { Option } = Select;

const CreateOrder = () => {
  const [form] = Form.useForm();
  const [createOrder] = useCreateOrderMutation();
  const { data: foodItems } = useGetFoodItemsQuery({ page: 1, limit: 100 });

  const { data: tableData, isLoading } = useGetTablesQuery({
    page : 1,
    limit:  10,
  });

console.log(tableData?.data?.data); // make this ready for 

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
        Create New Order
      </h2>
      
      <Form
        form={form}
        name="createOrder"
        onFinish={onFinish}
        layout="vertical"
        style={{ maxWidth: 1000 }}
      >
        <Row gutter={16}>
          <Col span={12}>
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

          <Col span={12}>
            <Form.Item
              name="customerName"
              label="Customer Name"
              rules={[{ required: true, message: "Please input customer name!" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
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
            <>
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
                      labelInValue={false}
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
                                name: food.name,
                                price: food.price,
                                quantity: 1
                              }
                            }
                          });
                        }
                      }}
                    >
                      {[...(foodItems?.data || [])].sort((a, b) => 
                        a.name.localeCompare(b.name)
                      ).map((food: any) => (
                        <Option 
                          key={food.foodId} 
                          value={food.foodId}
                          label={<>
                            {food.name} - <span style={{ color: '#52c41a' }}>৳{food.price}</span>
                          </>}
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
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "quantity"]}
                    rules={[{ required: true, message: "Missing quantity" }]}
                  >
                    <InputNumber min={1} defaultValue={1} placeholder="Quantity" />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "specialInstructions"]}
                  >
                    <Input placeholder="Special instructions" />
                  </Form.Item>

                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}

              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add Food Item
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Order
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateOrder;