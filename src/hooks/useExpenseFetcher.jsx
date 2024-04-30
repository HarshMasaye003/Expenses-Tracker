import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase_config";

const useExpenseFetcher = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "expenses"));
        const expensesData = [];
        let total = 0;
        querySnapshot.forEach((doc) => {
          const expense = doc.data();
          expensesData.push(expense);
          total += parseInt(expense.amount);
        });
        setExpenses(expensesData);
        setTotalExpense(total);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  return { expenses, loading, error, totalExpense};
};

export default useExpenseFetcher;
