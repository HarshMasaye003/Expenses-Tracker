import React from "react";
import { motion } from "framer-motion";
import { midVibration } from "../hooks/useVibrate";

const ConfirmButton = ({ onClickFunctions }) => {
  const handleClick = () => {
    onClickFunctions.forEach(({ func, params }) => {
      func(...params);
    });
  };
  return (
    <motion.button
      whileTap={{ scale: 1.1 }}
      onClick={() => {
        handleClick(), midVibration();
      }}
      className={` bg-emerald-500/90 font-semibold text-lg text-white h-10 w-40 rounded-md `}
    >
      Confirm
    </motion.button>
  );
};

export default ConfirmButton;
