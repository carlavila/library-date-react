import React, { useState, useEffect, useRef } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { FaCalendar } from "react-icons/fa";
import { DatePickerProps } from "./DatePicker.types";
import "./DatePicker.css";

const DatePicker: React.FC<DatePickerProps> = ({ onSelectDate }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [previousSelectedDate, setPreviousSelectedDate] = useState<Date | null>(
    null
  );
  const [highlightedDate, setHighlightedDate] = useState<Date | null>(null);

  // Ref pour stocker la référence du calendrier
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!selectedDate) {
      setSelectedDate(new Date()); // Initialise la date sélectionnée avec la date actuelle si elle est nulle
    }

    // Ajout du gestionnaire d'événements au document
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      // Retrait du gestionnaire d'événements lorsque le composant est démonté
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [selectedDate]);

  const handleOutsideClick = (event: MouseEvent) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
      setShowCalendar(false);
    }
  };

  const handleDateSelect = (date: Date) => {
    if (previousSelectedDate) {
      const previousDay = document.querySelector(
        `.calendar-day-hover[data-date="${previousSelectedDate.getDate()}"]`
      );
      if (previousDay) {
        previousDay.classList.remove("selected-day");
      }
    }

    if (date.getMonth() !== selectedDate?.getMonth()) {
      // Change de mois
      setSelectedDate(date);
      onSelectDate(date);
    } else {
      // Sélectionne un jour dans le même mois
      setSelectedDate(date);
      setPreviousSelectedDate(date);
      onSelectDate(date);
      setShowCalendar(false);
      setHighlightedDate(date);
    }
  };

  const changeMonth = (increment: number) => {
    const newDate = new Date(selectedDate || new Date());
    newDate.setMonth(newDate.getMonth() + increment);
    setSelectedDate(newDate);
  };

  const month_names = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const generateCalendar = (month: number, year: number) => {
    const daysOfMonth = [
      31,
      isLeapYear(year) ? 29 : 28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];
    const calendarDays = [];
    const today = new Date(); // Date actuelle
    const firstDayOfWeek = new Date(year, month, 1).getDay(); // Jour de la semaine du premier jour du mois

    // Ajout des espaces vides pour aligner les jours de la semaine
    for (let i = 0; i < firstDayOfWeek; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="empty-day"></div>);
    }

    for (let i = 1; i <= daysOfMonth[month]; i++) {
      const currentDate = new Date(year, month, i);
      const isCurrentDay =
        currentDate.getDate() === today.getDate() &&
        currentDate.getMonth() === today.getMonth() &&
        currentDate.getFullYear() === today.getFullYear();
        const isHighlighted = highlightedDate && currentDate.getDate() === highlightedDate.getDate() && currentDate.getMonth() === highlightedDate.getMonth() && currentDate.getFullYear() === highlightedDate.getFullYear();

       calendarDays.push(
      <div
        key={i}
        className={`calendar-day-hover ${isCurrentDay ? "current-day" : ""} ${isHighlighted ? "selected-day" : ""}`}
        onClick={() => handleDateSelect(currentDate)}
      >
        {i}
      </div>
      );
    }

    return calendarDays;
  };

  const isLeapYear = (year: number) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  return (
    <div className="date-picker">
     <div className="custom-date">
      {selectedDate
        ? `${selectedDate.getDate() < 10 ? '0' + selectedDate.getDate() : selectedDate.getDate()}/${
            (selectedDate.getMonth() + 1) < 10 ? '0' + (selectedDate.getMonth() + 1) : (selectedDate.getMonth() + 1)
          }/${selectedDate.getFullYear()}`
        : ""}
        <div className ="div-icon">
      <FaCalendar className="date-icon" onClick={() => setShowCalendar(!showCalendar)} />
      </div>
    </div>
      {showCalendar && (
        <div ref={calendarRef} className={`calendar ${showCalendar ? 'show' : ''}`}>

          <div className="calendar-header">
            <div className="months_years">
            <span className="month-picker" id="month-picker">
              {month_names[selectedDate?.getMonth() || 0]}
            </span>
              <span id="year">{selectedDate?.getFullYear() || new Date().getFullYear()}</span>
            </div>
           <div className="icon-calendar-header">
           <MdKeyboardArrowLeft className="month-change" id="prev-month" onClick={() => changeMonth(-1)} />
            <MdKeyboardArrowRight className="month-change" id="next-month" onClick={() => changeMonth(1)} />
           </div>
           
          </div>
          <div className="calendar-body">
            <div className="calendar-week-day">
              {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                <div key={day}>{day}</div>
              ))}
            </div>
            <div className="calendar-days">
              {generateCalendar(selectedDate?.getMonth() || 0, selectedDate?.getFullYear() || new Date().getFullYear())}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export {DatePicker};
