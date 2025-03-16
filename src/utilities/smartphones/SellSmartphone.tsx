/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoadingOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Modal, Button, DatePicker, Form, Input, InputNumber } from "antd";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import {
  useGetOneSmartphoneMutation,
  useSmartphoneSellsManagementMutation,
} from "../../redux/features/baseApi";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const SellSmartphone = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const smartphoneId = useAppSelector(
    (state) => state.smartphone.singleSmartphone
  );
  const [
    getOneSmartphone,
    { isLoading, isUninitialized, isSuccess, data: smartphones },
  ] = useGetOneSmartphoneMutation();

  useEffect(() => {
    if (typeof smartphoneId === "string") {
      getOneSmartphone({ key: smartphoneId });
    }
  }, [smartphoneId, getOneSmartphone]);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Smartphone Sells management hooks redux baseApi

  const [
    smartphoneSellsManagement,
    { data: salesManagementData, error: salesManagementError },
  ] = useSmartphoneSellsManagementMutation();

  if (salesManagementData) {
    toast.success("Successfully Crated sold data in database");
  }
  if (salesManagementError) {
    console.log(salesManagementError);
    toast.error("Cloud Not store data ");
  }

  // Form Layout
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };

  return (
    <>
      <span
        onClick={showModal}
        style={{ color: "#2AAA8A" }}
        className="sell-btn"
      >
        <ShoppingOutlined /> Sell
      </span>
      <Modal
        title={`Selected Smartphone Name for Sale: ${
          isSuccess && smartphones.data.name
        }`}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <div
          style={{
            marginTop: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: 15,
          }}
        >
          {(isLoading || isUninitialized) && <LoadingOutlined />}

          {isSuccess && (
            <Form.Provider
              onFormFinish={(name, { forms }) => {
                if (name === "SellSmartphoneForm") {
                  const { SellSmartphoneForm } = forms;
                  const fieldValue = SellSmartphoneForm.getFieldsValue();

                  fieldValue.soldDate = dayjs(fieldValue.soldDate).format(
                    "YYYY-MM-DD"
                  );
                  fieldValue.productId = smartphoneId;
                  fieldValue.unitPrice = smartphones.data.price;
                  fieldValue.totalPrice =
                    smartphones.data.price * fieldValue.quantitySold;
                  console.log(fieldValue);
                  smartphoneSellsManagement({ fieldValue });

                  // Closing the modal
                  setIsModalOpen(false);
                }
              }}
            >
              <Form
                name="SellSmartphoneForm"
                {...formItemLayout}
                variant="filled"
                style={{ maxWidth: 600 }}
              >
                <Form.Item
                  label="Product Name"
                  name="productName"
                  initialValue={smartphones.data.name}
                  rules={[{ required: true, message: "Please Provide Name" }]}
                >
                  <Input readOnly />
                </Form.Item>

                <Form.Item
                  label="Buyer Name"
                  name="buyerName"
                  rules={[
                    { required: true, message: "Please Provide Buyer Name" },
                  ]}
                >
                  <Input
                    style={{ width: "100%" }}
                    placeholder="Provide buyer name"
                  />
                </Form.Item>

                <Form.Item
                  label="Quantity Sold"
                  name="quantitySold"
                  rules={[
                    {
                      required: true,
                      message: "Please provide Sold Quantity",
                    },
                    {
                      max: smartphones.data.quantity,
                      validator: (_, value) => {
                        if (value > smartphones.data.quantity) {
                          return Promise.reject("Error");
                        }
                        return Promise.resolve();
                      },
                      message: `Sold Quantity must be equal or less than ${smartphones.data.quantity}`,
                    },
                    {
                      min: 1,
                      validator: (_, value) => {
                        if (value <= 0) {
                          return Promise.reject("Error");
                        }
                        return Promise.resolve();
                      },
                      message: `Sold Quantity must be e bigger than 0`,
                    },
                  ]}
                >
                  <InputNumber type="number" style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item
                  label="Sold Date"
                  name="soldDate"
                  initialValue={dayjs(dayjs(new Date()).format("YYYY-MM-DD"))}
                  rules={[
                    { required: true, message: "Please Provide Release Date!" },
                  ]}
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    placeholder="Select Sold Date"
                  />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    <ShoppingOutlined /> Sell
                  </Button>
                </Form.Item>
              </Form>
            </Form.Provider>
          )}
        </div>
      </Modal>
    </>
  );
};

export default SellSmartphone;
