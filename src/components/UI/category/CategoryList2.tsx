import { useState } from 'react';
import { Card, Row, Col, Button, Input, Popconfirm, message, Pagination, Space, Empty, Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useGetCategoriesQuery, useDeleteCategoryMutation } from '../../../redux/features/baseApi';
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { InfoCircleOutlined } from '@ant-design/icons';  // Add this import

const CategoryList2 = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  // Fetch all categories at once
  const { data: categoryData, isLoading } = useGetCategoriesQuery({
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

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  };

  const actions = (categoryId: string, description: string) => [
   
    <Button 
      type="text" 
      icon={<EditOutlined />} 
      onClick={() => navigate(`/update-category/${categoryId}`)}
    >
      Edit
    </Button>,
    <Tooltip title={description}>
        <Button 
            type="text" 
            icon={<InfoCircleOutlined />}
            >
            Details
        </Button>
    </Tooltip>,
    <Popconfirm
      title="Are you sure you want to delete this category?"
      onConfirm={() => handleDelete(categoryId)}
      okText="Yes"
      cancelText="No"
    >
      <Button type="text" danger icon={<DeleteOutlined />}>
        Delete
      </Button>
    </Popconfirm>
  ];

  // Calculate the current page data
  const currentData = categoryData?.data?.slice((page - 1) * pageSize, page * pageSize);

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

      {isLoading ? (
        <Row gutter={[16, 16]}>
          {[...Array(4)].map((_, index) => (
            <Col xs={24} sm={12} md={8} lg={6} key={index}>
              <Card loading={true} />
            </Col>
          ))}
        </Row>
      ) : currentData?.length ? (
        <>
          <Row gutter={[16, 16]}>
            {currentData.map((category: any) => (
              <Col xs={24} sm={12} md={8} lg={6} key={category._id}>
                <Card
                  actions={actions(category.categoryId, category.description)}
                  hoverable
                  style={{ height: '100%' }}
                >
                  <Card.Meta
                    title={category.name}
                    description={
                      <div style={{ minHeight: '60px' }}>
                        {truncateText(category.description, 100)}
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
              total={categoryData?.data?.length || 0}
              onChange={(page, pageSize) => {
                setPage(page);
                setPageSize(pageSize);
              }}
              showSizeChanger
              showTotal={(total) => `Total ${total} items`}
            />
          </div>
        </>
      ) : (
        <Empty description="No categories found" />
      )}
    </div>
  );
};

export default CategoryList2;