import { Button, Form, Input, Select, Switch, Row, Col } from "antd";
import { useGetCategoriesQuery } from "../../../redux/features/baseApi";
import { useGetSingleFoodItemQuery, useUpdateFoodItemMutation } from "../../../redux/features/fooditem/foodItemAPi";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const UpdateFood = () => {
  const { foodId } = useParams();
  const [form] = Form.useForm();
  const [updateFood] = useUpdateFoodItemMutation();
  const { data: categories } = useGetCategoriesQuery({});
  const { data: foodData, isLoading } = useGetSingleFoodItemQuery(foodId);

  
  useEffect(() => {
    if (foodData?.data) {
      form.setFieldsValue({
        name: foodData.data.name,
        price: foodData.data.price,
        description: foodData.data.description,
        categoryId: foodData.data.categoryId.categoryId,
        imageUrl: foodData.data.imageUrl,
        isAvailable: foodData.data.isAvailable,
      });
    }
  }, [foodData, form]);

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
        price: Number(values.price)
      };
      
      const response = await updateFood({ foodId, data: formData }).unwrap();
      if (response.success) {
        toast.success(response.message || "Food item updated successfully!");
      } else {
        toast.error(response.message || "Failed to update food item");
      }
    } catch (error: any) {
      const errorMessage = error?.data?.error?.details?.errors?.[0]?.message || error?.data?.message || "Failed to update food item";
      toast.error(errorMessage);
    }
  };

  // Rest of the JSX remains the same as CreateFood.tsx, just change the title and button text
  return (
    <div style={{ padding: '1rem' }}>
      <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        Update Food Item
      </h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Form
          form={form}
          name="updateFood"
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
              >
                <Switch />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Update Food Item
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
    </div>
  );
};

export default UpdateFood;