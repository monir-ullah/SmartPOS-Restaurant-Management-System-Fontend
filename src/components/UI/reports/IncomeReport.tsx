import { useState } from 'react';
import { Card, Select, DatePicker, Space, Table, Tag, Button } from 'antd';
import { useGetIncomeReportQuery } from '../../../redux/features/order/orderApi';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

const IncomeReport = () => {
  const [reportType, setReportType] = useState('daily');
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null]>([null, null]);

  const { data: reportData, isLoading } = useGetIncomeReportQuery({
    reportType,
    date: reportType !== 'custom' ? dayjs().format('YYYY-MM-DD') : undefined,
    startDate: reportType === 'custom' && dateRange[0] ? dateRange[0].format('YYYY-MM-DD') : undefined,
    endDate: reportType === 'custom' && dateRange[1] ? dateRange[1].format('YYYY-MM-DD') : undefined,
  });

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
      render: (orderId: string) => '#' + orderId.padStart(3, '0').charAt(0).toUpperCase() + orderId.padStart(3, '0').slice(1),
    },
    {
      title: 'Customer',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Items',
      dataIndex: 'items',
      key: 'items',
      render: (items: any[]) => (
        <ul style={{ margin: 0, padding: '8px 0', listStyle: 'none' }}>
          {items.map((item, index) => (
            <li key={index}>
              {item.quantity}x {item.name || 'Unknown Item'} - ৳{item.price}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount: number) => `৳${amount}`,
    },
    {
      title: 'Order Type',
      dataIndex: 'orderType',
      key: 'orderType',
      render: (type: string) => (
        <Tag color={type === 'dine-in' ? 'blue' : 'purple'}>
          {type.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Completed At',
      dataIndex: 'completedAt',
      key: 'completedAt',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm'),
    },
  ];

  // Add console log to check data structure
  console.log('reportData:', reportData);

  return (
    <div style={{ padding: '1rem' }}>
      <Card title="Income Report">
        <Space style={{ marginBottom: 16 }}>
          <Select
            defaultValue={'daily'}
            onChange={setReportType}
            style={{ width: 200 }}
            options={[
              { label: 'Daily (Today)', value: 'daily' },
              { label: 'Weekly (This Week)', value: 'weekly' },
              { label: 'Monthly (This Month)', value: 'monthly' },
              { label: 'Yearly (This Year)', value: 'yearly' },
              { label: 'Custom Range', value: 'custom' },
            ]}
          />
          {reportType === 'custom' && (
            <RangePicker
              value={dateRange}
              onChange={(dates) => setDateRange(dates as [dayjs.Dayjs | null, dayjs.Dayjs | null])}
            />
          )}
        </Space>

        <Table
          columns={columns}
          dataSource={reportData?.data?.orders?.map((item: any) => ({
            ...item,
            key: item._id || item.orderId
          })) || []}
          loading={isLoading}
          pagination={false}
          summary={(pageData) => {
            const tableTotal = pageData.reduce((sum, row) => sum + (row.totalAmount || 0), 0);
            return (
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={3}>
                  <strong>Total Income</strong>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={3}>
                  <strong>৳{reportData?.data?.totalIncome || tableTotal}</strong>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={4} colSpan={2} />
              </Table.Summary.Row>
            );
          }}
        />
      </Card>
    </div>
  );
};

export default IncomeReport;