// DatePicker.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; 
import "@testing-library/jest-dom"; 
import userEvent from "@testing-library/user-event";
import {DatePicker} from "./DatePicker";

describe("DatePicker", () => {
  test("renders the DatePicker component", () => {
    render(<DatePicker onSelectDate={() => {}} />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("selects a date", () => {
    const onSelectDate = jest.fn();
    render(<DatePicker onSelectDate={onSelectDate} />);
    const input = screen.getByRole("textbox");

    userEvent.type(input, "2024-03-14");
    expect(onSelectDate).toHaveBeenCalledWith(new Date("2024-03-14"));
  });
});
