import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import AddExpenses_page from "../pages/AddExpenses_page";
import Statistics_page from "../pages/Statistics_page";
import Settings_page from "../pages/Settings_page";
import NewAdd_page from "../pages/NewAdd_page";
import { AnimatePresence } from "framer-motion";
import CustomSelect from "../uitls/CustomSelect";

const Section = () => {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AddExpenses_page />} />
        {/* <Route path="/stats" element={<CustomSelect />} /> */}
        <Route path="/stats" element={<Statistics_page />} />
        <Route path="/settings" element={<Settings_page />} />
      </Routes>
    </AnimatePresence>
  );
};

export default Section;
