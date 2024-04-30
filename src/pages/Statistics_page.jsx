import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase_config";
import useExpenseFetcher from "../hooks/useExpenseFetcher";

const Statistics_page = () => {
  const { expenses,totalExpense} = useExpenseFetcher();



  return <div className="h-[82%]">{totalExpense}</div>;
};

export default Statistics_page;
