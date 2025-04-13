/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, Checkbox, Form, Input } from "antd";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../../redux/features/baseApi";
import { setUserInfo } from "../../../redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { jwtDecode } from "jwt-decode";
import { TFieldType } from "../../../interface/interface.type";
import { toast } from "react-toastify";

const Login = () => {
  // dispatch function from redux
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const  from = location.state?.from?.pathname || "/";

  

  // Login User Function from the redux baseAPI
  const [loginUser, { isError }] = useLoginUserMutation();

  if (isError) {
    toast.error("Something Went Wrong. Please Try Again.");
  }

  const onFinish = async (values: any) => {
    try {
      const loginData = await loginUser(values).unwrap();
      const decoded = jwtDecode(loginData.data);
      dispatch(setUserInfo({ user: decoded, token: loginData.data }));


      toast.success("Successfully logged in!");

      // Redirecting the user to the last path
      navigate(from, { replace: true });
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    // Login Form
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
        <h4 style={{ marginBottom: "50px", fontSize: "40px" }}>User Login</h4>
      </div>
      <div
        style={{
          width: "80%",
          paddingRight: "20%",
        }}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: "100%" }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="true"
        >
          {/* username Input Field*/}
          <Form.Item<TFieldType>
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
            initialValue={"john_doe"}
          >
            <Input />
          </Form.Item>

          {/* Password  Input  Field*/}
          <Form.Item<TFieldType>
            label="Password"
            name="password"
            initialValue={"password123"}
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

         

          {/* Submit button */}
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

          {/* Create new Account button */}
          <Form.Item
            wrapperCol={{
              md: { offset: 8 },
              sm: { offset: 0 },
            }}
            style={{ textAlign: "center" }}
          >
            <Button
              type="link"
              style={{
                width: "100%",
                border: "2px solid #0B60B0",
                color: "black",
              }}
              className="login-btn"
            >
              <NavLink to={"/registration"}> Create New Account</NavLink>
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default Login;
