import React, { useState } from "react";
import useCategories from "../hooks/useCategories";
import Swal from "sweetalert2";

const Settings_page = () => {
  const {ddCategory } = useCategories();
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = async () => {
    if (!newCategory) {
      alert("Please enter a category");
      return};
    try {
      await addCategory(newCategory);
      Swal.fire({
        icon: "success",
        title: "Category Added!",
        text: `${newCategory} has been Added.`,
        showConfirmButton: false,
        timer: 1200,
        heightAuto: false,
      
      })
      setNewCategory("");
      setCategoryModalOpen(!categoryModalOpen);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <>
      <div
        className={`h-[82%] ${categoryModalOpen && "bg-black bg-opacity-60"} `}
      >
        <section
          className={`grid gap-4 place-items-start p-4 z-20 ${
            categoryModalOpen && "opacity-15 pointer-events-none"
          } `}
        >
          <label className="w-full">
            <input
              className="peer/showLabel absolute scale-0"
              type="checkbox"
            />
            <span className="block max-h-14 overflow-hidden rounded-lg bg-red-100 px-4 py-0  shadow-lg transition-all duration-300 peer-checked/showLabel:max-h-52">
              <h3 className="flex h-14  cursor-pointer items-center font-bold">
                Categories
              </h3>
              <div className="mb-2">
                <div className="border-t-[1px] border-black px-2 pt-3 pb-1 flex justify-between items-center ">
                  <h3 className="">Add categories</h3>
                  <button
                    onClick={() => setCategoryModalOpen(!categoryModalOpen)}
                    className="bg-blue-400 py-1 px-4 rounded-lg"
                  >
                    add
                  </button>
                </div>
              </div>
            </span>
          </label>
        </section>
      </div>
      {categoryModalOpen && (
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg z-40 flex flex-col gap-2">
          <input
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            type="text"
            placeholder="Enter category..."
            className="border border-gray-300 p-2 rounded-lg"
          />
          <div className="flex justify-between gap-2">
            <button
              onClick={handleAddCategory}
              className=" bg-emerald-400 h-10 w-[6.5rem] rounded-md"
            >
              Confirm
            </button>
            <button
              onClick={() => setCategoryModalOpen(!categoryModalOpen)}
              className="bg-red-400 h-10 w-[6.5rem] rounded-md"
            >
              close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings_page;
