import React from "react";
import { motion } from "framer-motion";
import { midVibration } from "../hooks/useVibrate";

const CloseButton = ({ onClickFunctions, customCss }) => {
  const handleClick = () => {
    onClickFunctions.forEach(({ func, params }) => {
      func(...params);
    });
  };
  return (
    <motion.button
      whileTap={{ scale: 1.1 }}
      onClick={() => (handleClick(), midVibration())}
      className={`bg-red-500/90 font-semibold text-lg text-white h-10 w-40 rounded-md `}
    >
      Close
    </motion.button>
  );
};

export default CloseButton;
