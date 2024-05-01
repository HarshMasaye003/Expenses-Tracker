import React, { useState } from "react";

const NewAdd_page = () => {
  const [tagSelection, setTagSelection] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  // Define your categories state object with category name and icon
  const [categories] = useState([
    { icon: "Icon 1", category_name: "Category 1" },
    { icon: "Icon 2", category_name: "Category 2" },
    // Add more categories as needed
  ]);

  const toggleTagSelection = () => {
    setTagSelection(!tagSelection);
  };

  const handleSelectChange = (category) => {
    // Update the input value with the selected category name
    setSelectedOption(category.category_name);
  };

  const handleConfirm = () => {
    // Display an alert with the selected category value
    alert(`Selected category: ${selectedOption}`);
  };

  const handleClose = () => {
    // Reset the selected option and close the tag selection
    setSelectedOption(null);
    setTagSelection(false);
  };

  return (
    <div className="w-full">
      <input
        className="w-full p-2 border-b-[1px] text-center border-gray-300 rounded-md"
        type="text"
        value={selectedOption !== null ? selectedOption : ""}
        placeholder="Select a category"
        onClick={toggleTagSelection}
        readOnly // Make the input read-only
      />
      {tagSelection && (
        <div className="bg-zinc-200 p-2 w-full">
          <div className="w-full flex justify-center ">
            {categories.map((category, index) => (
              <div key={index} className="w-full p-2">
                <button
                  className="bg-white h-10 w-10"
                  onClick={() => handleSelectChange(category)}
                >
                  {index}
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <button
              className="bg-green-500 text-white px-4 py-2 mr-4 rounded"
              onClick={handleConfirm}
              disabled={!selectedOption} // Disable if no option is selected
            >
              Confirm
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Confirm and close buttons */}
    </div>
  );
};

export default NewAdd_page;
