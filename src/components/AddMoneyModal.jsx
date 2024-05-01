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
import useExpenseFetcher from "../hooks/useExpenseFetcher";
import { midVibration, smallVibration } from "../hooks/useVibrate";
import genCurrentTime from "../utils/genCurrentTime";
import TagSelectionModal from "./TagSelectionModal";

const AddMoneyModal = ({ toggleModal, isModalOpen, getExensesData }) => {
  const [selectedOption, setSelectedOption] = useState([]);
  const [toggleCategoryModal, setToggleCategoryModal] = useState(false);

  const [amount, setAmount] = useState(null);

  const handleSelectChange = (event) => {
    const json_obj = JSON.parse(event.target.value);
    setSelectedOption(json_obj);
    console.log(json_obj);
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
    if (amount === null) {
      Toast.fire({
        icon: "error",
        title: "Oops...",
        text: "Amount cannot be empty!",
        showConfirmButton: false,
        timer: 900,
      });
    } else if (selectedOption === "") {
      Toast.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select a category!",
        showConfirmButton: false,
        timer: 900,
      });
    } else {
      try {
        const res = await setDoc(doc(db, "expenses", uuidv4()), {
          amount: amount,
          icon: selectedOption.icon,
          category: selectedOption.category,
          time_stamp: genCurrentTime(),
        });
        Toast.fire({
          icon: "success",
          title: "Expense Added!",
          text: `${amount} ➜ ${selectedOption.icon}  ${selectedOption.category}`,
          showConfirmButton: false,
          timer: 1500,
        });
        setAmount(0);
        setSelectedOption("");
        toggleModal();

        console.log(res);
      } catch (error) {
        console.error("Error adding expense:", error);
      }
    }
  };

  return (
    <div>
      {isModalOpen && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{
            y: "100%",
            opacity: 0,
            transition: { type: "spring", stiffness: 500, damping: 40 },
          }}
          className="fixed inset-0 z-50 flex justify-center items-end sm:items-center sm:px-0"
        >
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "100%" }}
            exit={{ height: 0, transition: { duration: 0.2 } }}
            className="bg-white w-full h-[100dvh] p-4 flex flex-col items-center justify-center transform transition-all"
          >
            <div className=" mb-16">
              <div className="flex justify-center items-center h-20">
                <h1 className=" text-lg font-semibold">Add expense</h1>
              </div>
              <div className="flex flex-col w-full gap-6 pb-4 items-center">
                <input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  type="number"
                  placeholder="₹0"
                  className="border-b-[1px] w-44 text-center text-3xl border-gray-300 p-2"
                />

                <input
                  type="text"
                  value={
                    selectedOption != ""
                      ? `${selectedOption.icon} ${selectedOption.category}`
                      : "Tags"
                  }
                  placeholder="Select a category"
                  onClick={() => {
                    setToggleCategoryModal(!toggleCategoryModal),
                      midVibration();
                  }}
                  readOnly
                  className=" border-b-[1px] border-gray-300 w-48 py-1 px-4 text-center text-xl font-semibold text-gray-500/70 "
                />
                <div className="flex gap-4 justify-around mt-1 pt-4 ">
                  <motion.button
                    whileTap={{ scale: 1.1 }}
                    onClick={() => {
                      addFullExpense(), midVibration();
                    }}
                    className=" bg-emerald-500/90 font-semibold text-lg text-white h-10 w-40 rounded-md"
                  >
                    Confirm
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 1.1 }}
                    onClick={() => {
                      toggleModal(), midVibration();
                    }}
                    className="bg-red-500/90 font-semibold text-lg text-white h-10 w-40 rounded-md"
                  >
                    Close
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {toggleCategoryModal && (
        <TagSelectionModal
          handleSelectChange={handleSelectChange}
          setToggleCategoryModal={setToggleCategoryModal}
        />
      )}
    </div>
  );
};

export default AddMoneyModal;
