import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import { expenseActions } from "../store/expense";

import { getEmail } from "../store/token";

const ExpenseInput = (props) => {
  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();

  const email = getEmail();

  const expenses = useSelector((state) => state.expense.expenses);

  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    let sum = 0;
    for (let i of expenses) {
      sum += Number(i.amount);
    }
    setTotalExpense(sum);
  }, [expenses]);

  const dispatch = useDispatch();

  if (props.item !== null) {
    amountRef.current.value = props.item.item.amount;
    descriptionRef.current.value = props.item.item.description;
    categoryRef.current.value = props.item.item.category;
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    const expense = {
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      category: categoryRef.current.value,
    };
    if (props.item === null) {
      const newExpense = { ...expense, key: Math.random().toString() };
      let res = await fetch(
        `${process.env.REACT_APP_FIREBASE_URL}/expenses${email}.json`,
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
        `${process.env.REACT_APP_FIREBASE_URL}/expenses${email}/${data.name}.json`
      );
      data = await res.json();
      dispatch(expenseActions.addExpense(data));
      amountRef.current.value = "";
      descriptionRef.current.value = "";
      categoryRef.current.value = "Food";
    } else {
      const newExpense = { ...expense, key: props.item.item.key };
      await fetch(
        `${process.env.REACT_APP_FIREBASE_URL}/expenses${email}/${props.item.id}.json`,
        {
          method: "PUT",
          body: JSON.stringify({
            ...newExpense,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res = await fetch(
        `${process.env.REACT_APP_FIREBASE_URL}/expenses${email}/${props.item.id}.json`
      );
      const data = await res.json();
      dispatch(expenseActions.editExpense(data));
      amountRef.current.value = "";
      descriptionRef.current.value = "";
      categoryRef.current.value = "Food";
      props.onReset();
    }
  };

  return (
    <form style={{ textAlign: "center" }} onSubmit={submitHandler}>
      <label htmlFor="amount">Amount</label>
      <br />
      <input
        type="number"
        min="0"
        step="0.01"
        id="amount"
        ref={amountRef}
        required
      />
      <br />
      <label htmlFor="description">Description</label>
      <br />
      <textarea id="description" rows="3" ref={descriptionRef} required />
      <br />
      <label htmlFor="category">Category</label>
      <br />
      <select id="category" ref={categoryRef}>
        <option value="Food">Food</option>
        <option value="Petrol">Petrol</option>
        <option value="Salary">Salary</option>
        <option value="Other">Other</option>
      </select>
      <br />
      {totalExpense >= 10000 ? (
        <Button variant="dark" className="my-2" onClick={props.changeTheme}>
          Activate Premium
        </Button>
      ) : (
        <Button variant="dark" className="my-2" type="submit">
          Add Expense
        </Button>
      )}
    </form>
  );
};

export default ExpenseInput;
