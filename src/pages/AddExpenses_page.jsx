import React, { useEffect, useState } from "react";
import AddMoneyModal from "../components/AddMoneyModal";

import { IoMdAddCircleOutline } from "react-icons/io";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase_config";
import useExpenseFetcher from "../hooks/useExpenseFetcher";
import { motion } from "framer-motion";

import { smallVibration } from "../hooks/useVibrate";

const AddExpenses_page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to track modal open/close

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const { expenses, totalExpense } = useExpenseFetcher();

  const convertTimestamp = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toDateString();
  };


  function increaseNumberAnimation(elementId, endNumber, speed = 1) {
    const element = document.getElementById(elementId)
    
    if(!element) return
    
    /* A dataset variable that is added to the animated element*/
    const animationRunning = JSON.parse(element.dataset.animationRunning ?? false)
    
    if(animationRunning) return
    
    element.dataset.animationRunning = true
    
    incNbrRec(0, endNumber, element, speed)
  }
  
  function incNbrRec(currentNumber, endNumber, element, speed) {
    if (currentNumber <= endNumber) {
      element.innerHTML = currentNumber
      setTimeout(function() {
        incNbrRec(currentNumber + 1, endNumber, element, speed)
      }, speed)
    } else {
      element.dataset.animationRunning = false
    }
  }


  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "82%" }}
      exit={{ x: "100%", transition: { duration: 0.2, type: "spring" } }}
      className="h-[82%] w-full sm:w-[40%] md:ww-[40%]"
    >
      <section className=" flex h-full justify-center items-center">
        {isModalOpen && (
          <AddMoneyModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            toggleModal={toggleModal}
          />
        )}

        <div className="w-full h-full overflow-scroll">
          <div className="w-full h-[40%] overflow-hidden flex flex-col gap-1 justify-center items-center ">
            <h1 className=" font-normal text-xs ml-3">Today's Expenses</h1>
            <h3 className=" font-light text-4xl text-red-500/80 " id="" >{totalExpense}</h3>
          </div>
          <div>
            <div className="flex border-b-[1px] border-gray-300 justify-between items-center px-3 text-gray-500">
              <div className=" py-1 text-sm">
                <h1>Today</h1>
              </div>
              <div className=" text-sm" >
                <h1>{totalExpense}</h1>
              </div>
            </div>
            {expenses.length != 0 ? (
              expenses.map((expense) => (
                <div
                  key={expense.time_stamp.time}
                  className="bg-white px-3 py-2 flex justify-between items-center w-full border-b-[1px] border-gray-300 "
                >
                  <div className="flex items-center gap-4">
                    <div className=" py-1 text-2xl">
                      <span>{expense.icon}</span>
                    </div>
                    <div>
                      <h1 className=" text-md font-semibold">
                        {expense.category}
                      </h1>
                      <h3 className=" text-[0.6rem]">
                        {`${expense.time_stamp.dayStr} | ${expense.time_stamp.day} - ${expense.time_stamp.month} - ${expense.time_stamp.year}`}
                      </h3>
                    </div>
                  </div>

                  <div>
                    <h1 className="text-md text-red-500/85 ">{`- ₹ ${expense.amount}`}</h1>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center mt-10 items-center h-40">
                No expenses this month 🫣
              </div>
            )}
          </div>
        </div>

        <motion.button
          className="h-10 w-10 z-10 fixed bottom-24 right-5 flex justify-center items-center bg-black/90 rounded-md"
          onClick={() => {
            toggleModal(), smallVibration();
          }}
          whileTap={{ scale: 1.2 }}
        >
          <IoMdAddCircleOutline className="text-white text-3xl sm:text-3xl md:text-5xl lg:text-5xl " />
        </motion.button>
      </section>
    </motion.div>
  );
};

export default AddExpenses_page;
