import React from "react";
import { midVibration } from "../hooks/useVibrate";

const Money_Tag_Inputs = ({amount,setAmount,setToggleCategoryModal,selectedOption}) => {
  return (
    <div className="flex flex-col w-full gap-6 pb-4 items-center">
      <input
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        type="number"
        placeholder="₹0"
        className="border-b-[1px] w-44 text-center text-3xl border-gray-300 p-2"
      />

      <input
        type="text"
        value={
          selectedOption != ""
            ? `${selectedOption.icon} ${selectedOption.category}`
            : "Tags"
        }
        placeholder="Select a category"
        onClick={() => {
          setToggleCategoryModal(true), midVibration();
        }}
        readOnly
        className=" border-b-[1px] border-gray-300 w-48 py-1 px-4 text-center text-xl font-semibold text-gray-500/70 "
      />
    </div>
  );
};

export default Money_Tag_Inputs;
