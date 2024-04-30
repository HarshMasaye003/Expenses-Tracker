import React, { useState } from "react";
import { motion } from "framer-motion";

const NewAdd_page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="h-[82%] w-screen bg-gray-100 flex flex-col justify-center items-center">
      <button
        onClick={toggleModal}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Open Modal
      </button>

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
                // value={amount}
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
                    // onChange={handleSelectChange}
                    // value={selectedOption}
                  >
                    <option disabled value="">
                      Select a category
                    </option>
                    {/* {categories.map((category, index) => (
                      <option key={index} value={JSON.stringify(category)}>
                        {category.icon} {category.category}
                      </option>
                    ))} */}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex gap-4 justify-around mt-2 pt-4 ">
              <button
                // onClick={addFullExpense}
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

export default NewAdd_page;
