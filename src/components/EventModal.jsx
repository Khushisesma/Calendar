import React, { useState } from "react";
import "./EventModal.css";

function EventModal({ selectedDate, onClose, selectedEvents, setEvents }) {
  const [eventName, setEventName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [workType, setWorkType] = useState("Work"); // Default to "Work"
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [error, setError] = useState("");

  const handleSave = () => {
    const dateKey = selectedDate.toISOString().split("T")[0];
    const eventData = { eventName, startTime, endTime, description, workType };

    // Validate for overlapping events
    const isOverlap = selectedEvents.some((event, index) => {
      if (index === editingIndex) return false; // Ignore the event being edited
      const existingStart = event.startTime;
      const existingEnd = event.endTime;
      return (
        (startTime >= existingStart && startTime < existingEnd) ||
        (endTime > existingStart && endTime <= existingEnd) ||
        (startTime <= existingStart && endTime >= existingEnd)
      );
    });

    if (isOverlap) {
      setError("Event time overlaps with an existing event.");
      return;
    }

    setEvents((prevEvents) => {
      const updatedEvents = { ...prevEvents };
      if (!updatedEvents[dateKey]) updatedEvents[dateKey] = [];

      if (editingIndex !== null) {
        updatedEvents[dateKey][editingIndex] = eventData;
      } else {
        updatedEvents[dateKey].push(eventData);
      }

      return updatedEvents;
    });

    setError("");
    clearForm();
    onClose();
  };

  const handleDelete = (index) => {
    const dateKey = selectedDate.toISOString().split("T")[0];
    setEvents((prevEvents) => {
      const updatedEvents = { ...prevEvents };
      updatedEvents[dateKey].splice(index, 1);
      if (updatedEvents[dateKey].length === 0) delete updatedEvents[dateKey];
      return updatedEvents;
    });
  };

  const handleEdit = (index) => {
    const eventToEdit = selectedEvents[index];
    setEventName(eventToEdit.eventName);
    setStartTime(eventToEdit.startTime);
    setEndTime(eventToEdit.endTime);
    setDescription(eventToEdit.description);
    setWorkType(eventToEdit.workType);
    setEditingIndex(index);
  };

  const clearForm = () => {
    setEventName("");
    setStartTime("");
    setEndTime("");
    setDescription("");
    setWorkType("Work");
    setEditingIndex(null);
  };

  const filteredEvents = selectedEvents.filter((event) =>
    event.eventName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    event.description.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className="event-modal-sidebar">
      <div className="modal-content">
        <h2>Events for {selectedDate.toDateString()}</h2>

        {/* Search Events */}
        <div className="search-events">
          <input
            type="text"
            placeholder="Search events..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>

        {/* Error Message */}
        {error && <p className="error">{error}</p>}

        {/* Existing Events */}
        <div className="existing-events">
          <h3>Existing Events:</h3>
          {filteredEvents.length > 0 ? (
            <ul>
              {filteredEvents.map((event, index) => (
                <li key={index}>
                  <strong>{event.eventName}</strong> ({event.startTime} -{" "}
                  {event.endTime})
                  <p>{event.description}</p>
                  <p>Work Type: {event.workType}</p>
                  <div className="buttons">
                    <button onClick={() => handleEdit(index)}>Edit</button>
                    <button onClick={() => handleDelete(index)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No events match the search criteria.</p>
          )}
        </div>

        {/* Add/Edit Event */}
        <div className="add-event">
          <h3>{editingIndex !== null ? "Edit Event:" : "Add Event:"}</h3>
          <div className="event-name">
            <input
              type="text"
              placeholder="Event Name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </div>
          <div className="event-time">
            <div className="event-start-time">
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="event-end-time">
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>
          <div className="event-work-type">
            <select
              value={workType}
              onChange={(e) => setWorkType(e.target.value)}
            >
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className="event-des">
            <textarea
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="buttons">
            <button onClick={handleSave}>
              {editingIndex !== null ? "Update Event" : "Save Event"}
            </button>
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventModal;
