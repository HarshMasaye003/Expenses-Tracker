import {
  collection,
  doc,
  setDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import { db } from "../firebase/firebase_config";
import genCurrentTime from "./genCurrentTime";

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

const addFullExpense = async (amount, selectedOption) => {
  if (amount === null) {
    Toast.fire({
      icon: "error",
      title: "Oops...",
      text: "Amount cannot be empty!",
      showConfirmButton: false,
      timer: 900,
    });
  } else if (selectedOption === "") {
    Toast.fire({
      icon: "error",
      title: "Oops...",
      text: "Please select a category!",
      showConfirmButton: false,
      timer: 900,
    });
  } else {
    try {
      const res = await setDoc(doc(db, "expenses", uuidv4()), {
        amount: amount,
        icon: selectedOption.icon,
        category: selectedOption.category,
        time_stamp: genCurrentTime(),
      });
      Toast.fire({
        icon: "success",
        title: "Expense Added!",
        text: `${amount} ➜ ${selectedOption.icon}  ${selectedOption.category}`,
        showConfirmButton: false,
        timer: 1500,
      });

      console.log(res);
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  }
};

export { addFullExpense };
