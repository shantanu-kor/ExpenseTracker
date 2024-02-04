import { render, screen } from "@testing-library/react";
import App from "./App";

describe("HomePage component tests", () => {
  test("renders welcome to expense tracker as a text", () => {
    render(<App />);
    const emailElement = screen.getByText(
      "Email"
    );
    expect(emailElement).toBeInTheDocument();
  });
});
