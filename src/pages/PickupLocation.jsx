import React, { useState } from "react";
import { Table, Button, Modal, Input, Form, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid"; // Để tạo ID cho PickupLocation mới

const initialData = [
  {
    id: "1",
    name: "Central Station",
    address: "123 Main St, City A",
  },
  {
    id: "2",
    name: "Central Station2",
    address: "123 Main St, City A2",
  },
];

const PickupLocation = () => {
  const [locations, setLocations] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [form] = Form.useForm();

  // Handle Add Location
  const handleAddLocation = (values) => {
    const newLocation = {
      id: uuidv4(),
      ...values,
    };
    setLocations([...locations, newLocation]);
    setIsModalOpen(false);
    form.resetFields();
    console.log(newLocation); // Log dữ liệu location mới tạo
  };

  // Handle Edit Location
  const handleEditLocation = (values) => {
    const updatedLocations = locations.map((location) =>
      location.id === selectedLocation.id
        ? { ...selectedLocation, ...values }
        : location
    );
    setLocations(updatedLocations);
    setIsEditModalOpen(false);
    setSelectedLocation(null);
    console.log("Updated Location:", values);
  };

  // Handle Delete Location
  const handleDeleteLocation = (id) => {
    const filteredLocations = locations.filter(
      (location) => location.id !== id
    );
    setLocations(filteredLocations);
  };

  // Open Edit Modal
  const openEditModal = (location) => {
    setSelectedLocation(location);
    setIsEditModalOpen(true);
    form.setFieldsValue(location); // Set giá trị mặc định cho form
  };

  // Open Read Modal
  const openReadModal = (location) => {
    Modal.info({
      title: "Pickup Location Information",
      content: (
        <div>
          <p>Name: {location.name}</p>
          <p>Address: {location.address}</p>
        </div>
      ),
      onOk() {},
    });
  };

  // Table Columns
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      key: "action",
      render: (text, location) => (
        <div>
          <Button
            icon={<EyeOutlined />}
            onClick={() => openReadModal(location)}
            style={{ marginRight: 8 }}
          ></Button>
          <Button
            icon={<EditOutlined />}
            onClick={() => openEditModal(location)}
            style={{ marginRight: 8 }}
          ></Button>
          <Popconfirm
            title="Are you sure delete this location?"
            onConfirm={() => handleDeleteLocation(location.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger></Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 min-h-[620px]">
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Add Pickup Location
      </Button>
      <Table
        columns={columns}
        dataSource={locations}
        rowKey="id"
        className="mt-4"
      />

      {/* Add Pickup Location Modal */}
      <Modal
        title="Create Pickup Location"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleAddLocation}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create Pickup Location
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Pickup Location Modal */}
      <Modal
        title="Edit Pickup Location"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleEditLocation}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Pickup Location
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PickupLocation;
