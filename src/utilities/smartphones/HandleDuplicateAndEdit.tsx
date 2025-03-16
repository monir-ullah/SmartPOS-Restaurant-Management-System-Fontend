/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CopyOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, DatePicker, Col, Form, Input, InputNumber, Row } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useAppSelector } from "../../redux/hooks";
import {
  useAddNewSmartphoneMutation,
  useGetOneSmartphoneMutation,
} from "../../redux/features/baseApi";
import { Flip, toast } from "react-toastify";

const HandleDuplicateAndEdit = () => {
  const smartphoneId = useAppSelector(
    (state) => state.smartphone.singleSmartphone
  );
  const [
    getOneSmartphone,
    { isLoading, isUninitialized, isSuccess, data: smartphones },
  ] = useGetOneSmartphoneMutation();

  //  Add new Smartphone Hook
  const [
    addNewSmartphone,
    { isError: isDuplicateAndEdit, isSuccess: isSuccessDuplicatedAndEdit },
  ] = useAddNewSmartphoneMutation();

  // if any error occur an error toast will show.
  if (isDuplicateAndEdit) {
    toast.error("Something went wrong", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Flip,
    });
  }

  // if data created successfully a success toast will show.
  if (isSuccessDuplicatedAndEdit) {
    toast.success("Wow Successfully Created!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Flip,
    });
  }

  // getting smartphone data based on   smartphoneId if changed and set in the redux state.
  useEffect(() => {
    if (typeof smartphoneId === "string") {
      getOneSmartphone({ key: smartphoneId });
    }
  }, [smartphoneId, getOneSmartphone]);

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
      <span style={{ fontWeight: "bold", fontSize: "24px" }}>
        <CopyOutlined />
        Duplicate & Edit{" "}
      </span>

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
              if (name === "DuplicateAndEdit1") {
                const { DuplicateAndEdit1 } = forms;
                const fieldValue = DuplicateAndEdit1.getFieldsValue();

                // Sending the filed value in server
                addNewSmartphone({ body: fieldValue });
              }
            }}
          >
            <Form name="DuplicateAndEdit1" {...formItemLayout} variant="filled">
              <Row>
                <Col span={12}>
                  {/* Name */}
                  <Form.Item
                    label="Name"
                    name="name"
                    initialValue={smartphones.data.name}
                    rules={[{ required: true, message: "Please Provide Name" }]}
                  >
                    <Input />
                  </Form.Item>
                  {/* Price */}
                  <Form.Item
                    label="Price"
                    name="price"
                    initialValue={smartphones.data.price}
                    rules={[
                      { required: true, message: "Please Provide Price" },
                    ]}
                  >
                    <InputNumber style={{ width: "100%" }} />
                  </Form.Item>
                  {/* Quantity */}
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

                  {/* Release Date */}
                  <Form.Item
                    label="Release Date"
                    name="releaseDate"
                    initialValue={dayjs(smartphones.data.releaseDate)}
                    rules={[
                      {
                        required: true,
                        message: "Please Provide Release Date!",
                      },
                    ]}
                  >
                    <DatePicker style={{ width: "100%" }} />
                  </Form.Item>

                  {/* Brand name */}

                  <Form.Item
                    label="Brand"
                    name="brand"
                    initialValue={smartphones.data.brand}
                    rules={[
                      { required: true, message: "Please Provide Brand" },
                    ]}
                  >
                    <Input style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  {/* Model name */}

                  <Form.Item
                    label="Model"
                    name="model"
                    initialValue={smartphones.data.model}
                    rules={[
                      { required: true, message: "Please Provide Model" },
                    ]}
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
                </Col>
              </Row>

              <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit For New Entry
                </Button>
              </Form.Item>
            </Form>
          </Form.Provider>
        )}
      </div>
    </>
  );
};

export default HandleDuplicateAndEdit;
