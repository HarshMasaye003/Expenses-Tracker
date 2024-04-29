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

const AddMoneyModal = ({
  toggleModal,
  isModalOpen,
  setIsModalOpen,
  getExensesData,
}) => {
  const { categories } = useCategories();
  const [selectedOption, setSelectedOption] = useState("");

  const [amount, setAmount] = useState(0);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
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
          category: selectedOption,
          timeStamp: serverTimestamp(),
        });
        Toast.fire({
          icon: "success",
          title: "Expense Added!",
          text: `${amount} -> ${selectedOption}' has been Added.`,
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

      <div className="bg-white w-full h-1/2 p-4 rounded-lg relative z-30">
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
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="flex justify-around mt-2 pt-4 ">
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
      </div>
    </div>
  );
};

export default AddMoneyModal;
