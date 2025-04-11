import { useEffect, useState } from 'react';
import { Table, Space, Button, Input, Popconfirm, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useGetCategoriesQuery, useDeleteCategoryMutation } from '../../../redux/features/baseApi';
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const CategoryList = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: categoryData, isLoading } = useGetCategoriesQuery({
    page,
    limit: pageSize,
    searchTerm: searchText
  });

  

  const [deleteCategory] = useDeleteCategoryMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id).unwrap();
      message.success('Category deleted successfully');
    } catch (error) {
      message.error('Failed to delete category');
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: { _id?: string, categoryId:string }) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => navigate(`/update-category/${record.categoryId}`)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this category?"
            onConfirm={() => handleDelete(record.categoryId)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', margin: 0 }}>Categories</h2>
        <Space>
          <Button type="primary" onClick={() => navigate('/create-category')}>
            Create Category
          </Button>
        </Space>
      </div>
      <Table
        columns={columns}
        dataSource={categoryData?.data}
        rowKey="_id"
        loading={isLoading}
        pagination={{
          current: page,
          pageSize: pageSize,
          total: categoryData?.meta?.total,
          onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          },
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} items`,
        }}
      />
    </div>
  );
};

export default CategoryList;