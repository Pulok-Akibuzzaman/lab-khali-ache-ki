import React from "react";
import { formatTime, formatDuration, isActive, toMinutes, getTimeRemaining, getTimeUntil } from "../utils/time.js";
import { findRoom } from "../utils/format.js";

export default function TimelineView({ day, slots, isToday, nowMinutes }) {
  if (slots.length === 0) {
    return (
      <div className="empty-state-card">
        <p>No practice hours scheduled for {day}.</p>
      </div>
    );
  }

  // Sort slots chronologically
  const sortedSlots = [...slots].sort((a, b) => toMinutes(a.start) - toMinutes(b.start));

  return (
    <div className="timeline-container">
      <div className="timeline-header-info">
        <h3>Chronological Practice Schedule for {day}</h3>
        <p>Ordered by start time from morning to evening.</p>
      </div>

      <div className="timeline-flow">
        {sortedSlots.map((slot) => {
          const room = findRoom(slot.roomId);
          const isLive = isToday && isActive(slot, nowMinutes);
          const isUpcoming = isToday && toMinutes(slot.start) > nowMinutes;
          const duration = formatDuration(slot.start, slot.end);

          return (
            <div
              key={`${slot.roomId}-${slot.start}-${slot.end}`}
              className={`timeline-item ${isLive ? "timeline-item-live" : isUpcoming ? "timeline-item-upcoming" : ""}`}
            >
              <div className="timeline-time-col">
                <span className="timeline-start-time">{formatTime(slot.start)}</span>
                <span className="timeline-end-time">until {formatTime(slot.end)}</span>
                <span className="timeline-duration-badge">{duration}</span>
              </div>

              <div className="timeline-node">
                <div className={`node-marker ${isLive ? "node-marker-live" : ""}`} />
              </div>

              <div className="timeline-card-col">
                <div className="timeline-card-top">
                  <div className="room-identity">
                    <span className="timeline-room-badge">Room {room.room}</span>
                    <span className="timeline-lab-name">{room.name}</span>
                  </div>
                  <div className="timeline-tags">
                    <span className="floor-badge">{room.floor}</span>
                    {isLive && (
                      <span className="badge-live-now">
                        ● LIVE NOW ({getTimeRemaining(slot.end, nowMinutes)})
                      </span>
                    )}
                    {isUpcoming && (
                      <span className="badge-upcoming-pill">
                        Starts {getTimeUntil(slot.start, nowMinutes)}
                      </span>
                    )}
                  </div>
                </div>
                <div className="timeline-card-sub">
                  <span>{room.department}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
