import { Button, Form, Input } from "antd";
import { useUpdateCategoryMutation, useGetSingleCategoryQuery } from "../../../redux/features/baseApi";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const UpdateCategory = () => {
  const { categoryId } = useParams();
  const [form] = Form.useForm();
  
  const { data: categoryData } = useGetSingleCategoryQuery(categoryId);
  const [updateCategory] = useUpdateCategoryMutation();

  useEffect(() => {
    if (categoryData) {
      form.setFieldsValue({
        name: categoryData.data.name,
        description: categoryData.data.description
      });
    }
  }, [categoryData, form]);

  const onFinish = async (values: { name: string; description: string }) => {
    try {
      await updateCategory({ categoryId, ...values }).unwrap();
      toast.success("Category updated successfully!");
    } catch (error) {
      toast.error("Failed to update category");
    }
  };

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
      <h2 style={titleStyle}>Update Category</h2>
      <Form
        form={form}
        name="updateCategory"
        onFinish={onFinish}
        layout="vertical"
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          label="Category Name"
          name="name"
          initialValue={categoryData?.data.name}
          rules={[{ required: true, message: "Please input category name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          initialValue={categoryData?.data.description}
          rules={[{ required: true, message: "Please input category description!" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Category
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateCategory;