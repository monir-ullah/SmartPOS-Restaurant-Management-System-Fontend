/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { EditOutlined, LoadingOutlined } from "@ant-design/icons";
import { Modal, Button, DatePicker, Form, Input, InputNumber } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import {
  useGetOneSmartphoneMutation,
  useUpdateSmartphoneInfoMutation,
} from "../../redux/features/baseApi";

const HandleEditButton = () => {
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
  const [updateSmartphoneInfo, { error: updateSmartphoneInfoError }] =
    useUpdateSmartphoneInfoMutation();
  if (updateSmartphoneInfoError) {
    console.error(updateSmartphoneInfoError);
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
      <span onClick={showModal}>
        <EditOutlined /> Edit{" "}
      </span>
      <Modal
        title="Edit Smartphone Info"
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
                if (name === "EditForm1") {
                  const { EditForm1 } = forms;
                  const fieldValue = EditForm1.getFieldsValue();
                  updateSmartphoneInfo({
                    id: smartphones.data._id,
                    body: fieldValue,
                  });
                  console.log(fieldValue);

                  // Closing the modal
                  setIsModalOpen(false);
                }
              }}
            >
              <Form
                name="EditForm1"
                {...formItemLayout}
                variant="filled"
                style={{ maxWidth: 600 }}
              >
                <Form.Item
                  label="Name"
                  name="name"
                  initialValue={smartphones.data.name}
                  rules={[{ required: true, message: "Please Provide Name" }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Price"
                  name="price"
                  initialValue={smartphones.data.price}
                  rules={[{ required: true, message: "Please Provide Price" }]}
                >
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item
                  label="Quantity"
                  name="quantity"
                  initialValue={smartphones.data.quantity}
                  rules={[
                    { required: true, message: "Please Provide Quantity" },
                  ]}
                >
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item
                  label="Release Date"
                  name="releaseDate"
                  initialValue={dayjs(smartphones.data.releaseDate)}
                  rules={[
                    { required: true, message: "Please Provide Release Date!" },
                  ]}
                >
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>

                {/* Brand name */}

                <Form.Item
                  label="Brand"
                  name="brand"
                  initialValue={smartphones.data.brand}
                  rules={[{ required: true, message: "Please Provide Brand" }]}
                >
                  <Input style={{ width: "100%" }} />
                </Form.Item>

                {/* Model name */}

                <Form.Item
                  label="Model"
                  name="model"
                  initialValue={smartphones.data.model}
                  rules={[{ required: true, message: "Please Provide Model" }]}
                >
                  <Input style={{ width: "100%" }} />
                </Form.Item>

                {/*Operating System */}

                <Form.Item
                  label="OS"
                  name="operatingSystem"
                  initialValue={smartphones.data.operatingSystem}
                  rules={[
                    {
                      required: true,
                      message: "Please Provide Operating System",
                    },
                  ]}
                >
                  <Input style={{ width: "100%" }} />
                </Form.Item>

                {/* ScreenSize */}
                <Form.Item
                  label="ScreenSize"
                  name="screenSize"
                  initialValue={smartphones.data.screenSize}
                  rules={[
                    { required: true, message: "Please Provide ScreenSize" },
                  ]}
                >
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item
                  label="StorageCapacity"
                  name="storageCapacity"
                  initialValue={smartphones.data.storageCapacity}
                  rules={[
                    {
                      required: true,
                      message: "Please Provide Storage Capacity",
                    },
                  ]}
                >
                  <Input style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                  label="BatteryLife"
                  name="batteryLife"
                  initialValue={smartphones.data.batteryLife}
                  rules={[
                    {
                      required: true,
                      message: "Please Provide Batter yLife",
                    },
                  ]}
                >
                  <Input style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Update Smartphone
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

export default HandleEditButton;
