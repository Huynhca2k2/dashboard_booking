import React, { useContext, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Input,
  Form,
  Popconfirm,
  InputNumber,
  Upload,
  message,
} from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import AppContext from "../context/AppContext";
import { createBus, deleteBus, updateBus } from "../services/bus";

// const initialData = [
//   {
//     id: "1",
//     name: "Luxury Bus",
//     image:
//       "https://static.vexere.com/production/images/1645602467050.jpeg?w=250&h=250",
//     descBus: "A comfortable luxury bus.",
//     type: "Luxury",
//     priceReal: 500.0,
//     licensePlate: "XYZ-1234",
//     seatCapacity: 50,
//     phoneNumber: "+123456789",
//     rating: 4.5,
//   },
//   {
//     id: "2",
//     name: "Standard Bus",
//     image:
//       "https://static.vexere.com/production/images/1645602467050.jpeg?w=250&h=250",
//     descBus: "A reliable standard bus.",
//     type: "Standard",
//     priceReal: 300.0,
//     licensePlate: "XYZ-5678",
//     seatCapacity: 40,
//     phoneNumber: "+987654321",
//     rating: 4.0,
//   },
// ];
const imageDefault =
  "https://static.vexere.com/production/images/1716953194738.jpeg?w=250&h=250";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const Bus = () => {
  const { buses, setBuses } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBus, setSelectedBus] = useState(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const handleAddBus = async (values) => {
    setIsLoading(true);
    try {
      const newBus = await createBus(values);
      setBuses([...buses, newBus]);
      setIsModalOpen(false);
      form.resetFields();
      console.log("New Bus:", newBus);
      message.success("Bus added successfully!");
    } catch (error) {
      console.error("Failed to add bus:", error);
      message.error("Failed to add bus!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditBus = async (values) => {
    setIsLoading(true);
    try {
      const updatedBus = await updateBus(selectedBus.id, values);
      const updatedBuses = buses.map((bus) =>
        bus.id === selectedBus.id ? updatedBus : bus
      );
      setBuses(updatedBuses);
      setIsEditModalOpen(false);
      setSelectedBus(null);
      message.success("Bus updated successfully!");
      console.log("Updated Bus:", updatedBus);
    } catch (error) {
      console.error("Failed to update bus:", error);
      message.error("Failed to update bus!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBus = async (id) => {
    setIsLoading(true);
    try {
      await deleteBus(id);
      const filteredBuses = buses.filter((bus) => bus.id !== id);
      setBuses(filteredBuses);
      message.success("Bus deleted successfully!");
    } catch (error) {
      console.error("Failed to delete bus:", error);
      message.error("Failed to delete bus!");
    } finally {
      setIsLoading(false);
    }
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
          <p>Name: {bus?.name}</p>
          <p>
            Image:{" "}
            <img
              src={bus?.image || imageDefault}
              alt={bus?.name}
              style={{ width: "100px" }}
            />
          </p>
          <p>Description: {bus.descBus}</p>
          <p>Type: {bus.type}</p>
          <p>Price: {new Intl.NumberFormat("en-US").format(bus.priceReal)} đ</p>
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
        <img
          src={bus?.image || imageDefault}
          alt={bus?.name}
          style={{ width: "50px" }}
        />
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
      render: (text) => `${new Intl.NumberFormat("en-US").format(text)}đ`,
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
            className="text-yellow-500 border-yellow-500 hover:bg-yellow-600 hover:border-yellow-600"
            style={{ marginRight: 8 }}
          />
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
          <Form.Item name="image" rules={[{ required: false }]}>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="avatar"
                  style={{
                    width: "100%",
                  }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
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
