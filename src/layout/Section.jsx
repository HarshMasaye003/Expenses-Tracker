import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import AddExpenses_page from "../pages/AddExpenses_page";
import Statistics_page from "../pages/Statistics_page";
import Settings_page from "../pages/Settings_page";

const Section = () => {
  return (
    <Routes>
      <Route path="/" element={<AddExpenses_page />} />
      <Route path="/stats" element={<Statistics_page />} />
      <Route path="/settings" element={<Settings_page />} />
    </Routes>
  );
};

export default Section;
