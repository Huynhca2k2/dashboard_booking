import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Input,
  Form,
  Popconfirm,
  InputNumber,
} from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";

const initialData = [
  {
    id: "1",
    name: "Luxury Bus",
    image:
      "https://static.vexere.com/production/images/1645602467050.jpeg?w=250&h=250",
    descBus: "A comfortable luxury bus.",
    type: "Luxury",
    priceReal: 500.0,
    licensePlate: "XYZ-1234",
    seatCapacity: 50,
    phoneNumber: "+123456789",
    rating: 4.5,
  },
  {
    id: "2",
    name: "Standard Bus",
    image:
      "https://static.vexere.com/production/images/1645602467050.jpeg?w=250&h=250",
    descBus: "A reliable standard bus.",
    type: "Standard",
    priceReal: 300.0,
    licensePlate: "XYZ-5678",
    seatCapacity: 40,
    phoneNumber: "+987654321",
    rating: 4.0,
  },
];

const Bus = () => {
  const [buses, setBuses] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBus, setSelectedBus] = useState(null);
  const [form] = Form.useForm();

  // Handle Add Bus
  const handleAddBus = (values) => {
    const newBus = {
      ...values,
    };
    setBuses([...buses, newBus]);
    setIsModalOpen(false);
    form.resetFields();
    console.log(newBus); // Log dữ liệu bus mới tạo
  };

  // Handle Edit Bus
  const handleEditBus = (values) => {
    const updatedBuses = buses.map((bus) =>
      bus.id === selectedBus.id ? { ...selectedBus, ...values } : bus
    );
    setBuses(updatedBuses);
    setIsEditModalOpen(false);
    setSelectedBus(null);
    console.log("Updated Bus:", values);
  };

  // Handle Delete Bus
  const handleDeleteBus = (id) => {
    const filteredBuses = buses.filter((bus) => bus.id !== id);
    setBuses(filteredBuses);
  };

  // Open Edit Modal
  const openEditModal = (bus) => {
    setSelectedBus(bus);
    setIsEditModalOpen(true);
    form.setFieldsValue(bus); // Set giá trị mặc định cho form
  };

  // Open Read Modal
  const openReadModal = (bus) => {
    Modal.info({
      title: "Bus Information",
      content: (
        <div>
          <p>Name: {bus.name}</p>
          <p>
            Image:{" "}
            <img src={bus.image} alt={bus.name} style={{ width: "100px" }} />
          </p>
          <p>Description: {bus.descBus}</p>
          <p>Type: {bus.type}</p>
          <p>Price: {bus.priceReal}</p>
          <p>License Plate: {bus.licensePlate}</p>
          <p>Seat Capacity: {bus.seatCapacity}</p>
          <p>Phone Number: {bus.phoneNumber}</p>
          <p>Rating: {bus.rating}</p>
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
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text, bus) => (
        <img src={bus.image} alt={bus.name} style={{ width: "50px" }} />
      ),
    },
    {
      title: "Description",
      dataIndex: "descBus",
      key: "descBus",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Price",
      dataIndex: "priceReal",
      key: "priceReal",
      render: (text) => `$${text.toFixed(2)}`,
    },
    {
      title: "License Plate",
      dataIndex: "licensePlate",
      key: "licensePlate",
    },
    {
      title: "Seat Capacity",
      dataIndex: "seatCapacity",
      key: "seatCapacity",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Action",
      key: "action",
      render: (text, bus) => (
        <div>
          <Button
            icon={<EyeOutlined />}
            onClick={() => openReadModal(bus)}
            style={{ marginRight: 8 }}
          ></Button>
          <Button
            icon={<EditOutlined />}
            onClick={() => openEditModal(bus)}
            style={{ marginRight: 8 }}
          ></Button>
          <Popconfirm
            title="Are you sure delete this bus?"
            onConfirm={() => handleDeleteBus(bus.id)}
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
        Add Bus
      </Button>
      <Table
        columns={columns}
        dataSource={buses}
        rowKey="id"
        className="mt-4"
      />

      {/* Add Bus Modal */}
      <Modal
        title="Create Bus"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleAddBus}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="image"
            label="Image URL"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="descBus"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="type" label="Type" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="priceReal"
            label="Price"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            name="licensePlate"
            label="License Plate"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="seatCapacity"
            label="Seat Capacity"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="rating" label="Rating" rules={[{ required: true }]}>
            <InputNumber min={0} max={5} step={0.1} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create Bus
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Bus Modal */}
      <Modal
        title="Edit Bus"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleEditBus}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="image"
            label="Image URL"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="descBus"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="type" label="Type" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="priceReal"
            label="Price"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            name="licensePlate"
            label="License Plate"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="seatCapacity"
            label="Seat Capacity"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="rating" label="Rating" rules={[{ required: true }]}>
            <InputNumber min={0} max={5} step={0.1} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Bus
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Bus;
