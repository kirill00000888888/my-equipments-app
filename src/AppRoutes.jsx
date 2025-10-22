import React from "react";
import { Routes, Route } from "react-router-dom";
import EquipmentList from "./components/EquipmentList";
import EquipmentDetail from "./components/EquipmentDetail";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<EquipmentList />} />
      <Route path="/equipment/:id" element={<EquipmentDetail />} />
    </Routes>
  );
}
