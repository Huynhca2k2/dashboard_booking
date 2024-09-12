import React, { useContext } from "react";
import { Button, Form, Input, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import imgLogo from "../assets/images/logo-main.jpg";
import { loginAdmin } from "../services/auth";
import AppContext from "../context/AppContext"; 

const Login = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(AppContext);

  const onFinish = async (values) => {
    try {
      const response = await loginAdmin(values.username, values.password);
      if (response?.status === 200) {
        const token = response.data.result.token;
        localStorage.setItem("token", token);

        setToken(token); // Cập nhật token trong context

        message.success("Login successful!");
        navigate("/");
      } else {
        message.error("Login failed. Please check your username and password.");
      }
    } catch (err) {
      console.error("Login error:", err);
      message.error("An error occurred during login.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <div className="flex flex-row justify-center py-4">
          <Link to="/" className="w-[148px] h-[48px] block">
            <img
              src={imgLogo}
              alt="pic logo"
              className="w-full h-full object-cover"
            />
          </Link>
        </div>
        <h2 className="text-2xl font-semibold text-center mb-6">
          Login Dashboard
        </h2>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          className="login-form"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              className="rounded-md"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              className="rounded-md"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="login-form-button w-full bg-blue-500 hover:bg-blue-600"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
