/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Divider, Popconfirm, Spin, Table, TableColumnsType } from "antd";
import {
  BugOutlined,
  CopyOutlined,
  DeleteOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import {
  useDeleteOneSmartphoneMutation,
  useGetSmartphoneQuery,
} from "../../redux/features/baseApi";
import { DataType } from "../../utilities/smartphones/smartphone.table";
import HandleEditButton from "../../utilities/smartphones/HandleEditButton";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  bulkDeleteSmartphoneForReduxState,
  setSingleSmartphoneState,
} from "../../redux/features/smartphone/smartphoneSlice";
import { NavLink } from "react-router-dom";
import SellSmartphone from "../../utilities/smartphones/SellSmartphone";

const Smartphones = () => {
  // Dispatch Function

  const dispatch = useAppDispatch();

  // Getting Filter Query from the Redux State

  const selectFilterQuery = useAppSelector(
    (state) => state.smartphone.smartphoneQuery
  );

  // Getting Smartphones From Redux State
  const {
    data: smartphonesData,
    isLoading,
    isFetching,
    isError,
  } = useGetSmartphoneQuery(selectFilterQuery);

  if (isLoading) {
    <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />;
  }
  if (isFetching) {
    <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />;
  }
  if (isError) {
    <span>
      Error Found <BugOutlined />
    </span>;
  }
  const [selectionType] = useState<"checkbox" | "radio">("checkbox");

  // Delete Functions Hooks

  const [deleteOneSmartphone, { error: singleItemDeletedError }] =
    useDeleteOneSmartphoneMutation();

  // Bulk Delete Items

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      dispatch(bulkDeleteSmartphoneForReduxState(selectedRowKeys));
    },
  };

  if (singleItemDeletedError) {
    console.log(singleItemDeletedError);
  }
  // Handle Delete Smartphone
  const handleSingleItemDelete = (key: React.Key) => {
    deleteOneSmartphone({ key });
  };

  //  Handle Edit setting key in the redux state

  const handleEdit = async (key: React.Key) => {
    dispatch(setSingleSmartphoneState(key));
  };

  // This function is for duplicate and edit button. This function will set key in the redux state. So that i can get the data in the component where i want.
  const handleDuplicateAndEdit = async (key: React.Key) => {
    dispatch(setSingleSmartphoneState(key));
  };

  // Columns For the Table
  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Price$",
      dataIndex: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Brand",
      dataIndex: "brand",
    },
    {
      title: "Model",
      dataIndex: "model",
    },
    {
      title: "OS",
      dataIndex: "operatingSystem",
    },
    {
      title: "Release Date",
      dataIndex: "releaseDate",
    },
    {
      title: "Storage Capacity",
      dataIndex: "storageCapacity",
    },
    {
      title: "Duplicate & Edit",
      dataIndex: "duplicate",
      render: (_, record: { key: React.Key }) => (
        <NavLink
          to={"/duplicate-and-edit"}
          onClick={async () => await handleDuplicateAndEdit(record.key)}
        >
          <CopyOutlined /> Duplicate & Edit
        </NavLink>
      ),
    },
    {
      title: "Sell",
      dataIndex: "sell",
      render: (_, record: { key: React.Key }) => (
        <a onClick={async () => await handleEdit(record.key)}>
          <SellSmartphone />
        </a>
      ),
    },
    {
      title: "Edit",
      dataIndex: "edit",
      render: (_, record: { key: React.Key }) => (
        <a onClick={async () => await handleEdit(record.key)}>
          <HandleEditButton />
        </a>
      ),
    },
    {
      title: "Delete",
      dataIndex: "delete",
      render: (_, record: { key: React.Key }) => (
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => handleSingleItemDelete(record.key)}
        >
          <a style={{ color: "red" }} className="delete_hover_color">
            <DeleteOutlined /> Delete
          </a>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
      <Divider />

      {/* This table is for showing all Smartphone data in the dashboard. In this table i use pagination so that i can get a good user experience.  */}
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={smartphonesData?.data}
        pagination={{ pageSize: 8 }}
      />
    </div>
  );
};

export default Smartphones;
