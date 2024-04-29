import React from "react";

import { IoMdSettings } from "react-icons/io";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { MdOutlineQueryStats } from "react-icons/md";
import { Link } from "react-router-dom";

const Footer = () => {
  const menu = [
    {
      icon: <MdOutlineQueryStats />,
      text: "Stats",
      path: "/stats",
      custom_css: "text-black w-10 ",
    },
    {
      icon: <FaIndianRupeeSign />,
      text: "",
      path: "/",
      custom_css: "bg-blue-400 text-white p-3",
    },
    {
      icon: <IoMdSettings />,
      text: "Settings",
      path: "/settings",
      custom_css: "text-black",
    },
  ];

  return (
    <footer className="border-t-[1px] border-gray-300 h-[10%] sm:h-[10%] md:h-[9%] lg:h-[9%] w-full sm:w-[98%] md:w-[98%] lg:w-[98%] sm:rounded-xl md:rounded-xl lg:rounded-xl mr-auto ml-auto bg-white flex justify-around items-center ">
      {menu.map((item, index) => {
        return (
          <Link to={item.path} key={index}>
            <div className="flex flex-col justify-center items-center">
              <div
                className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl ${item.custom_css} flex justify-center items-center rounded-full`}
              >
                {item.icon}
              </div>
              <div className="text-xs sm:text-xs md:text-md lg:text-lg mt-1 font-bold ">
                {item.text}
              </div>
            </div>
          </Link>
        );
      })}
    </footer>
  );
};

export default Footer;
