import React, { useState } from "react";
import useCategories from "../hooks/useCategories";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase_config";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

const Settings_page = () => {
  const { categories, addCategory } = useCategories();
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newCategory, setNewCategory] = useState([{ icon: "", category: "" }]);

  // const handleSelectChange = (event) => {
  //   setSelectedCategory(event.target.value);
  //   console.log(selectedCategory);
  // };

  const [inputs, setInputs] = useState({
    icon: "",
    category: "",
  });

  const handleInputChange = (key, value) => {
    setInputs({
      ...inputs,
      [key]: value,
    });
  };

  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 1200,
    // timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const handleAddCategory = async () => {
    if (inputs.icon === "" && inputs.category === "") {
      Toast.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in the fields!",
        showConfirmButton: false,
        timer: 1100,
      });
      return;
    } else {
      try {
        await addCategory(inputs);
        Swal.fire({
          icon: "success",
          title: "Category Added!",
          text: `${inputs.icon} ${inputs.category} has been Added.`,
          showConfirmButton: false,
          timer: 1200,
        });
        setNewCategory("");
        setCategoryModalOpen(!categoryModalOpen);
      } catch (error) {
        console.error("Error adding category:", error);
      }
    }
  };

  const handleRemoveCategory = async () => {
    if (!selectedCategory) {
      alert("pls select a category");
      return;
    }
    const cat = "something";
    try {
      await deleteDoc(doc(db, "categories", cat));
      Swal.fire({
        icon: "warning",
        title: "Category Deleted",
        showConfirmButton: false,
        timer: 1200,
        heightAuto: false,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, height: 0}}
        animate={{ opacity: 1, height: "82%"}}
        exit={{ x: "-100%", transition: { duration: 0.2, type: "spring" } }}
        className={`h-[82%] z-30 ${categoryModalOpen && "bg-black bg-opacity-60 "} `}
      >
        <section
          className={`grid gap-4 place-items-start p-4 z-20 ${
            categoryModalOpen && "opacity-15 pointer-events-none"
          } `}
        >
          {/* Add Category */}
          <label className="w-full">
            <input
              className="peer/showLabel absolute scale-0"
              type="checkbox"
            />
            <span className="block max-h-[3.4rem] overflow-hidden rounded-lg bg-white shadow-xl transition-all duration-300 peer-checked/showLabel:max-h-52">
              <div
                onClick={(open) => setOpen(true)}
                className="flex justify-between h-14 px-2 cursor-pointer items-center font-bold text-lg"
              >
                <h1>Categories</h1>
                <h2>{open ? <IoIosArrowUp /> : <IoIosArrowDown />}</h2>
              </div>
              <div className="">
                <div className="border-t-[1px] px-2 bg-white w-full border-gray-300 h-14 flex justify-between items-center ">
                  <h3 className="">Add categories</h3>
                  <button
                    onClick={() => setCategoryModalOpen(!categoryModalOpen)}
                    className="bg-blue-400 text-white font-semibold  py-1 px-4 rounded-lg"
                  >
                    add
                  </button>
                </div>
                <div className="border-t-[1px] px-2 bg-white w-full border-gray-300 h-14 flex justify-between items-center ">
                  <h3 className="">Remove categories</h3>
                  <button
                    onClick={() => setCategoryModalOpen(!categoryModalOpen)}
                    className="bg-red-400 text-white font-semibold py-1 px-4 rounded-lg"
                  >
                    remove
                  </button>
                </div>
              </div>
            </span>
          </label>
        </section>
      </motion.div>
      {categoryModalOpen && (
        <div className="absolute w-[90%] top-1/3 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg z-40 flex flex-col gap-2">
          <div className="flex gap-2 justify-center">
            <input
            minLength={1}
            maxLength={2}
              value={inputs.icon}
              onChange={(e) => handleInputChange("icon", e.target.value)}
              type="text"
              placeholder="icon..."
              className=" w-[20%] border border-gray-300 p-2 rounded-lg"
            />
            <input
              value={inputs.category}
              onChange={(e) => handleInputChange("category", e.target.value)}
              type="text"
              placeholder="Add category..."
              className=" w-[80%] border border-gray-300 p-2 rounded-lg"
            />
          </div>
          <div className="flex justify-center gap-4">
            <motion.button
              whileTap={{ scale: 1.05 }}
              onClick={handleAddCategory}
              className=" bg-emerald-500/90 font-semibold text-lg text-white h-10 w-[6.5rem] rounded-md"
            >
              Confirm
            </motion.button>
            <motion.button
              whileTap={{ scale: 1.05 }}
              onClick={() => setCategoryModalOpen(!categoryModalOpen)}
              className="bg-red-500/90 font-semibold text-lg text-white h-10 w-[6.5rem] rounded-md"
            >
              close
            </motion.button>
          </div>
        </div>
      )}

      {/* {categoryModalOpen && (
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg z-40 flex flex-col gap-2">
          <div className="w-full ">
            <select
              className="w-full border border-gray-300 py-2 rounded-lg"
              onChange={handleSelectChange}
              value={selectedCategory}
            >
              <option disabled value="">
                Select a category
              </option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-between gap-2">
            <button
              onClick={handleRemoveCategory}
              className=" bg-emerald-500/90 font-semibold text-lg text-white h-10 w-[6.5rem] rounded-md"
            >
              Confirm
            </button>
            <button
              onClick={() => setCategoryModalOpen(!categoryModalOpen)}
              className="bg-red-500/90 font-semibold text-lg text-white h-10 w-[6.5rem] rounded-md"
            >
              close
            </button>
          </div>
        </div>
      )} */}
    </>
  );
};

export default Settings_page;
