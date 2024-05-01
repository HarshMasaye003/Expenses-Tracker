import React from "react";

const Borrow_Loan_Inputs = ({
  amount,
  setAmount,
  setToggleCategoryModal,
  selectedOption,
}) => {
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
            : ""
        }
        placeholder="Borrowers | Lenders name..."
        onClick={() => {
          setToggleCategoryModal(true), midVibration();
        }}
        readOnly
        className=" border-b-[1px] text-[0.85rem] border-gray-300 w-48 py-1 px-4 text-center font-semibold text-gray-500/70 "
      />
    </div>
  );
};

export default Borrow_Loan_Inputs;
