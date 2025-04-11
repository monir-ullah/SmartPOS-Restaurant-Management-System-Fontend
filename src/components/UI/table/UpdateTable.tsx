import { Button, Form, Input, InputNumber, Switch, Select } from "antd";
import { useUpdateTableMutation } from "../../../redux/features/table/tableApi";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useGetSingleTableQuery } from "../../../redux/features/table/tableApi";

const UpdateTable = () => {
  const { tableId } = useParams();
  const [form] = Form.useForm();
  
  const { data: tableData } = useGetSingleTableQuery(tableId);
  const [updateTable] = useUpdateTableMutation();

  useEffect(() => {
    if (tableData) {
      form.setFieldsValue({
        tableNumber: tableData.data.tableNumber,
        seatCapacity: tableData.data.seatCapacity,
        isAvailable: tableData.data.isAvailable,
        status: tableData.data.status
      });
    }
  }, [tableData, form]);

  const onFinish = async (values: { tableNumber: number; seatCapacity: number; isAvailable: boolean; status: string }) => {
    try {
      await updateTable({ tableId, ...values }).unwrap();
      toast.success("Table updated successfully!");
    } catch (error) {
      toast.error("Failed to update table");
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
      <h2 style={titleStyle}>Update Table</h2>
      <Form
        form={form}
        name="updateTable"
        onFinish={onFinish}
        layout="vertical"
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          label="Table Number"
          name="tableNumber"
          initialValue={tableData?.data.tableNumber}
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
          initialValue={tableData?.data.seatCapacity}
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
          label="Is Available"
          name="isAvailable"
          valuePropName="checked"
          initialValue={tableData?.data.isAvailable}
          tooltip="Toggle if table is currently unavailable"
        >
          <Switch />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          initialValue={tableData?.data.status}
          rules={[{ required: true, message: "Please select table status!" }]}
        >
          <Select placeholder="Select table status">
            <Select.Option value="available">Available</Select.Option>
            <Select.Option value="reserved">Reserved</Select.Option>
            <Select.Option value="occupied">Occupied</Select.Option>
            <Select.Option value="maintenance">Maintenance</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Table
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateTable;