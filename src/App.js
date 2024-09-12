import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import User from "./pages/User";
import Bus from "./pages/Bus";
import PickupLocation from "./pages/PickupLocation";
import DropoffLocation from "./pages/DropoffLocation";
import Trip from "./pages/Trip";
import Seat from "./pages/Seat";
import Ticket from "./pages/Ticket";
import Login from "./pages/Login";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/bus"
          element={
            <Layout>
              <Bus />
            </Layout>
          }
        />
        <Route
          path="/user"
          element={
            <Layout>
              <User />
            </Layout>
          }
        />
        <Route
          path="/trip"
          element={
            <Layout>
              <Trip />
            </Layout>
          }
        />
        <Route
          path="/seat"
          element={
            <Layout>
              <Seat />
            </Layout>
          }
        />
        <Route
          path="/ticket"
          element={
            <Layout>
              <Ticket />
            </Layout>
          }
        />
        <Route
          path="/pickup-location"
          element={
            <Layout>
              <PickupLocation />
            </Layout>
          }
        />
        <Route
          path="/dropoff-location"
          element={
            <Layout>
              <DropoffLocation />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
