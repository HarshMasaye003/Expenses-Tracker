import React from "react";
import { IoPersonCircleOutline } from "react-icons/io5";

const Header = () => {
  return (
    <header className="h-[8%] px-4 border-b-[1px] border-gray-300 shadow-sm relative top-0  bg-white flex justify-between items-center w-full ">
      <div className=" text-3xl mt-1">
        <span>
          <IoPersonCircleOutline />
        </span>
      </div>
      <h1 className="text-xl font-semibold">Expenses Tracker</h1>
    </header>
  );
};

export default Header;
