import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Select, DatePicker } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";

const { Option } = Select;

const users = [
  { id: "fee0ddb8-f761-4340-8ba0-137ef24dda54", name: "John Doe" },
  { id: "e2d2a863-5bb7-4c8d-94d6-fdb3ea2741c0", name: "Jane Smith" },
];

const trips = [
  { id: 1, departureLocation: "City A", arrivalLocation: "City B" },
  { id: 2, departureLocation: "City C", arrivalLocation: "City D" },
];

const pickupLocations = [
  { id: 1, name: "Location 1" },
  { id: 2, name: "Location 2" },
];

const dropoffLocations = [
  { id: 1, name: "Dropoff Location 1" },
  { id: 2, name: "Dropoff Location 2" },
  { id: 3, name: "Dropoff Location 3" },
];

const seats = [
  { id: 34, seatCode: "A0" },
  { id: 35, seatCode: "A1" },
  { id: 36, seatCode: "A2" },
  // Add more seats as needed
];

const tickets = [
  {
    id: 1,
    price: 50.0,
    creationDate: "2024-09-06",
    discount: 5.0,
    status: true,
    userId: "fee0ddb8-f761-4340-8ba0-137ef24dda54",
    tripId: 1,
    busId: 3,
    pickupLocationId: 2,
    dropoffLocationId: 3,
    seatIds: [34, 35, 36],
  },
];

const Ticket = () => {
  const [ticketData, setTicketData] = useState(tickets);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [form] = Form.useForm();

  // Handle Add Ticket
  const handleAddTicket = (values) => {
    const newTicket = {
      id: uuidv4(),
      ...values,
      creationDate: new Date().toISOString().split("T")[0],
    };
    setTicketData([...ticketData, newTicket]);
    setIsModalOpen(false);
    form.resetFields();
    console.log("New Ticket:", newTicket);
  };

  // Handle Edit Ticket
  const handleEditTicket = (values) => {
    const updatedTickets = ticketData.map((ticket) =>
      ticket.id === selectedTicket.id
        ? { ...selectedTicket, ...values }
        : ticket
    );
    setTicketData(updatedTickets);
    setIsEditModalOpen(false);
    setSelectedTicket(null);
    console.log("Updated Ticket:", values);
  };

  // Handle Delete Ticket
  const handleDeleteTicket = (id) => {
    const filteredTickets = ticketData.filter((ticket) => ticket.id !== id);
    setTicketData(filteredTickets);
  };

  // Open Edit Modal
  const openEditModal = (ticket) => {
    setSelectedTicket(ticket);
    setIsEditModalOpen(true);
    form.setFieldsValue(ticket);
  };

  // Open Read Modal
  const openReadModal = (ticket) => {
    Modal.info({
      title: "Ticket Information",
      content: (
        <div>
          <p>Price: ${ticket.price}</p>
          <p>Discount: ${ticket.discount}</p>
          <p>Status: {ticket.status ? "Active" : "Inactive"}</p>
          <p>User ID: {ticket.userId}</p>
          <p>Trip ID: {ticket.tripId}</p>
          <p>Bus ID: {ticket.busId}</p>
          <p>Pickup Location ID: {ticket.pickupLocationId}</p>
          <p>Dropoff Location ID: {ticket.dropoffLocationId}</p>
          <p>Seat IDs: {ticket.seatIds.join(", ")}</p>
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
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (status ? "Active" : "Inactive"),
    },
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Trip ID",
      dataIndex: "tripId",
      key: "tripId",
    },
    {
      title: "Bus ID",
      dataIndex: "busId",
      key: "busId",
    },
    {
      title: "Pickup Location ID",
      dataIndex: "pickupLocationId",
      key: "pickupLocationId",
    },
    {
      title: "Dropoff Location ID",
      dataIndex: "dropoffLocationId",
      key: "dropoffLocationId",
    },
    {
      title: "Seat IDs",
      dataIndex: "seatIds",
      key: "seatIds",
      render: (seatIds) => seatIds.join(", "),
    },
    {
      title: "Action",
      key: "action",
      render: (text, ticket) => (
        <div>
          <Button
            icon={<EyeOutlined />}
            onClick={() => openReadModal(ticket)}
            style={{ marginRight: 8 }}
          ></Button>
          <Button
            icon={<EditOutlined />}
            onClick={() => openEditModal(ticket)}
            style={{ marginRight: 8 }}
          ></Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDeleteTicket(ticket.id)}
          ></Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 min-h-[620px]">
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Add Ticket
      </Button>
      <Table
        columns={columns}
        dataSource={ticketData}
        rowKey="id"
        className="mt-4"
      />

      {/* Add Ticket Modal */}
      <Modal
        title="Create Ticket"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleAddTicket}>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="discount" label="Discount">
            <Input type="number" />
          </Form.Item>
          <Form.Item name="status" label="Status" valuePropName="checked">
            <Select>
              <Option value={true}>Active</Option>
              <Option value={false}>Inactive</Option>
            </Select>
          </Form.Item>
          <Form.Item name="userId" label="User">
            <Select>
              {users.map((user) => (
                <Option key={user.id} value={user.id}>
                  {user.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="tripId" label="Trip">
            <Select>
              {trips.map((trip) => (
                <Option key={trip.id} value={trip.id}>
                  {trip.departureLocation} - {trip.arrivalLocation}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="busId" label="Bus">
            <Select>
              {/* Replace with actual bus data */}
              <Option value={3}>Bus 3</Option>
            </Select>
          </Form.Item>
          <Form.Item name="pickupLocationId" label="Pickup Location">
            <Select>
              {pickupLocations.map((location) => (
                <Option key={location.id} value={location.id}>
                  {location.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="dropoffLocationId" label="Dropoff Location">
            <Select>
              {dropoffLocations.map((location) => (
                <Option key={location.id} value={location.id}>
                  {location.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="seatIds" label="Seats">
            <Select mode="multiple">
              {seats.map((seat) => (
                <Option key={seat.id} value={seat.id}>
                  {seat.seatCode}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save Ticket
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Ticket Modal */}
      <Modal
        title="Edit Ticket"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleEditTicket}>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="discount" label="Discount">
            <Input type="number" />
          </Form.Item>
          <Form.Item name="status" label="Status" valuePropName="checked">
            <Select>
              <Option value={true}>Active</Option>
              <Option value={false}>Inactive</Option>
            </Select>
          </Form.Item>
          <Form.Item name="userId" label="User">
            <Select>
              {users.map((user) => (
                <Option key={user.id} value={user.id}>
                  {user.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="tripId" label="Trip">
            <Select>
              {trips.map((trip) => (
                <Option key={trip.id} value={trip.id}>
                  {trip.departureLocation} - {trip.arrivalLocation}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="busId" label="Bus">
            <Select>
              {/* Replace with actual bus data */}
              <Option value={3}>Bus 3</Option>
            </Select>
          </Form.Item>
          <Form.Item name="pickupLocationId" label="Pickup Location">
            <Select>
              {pickupLocations.map((location) => (
                <Option key={location.id} value={location.id}>
                  {location.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="dropoffLocationId" label="Dropoff Location">
            <Select>
              {dropoffLocations.map((location) => (
                <Option key={location.id} value={location.id}>
                  {location.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="seatIds" label="Seats">
            <Select mode="multiple">
              {seats.map((seat) => (
                <Option key={seat.id} value={seat.id}>
                  {seat.seatCode}
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

export default Ticket;
