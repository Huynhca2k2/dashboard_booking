import React, { useContext, useState } from "react";
import { Table, Button, Modal, Input, Form, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import AppContext from "../context/AppContext";
import {
  createPickupLocation,
  deletePickupLocation,
  updatePickupLocation,
} from "../services/pickupLocation";

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
  const { pickupLocations, setPickupLocations } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  // Handle Add Location
  const handleAddLocation = async (values) => {
    setIsLoading(true);
    try {
      const newLocation = await createPickupLocation(values);
      setPickupLocations([...pickupLocations, newLocation]);
      setIsModalOpen(false);
      form.resetFields();
      console.log("New Location:", newLocation);
      message.success("Location added successfully!");
    } catch (error) {
      console.error("Failed to add location:", error);
      message.error("Failed to add location!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditLocation = async (values) => {
    setIsLoading(true);
    try {
      const updatedLocation = await updatePickupLocation(
        selectedLocation.id,
        values
      );
      const updatedLocations = pickupLocations.map((location) =>
        location.id === selectedLocation.id ? updatedLocation : location
      );
      setPickupLocations(updatedLocations);
      setIsEditModalOpen(false);
      setSelectedLocation(null);
      console.log("Updated Location:", updatedLocation);
      message.success("Location updated successfully!");
    } catch (error) {
      console.error("Failed to update location:", error);
      message.error("Failed to update location!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteLocation = async (id) => {
    setIsLoading(true);
    try {
      await deletePickupLocation(id);
      const filteredLocations = pickupLocations.filter(
        (location) => location.id !== id
      );
      setPickupLocations(filteredLocations);
      message.success("Location deleted successfully!");
    } catch (error) {
      console.error("Failed to delete location:", error);
      message.error("Failed to delete location!");
    } finally {
      setIsLoading(false);
    }
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
            className="text-yellow-500 border-yellow-500 hover:bg-yellow-600 hover:border-yellow-600"
            style={{ marginRight: 8 }}
          />
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
        dataSource={pickupLocations}
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
            <Button type="primary" htmlType="submit" loading={isLoading}>
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
