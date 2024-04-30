import React, { useEffect, useState } from "react";
import AddMoneyModal from "../components/AddMoneyModal";

import { IoMdAddCircleOutline } from "react-icons/io";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase_config";

const MoneyCard = ({ amount, icon, category, timeStamp }) => {
  return <></>;
};

const AddExpenses_page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to track modal open/close

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const [expenseData, setExpenseData] = useState([]);

  const getExensesData = async () => {
    try {
      const res = await getDocs(collection(db, "expenses"));
      const expensesData = [];
      res.forEach((doc) => {
        expensesData.push(doc.data());
      });
      setExpenseData(expensesData);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    getExensesData();
  }, []);


  
  const convertTimestamp = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toDateString();
  };



  return (
    <div className="h-[82%] w-full sm:w-[40%] md:ww-[40%]">
      <section className=" flex justify-center items-center">
        {isModalOpen && (
          <AddMoneyModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            toggleModal={toggleModal}
            getExensesData={getExensesData}
          />
        )}
        <div className="w-full">
          {expenseData.map((expense) => (
            <div
              key={expense.timeStamp}
              className="bg-white px-3 py-2 flex justify-between items-center w-full border-b-[1px] border-gray-300 "
            >
              <div className="flex items-center gap-4">
                <div className=" py-1 text-3xl">
                  <span>{expense.icon}</span>
                </div>
                <div>
                  <h1 className=" text-lg font-semibold">{expense.category}</h1>
                  <h3 className=" text-sm" >{convertTimestamp(expense.timeStamp)}</h3>
                </div>
              </div>

              <div>
                <h1 className="text-lg font-semibold">{`-$${expense.amount}`}</h1>
              </div>
            </div>
          ))}
        </div>

        <button
          className="h-10 sm:h-10 md:h-14 lg:h-20 w-10 sm:w-10 md:w-14 lg:w-20 z-10 absolute flex justify-center items-center bottom-[6.5rem] sm:bottom-30 md:bottom-30 lg:bottom-40 right-[0.8rem] bg-blue-400 rounded-md"
          onClick={toggleModal}
        >
          <IoMdAddCircleOutline className="text-white text-3xl sm:text-3xl md:text-5xl lg:text-5xl " />
        </button>
      </section>
    </div>
  );
};

export default AddExpenses_page;
