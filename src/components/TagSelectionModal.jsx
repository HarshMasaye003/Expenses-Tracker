import React from "react";
import { motion } from "framer-motion";
import { midVibration } from "../hooks/useVibrate";
import useCategories from "../hooks/useCategories";
import CloseButton from "./CloseButton";

const TagSelectionModal = ({ handleSelectChange, setToggleCategoryModal }) => {
  const { categories } = useCategories();

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{
        y: "100%",
        opacity: 0,
        transition: { type: "spring", stiffness: 500, damping: 40 },
      }}
      className="fixed inset-0 z-50 flex justify-center items-end "
    >
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: "48%" }}
        exit={{ height: 0, transition: { duration: 0.2 } }}
        className="bg-white w-full h-[50dvh] border-t-[1px] border-gray-200 flex flex-col"
      >
        <h1 className=" w-full p-3 flex justify-center text-xl font-semibold text-gray-500/70"></h1>
        <button className="grid grid-cols-4 h-[50%]  ">
          {categories.map((category, index) => (
            <motion.div
              whileTap={{ scale: 1.2 }}
              key={index}
              className="w-full p-2"
              value={JSON.stringify(category)}
              onClick={() => {
                handleSelectChange({
                  target: { value: JSON.stringify(category) },
                }),
                  setToggleCategoryModal(false),
                  midVibration();
              }}
            >
              <span className="bg-white text-3xl h-10 w-10">
                <h1>{category.icon}</h1>
                <h3 className=" text-[0.5rem]">{category.category}</h3>
              </span>
            </motion.div>
          ))}
        </button>
        <button
          onClick={() => {
            setToggleCategoryModal(false);
          }}
          className="w-44 mr-auto ml-auto bg-red-500/80 rounded-md text-white font-semibold text-lg py-1 px-4 "
        >
          close
        </button>
      </motion.div>
    </motion.div>
  );
};

export default TagSelectionModal;
