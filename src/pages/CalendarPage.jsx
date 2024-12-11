import React, { useState } from "react";
import CalendarGrid from "../components/CalendarGrid";
import useLocalStorage from "../hooks/useLocalStorage";
import "./CalendarPage.css";

function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useLocalStorage("events", {});

  const handleMonthChange = (direction) => {
    const newMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + direction
    );
    setCurrentMonth(newMonth);
  };

  return (
    <div className="calendar-page">
      <header className="calendar-header">
        <button className="cal-button" onClick={() => handleMonthChange(-1)}>Previous</button>
        <h1>
          {currentMonth.toLocaleString("default", { month: "long" })}{" "}
          {currentMonth.getFullYear()}
        </h1>
        <button className="cal-button" onClick={() => handleMonthChange(1)}>Next</button>
      </header>
      <CalendarGrid
        currentMonth={currentMonth}
        events={events}
        setEvents={setEvents}
      />
    </div>
  );
}

export default CalendarPage;
