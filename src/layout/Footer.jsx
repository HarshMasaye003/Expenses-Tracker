import React from "react";

import { IoMdSettings } from "react-icons/io";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { MdOutlineQueryStats } from "react-icons/md";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";
import { smallVibration } from "../hooks/useVibrate";

const Footer = () => {
  const menu = [
    {
      icon: <MdOutlineQueryStats />,
      text: "Stats",
      path: "/stats",
      custom_css: "text-black/85 w-10 ",
      rotate: 0,
    },
    {
      icon: <FaIndianRupeeSign />,
      text: "",
      path: "/",
      custom_css: "bg-black/85 text-white p-3",
      rotate: 0,
    },
    {
      icon: <IoMdSettings />,
      text: "Settings",
      path: "/settings",
      custom_css: "text-black/85",
      rotate: 360,
    },
  ];

  return (
    <footer className=" absolute bg-white text-gray-600 bottom-0 border-t-[1px] border-gray-300 h-[10%] w-full flex justify-around items-center ">
      {menu.map((item, index) => {
        return (
          <Link to={item.path} key={index}>
            <motion.div
              whileTap={{ scale: 1.2 }}
              onClick={smallVibration}
              className="flex flex-col justify-center items-center"
            >
              <motion.div
                className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl ${item.custom_css} flex justify-center items-center rounded-full`}
              >
                {item.icon}
              </motion.div>
              <div className="text-xs sm:text-xs md:text-md lg:text-lg mt-1 font-bold ">
                {item.text}
              </div>
            </motion.div>
          </Link>
        );
      })}
    </footer>
  );
};

export default Footer;
