import React, { useState } from "react";
import { Table, Button, Modal, Input, Form, Select } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid"; // Để tạo ID cho Seat mới

const { Option } = Select;

const buses = [
  { id: 1, name: "Luxury Bus", seatCapacity: 12 },
  { id: 2, name: "Standard Bus", seatCapacity: 20 },
];

const trips = [
  { id: "1", departureLocation: "an-giang", arrivalLocation: "bac-giang" },
  { id: "2", departureLocation: "ca-mau", arrivalLocation: "ho-chi-min" },
];

const seats = [
  { id: 34, seatCode: "A0", status: "AVAILABLE", creationDate: "2024-09-07" },
  { id: 35, seatCode: "A1", status: "AVAILABLE", creationDate: "2024-09-07" },
  { id: 36, seatCode: "A2", status: "AVAILABLE", creationDate: "2024-09-07" },
  { id: 37, seatCode: "A3", status: "AVAILABLE", creationDate: "2024-09-07" },
  { id: 38, seatCode: "A4", status: "AVAILABLE", creationDate: "2024-09-07" },
  { id: 39, seatCode: "A5", status: "AVAILABLE", creationDate: "2024-09-07" },
  { id: 40, seatCode: "A6", status: "AVAILABLE", creationDate: "2024-09-07" },
  { id: 41, seatCode: "A7", status: "AVAILABLE", creationDate: "2024-09-07" },
  { id: 42, seatCode: "A8", status: "AVAILABLE", creationDate: "2024-09-07" },
  { id: 43, seatCode: "A9", status: "AVAILABLE", creationDate: "2024-09-07" },
  { id: 44, seatCode: "A10", status: "AVAILABLE", creationDate: "2024-09-07" },
];

const Seat = () => {
  const [seatData, setSeatData] = useState(seats);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [form] = Form.useForm();

  // Handle Add Seat
  const handleAddSeat = (values) => {
    const newSeat = {
      id: uuidv4(),
      ...values,
      creationDate: new Date().toISOString().split("T")[0], // Tự động lấy ngày tạo
    };
    setSeatData([...seatData, newSeat]);
    setIsModalOpen(false);
    form.resetFields();
    console.log(newSeat); // Log dữ liệu seat mới tạo
  };

  // Handle Edit Seat
  const handleEditSeat = (values) => {
    const updatedSeats = seatData.map((seat) =>
      seat.id === selectedSeat.id ? { ...selectedSeat, ...values } : seat
    );
    setSeatData(updatedSeats);
    setIsEditModalOpen(false);
    setSelectedSeat(null);
    console.log("Updated Seat:", values);
  };

  // Handle Delete Seat
  const handleDeleteSeat = (id) => {
    const filteredSeats = seatData.filter((seat) => seat.id !== id);
    setSeatData(filteredSeats);
  };

  // Open Edit Modal
  const openEditModal = (seat) => {
    setSelectedSeat(seat);
    setIsEditModalOpen(true);
    form.setFieldsValue(seat); // Set giá trị mặc định cho form
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
            style={{ marginRight: 8 }}
          ></Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDeleteSeat(seat.id)}
          ></Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 min-h-[620px]">
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Add Seat
      </Button>
      <Table
        columns={columns}
        dataSource={seatData}
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
            <Input />{" "}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
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
          <Form.Item name="seatCapacity" label="Seat Capacity">
            <Input value={selectedSeat?.seatCapacity} />{" "}
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
