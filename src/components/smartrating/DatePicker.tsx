// DatePicker.tsx
import React, { useState } from "react";
import "./DatePicker.css";

interface DatePickerProps {
  onSelectDate: (date: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ onSelectDate }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    onSelectDate(date);
  };

  return (
    <div className="date-picker">
      <input
        className="custom-date"
        type="date"
        value={selectedDate ? selectedDate.toISOString().split("T")[0] : ""}
        onChange={(e) => handleDateSelect(new Date(e.target.value))}
      />
    </div>
  );
};

export default DatePicker;
