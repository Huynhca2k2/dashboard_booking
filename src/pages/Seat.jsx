import React, { useContext, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Input,
  Form,
  Select,
  Popconfirm,
  message,
} from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import AppContext from "../context/AppContext";
import moment from "moment";
import { createSeatsBatch, updateSeat, deleteSeat } from "../services/seat";

const { Option } = Select;

const Seat = () => {
  const { buses, trips, seats, setSeats } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  // Handle Add Seat
  const handleAddSeat = async (values) => {
    setIsLoading(true);
    const newSeat = {
      ...values,
      creationDate: moment().format("YYYY-MM-DD"),
    };
    try {
      await createSeatsBatch(newSeat);
      setSeats([...seats, newSeat]);
      setIsModalOpen(false);
      form.resetFields();
      console.log(newSeat);
      message.success("Seat added successfully!");
    } catch (error) {
      console.error("Failed to add seat:", error);
      message.error("Failed to add seat");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Edit Seat
  const handleEditSeat = async (values) => {
    setIsLoading(true);
    try {
      const updatedSeat = await updateSeat(selectedSeat.id, values);
      const updatedSeats = seats.map((seat) =>
        seat.id === selectedSeat.id ? updatedSeat : seat
      );
      setSeats(updatedSeats);
      setIsEditModalOpen(false);
      setSelectedSeat(null);
      console.log("Updated Seat:", values);
      message.success("Edit seat successfully!");
    } catch (error) {
      console.error("Failed to update seat:", error);
      message.error("Failed to update seat!");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Delete Seat
  const handleDeleteSeat = async (id) => {
    setIsLoading(true);
    try {
      await deleteSeat(id);
      const filteredSeats = seats.filter((seat) => seat.id !== id);
      setSeats(filteredSeats);
      message.success("Delete seat successfully!");
    } catch (error) {
      message.error("Failed to delete seat");
      console.error("Failed to delete seat:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Open Edit Modal
  const openEditModal = (seat) => {
    setSelectedSeat(seat);
    setIsEditModalOpen(true);
    form.setFieldsValue(seat);
  };

  // Open Read Modal
  const openReadModal = (seat) => {
    Modal.info({
      title: "Seat Information",
      content: (
        <div>
          <p>Seat Code: {seat.seatCode}</p>
          <p>Status: {seat.status}</p>
          <p>Creation Date: {seat.creationDate}</p>
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
      title: "Seat Code",
      dataIndex: "seatCode",
      key: "seatCode",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Creation Date",
      dataIndex: "creationDate",
      key: "creationDate",
    },
    {
      title: "Action",
      key: "action",
      render: (text, seat) => (
        <div>
          <Button
            icon={<EyeOutlined />}
            onClick={() => openReadModal(seat)}
            style={{ marginRight: 8 }}
          ></Button>
          <Button
            icon={<EditOutlined />}
            onClick={() => openEditModal(seat)}
            className="text-yellow-500 border-yellow-500 hover:bg-yellow-600 hover:border-yellow-600"
            style={{ marginRight: 8 }}
          />
          <Popconfirm
            title="Are you sure delete this seat?"
            onConfirm={() => handleDeleteSeat(seat.id)}
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
        Add Multiple Seat
      </Button>
      <Table
        columns={columns}
        dataSource={seats}
        rowKey="id"
        className="mt-4"
      />

      {/* Add Seat Modal */}
      <Modal
        title="Create Seat"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleAddSeat}>
          <Form.Item name="busId" label="Bus" rules={[{ required: true }]}>
            <Select>
              {buses.map((bus) => (
                <Option key={bus.id} value={bus.id}>
                  {bus.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="tripId" label="Trip" rules={[{ required: true }]}>
            <Select>
              {trips.map((trip) => (
                <Option key={trip.id} value={trip.id}>
                  {trip.arrivalLocation + " : " + trip.departureLocation}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="seatCapacity" label="Seat Capacity">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Create Seat
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Seat Modal */}
      <Modal
        title="Edit Seat"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleEditSeat}>
          <Form.Item name="busId" label="Bus" rules={[{ required: true }]}>
            <Select>
              {buses.map((bus) => (
                <Option key={bus.id} value={bus.id}>
                  {bus.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="tripId" label="Trip" rules={[{ required: true }]}>
            <Select>
              {trips.map((trip) => (
                <Option key={trip.id} value={trip.id}>
                  {trip.arrivalLocation + " : " + trip.departureLocation}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="seatCode"
            label="Seat Code"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select>
              <Option value="AVAILABLE">AVAILABLE</Option>
              <Option value="UNAVAILABLE">UNAVAILABLE</Option>
            </Select>
          </Form.Item>
          <Form.Item name="seatCapacity" label="Seat Capacity">
            <Input />
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

export default Seat;
