import React from "react";
import { Route, Routes } from "react-router-dom";
import Activities from "../../pages/activities/Activities";
import Calender from "../../pages/calender/Calender";
import Dashboard from "../../pages/dashboard/Dashboard";

const Approutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/calender" element={<Calender />} />
      <Route path="/activities" element={<Activities />} />
    </Routes>
  );
};

export default Approutes;
