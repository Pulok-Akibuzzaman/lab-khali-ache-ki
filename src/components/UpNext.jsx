import React from "react";
import { formatTime, getTimeUntil, toMinutes } from "../utils/time.js";
import { findRoom } from "../utils/format.js";

export default function UpNext({ upcoming, nowMinutes, emptyText, onSelectRoom }) {
  if (upcoming.length === 0) {
    return null;
  }

  // Display up to 4 nearest upcoming slots to keep page uncluttered
  const nextSlots = upcoming.slice(0, 4);

  return (
    <div className="upcoming-strip">
      <div className="upcoming-strip-header">
        <span className="upcoming-icon">⏰</span>
        <span className="upcoming-title">Coming Up Next Today</span>
        <span className="upcoming-count">({upcoming.length} total)</span>
      </div>

      <div className="upcoming-chips-row">
        {nextSlots.map((hour) => {
          const room = findRoom(hour.roomId);
          return (
            <div
              key={`${hour.roomId}-${hour.start}`}
              className="upcoming-chip"
              onClick={() => onSelectRoom && onSelectRoom(room.id)}
              role="button"
              tabIndex={0}
              title={`View ${room.name} details`}
            >
              <div className="upcoming-chip-top">
                <span className="upcoming-room-pill">Room {room.room}</span>
                <span className="upcoming-countdown">{getTimeUntil(hour.start, nowMinutes)}</span>
              </div>
              <div className="upcoming-chip-name">{room.name}</div>
              <div className="upcoming-chip-time">
                {formatTime(hour.start)} – {formatTime(hour.end)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
