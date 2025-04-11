import { useState } from 'react';
import { Card, Row, Col, Button, Popconfirm, message, Pagination, Space, Empty, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useGetTablesQuery, useDeleteTableMutation } from '../../../redux/features/table/tableApi';

const TableList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  const { data: tableData, isLoading } = useGetTablesQuery({
    page,
    limit: pageSize
  });

  console.log(tableData?.data?.meta?.total);
  
  const [deleteTable] = useDeleteTableMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteTable(id).unwrap();
      message.success('Table deleted successfully');
    } catch (error) {
        // @ts-ignore
      message.error(error.data?.message || 'Failed to delete table');
    }
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      available: 'green',
      occupied: 'red',
      reserved: 'orange',
      maintenance: 'gray'
    };
    return colors[status] || 'blue';
  };

  const actions = (tableId: string) => [
    <Button 
      type="text" 
      icon={<EditOutlined />} 
      onClick={() => navigate(`/update-table/${tableId}`)}
    >
      Edit
    </Button>,
    
    <Popconfirm
      title="Are you sure you want to delete this table?"
      onConfirm={() => handleDelete(tableId)}
      okText="Yes"
      cancelText="No"
    >
      <Button type="text" danger icon={<DeleteOutlined />}>
        Delete
      </Button>
    </Popconfirm>
  ];

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', margin: 0 }}>Tables</h2>
        <Space>
          <Button type="primary" onClick={() => navigate('/create-table')}>
            Create Table
          </Button>
        </Space>
      </div>

      {isLoading ? (
        <Row gutter={[16, 16]}>
          {[...Array(4)].map((_, index) => (
            <Col xs={24} sm={12} md={8} lg={6} key={index}>
              <Card loading={true} />
            </Col>
          ))}
        </Row>
      ) : tableData?.data?.data?.length ? (
        <>
          <Row gutter={[16, 16]}>
            {tableData?.data?.data.map((table: any) => (
              <Col xs={24} sm={12} md={8} lg={6} key={table._id}>
                <Card
                  actions={actions(table.tableId, )}
                  hoverable
                  style={{ height: '100%' }}
                >
                  <Card.Meta
                    title={
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>Table {table.tableNumber}</span>
                        <Tag color={getStatusColor(table.status)}>{table.status.charAt(0).toUpperCase() + table.status.slice(1)}</Tag>
                      </div>
                    }
                    description={
                      <div style={{ minHeight: '60px' }}>
                        <p>Table ID: {table.tableId}</p>
                        <p>Capacity: {table.seatCapacity} seats</p>
                        <p>{table.description}</p>
                      </div>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
          <div style={{ marginTop: '2rem', textAlign: 'right' }}>
            <Pagination
              current={page}
              pageSize={pageSize}
              total={tableData?.data?.meta?.total || 0}
              onChange={(newPage, newPageSize) => {
                setPage(newPage);
                if (newPageSize !== pageSize) {
                  setPageSize(newPageSize);
                }
              }}
              showSizeChanger
              showTotal={(total) => `Total ${total} items`}
            />
          </div>
        </>
      ) : (
        <Empty description="No tables found" />
      )}
    </div>
  );
};

export default TableList;