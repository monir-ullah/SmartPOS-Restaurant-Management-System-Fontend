import { useState } from 'react';
import { Card, Row, Col, Button, Popconfirm, message, Pagination, Space, Empty, Tag, Input, Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';
import { EditOutlined, DeleteOutlined, SearchOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useDeleteFoodItemMutation, useGetFoodItemsQuery } from '../../../redux/features/fooditem/foodItemAPi';

const FoodList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [searchTerm, setSearchTerm] = useState('');

  const { data: foodData, isLoading } = useGetFoodItemsQuery({
    page,
    limit: pageSize,
    searchTerm
  });
  
  const [deleteFood] = useDeleteFoodItemMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteFood(id).unwrap();
      message.success('Food item deleted successfully');
    } catch (error) {
      // @ts-ignore
      message.error(error.data?.message || 'Failed to delete food item');
    }
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setPage(1); // Reset to first page when searching
  };

  const getCategoryBadge = (category: { name: string, isActive: boolean }) => {
    const colorMap: { [key: string]: string } = {
      'Main Course': 'blue',
      'Appetizers': 'green',
      'Desserts': 'purple',
      // Add more mappings as needed
    };
    
    return {
      color: colorMap[category.name] || 'default',
      name: category.name
    };
  };

  const actions = (foodId: string, description: string) => [
    <Button 
      type="text" 
      icon={<EditOutlined />} 
      onClick={() => navigate(`/update-food/${foodId}`)}
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
      title="Are you sure you want to delete this food item?"
      onConfirm={() => handleDelete(foodId)}
      okText="Yes"
      cancelText="No"
    >
      <Button type="text" danger icon={<DeleteOutlined />}>
        Delete
      </Button>
    </Popconfirm>
  ];

  const formatPrice = (price: number) => {
    return `৳${price.toFixed(2)}`;
  };

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', margin: 0 }}>Food Items</h2>
        <Space>
          <Input
            placeholder="Search food items..."
            prefix={<SearchOutlined />}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: 250 }}
            allowClear
          />
          <Button type="primary" onClick={() => navigate('/create-food')}>
            Add Food Item
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
      ) : foodData?.data?.length ? (
        <>
          <Row gutter={[16, 16]}>
            {foodData.data.map((food: any) => {
              const category = getCategoryBadge(food.categoryId);
              return (
                <Col xs={24} sm={12} md={8} lg={6} key={food._id}>
                  <Card
                    actions={actions(food.foodId, food.description)}
                    hoverable
                    style={{ height: '100%' }}
                    cover={
                      <div style={{ height: '160px', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f5f5f5' }}>
                        <img 
                          alt={food.name}
                          src={food.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'} 
                          style={{ width: '100%', objectFit: 'cover' }}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                          }}
                        />
                      </div>
                    }
                  >
                    <Card.Meta
                      title={
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center'
                        }}>
                          <span style={{ 
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}>
                            {food.name}
                          </span>
                        </div>
                      }
                      description={
                        <div style={{ minHeight: '80px' }}>
                          <p style={{ 
                            fontWeight: 'bold', 
                            color: '#1890ff',
                            marginBottom: '8px'
                          }}>
                            {formatPrice(food.price)}
                          </p>
                          <p style={{
                            display: '-webkit-box',
                            WebkitLineClamp: '2',
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            marginBottom: '8px'
                          }}>
                            {food.description}
                          </p>
                          <Space size={[0, 8]} wrap>
                            <Tag color={category.color}>
                              {category.name}
                            </Tag>
                            <Tag color={food.isAvailable ? 'green' : 'red'}>
                              {food.isAvailable ? 'Available' : 'Unavailable'}
                            </Tag>
                          </Space>
                        </div>
                      }
                    />
                  </Card>
                </Col>
              );
            })}
          </Row>
          <div style={{ marginTop: '2rem', textAlign: 'right' }}>
            <Pagination
              current={page}
              pageSize={pageSize}
              total={foodData?.meta?.total || 0}
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
        <Empty description="No food items found" />
      )}
    </div>
  );
};

export default FoodList; FoodList;
