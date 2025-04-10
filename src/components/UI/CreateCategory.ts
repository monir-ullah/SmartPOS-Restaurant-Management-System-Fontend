/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, Form, Input, Select } from "antd";
import { NavLink } from "react-router-dom";
import { useRegisterUserMutation } from "../../redux/features/baseApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type FieldType = {
  username?: string;
  password?: string;
  role?: string;
  remember?: string;
};

const userRole = [
  { value: 'select_a_role', label: 'Select A Role' },
  { value: 'owner', label: 'Owner' },
  { value: 'manager', label: 'Manager' },
  { value: 'waiter', label: 'Waiter' },
  { value: 'cashier', label: 'Cashier' },
  { value: 'chef', label: 'Chef' },
  { value: 'administrator', label: 'Administrator' }
]
const CreateCategory = () => {
  const navigate = useNavigate();
  // Register function from the baseAPi
  const [registerUser, { isError, isSuccess }] = useRegisterUserMutation();

  // is successfully created user.
  if (isSuccess) {
    toast.success("Successfully Created Account.");
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  }

  // if any error occur.

  if (isError) {
    toast.error("Something wrong. Please Try again with correct information.");
  }

  // Sending form data in the server through redux
  const onFinish = (values: any) => {
    // Validate role and username in a single condition for better performance
    if (values.role === 'select_a_role' || values.username === 'defaultuser') {
      toast.error(
        values.role === 'select_a_role' 
          ? "Please select a proper role!"
          : "User Name Can't be defaultuser"
      );
      return;
    }
    registerUser(values);
  };

  const onFinishFailed = () => {
    toast.error("Something went wrong. Try again with right input.");
  };

  // Login button style object
  const loginButtonStyle = {
    width: "100%",
    border: "2px solid #0B60B0",
    color: "black",
  };

  return (
    <section
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h4 style={{ marginBottom: "50px", fontSize: "40px" }}>
          Create New Account
        </h4>
      </div>
      <div
        style={{
          width: "80%",
          paddingRight: "20%",
        }}
      >
        {/* Form Starting */}
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: "100%" }}
          initialValues={{
            username: "defaultuser",
            password: "defaultpass123",
            role: "select_a_role"
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="true"
        >
          {/* Username input field */}
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          {/* Password input field */}
          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          {/* Role selection field */}
          <Form.Item<FieldType>
            label="Role"
            name="role"
            rules={[{ required: true, message: "Please select your role!" }]}
          >
            <Select>
              {userRole.map(({ value, label }) => (
                <Select.Option key={value} value={value}>
                  {label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {/* Submit button for registrations */}
          <Form.Item wrapperCol={{ md: { offset: 8 }, sm: { offset: 0 } }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: "100%",
              }}
            >
              Submit
            </Button>
          </Form.Item>
          <Form.Item
            wrapperCol={{ md: { offset: 8 }, sm: { offset: 0 } }}
            style={{ textAlign: "center" }}
          >
            {/* This button is for redirecting in the login page. for user login */}
            <Button type="link" className="login-btn" style={loginButtonStyle}>
              <NavLink to={"/login"}> Login Page</NavLink>
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default CreateCategory;
