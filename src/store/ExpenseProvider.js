import React, { useEffect, useState } from "react";

import ExpenseContext from "./expenseContext";

const ExpenseProvider = (props) => {
  const [expenseList, setExpenseList] = useState([]);
  async function getData() {
    const res = await fetch(
      `${process.env.REACT_APP_FIREBASE_URL}/expenses.json`
    );
    const data = await res.json();
    if (data !== null) {
      for (let i of Object.values(data)) {
        setExpenseList((prevState) => [i, ...prevState]);
      }
    }
  }
  useEffect(() => {
    getData();
  }, []);

  const addExpenseHandler = async (expense) => {
    const newExpense = { ...expense, key: Math.random().toString() };
    let res = await fetch(
      `${process.env.REACT_APP_FIREBASE_URL}/expenses.json`,
      {
        method: "POST",
        body: JSON.stringify({
          ...newExpense,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let data = await res.json();
    res = await fetch(
      `${process.env.REACT_APP_FIREBASE_URL}/expenses/${data.name}.json`
    );
    data = await res.json();
    setExpenseList((prevState) => [data, ...prevState]);
  };

  const deleteExpenseHandler = async (key) => {
    const res = await fetch(
      `${process.env.REACT_APP_FIREBASE_URL}/expenses.json`
    );
    const data = await res.json();
    for (let [i, j] of Object.entries(data)) {
      if (j.key === key) {
        await fetch(
          `${process.env.REACT_APP_FIREBASE_URL}/expenses/${i}.json`,
          {
            method: "DELETE",
          }
        );
        break;
      }
    }
    setExpenseList([]);
    getData();
  };

  const expenseProvider = {
    expenseList: expenseList,
    addExpense: addExpenseHandler,
    deleteExpense: deleteExpenseHandler,
  };

  return (
    <ExpenseContext.Provider value={expenseProvider}>
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseProvider;
