import { Button, Form, Input, InputNumber, Select, Row, Col, Switch } from "antd";
import { useCreateTableMutation } from "../../../redux/features/table/tableApi";
import { toast } from "react-toastify";

const CreateTable = () => {
  const [form] = Form.useForm();
  const [createTable] = useCreateTableMutation();

  const onFinish = async (values: any) => {
    try {
      await createTable(values).unwrap();
      toast.success("Table created successfully!");
      form.resetFields();
    } catch (error) {
      toast.error("Failed to create table");
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        Create Table
      </h2>
      <Form
        form={form}
        name="createTable"
        onFinish={onFinish}
        layout="vertical"
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          label="Table Number"
          name="tableNumber"
          rules={[{ required: true, message: "Please input table number!" }]}
        >
          <InputNumber 
            style={{ width: '100%' }} 
            min={1} 
            placeholder="Enter table number (e.g., 101)"
          />
        </Form.Item>

        <Form.Item
          label="Seat Capacity"
          name="seatCapacity"
          rules={[{ required: true, message: "Please input seat capacity!" }]}
        >
          <InputNumber 
            style={{ width: '100%' }} 
            min={1} 
            max={20}
            step={1}
            placeholder="Enter seat capacity (2-20)"
          />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          initialValue="available"
          rules={[{ required: true, message: "Please select status!" }]}
        >
          <Select placeholder="Select table status">
            <Select.Option value="available">Available</Select.Option>
            <Select.Option value="occupied">Occupied</Select.Option>
            <Select.Option value="reserved">Reserved</Select.Option>
            <Select.Option value="maintenance">Maintenance</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Is Available"
          name="isAvailable"
          initialValue={true}
          valuePropName="checked"
          tooltip="Toggle if table is currently unavailable"
        >
          <Switch />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Table
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateTable;