import React, { useContext, useState } from "react";
import { Table, Button, Modal, Input, Form, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import AppContext from "../context/AppContext";
import { createUser, deleteUser, updateUser } from "../services/user";

// const initialData = [
//   {
//     id: "14080bd2-b5f5-49a4-8dfa-7997277c895a",
//     username: "huynh2",
//     firstName: "Huynh",
//     lastName: "Cai Hoang",
//     email: "johndoe@example.com",
//     phoneNumber: "+123456789",
//     dob: "2002-01-01",
//     roles: [
//       {
//         name: "USER",
//         description: "User role",
//         permissions: [],
//       },
//     ],
//   },
//   {
//     id: "14080bd2-b5f5-49a4-8dfa-1234567c895a",
//     username: "huynh3",
//     firstName: "Huynh3",
//     lastName: "Cai Hoang3",
//     email: "johndoe@example.com3",
//     phoneNumber: "+1234567893",
//     dob: "2002-01-013",
//     roles: [
//       {
//         name: "USER",
//         description: "User role",
//         permissions: [],
//       },
//     ],
//   },
// ];

const User = () => {
  const { users, setUsers } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [form] = Form.useForm();

  // Handle Add User
  const handleAddUser = async (values) => {
    setIsLoading(true);
    try {
      const newUser = await createUser(values);
      setUsers([...users, newUser]);
      setIsModalOpen(false);
      form.resetFields();
      console.log("New User:", newUser);
      message.success("create user success!!!");
    } catch (error) {
      console.error("Failed to create user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Edit User
  const handleEditUser = async (values) => {
    setIsLoading(true);
    try {
      const updatedUser = await updateUser(selectedUser.id, values);

      const updatedUsers = users.map((user) =>
        user.id === selectedUser.id ? updatedUser : user
      );
      setUsers(updatedUsers);
      setIsEditModalOpen(false);
      setSelectedUser(null);
      message.success("User updated successfully!");
      console.log("Updated User:", updatedUser);
    } catch (error) {
      console.error("Failed to update user:", error);
      message.error("Failed to update user!");
    } finally {
      setIsLoading(false);
    }
  };
  // Handle Delete User
  const handleDeleteUser = async (id) => {
    setIsLoading(true);
    try {
      await deleteUser(id);

      const filteredUsers = users.filter((user) => user.id !== id);
      setUsers(filteredUsers);
      message.success("User deleted successfully!");
    } catch (error) {
      console.error("Failed to delete user:", error);
      message.error("Failed to delete user!");
    } finally {
      setIsLoading(false);
    }
  };

  // Open Edit Modal
  const openEditModal = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
    form.setFieldsValue(user);
  };

  // Open Read Modal
  const openReadModal = (user) => {
    Modal.info({
      title: "User Information",
      content: (
        <div>
          <p>Id: {user.id}</p>
          <p>Username: {user.username}</p>
          <p>First Name: {user.firstName}</p>
          <p>Last Name: {user.lastName}</p>
          <p>Email: {user.email}</p>
          <p>Phone Number: {user.phoneNumber}</p>
          <p>Date of Birth: {user.dob}</p>
        </div>
      ),
      onOk() {},
    });
  };

  // Table Columns
  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Date of Birth",
      dataIndex: "dob",
      key: "dob",
    },
    {
      title: "Action",
      key: "action",
      render: (text, user) => (
        <div>
          <Button
            icon={<EyeOutlined />}
            onClick={() => openReadModal(user)}
            style={{ marginRight: 8 }}
          ></Button>
          <Button
            icon={<EditOutlined />}
            onClick={() => openEditModal(user)}
            className=" text-yellow-500 border-yellow-500 hover:bg-yellow-600 hover:border-yellow-600"
            style={{ marginRight: 8 }}
          />
          {user.roles[0]?.name !== "ADMIN" && (
            <Popconfirm
              title="Are you sure delete this user?"
              onConfirm={() => handleDeleteUser(user.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button icon={<DeleteOutlined />} danger></Button>
            </Popconfirm>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 min-h-[620px]">
      <div className="w-full flex flex-row justify-end">
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Add User
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        className="mt-4"
      />

      {/* Add User Modal */}
      <Modal
        title="Create User"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleAddUser}>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="dob"
            label="Date of Birth"
            rules={[{ required: true }]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <div className="flex flex-row justify-center">
              <Button type="primary" htmlType="submit" loading={isLoading}>
                Create User
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit User Modal */}
      <Modal
        title="Edit User"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleEditUser}>
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="dob"
            label="Date of Birth"
            rules={[{ required: true }]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Save Edit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default User;
