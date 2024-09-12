import React, { useContext, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Input,
  Form,
  Select,
  DatePicker,
  message,
  Popconfirm,
} from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import AppContext from "../context/AppContext";
import moment from "moment";
import {
  createTrip,
  deleteTrip,
  provinces,
  updateTrip,
} from "../services/trip";

const { Option } = Select;

const Trip = () => {
  const { trips, setTrips, buses, dropoffLocations, pickupLocations } =
    useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [form] = Form.useForm();

  const handleAddTrip = async (values) => {
    setIsLoading(true);
    try {
      const newTrip = {
        ...values,
        creationDate: moment().format("YYYY-MM-DD"),
        departureTime: values.departureTime.format("YYYY-MM-DDTHH:mm:ss"),
      };
      const createdTrip = await createTrip(newTrip);
      setTrips([...trips, createdTrip]);
      setIsModalOpen(false);
      form.resetFields();
      console.log("New Trip:", createdTrip);
      message.success("Trip added successfully!");
    } catch (error) {
      console.error("Failed to add trip:", error);
      message.error("Failed to add trip!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditTrip = async (values) => {
    setIsLoading(true);
    try {
      const updatedTrip = await updateTrip(selectedTrip.id, {
        ...selectedTrip,
        ...values,
        departureTime: values.departureTime.format("YYYY-MM-DDTHH:mm:ss"),
      });
      const updatedTrips = trips.map((trip) =>
        trip.id === selectedTrip.id ? updatedTrip : trip
      );
      setTrips(updatedTrips);
      setIsEditModalOpen(false);
      setSelectedTrip(null);
      console.log("Updated Trip:", updatedTrip);
      message.success("Trip updated successfully!");
    } catch (error) {
      console.error("Failed to update trip:", error);
      message.error("Failed to update trip!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTrip = async (id) => {
    setIsLoading(true);
    try {
      await deleteTrip(id);
      const filteredTrips = trips.filter((trip) => trip.id !== id);
      setTrips(filteredTrips);
      message.success("Trip deleted successfully!");
    } catch (error) {
      console.error("Failed to delete trip:", error);
      message.error("Failed to delete trip!");
    } finally {
      setIsLoading(false);
    }
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
            className="text-yellow-500 border-yellow-500 hover:bg-yellow-600 hover:border-yellow-600"
            style={{ marginRight: 8 }}
          />
          {/* <Popconfirm
            title="Are you sure delete this bus?"
            onConfirm={() => handleDeleteTrip(trip.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger></Button>
          </Popconfirm> */}
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
            <Select placeholder="Select Departure Location">
              {provinces.map((province) => (
                <Option key={province.slug} value={province.slug}>
                  {province.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="arrivalLocation"
            label="Arrival Location"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select Arrival Location">
              {provinces.map((province) => (
                <Option key={province.slug} value={province.slug}>
                  {province.name}
                </Option>
              ))}
            </Select>
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
            <Button type="primary" htmlType="submit" loading={isLoading}>
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
