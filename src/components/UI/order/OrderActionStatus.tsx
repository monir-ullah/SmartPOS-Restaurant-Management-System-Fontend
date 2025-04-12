import { useState } from 'react';
import {
  Table, Tag, Space, Button, Input, message, Popconfirm, Popover, Select
} from 'antd';
import {
  SearchOutlined, EditOutlined, DeleteOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
  
} from '../../../redux/features/order/orderApi';
import { useAppSelector } from '../../../redux/hooks';
import { useSelector } from 'react-redux';

const OrderActionStatus = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusPopoverVisible, setStatusPopoverVisible] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  const { data: orderData, isLoading } = useGetAllOrdersQuery({
    page,
    limit: pageSize,
    searchTerm
  });

  
  //@ts-ignore
  const auth = useSelector((state) => state?.user?.user);

  const role = auth?.role?.toLowerCase();
  console.log(role);

  // Add this function to filter orders based on role
  const getFilteredOrders = () => {
    if (!orderData?.orders) return [];
    
    if (role === 'chef' || role === 'waiter') {
        //@ts-ignore
      return orderData.orders.filter(order => 
        ['pending', 'cooking', 'ready', 'served'].includes(order.status.toLowerCase())
      );
    }
    return orderData.orders;
  };

  // Modify the status options based on role
  const getStatusOptions = () => {
    
    if (role === 'chef') {
      return [
        { value: 'cooking', label: 'Cooking' },
        { value: 'ready', label: 'Ready' },
      ];
    } else if (role === 'waiter') {
      return [
        { value: 'served', label: 'Served' },
      ];
    }
    
    return [
      { value: 'pending', label: 'Pending' },
      { value: 'cooking', label: 'Cooking' },
      { value: 'ready', label: 'Ready' },
      { value: 'served', label: 'Served' },
      { value: 'pay', label: 'Pay' },
      { value: 'completed', label: 'Completed' },
      { value: 'canceled', label: 'Canceled' },
    ];
  };

//   const [deleteOrder] = useDeleteOrderMutation();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus({ orderId, status: newStatus }).unwrap();
      message.success('Status updated successfully');
      setStatusPopoverVisible(null);
    } catch (error: any) {
      message.error(error?.data?.message || 'Failed to update status');
    }
  };

  const getStatusColor = (status: string) => {
    const colorMap: { [key: string]: string } = {
      pending: 'gold',
      processing: 'blue',
      completed: 'green',
      cancelled: 'red'
    };
    return colorMap[status] || 'default';
  };

  const getPaymentStatusColor = (status: string) => {
    const colorMap: { [key: string]: string } = {
      paid: 'green',
      unpaid: 'red',
      partial: 'orange'
    };
    return colorMap[status] || 'default';
  };

  // In the columns array, replace the existing 'Items' column and add a new 'Images' column:
  
  const columns = [
      {
        title: 'Order ID',
        dataIndex: 'orderId',
        key: 'orderId',
        render: (text: string) => <a>{text}</a>
      },
      {
        title: 'Customer',
        dataIndex: 'customerName',
        key: 'customerName'
      },
      {
        title: 'Table',
        dataIndex: ['tableId', 'tableNumber'],
        key: 'tableNumber',
        render: (tableNumber: number) => `Table ${tableNumber}`
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
        title: 'Total Amount',
        dataIndex: 'totalAmount',
        key: 'totalAmount',
        render: (amount: number) => `৳${amount.toFixed(2)}`
      },
      {
        title: 'Order Type',
        dataIndex: 'orderType',
        key: 'orderType',
        render: (type: string) => (
          <Tag color={type === 'dine-in' ? 'blue' : 'purple'}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Tag>
        )
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (status: string) => (
          <Tag color={getStatusColor(status)}>{status.toUpperCase()}</Tag>
        )
      },
      {
        title: 'Payment',
        dataIndex: 'paymentStatus',
        key: 'paymentStatus',
        render: (status: string) => (
          <Tag color={getPaymentStatusColor(status)}>{status.toUpperCase()}</Tag>
        )
      },
      {
        title: 'Actions',
        key: 'actions',
        render: (_: any, record: any) => (
          <Space size="middle">
            {/* Update status button with popover */}
            <Popover
              title="Update Status"
              trigger="click"
              open={statusPopoverVisible === record.orderId}
              onOpenChange={(visible) => setStatusPopoverVisible(visible ? record.orderId : null)}
              content={
                <Select
                  defaultValue={record.status}
                  style={{ width: 150 }}
                  onChange={(value) => setSelectedStatus(value)}
                  onSelect={(value) => handleStatusChange(record.orderId, value)}
                >
                  {getStatusOptions().map((option) => (
                    <Select.Option key={option.value} value={option.value}>
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
  
              
            }
          >
            <Button type="link" icon={<EditOutlined />}>
              Update Status
            </Button>
          </Popover>
  
          
        </Space>
      )
    }
  ];

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', margin: 0 }}>Orders</h2>
        <Space>
          <Input
            placeholder="Search orders..."
            prefix={<SearchOutlined />}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: 250 }}
            allowClear
          />
          <Button type="primary" onClick={() => navigate('/create-order')}>
            Create Order
          </Button>
        </Space>
      </div>

      <Table
        columns={columns}
        // dataSource={orderData?.orders}
        dataSource={getFilteredOrders()}
        rowKey="orderId"
        loading={isLoading}
        pagination={{
          current: page,
          pageSize: pageSize,
          total: orderData?.meta?.total || 0,
          onChange: (newPage, newPageSize) => {
            setPage(newPage);
            if (newPageSize) setPageSize(newPageSize);
          },
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} orders`
        }}
      />
    </div>
  );
};

export default OrderActionStatus;
