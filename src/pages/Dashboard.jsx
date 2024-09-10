import React, { useState } from "react";
import { Card, Col, Divider, Row, Select } from "antd";
import {
  DollarOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const { Option } = Select;

const cardData = [
  {
    icon: <DollarOutlined />,
    title: "Today's Money",
    number: "$2,345",
    percentage: "+55% than last week",
  },
  {
    icon: <UserOutlined />,
    title: "New Users",
    number: "1,234",
    percentage: "+30% than last week",
  },
  {
    icon: <ShoppingCartOutlined />,
    title: "Orders",
    number: "567",
    percentage: "+20% than last week",
  },
  {
    icon: <HomeOutlined />,
    title: "Visits",
    number: "4,567",
    percentage: "+40% than last week",
  },
];

// Sample data for the chart
const weeklyData = [
  { name: "Week 1", revenue: 4000 },
  { name: "Week 2", revenue: 3000 },
  { name: "Week 3", revenue: 5000 },
  { name: "Week 4", revenue: 4500 },
  { name: "Week 5", revenue: 1000 },
  { name: "Week 6", revenue: 3000 },
  { name: "Week 7", revenue: 500 },
  { name: "Week 8", revenue: 9000 },
];

const monthlyData = [
  { name: "Một", revenue: 12000 },
  { name: "Hai", revenue: 15000 },
  { name: "Ba", revenue: 14000 },
  { name: "Tư", revenue: 17000 },
  { name: "Năm", revenue: 2000 },
  { name: "Sáu", revenue: 15000 },
  { name: "Bảy", revenue: 4000 },
  { name: "Tám", revenue: 17000 },
  { name: "Chính", revenue: 12000 },
  { name: "Mười", revenue: 5000 },
  { name: "Mười Một", revenue: 14000 },
  { name: "Mười Hai", revenue: 7000 },
];

const Dashboard = () => {
  const [chartData, setChartData] = useState(weeklyData);

  const handleChange = (value) => {
    if (value === "weekly") {
      setChartData(weeklyData);
    } else {
      setChartData(monthlyData);
    }
  };

  return (
    <div className="p-4 min-h-[620px]">
      <Row gutter={16}>
        {cardData.map((card, index) => (
          <Col span={6} key={index}>
            <Card className="" bordered={false} style={{ borderRadius: 8 }}>
              <div className="flex flex-col justify-between h-[120px]">
                <div className="flex flex-row justify-between items-center">
                  <div className="w-12 h-12 text-lg flex items-center justify-center rounded-full bg-blue-100 mr-4">
                    {card.icon}
                  </div>
                  <div>
                    <div className=" font-semibold">{card.title}</div>
                    <div className="text-2xl font-bold">{card.number}</div>
                  </div>
                </div>
                <Divider />
                <div>
                  <div className="text-sm text-gray-500">{card.percentage}</div>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="p-4 mt-4 bg-white rounded-xl shadow-sm">
        <Select defaultValue="weekly" onChange={handleChange} className="mb-4">
          <Option value="weekly">Weekly</Option>
          <Option value="monthly">Monthly</Option>
        </Select>

        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
