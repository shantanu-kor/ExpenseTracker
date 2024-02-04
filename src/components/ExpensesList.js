import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { expenseActions } from "../store/expense";

import { getEmail } from "../store/token";

import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";

const ExpensesList = (props) => {
  const email = getEmail();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.expense.expenses);
  const getData = useCallback(async () => {
    dispatch(expenseActions.renewExpense());
    const res = await fetch(
      `${process.env.REACT_APP_FIREBASE_URL}/expenses${email}.json`
    );
    const data = await res.json();
    if (data !== null) {
      for (let i of Object.values(data)) {
        dispatch(expenseActions.addExpense(i));
      }
    }
  }, [dispatch, email]);

  useEffect(() => {
    getData();
  }, [getData]);

  const deleteExpense = async (key) => {
    const res = await fetch(
      `${process.env.REACT_APP_FIREBASE_URL}/expenses${email}.json`
    );
    const data = await res.json();
    for (let [i, j] of Object.entries(data)) {
      if (j.key === key) {
        await fetch(
          `${process.env.REACT_APP_FIREBASE_URL}/expenses${email}/${i}.json`,
          {
            method: "DELETE",
          }
        );
        break;
      }
    }
    getData();
  };

  const getExpenseId = async (key) => {
    const res = await fetch(
      `${process.env.REACT_APP_FIREBASE_URL}/expenses${email}.json`
    );
    const data = await res.json();
    for (let [i, j] of Object.entries(data)) {
      if (j.key === key) {
        return i;
      }
    }
  };

  const deleteHandler = (key) => {
    deleteExpense(key);
  };

  const editHandler = async (item) => {
    const expenseId = await getExpenseId(item.key);
    props.onChange(item, expenseId);
  };

  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col style={{ textAlign: "center", fontWeight: "bold" }}>Amount</Col>
          <Col style={{ textAlign: "center", fontWeight: "bold" }}>
            Description
          </Col>
          <Col style={{ textAlign: "center", fontWeight: "bold" }}>
            Category
          </Col>
          <Col style={{ textAlign: "center", fontWeight: "bold" }}>Delete</Col>
          <Col style={{ textAlign: "center", fontWeight: "bold" }}>Edit</Col>
        </Row>
      </Container>
      <ListGroup>
        {items.map((item) => (
          <ListGroup.Item key={item.key} className="text-center" style={{backgroundColor: "black", color: "white"}}>
            <Container>
              <Row>
                <Col>{item.amount}</Col>
                <Col>{item.description}</Col>
                <Col>{item.category}</Col>
                <Col>
                  <Button
                    variant="danger"
                    onClick={deleteHandler.bind(null, item.key)}
                  >
                    Delete
                  </Button>
                </Col>
                <Col>
                  <Button
                    variant="warning"
                    onClick={editHandler.bind(null, item)}
                  >
                    Edit
                  </Button>
                </Col>
              </Row>
            </Container>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </React.Fragment>
  );
};

export default ExpensesList;
