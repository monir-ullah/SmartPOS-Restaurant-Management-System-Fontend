import { useState } from "react";
import { Table, Tag, Space, Pagination, Input } from "antd";
import { useDeleteOrderMutation, useGetAllOrdersQuery } from "../../../redux/features/order/orderApi";
import dayjs from "dayjs";
import { render } from "react-dom";
import { Button, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined, SearchOutlined, FileSearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const OrderList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [deleteOrder] = useDeleteOrderMutation();
  
//   const { data, isLoading } = useGetAllOrdersQuery({});

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const { data: orderData, isLoading } = useGetAllOrdersQuery({
    page,
    limit: pageSize,
    searchTerm
  });

  const orders = orderData?.orders || [];
  const total = orderData?.meta?.total || 0;

 

  const handleDelete = async (orderId: string) => {
    try {
      await deleteOrder(orderId).unwrap();
      toast.success("Order deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete order!");
    }
  };
  
  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
      render: (orderId: string) => '#' + orderId.padStart(3, '0').charAt(0).toUpperCase() + orderId.padStart(3, '0').slice(1),
    },
    {
      title: "Customer",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Table",
      dataIndex: "tableId",
      key: "tableId",
      render: (tableId: any) => `Table ${tableId.tableNumber}`,
    },
    {
      title: "Images",
      dataIndex: "items",
      key: "images",
      width: '100px',
      render: (items: any[]) => (
        <Space wrap size={4}>
          {items.map((item, index) => (
            <img
              key={index}
              src={item.foodId.imageUrl}
              alt={item.foodId.name}
              title={item.foodId.name}
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '4px',
                objectFit: 'cover'
              }}
            />
          ))}
        </Space>
      ),
    },
    {
      title: "Items",
      dataIndex: "items",
      key: "items",
      width: '300px',
      render: (items: any[]) => (
        <ul style={{ margin: 0, padding: '8px 0', listStyle: "none" }}>
          {items.map((item, index) => (
            <li key={index} style={{ 
              marginBottom: index === items.length - 1 ? 0 : '8px'
            }}>
              {item.quantity}x {item.foodId.name} - ৳{item.price}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "pending" ? "gold" : status === "completed" ? "green" : "red"} style={{fontSize:'9px'}}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Payment",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (status: string) => (
        <Tag color={status === "paid" ? "green" : "red"} style={{fontSize:'9px'}}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Type",
      dataIndex: "orderType",
      key: "orderType",
      render: (type: string) => (
        <Tag color={type === "dine-in" ? "blue" : "purple"} style={{fontSize:'9px'}}>
          {type.toUpperCase()}
        </Tag>
      ),
    },
    {
        title: "Total Amount",
        dataIndex: "totalAmount",
        key: "totalAmount",
        render: (amount: number) => `৳${amount}`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <Space size="small">
          <Popconfirm
            title="Delete this order?"
            onConfirm={() => handleDelete(record.orderId)}
            okText="Yes"
            cancelText="No"
          >
            <Button 
              type="text" 
              danger 
              icon={<DeleteOutlined />}
              size="small"
              style={{ padding: '0 8px' }}
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    }
  ];

  // Client-side pagination
  const paginatedOrders = orders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div style={{ padding: "1rem" }}>
      <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', margin: 0 }}>Running Order List</h2>
        <Space>
          <Input
            placeholder="Search food items..."
            prefix={<SearchOutlined />}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: 250 }}
            allowClear
          />
          
        </Space>
      </div>
      <Table
        columns={columns}
        dataSource={paginatedOrders}
        rowKey="orderId"
        pagination={false}
        loading={isLoading}
        scroll={{ x: true }}
        summary={(pageData) => {
            //@ts-ignore
          const grandTotal = pageData.reduce((total, order) => total + order.totalAmount , 0);
          return (
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} colSpan={4}></Table.Summary.Cell>
              <Table.Summary.Cell index={4} colSpan={4}>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={5} colSpan={4}>
                <Space>
                 
                  <strong >Grand Total: ৳{grandTotal}</strong>
                </Space>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          );
        }}
      />

      <div style={{ marginTop: "1rem", textAlign: "right" }}>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={total}
          onChange={(page, pageSize) => {
            setCurrentPage(page);
            setPageSize(pageSize);
          }}
          showSizeChanger
          showTotal={(total) => `Total ${total} orders`}
        />
      </div>
    </div>
  );
};

export default OrderList;