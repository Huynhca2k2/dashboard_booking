import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HeaderComponent from "./components/HeaderComponent";
import SidebarComponent from "./components/SidebarComponent";
import FooterComponent from "./components/FooterComponent";
import Dashboard from "./pages/Dashboard";
import User from "./pages/User";
import Bus from "./pages/Bus";
import PickupLocation from "./pages/PickupLocation";
import DropoffLocation from "./pages/DropoffLocation";
import Trip from "./pages/Trip";
import Seat from "./pages/Seat";
import Ticket from "./pages/Ticket";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <div className="flex flex-1">
          <SidebarComponent />
          <main className="flex-1 bg-[#f2f2f2]">
            <HeaderComponent />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/bus" element={<Bus />} />
              <Route path="/user" element={<User />} />
              <Route path="/trip" element={<Trip />} />
              <Route path="/seat" element={<Seat />} />
              <Route path="/ticket" element={<Ticket />} />
              <Route path="/pickup-location" element={<PickupLocation />} />
              <Route path="/dropoff-location" element={<DropoffLocation />} />
            </Routes>
            <FooterComponent />
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
