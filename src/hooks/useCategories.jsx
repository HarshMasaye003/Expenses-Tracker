import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase_config";
import { v4 as uuidv4 } from "uuid";
import { useCallback, useEffect, useState } from "react";

const useCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "categories"));
        const categoriesData = [];
        querySnapshot.forEach((doc) => {
          categoriesData.push(doc.data());
        });
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const addCategory = useCallback(async (newCategory) => {
    try {
      await setDoc(doc(db, "categories", uuidv4()), {
        icon: newCategory.icon,
        category: newCategory.category,
      });
      setCategories((prevCategories) => [...prevCategories, newCategory]);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  }, []);

  return { categories, addCategory};
};

export default useCategories;
