import { useState } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase/firebase_config";
import { v4 as uuidv4 } from "uuid";
import AddExpenses_page from "./pages/AddExpenses_page";

import { Routes, Route, Link } from "react-router-dom";
import Statistics_page from "./pages/Statistics_page";
import Settings_page from "./pages/Settings_page";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="h-screen">
      <header className="h-[8%] font-semibold bg-red-400 flex justify-center items-center">
        Expenses Tracker
      </header>

      <Routes>
        <Route path="/" element={<AddExpenses_page />} />
        <Route path="/statistics" element={<Statistics_page />} />
        <Route path="/settings" element={<Settings_page />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
