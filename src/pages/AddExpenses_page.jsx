import React, { useEffect, useState } from "react";
import AddMoneyModal from "../components/AddMoneyModal";

import { IoMdAddCircleOutline } from "react-icons/io";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase_config";

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
      // console.log(expensesData);
      setExpenseData(expensesData);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    // getExensesData();
  }, []);

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
        <div>
          <table className="table-auto border-separate border-spacing-0 border border-slate-500/90" bgcolor="">
            <thead>
              <tr>
                <th className="border border-slate-600 p-1">Amount</th>
                <th className="border border-slate-600">Category</th>
              </tr>
            </thead>
            <tbody>
              {expenseData.map((expense) => (
                <tr key={expense.timeStamp}>
                  <td>{`Rs ${expense.amount} `}</td>
                  <td>{expense.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
