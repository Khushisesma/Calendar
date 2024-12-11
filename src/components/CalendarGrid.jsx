import React, { useState } from "react";
import EventModal from "./EventModal";
import "./CalendarGrid.css";

function CalendarGrid({ currentMonth, events, setEvents }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState([]);

  const handleDayClick = (day) => {
    setSelectedDate(day);
    const dateKey = day.toISOString().split("T")[0];
    setSelectedEvents(events[dateKey] || []);
    setIsModalOpen(true);
  };

  const generateCalendarGrid = () => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

    const startDay = startOfMonth.getDay(); // Day of the week (0 = Sunday, 6 = Saturday)
    const daysInMonth = endOfMonth.getDate();

    // Fill calendar grid with empty cells before the first day
    const calendarDays = [];
    for (let i = 0; i < startDay; i++) {
      calendarDays.push(null); // Empty cell
    }

    // Fill calendar grid with days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i));
    }

    return { daysOfWeek, calendarDays };
  };

  const getWorkTypeColors = (dateKey) => {
    const colors = [];
    if (events[dateKey]) {
      const workTypes = new Set(events[dateKey].map((event) => event.workType));
      if (workTypes.has("Work")) colors.push("blue");
      if (workTypes.has("Personal")) colors.push("yellow");
      if (workTypes.has("Others")) colors.push("green");
    }
    return colors;
  };

  const { daysOfWeek, calendarDays } = generateCalendarGrid();

  return (
    <div>
      <div className="calendar-grid">
        {/* Days of the week header */}
        <div className="calendar-days-header">
          {daysOfWeek.map((day, index) => (
            <div className="calendar-day-header" key={index}>
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="calendar-dates">
          {calendarDays.map((day, index) => {
            if (!day) {
              // Render empty cell for days before the first of the month
              return <div className="calendar-day empty" key={index}></div>;
            }

            const dateKey = day.toISOString().split("T")[0];
            const colors = getWorkTypeColors(dateKey);

            return (
              <div
                className="calendar-day"
                key={index}
                onClick={() => handleDayClick(day)}
              >
                <span>{day.getDate()}</span>
                <div className="event-circles">
                  {colors.map((color, idx) => (
                    <div
                      key={idx}
                      className="event-circle"
                      style={{ backgroundColor: color }}
                    ></div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {isModalOpen && (
        <EventModal
          selectedDate={selectedDate}
          onClose={() => setIsModalOpen(false)}
          selectedEvents={selectedEvents}
          setEvents={setEvents}
        />
      )}
    </div>
  );
}

export default CalendarGrid;
