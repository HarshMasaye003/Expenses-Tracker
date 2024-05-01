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

import useCategories from "../hooks/useCategories";
import { motion } from "framer-motion";
import useExpenseFetcher from "../hooks/useExpenseFetcher";
import { midVibration, smallVibration } from "../hooks/useVibrate";
import genCurrentTime from "../utils/genCurrentTime";
import TagSelectionModal from "./TagSelectionModal";
import Money_Tag_Inputs from "./Money_Tag_Inputs";
import Borrow_Loan_Inputs from "./Borrow_Loan_Input";
import { addFullExpense } from "../utils/addExpenseHandler";
import CloseButton from "./CloseButton";
import ConfirmButton from "./ConfirmButton";

const AddMoneyModal = ({ toggleModal, isModalOpen, getExensesData }) => {
  const [selectedOption, setSelectedOption] = useState([]);
  const [toggleCategoryModal, setToggleCategoryModal] = useState(false);

  const [amount, setAmount] = useState(null);

  const handleSelectChange = (event) => {
    const json_obj = JSON.parse(event.target.value);
    setSelectedOption(json_obj);
    console.log(json_obj);
  };

  const handleAddExpense = useCallback(() => {
    addFullExpense(amount, selectedOption);
    setAmount(0);
    setSelectedOption("");
    toggleModal();
  }, [amount, selectedOption]);

  const [ActiveTab, setActiveTab] = useState(1);

  const activeTab = (index) => {
    setActiveTab(index);
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
          className="fixed inset-0 z-50 flex justify-center items-end"
        >
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "100%" }}
            exit={{ height: 0, transition: { duration: 0.2 } }}
            className="bg-white w-full h-[100dvh] p-4 flex flex-col items-center justify-center transform transition-all"
          >
            <div className="container w-[100dvw]">
              <ul className="tab-list h-[50px] flex text-lg ">
                {[1, 2].map((index) => (
                  <motion.li
                    key={index}
                    className={`w-1/2 flex justify-center items-center text-md font-semibold  ${
                      ActiveTab === index
                        ? "bg-black text-white mx-2 my-1 rounded-md"
                        : ""
                    }`}
                    onClick={() => activeTab(index)}
                  >
                    {index === 1 ? "Expenses" : "Borrowed / Loaned"}
                  </motion.li>
                ))}
              </ul>
              <div className="content-container">
                <div
                  className={`${
                    ActiveTab === 1 ? "flex flex-col h-52 p-2 mt-10 " : "hidden"
                  }`}
                >
                  <div className="flex justify-center items-center h-20">
                    <h1 className=" text-lg font-semibold">Add expense</h1>
                  </div>
                  <Money_Tag_Inputs
                    amount={amount}
                    setAmount={setAmount}
                    setToggleCategoryModal={setToggleCategoryModal}
                    selectedOption={selectedOption}
                  />
                </div>
                <div
                  className={`${
                    ActiveTab === 2 ? "flex flex-col h-52 p-2 mt-10 " : "hidden"
                  }`}
                >
                  <div className="flex justify-center items-center h-20">
                    <h1 className=" text-md font-semibold">
                      Add Borrowed | Loaned money...
                    </h1>
                  </div>
                  <Borrow_Loan_Inputs
                    amount={amount}
                    setAmount={setAmount}
                    setToggleCategoryModal={setToggleCategoryModal}
                    selectedOption={selectedOption}
                  />
                </div>
              </div>
              <div className="flex gap-4 justify-evenly mt-10 pt-4 ">
                <ConfirmButton
                  onClickFunctions={[{ func: handleAddExpense, params: [] }]}
                />
                <CloseButton
                  onClickFunctions={[{ func: toggleModal, params: [] }]}
                />
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
