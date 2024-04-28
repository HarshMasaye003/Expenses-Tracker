import React from "react";

import { IoMdSettings } from "react-icons/io";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { MdOutlineQueryStats } from "react-icons/md";
import { Routes, Route, Link } from "react-router-dom";

const Footer = () => {
  const menu = [
    {
      icon: <MdOutlineQueryStats />,
      text: "Statistics",
    },
    {
      icon: <FaIndianRupeeSign />,
      text: "Add expense",
    },
    {
      icon: <IoMdSettings />,
      text: "Settings",
    },
  ];

  return (
    <footer className="h-[10%] bg-red-400 flex justify-evenly items-center ">
      {menu.map((item, index) => {
        return (
          <Link
            to={
              item.text === "Statistics"
                ? "/statistics"
                : item.text === "Add expense"
                ? "/"
                : "/settings"
            }
            key={index}
          >
            <div className="flex flex-col justify-center items-center">
              <div className="text-xl bg-white/80 h-8 w-8 flex justify-center items-center rounded-md">
                {item.icon}
              </div>
              <div className="text-xs">{item.text}</div>
            </div>
          </Link>
        );
      })}
    </footer>
  );
};

export default Footer;
