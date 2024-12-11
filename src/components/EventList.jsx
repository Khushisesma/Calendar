import React from "react";
import "./EventList.css";

const EventList = ({ events, onEdit, onDelete }) => {
  return (
    <div className="event-list">
      {events.map((event) => (
        <div key={event.id} className="event-item">
          <div className="event-title">{event.name}</div>
          <div className="event-time">
            {event.startTime} - {event.endTime}
          </div>
          <div className="event-work-type">Work Type: {event.workType}</div>
          <button onClick={() => onEdit(event.id, { name: "Updated Event" })}>
            Edit
          </button>
          <button onClick={() => onDelete(event.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default EventList;
