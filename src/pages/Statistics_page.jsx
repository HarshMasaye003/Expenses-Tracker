import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase_config";
import useExpenseFetcher from "../hooks/useExpenseFetcher";
import { motion } from "framer-motion";

import ExpenseBarChart from "../components/ExpensesBarChart";

import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "H",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "I",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "J",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "K",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "L",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "M",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "N",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "O",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "P",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Q",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "R",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "S",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "T",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "U",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];


const Statistics_page = () => {
  const { expenses, totalExpense } = useExpenseFetcher();

  const expensesData = expenses.map((expense) => {

    return {
      name: expense.time_stamp.month,
      xAxis: expense.amount,
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "82%" }}
      exit={{ x: "100%", transition: { duration: 0.2, type: "spring" } }}
      className="h-[82%] p-1"
    >
      <ResponsiveContainer width="100%" height="40%">
        <BarChart
          width={500}
          height={200}
          data={expensesData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {/* wrap longer data keys */}

          <XAxis dataKey="name" className="text-[0.7rem]" />
          <Bar
            dataKey="xAxis"
            fill="#212527"
            barSize={10}
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <YAxis width={20} className="text-[0.7rem]" />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default Statistics_page;
