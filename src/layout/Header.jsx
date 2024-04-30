import React from "react";

const Header = () => {
  return (
    <header className="h-[8%] sm:h-[8%] md:h-[7%] lg:h-[7%] border-b-[2px] border-gray-200 shadow-sm relative top-0 sm:top-2 md:top-4 lg:top-4  mr-auto ml-auto font-semibold bg-white flex justify-center items-center w-full sm:w-[98%] md:w-[98%] lg:w-[98%] sm:rounded-xl md:rounded-xl lg:rounded-xl">
      <h1 className="text-xl sm:text-lg md:text-xl lg:text-3xl">
        Expenses Tracker
      </h1>
    </header>
  );
};

export default Header;
