import React, { useState } from "react";
import "./menstrual.css";

function Menstrual() {
  const [lastPeriodDate, setLastPeriodDate] = useState("");
  const [nextPeriod, setNextPeriod] = useState("");

  const handleDateChange = (e) => {
    const date = e.target.value;
    setLastPeriodDate(date);

    if (date) {
      const next = new Date(date);
      next.setDate(next.getDate() + 28); // Assuming 28-day cycle
      setNextPeriod(next.toDateString());
    } else {
      setNextPeriod("");
    }
  };

  return (
    <div className="menstrual-container">
      <h2 className="menstrual-heading">🩸 Cycle Calendar</h2>
      <div className="menstrual-calendar-section">
        <label htmlFor="period-date">Enter Last Period Date:</label>
        <input
          id="period-date"
          type="date"
          value={lastPeriodDate}
          onChange={handleDateChange}
          aria-describedby="next-period-info"
        />
        {nextPeriod && (
          <p id="next-period-info">
            🔔 Estimated Next Period: <strong>{nextPeriod}</strong>
          </p>
        )}
      </div>
    </div>
  );
}

export default Menstrual;
