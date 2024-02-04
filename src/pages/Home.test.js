import { render, screen } from "@testing-library/react";
import HomePage from "./Home";

describe("HomePage component tests", () => {
  test("renders welcome to expense tracker as a text", () => {
    render(<HomePage />);
    const welcomeToExpenseTrackerElement = screen.getByText(
      "Welcome to Expense Tracker!!!"
    );
    expect(welcomeToExpenseTrackerElement).toBeInTheDocument();
  });
});
