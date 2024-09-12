import React, { useContext, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  message,
} from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import AppContext from "../context/AppContext";
import { createTicket, deleteTicket, updateTicket } from "../services/ticket";
import moment from "moment";

const { Option } = Select;

const Ticket = () => {
  const {
    users,
    trips,
    pickupLocations,
    dropoffLocations,
    seats,
    tickets,
    setTickets,
  } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [seatsOfTicket, setSeatsOfTicket] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  console.log(tickets);
  const handleAddTicket = async (values) => {
    setIsLoading(true);
    try {
      const newTicket = {
        ...values,
        creationDate: moment().format("YYYY-MM-DD"),
      };

      const addedTicket = await createTicket(newTicket);
      setTickets([...tickets, addedTicket]);
      setIsModalOpen(false);
      form.resetFields();
      message.success("Ticket added successfully!");
      console.log("New Ticket:", addedTicket);
    } catch (error) {
      console.error("Failed to add ticket:", error);
      message.error("Failed to add ticket!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditTicket = async (values) => {
    setIsLoading(true);
    try {
      const updatedTicket = { ...selectedTicket, ...values };

      const result = await updateTicket(selectedTicket.id, updatedTicket);
      const updatedTickets = tickets.map((ticket) =>
        ticket.id === selectedTicket.id ? result : ticket
      );

      setTickets(updatedTickets);
      setIsEditModalOpen(false);
      setSelectedTicket(null);
      message.success("Ticket updated successfully!");
      console.log("Updated Ticket:", result);
    } catch (error) {
      console.error("Failed to update ticket:", error);
      message.error("Failed to update ticket!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTicket = async (id) => {
    setIsLoading(true);
    try {
      await deleteTicket(id);
      const filteredTickets = tickets.filter((ticket) => ticket.id !== id);
      setTickets(filteredTickets);
      message.success("Ticket deleted successfully!");
    } catch (error) {
      console.error("Failed to delete ticket:", error);
      message.error("Failed to delete ticket!");
    } finally {
      setIsLoading(false);
    }
  };

  // Open Edit Modal
  const openEditModal = (ticket) => {
    setSelectedTicket(ticket);
    form.setFieldsValue({
      price: ticket.price,
      discount: ticket.discount,
      status: ticket.status,
      userId: ticket.user?.id,
      tripId: ticket.trip?.id,
      busId: ticket.busSelectedId,
      pickupLocationId: ticket.pickupLocation?.id,
      dropoffLocationId: ticket.dropoffLocation?.id,
      seatIds: ticket.seats?.map((seat) => seat.id),
    });
    // console.log("ticket item ", ticket.trip.buses[ticket.busSelectedId]);

    setSeatsOfTicket(ticket.trip.buses.seats || ticket.seats);

    setIsEditModalOpen(true);
    form.setFieldsValue(ticket);
  };

  // Open Read Modal
  const openReadModal = (ticket) => {
    Modal.info({
      title: "Ticket Information",
      content: (
        <div>
          <p>Price: {new Intl.NumberFormat("en-US").format(ticket?.price)} đ</p>
          <p>Discount: ${ticket?.discount}</p>
          <p>Status: {ticket?.status ? "Active" : "Inactive"}</p>
          <p>User ID: {ticket?.user.id}</p>
          <p>Trip ID: {ticket?.trip.id}</p>
          <p>Bus ID: {ticket?.busSelectedId}</p>
          <p>Pickup Location: {ticket?.pickupLocation.name}</p>
          <p>Dropoff Location: {ticket?.dropoffLocation.name}</p>
          <p>
            Seats:{" "}
            {ticket?.seats?.map((seat) => seat.seatCode).join(", ") ||
              "No seat"}
          </p>
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
      render: (text) => `${new Intl.NumberFormat("en-US").format(text)}đ`,
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
      key: "userId",
      render: (ticket) => ticket?.user?.id || "No user",
    },
    {
      title: "Trip ID",
      key: "tripId",
      render: (ticket) => ticket?.trip?.id || "No trip",
    },
    {
      title: "Bus ID",
      dataIndex: "busSelectedId",
      key: "busSelectedId",
    },
    {
      title: "Pickup Location",
      key: "pickupLocation",
      render: (ticket) => ticket?.pickupLocation?.name || "No pickup location",
    },
    {
      title: "Dropoff Location",
      key: "dropoffLocation",
      render: (ticket) =>
        ticket?.dropoffLocation?.name || "No dropoff location",
    },
    {
      title: "Seat Codes",
      dataIndex: "seats",
      key: "seatCodes",
      render: (seats) =>
        seats?.map((seat) => seat.seatCode).join(", ") || "No seat",
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
            className="text-yellow-500 border-yellow-500 hover:bg-yellow-600 hover:border-yellow-600"
            style={{ marginRight: 8 }}
          />
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
        dataSource={tickets}
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
            <Button type="primary" htmlType="submit" loading={isLoading}>
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
              {seatsOfTicket.map((seat) => (
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
