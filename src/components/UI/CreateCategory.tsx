import { Button, Form, Input } from "antd";
import { useCreateCategoryMutation } from "../../redux/features/baseApi";
import { toast } from "react-toastify";

const CreateCategory = () => {
  const [createCategory] = useCreateCategoryMutation();

  const onFinish = async (values: { name: string; description: string }) => {
    try {
      await createCategory(values).unwrap();
      toast.success("Category created successfully!");
      form.resetFields();
    } catch (error) {
      toast.error("Failed to create category");
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
      <h2 style={titleStyle}>Create Category</h2>
      <Form
        form={form}
        name="createCategory"
        onFinish={onFinish}
        layout="vertical"
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          label="Category Name"
          name="name"
          rules={[{ required: true, message: "Please input category name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please input category description!" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Category
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateCategory;