import { Button, Form, Input, Select, Switch, Row, Col } from "antd";
import { useGetCategoriesQuery } from "../../../redux/features/baseApi";
import { toast } from "react-toastify";
import { useCreateFoodItemMutation } from "../../../redux/features/fooditem/foodItemAPi";

const CreateFood = () => {
  const [createFood] = useCreateFoodItemMutation();
  const { data: categories } = useGetCategoriesQuery({});

  const onFinish = async (values: {
    name: string;
    price: number;
    description: string;
    categoryId: string;
    imageUrl: string;
    isAvailable: boolean;
  }) => {
    try {
      const formData = {
        ...values,
        price: Number(values.price) // Convert price to number
      };
      
      const response = await createFood(formData).unwrap();
      if (response.success) {
        toast.success(response.message || "Food item created successfully!");
        form.resetFields();
      } else {
        toast.error(response.message || "Failed to create food item");
      }
    } catch (error: any) {
      const errorMessage = error?.data?.error?.details?.errors?.[0]?.message || error?.data?.message || "Failed to create food item";
      toast.error(errorMessage);
    }
  };

  const [form] = Form.useForm();

  const containerStyle = {
    padding: '1rem'
  };

  const titleStyle = {
    fontSize: '1.875rem',
    fontWeight: 'bold',
    marginBottom: '1rem'
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Create Food Item</h2>
      <Form
        form={form}
        name="createFood"
        onFinish={onFinish}
        layout="vertical"
        style={{ maxWidth: 1000 }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Food Name"
              name="name"
              rules={[{ required: true, message: "Please input food name!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          
          <Col span={12}>
            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: "Please input price!" }]}
            >
              <Input type="number" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Category"
              name="categoryId"
              rules={[{ required: true, message: "Please select a category!" }]}
            >
              <Select
                placeholder="Select a food category"
                defaultValue={categories?.data?.[0]?.categoryId}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                    //@ts-ignore
                  (option?.children ?? '').includes(input)
                }
              >
                {categories?.data?.map((category: { categoryId: string; name: string }) => (
                  <Select.Option key={category.categoryId} value={category.categoryId}>
                    {category.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Image URL"
              name="imageUrl"
              rules={[
                { required: true, message: "Please input image URL!" },
                {
                  type: 'url',
                  message: 'Please enter a valid URL!',
                },
              ]}
              validateTrigger="onBlur"
            >
              <Input 
                placeholder="http(s)://example.com/image.jpg?param=value"
                allowClear
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Please input food description!" }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Is Available"
              name="isAvailable"
              valuePropName="checked"
              initialValue={true}
              rules={[{ required: true, message: "Please select availability status!" }]}
            >
              <Switch />
              
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Create Food Item
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateFood;
