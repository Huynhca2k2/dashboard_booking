import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import imgLogo from "../assets/images/logo-main.jpg";

const SidebarComponent = () => {
  return (
    <aside className="w-64 text-white min-h-screen ">
      <Menu mode="inline" className=" h-full">
        <div className="flex flex-row justify-center py-4">
          <Link to="/" className="w-[148px] h-[48px] block">
            <img
              src={imgLogo}
              alt="pic logo"
              className="w-full h-full object-cover"
            />
          </Link>
        </div>
        <Menu.Item key="1">
          <Link to="/" className="font-medium">
            Dashboard
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/user" className="font-medium">
            User
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/bus" className="font-medium">
            Bus
          </Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="/pickup-location" className="font-medium">
            Pickup Location
          </Link>
        </Menu.Item>
        <Menu.Item key="5">
          <Link to="/dropoff-location" className="font-medium">
            Dropoff Location
          </Link>
        </Menu.Item>
        <Menu.Item key="6">
          <Link to="/trip" className="font-medium">
            Trip
          </Link>
        </Menu.Item>
        <Menu.Item key="7">
          <Link to="/seat" className="font-medium">
            Seat
          </Link>
        </Menu.Item>
        <Menu.Item key="8">
          <Link to="/ticket" className="font-medium">
            Ticket
          </Link>
        </Menu.Item>
      </Menu>
    </aside>
  );
};

export default SidebarComponent;
