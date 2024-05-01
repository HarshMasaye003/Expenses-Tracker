import React, { useState } from "react";

const TabLayout = () => {
  const [ToggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const getActiveClass = (index, className) =>
    ToggleState === index ? className : "";

  return (
    <div className="container w-[100dvw] h-[250px border border-gray-300 ">
      <ul className="tab-list h-[50px] flex text-lg ">
        <li
          className={`w-1/2 flex justify-center items-center  ${getActiveClass(
            1,
            "bg-black text-white m-1 rounded-md"
          )}`}
          onClick={() => toggleTab(1)}
        >
          Tab 1
        </li>
        <li
          className={`w-1/2 flex justify-center items-center ${getActiveClass(
            2,
            "bg-black text-white m-1 rounded-md"
          )}`}
          onClick={() => toggleTab(2)}
        >
          Tab 2
        </li>
      </ul>
      <div className="content-container">
        <div className={`${ToggleState === 1 ? "flex h-52 p-2 " : "hidden"}`}>
          <h2>Lorem</h2>
        </div>
        <div className={`${ToggleState === 2 ? "flex " : "hidden"}`}>
          <h2>Ipsum</h2>
        </div>
      </div>
    </div>
  );
};

export default TabLayout;
