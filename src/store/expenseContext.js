import React from "react";

const ExpenseContext = React.createContext({
  expenseList: [],
  addExpense: (expense) => {},
  deleteExpense: (key) => {},
});

export default ExpenseContext;
