import {
  collection,
  doc,
  setDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import Swal from "sweetalert2";
import React, { useCallback, useEffect, useState } from "react";
import { db } from "../firebase/firebase_config";
import { v4 as uuidv4 } from "uuid";
import useCategories from "../hooks/useCategories";
import { motion } from "framer-motion";

import { FaArrowRightLong } from "react-icons/fa6";

const AddMoneyModal = ({ toggleModal, isModalOpen, getExensesData }) => {
  const { categories } = useCategories();

  const [selectedOption, setSelectedOption] = useState('');


  const [amount, setAmount] = useState(0);

  const handleSelectChange = (event) => {
    const json_obj = JSON.parse(event.target.value);
    setSelectedOption(json_obj);
  };

  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 1200,
    // timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const addFullExpense = async () => {
    if (!amount || !selectedOption) {
      Toast.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all fields!",
        showConfirmButton: false,
        timer: 900,
      });
    } else {
      try {
        const res = await setDoc(doc(db, "expenses", uuidv4()), {
          amount: amount,
          icon: selectedOption.icon,
          category: selectedOption.category,
          timeStamp: serverTimestamp(),
        });
        Toast.fire({
          icon: "success",
          title: "Expense Added!",
          text: `${amount} ➜ ${selectedOption.icon}' has been Added.`,
          showConfirmButton: false,
          timer: 1500,
        });
        setAmount(0);
        setSelectedOption("");
        getExensesData();
        console.log(res);
      } catch (error) {
        console.error("Error adding expense:", error);
      }
    }
  };

  return (
    <div
      className={`fixed bottom-0 left-0 w-full h-full flex justify-center items-end z-20 ${
        isModalOpen
          ? "opacity-100"
          : "opacity-0 pointer-events-none transition-opacity duration-500/90 delay-1000"
      }`}
    >
      {/* Background overlay with blur effect */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300`}
      ></div>

      {isModalOpen && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="fixed inset-0 z-50 flex justify-center items-end sm:items-center sm:px-0"
        >
          <motion.div
            initial={{ opacity: 0, y: "50%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "50%" }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
            className="bg-white w-full h-1/2 p-4 flex flex-col items-center rounded-lg overflow-hidden shadow-xl transform transition-all"
          >
            <div className="flex justify-center items-center h-20">
              <h1 className=" text-lg font-semibold">Add expense</h1>
            </div>
            <div className="flex flex-col gap-4 pb-4">
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="text"
                placeholder="Enter amount..."
                className="border border-gray-300 p-2 rounded-lg"
              />
              <div className="flex h-full justify-between py-1">
                {/* Select category */}
                <div className="w-full ">
                  <select
                  
                    className="w-[370px] border border-gray-300 py-2 rounded-lg"
                    onChange={handleSelectChange}
                    value={selectedOption}
                  
                  >
                    <option disabled value="">
                      Select a category
                    </option>
                    {categories.map((category, index) => (
                      <option key={index} value={JSON.stringify(category)}>
                        {category.icon} {category.category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex gap-4 justify-around mt-2 pt-4 ">
              <button
                onClick={addFullExpense}
                className=" bg-emerald-500/90 font-semibold text-lg text-white h-10 w-40 rounded-md"
              >
                Confirm
              </button>
              <button
                onClick={toggleModal}
                className="bg-red-500/90 font-semibold text-lg text-white h-10 w-40 rounded-md"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default AddMoneyModal;
