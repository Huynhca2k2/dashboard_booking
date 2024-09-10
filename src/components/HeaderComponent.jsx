import React from "react";
import { Layout, Input, Badge, Avatar, Dropdown, Menu, Breadcrumb } from "antd";
import { SearchOutlined, BellOutlined, UserOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";

const { Header } = Layout;

const HeaderComponent = () => {
  const location = useLocation();
  const currentPath = location.pathname.split("/").filter((x) => x);

  const items = [
    {
      key: "1",
      label: <div>View profile</div>,
    },
    {
      key: "2",
      label: <div>Setting</div>,
    },
    {
      key: "3",
      label: <div>Log out</div>,
    },
  ];

  return (
    <Header className="bg-white shadow-md">
      <div className="flex justify-between items-center h-full">
        {/* Breadcrumb */}
        <Breadcrumb className="flex-1">
          {currentPath.length ? (
            currentPath.map((path, index) => (
              <Breadcrumb.Item key={index} className="font-semibold text-lg">
                {path.charAt(0).toUpperCase() + path.slice(1)}
              </Breadcrumb.Item>
            ))
          ) : (
            <Breadcrumb.Item className="font-semibold text-lg">
              Home
            </Breadcrumb.Item>
          )}
        </Breadcrumb>

        <div className="flex items-center gap-8 flex-row">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search..."
            className="w-64"
          />

          <Badge count={5} offset={[10, 0]}>
            <BellOutlined className="text-xl cursor-pointer" />
          </Badge>

          <Dropdown menu={{ items }} trigger={["click"]}>
            <Avatar icon={<UserOutlined />} className="cursor-pointer" />
          </Dropdown>
        </div>
      </div>
    </Header>
  );
};

export default HeaderComponent;
