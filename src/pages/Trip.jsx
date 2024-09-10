import React, { useState } from "react";
import { Table, Button, Modal, Input, Form, Select, DatePicker } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid"; // Để tạo ID cho Trip mới
import moment from "moment";

const { Option } = Select;

const pickupLocations = [
  { id: 1, name: "Central Station" },
  { id: 2, name: "South Station" },
];

const dropoffLocations = [
  { id: 1, name: "North Station" },
  { id: 2, name: "East Station" },
  { id: 3, name: "West Station" },
];

const buses = [
  { id: 1, name: "Luxury Bus" },
  { id: 2, name: "Standard Bus" },
];

const initialData = [
  {
    id: "1",
    departureLocation: "an-giang",
    arrivalLocation: "bac-giang",
    distance: 100.5,
    travelTime: "2",
    creationDate: "2024-09-06",
    departureTime: "2024-09-07T09:00:00",
  },
];

const Trip = () => {
  const [trips, setTrips] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [form] = Form.useForm();

  // Handle Add Trip
  const handleAddTrip = (values) => {
    const newTrip = {
      id: uuidv4(),
      ...values,
      creationDate: moment().format("YYYY-MM-DD"), // Tự động lấy ngày tạo
      departureTime: values.departureTime.format("YYYY-MM-DDTHH:mm:ss"),
    };
    setTrips([...trips, newTrip]);
    setIsModalOpen(false);
    form.resetFields();
    console.log(newTrip); // Log dữ liệu trip mới tạo
  };

  // Handle Edit Trip
  const handleEditTrip = (values) => {
    const updatedTrips = trips.map((trip) =>
      trip.id === selectedTrip.id ? { ...selectedTrip, ...values } : trip
    );
    setTrips(updatedTrips);
    setIsEditModalOpen(false);
    setSelectedTrip(null);
    console.log("Updated Trip:", values);
  };

  // Handle Delete Trip
  const handleDeleteTrip = (id) => {
    const filteredTrips = trips.filter((trip) => trip.id !== id);
    setTrips(filteredTrips);
  };

  // Open Edit Modal
  const openEditModal = (trip) => {
    setSelectedTrip(trip);
    setIsEditModalOpen(true);
    form.setFieldsValue({
      ...trip,
      departureTime: moment(trip.departureTime),
    }); // Set giá trị mặc định cho form
  };

  // Open Read Modal
  const openReadModal = (trip) => {
    Modal.info({
      title: "Trip Information",
      content: (
        <div>
          <p>Departure Location: {trip.departureLocation}</p>
          <p>Arrival Location: {trip.arrivalLocation}</p>
          <p>Distance: {trip.distance}</p>
          <p>Travel Time: {trip.travelTime}</p>
          <p>Departure Time: {trip.departureTime}</p>
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
      title: "Departure Location",
      dataIndex: "departureLocation",
      key: "departureLocation",
    },
    {
      title: "Arrival Location",
      dataIndex: "arrivalLocation",
      key: "arrivalLocation",
    },
    {
      title: "Distance",
      dataIndex: "distance",
      key: "distance",
    },
    {
      title: "Travel Time",
      dataIndex: "travelTime",
      key: "travelTime",
    },
    {
      title: "Creation Date",
      dataIndex: "creationDate",
      key: "creationDate",
    },
    {
      title: "Departure Time",
      dataIndex: "departureTime",
      key: "departureTime",
    },
    {
      title: "Action",
      key: "action",
      render: (text, trip) => (
        <div>
          <Button
            icon={<EyeOutlined />}
            onClick={() => openReadModal(trip)}
            style={{ marginRight: 8 }}
          ></Button>
          <Button
            icon={<EditOutlined />}
            onClick={() => openEditModal(trip)}
            style={{ marginRight: 8 }}
          ></Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDeleteTrip(trip.id)}
          ></Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 min-h-[620px]">
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Add Trip
      </Button>
      <Table
        columns={columns}
        dataSource={trips}
        rowKey="id"
        className="mt-4"
      />

      {/* Add Trip Modal */}
      <Modal
        title="Create Trip"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleAddTrip}>
          <Form.Item
            name="departureLocation"
            label="Departure Location"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="arrivalLocation"
            label="Arrival Location"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="distance"
            label="Distance (km)"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="travelTime"
            label="Travel Time"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="departureTime"
            label="Departure Time"
            rules={[{ required: true }]}
          >
            <DatePicker showTime />
          </Form.Item>
          <Form.Item
            name="pickupLocationIds"
            label="Pickup Locations"
            rules={[{ required: true }]}
          >
            <Select mode="multiple">
              {pickupLocations.map((location) => (
                <Option key={location.id} value={location.id}>
                  {location.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="dropoffLocationIds"
            label="Dropoff Locations"
            rules={[{ required: true }]}
          >
            <Select mode="multiple">
              {dropoffLocations.map((location) => (
                <Option key={location.id} value={location.id}>
                  {location.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="busIds" label="Buses" rules={[{ required: true }]}>
            <Select mode="multiple">
              {buses.map((bus) => (
                <Option key={bus.id} value={bus.id}>
                  {bus.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create Trip
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Trip Modal */}
      <Modal
        title="Edit Trip"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleEditTrip}>
          <Form.Item
            name="departureLocation"
            label="Departure Location"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="arrivalLocation"
            label="Arrival Location"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="distance"
            label="Distance (km)"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="travelTime"
            label="Travel Time"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="departureTime"
            label="Departure Time"
            rules={[{ required: true }]}
          >
            <DatePicker showTime />
          </Form.Item>
          <Form.Item
            name="pickupLocationIds"
            label="Pickup Locations"
            rules={[{ required: true }]}
          >
            <Select mode="multiple">
              {pickupLocations.map((location) => (
                <Option key={location.id} value={location.id}>
                  {location.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="dropoffLocationIds"
            label="Dropoff Locations"
            rules={[{ required: true }]}
          >
            <Select mode="multiple">
              {dropoffLocations.map((location) => (
                <Option key={location.id} value={location.id}>
                  {location.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="busIds" label="Buses" rules={[{ required: true }]}>
            <Select mode="multiple">
              {buses.map((bus) => (
                <Option key={bus.id} value={bus.id}>
                  {bus.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Trip;
