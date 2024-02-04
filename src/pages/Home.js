import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";

import Logout from "../components/Logout";
import ExpenseInput from "../components/ExpenseInput";
import ExpensesList from "../components/ExpensesList";

import { themeActions } from "../store/theme";
import { useSelector, useDispatch } from "react-redux";

const HomePage = () => {
  const dispatch = useDispatch();

  const currentTheme = useSelector((state) => state.theme);

  const expenses = useSelector((state) => state.expense.expenses);

  const [item, setItem] = useState(null);

  const onChangeHandler = (item, id) => {
    setItem({ item, id });
  };

  const onResetHandler = () => {
    setItem(null);
  };

  const [darkTheme, setDark] = useState(false);

  const [themeButton, setThemeButton] = useState(false);

  const toggleThemeHandler = () => {
    setDark((state) => !state);
  };

  useEffect(() => {
    if (darkTheme === false) {
      dispatch(themeActions.setLight());
    } else {
      dispatch(themeActions.setDark());
    }
  }, [darkTheme, dispatch]);

  const changeThemeHandler = () => {
    setThemeButton(true);
  };

  return (
    <div style={currentTheme}>
      <Container>
        <div className="position-absolute top-0 end-0">
          <Logout />
        </div>
        <Row>
          <Col>
            <h1 className="border-bottom">Welcome to Expense Tracker!!!</h1>
          </Col>
          <Col className="border">
            <h3 className="border-bottom">
              Your profile is Incomplete.{" "}
              <Link to="/profile">Complete Now</Link>
            </h3>
          </Col>
          <Col>
            <h3>
              <Link to="/verifyEmail">Verify Email</Link>
            </h3>
          </Col>
        </Row>
      </Container>
      <div style={{ textAlign: "center" }}>
        {themeButton && (
          <Button onClick={toggleThemeHandler}>
            {darkTheme ? "Light" : "Dark"}
          </Button>
        )}
      </div>
      <h2 style={{ textAlign: "center" }}>New Expense</h2>
      <ExpenseInput
        item={item}
        onReset={onResetHandler}
        changeTheme={changeThemeHandler}
      />
      <h2 style={{ textAlign: "center" }}>Expenses</h2>
      <ExpensesList onChange={onChangeHandler} />
      <div style={{ textAlign: "center" }}>
        <CSVLink data={expenses}>Download Expenses</CSVLink>
      </div>
    </div>
  );
};

export default HomePage;
