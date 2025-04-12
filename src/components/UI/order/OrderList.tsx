import { useState } from "react";
import { Table, Tag, Space, Pagination } from "antd";
import { useGetAllOrdersQuery } from "../../../redux/features/order/orderApi";
import dayjs from "dayjs";

const OrderList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  const { data, isLoading } = useGetAllOrdersQuery({});

  const orders = data?.orders || [];
  const total = data?.meta?.total || 0;

  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
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
      title: "Items",
      dataIndex: "items",
      key: "items",
      render: (items: any[]) => (
        <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
          {items.map((item, index) => (
            <li key={index}>
              {item.quantity}x {item.foodId.name} - ৳{item.price}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount: number) => `৳${amount}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "pending" ? "gold" : status === "completed" ? "green" : "red"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Payment",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (status: string) => (
        <Tag color={status === "paid" ? "green" : "red"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Type",
      dataIndex: "orderType",
      key: "orderType",
      render: (type: string) => (
        <Tag color={type === "dine-in" ? "blue" : "purple"}>
          {type.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => dayjs(date).format("MMM D, YYYY h:mm A"),
    },
  ];

  // Client-side pagination
  const paginatedOrders = orders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div style={{ padding: "1rem" }}>
      <h2 style={{ fontSize: "1.875rem", fontWeight: "bold", marginBottom: "1rem" }}>
        Orders
      </h2>
      
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