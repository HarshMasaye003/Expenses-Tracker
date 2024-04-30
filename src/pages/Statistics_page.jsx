import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase_config";
import useExpenseFetcher from "../hooks/useExpenseFetcher";
import { motion } from "framer-motion";
const Statistics_page = () => {
  const { expenses, totalExpense } = useExpenseFetcher();



  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "82%" }}
      exit={{ x: "100%", transition: { duration: 0.2, type: "spring" } }}
      className="h-[82%] p-4"
    >
      {totalExpense}
    </motion.div>
  );
};

export default Statistics_page;
