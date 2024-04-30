import React, { useState } from 'react';

const CustomSelect = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="h-[82%] px-4 ">
      <select
        className="appearance-none mt-10 border border-gray-300 rounded-md py-2 pl-4 pr-8 focus:outline-none focus:border-blue-500"
        value={selectedOption}
        onChange={handleChange}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <svg
          className="h-4 w-4 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 111.414-1.414L10 9.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0110 12z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      {/* Grid layout for options */}
      <div className="grid grid-cols-2 gap-2 mt-1 absolute bg-white w-full rounded-md shadow-lg">
        {options.map((option, index) => (
          <button
            key={index}
            className="p-2 text-left hover:bg-blue-100 focus:outline-none"
            onClick={() => setSelectedOption(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CustomSelect;
