import React from "react";
import { WEEKDAYS, formatTime, formatDuration, isActive } from "../utils/time.js";

export default function WeeklyMatrix({ rooms, practiceHours, currentDay, nowMinutes }) {
  return (
    <div className="matrix-wrapper">
      <div className="matrix-intro">
        <h3>Weekly Practice Hours Timetable Matrix</h3>
        <p>Complete Sunday to Thursday overview for all university labs. Scroll horizontally on smaller screens.</p>
      </div>

      <div className="matrix-scroll-container">
        <table className="matrix-table">
          <thead>
            <tr>
              <th className="th-lab">Lab Room</th>
              {WEEKDAYS.map((day) => {
                const isToday = day === currentDay;
                return (
                  <th key={day} className={`th-day ${isToday ? "th-today" : ""}`}>
                    <div className="th-day-title">{day}</div>
                    {isToday && <span className="today-badge">TODAY</span>}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => {
              const deptBadgeClass =
                room.category === "cse"
                  ? "badge-cse"
                  : room.category === "eee"
                  ? "badge-eee"
                  : "badge-sci";

              return (
                <tr key={room.id} className="matrix-row">
                  <td className="td-lab-info">
                    <div className="matrix-room-pill">
                      <span className="matrix-room-num">Room {room.room}</span>
                      <span className={`dept-badge ${deptBadgeClass}`}>{room.category.toUpperCase()}</span>
                    </div>
                    <div className="matrix-lab-name">{room.name}</div>
                    <div className="matrix-lab-floor">{room.floor}</div>
                  </td>

                  {WEEKDAYS.map((day) => {
                    const isToday = day === currentDay;
                    const daySlots = practiceHours
                      .filter((h) => h.roomId === room.id && h.day === day)
                      .sort((a, b) => a.start.localeCompare(b.start));

                    return (
                      <td key={day} className={`td-day-slots ${isToday ? "td-today-cell" : ""}`}>
                        {daySlots.length === 0 ? (
                          <span className="no-slot-dash">—</span>
                        ) : (
                          <div className="matrix-slots-list">
                            {daySlots.map((slot) => {
                              const isLive = isToday && isActive(slot, nowMinutes);
                              const duration = formatDuration(slot.start, slot.end);
                              return (
                                <div
                                  key={`${slot.start}-${slot.end}`}
                                  className={`matrix-slot-chip ${isLive ? "matrix-slot-live" : ""}`}
                                  title={`${formatTime(slot.start)} to ${formatTime(slot.end)} (${duration})`}
                                >
                                  <span className="slot-text">
                                    {formatTime(slot.start)} – {formatTime(slot.end)}
                                  </span>
                                  {isLive && <span className="live-dot" />}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
