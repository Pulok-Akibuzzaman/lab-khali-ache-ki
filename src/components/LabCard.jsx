import React from "react";
import { formatTime, formatDuration, getTimeRemaining, getTimeUntil, isActive, toMinutes } from "../utils/time.js";
import { roomLabel } from "../utils/format.js";

export default function LabCard({
  room,
  slots = [],
  nowMinutes,
  isToday,
  dayName,
  onFilterRoom
}) {
  const activeSlot = isToday ? slots.find((s) => isActive(s, nowMinutes)) : null;
  const nextSlot = isToday
    ? slots
        .filter((s) => toMinutes(s.start) > nowMinutes)
        .sort((a, b) => toMinutes(a.start) - toMinutes(b.start))[0]
    : null;

  const isLive = Boolean(activeSlot);

  // Category label and color styling helper
  const categoryBadgeClass =
    room.category === "cse"
      ? "badge-cse"
      : room.category === "eee"
      ? "badge-eee"
      : "badge-sci";

  const categoryLabel =
    room.category === "cse"
      ? "CSE"
      : room.category === "eee"
      ? "EEE"
      : "Sciences";

  return (
    <article className={`lab-card ${isLive ? "lab-card-live" : ""}`}>
      <div className="lab-card-header">
        <div className="lab-card-meta">
          <div className="lab-badges-row">
            <span className={`dept-badge ${categoryBadgeClass}`}>{categoryLabel}</span>
            <span className="floor-badge">{room.floor}</span>
            {room.note && <span className="note-badge">{room.note}</span>}
          </div>
          <h3 className="lab-card-title">{room.name}</h3>
        </div>

        <div className="room-number-box">
          <span className="room-number-prefix">Room</span>
          <span className="room-number-digits">{room.room}</span>
        </div>
      </div>

      <div className="lab-status-strip">
        {isLive ? (
          <div className="status-live-banner">
            <span className="live-pulse-dot" aria-hidden="true"></span>
            <span className="status-text">
              <strong>FREE NOW</strong> · Until {formatTime(activeSlot.end)} ({getTimeRemaining(activeSlot.end, nowMinutes)})
            </span>
          </div>
        ) : nextSlot ? (
          <div className="status-upcoming-banner">
            <span className="upcoming-dot" aria-hidden="true"></span>
            <span className="status-text">
              <strong>Next Open Slot:</strong> {formatTime(nextSlot.start)} ({getTimeUntil(nextSlot.start, nowMinutes)})
            </span>
          </div>
        ) : isToday ? (
          <div className="status-idle-banner">
            <span className="idle-dot" aria-hidden="true"></span>
            <span className="status-text">No further practice slots scheduled today</span>
          </div>
        ) : (
          <div className="status-idle-banner">
            <span className="status-text">{dayName} Schedule</span>
          </div>
        )}
      </div>

      <div className="lab-card-body">
        <div className="slots-header">
          <span className="slots-heading-text">
            {dayName} Practice Hours ({slots.length} {slots.length === 1 ? "slot" : "slots"})
          </span>
        </div>

        {slots.length === 0 ? (
          <div className="no-slots-box">
            <span>No practice hours scheduled for this lab on {dayName}.</span>
          </div>
        ) : (
          <ul className="slots-grid">
            {slots.map((slot) => {
              const isSlotLive = isToday && isActive(slot, nowMinutes);
              const isSlotUpcoming = isToday && toMinutes(slot.start) > nowMinutes;
              const duration = formatDuration(slot.start, slot.end);

              return (
                <li
                  key={`${slot.start}-${slot.end}`}
                  className={`slot-chip ${isSlotLive ? "slot-chip-live" : isSlotUpcoming ? "slot-chip-upcoming" : "slot-chip-normal"}`}
                >
                  <div className="slot-time-range">
                    <span className="slot-time">
                      {formatTime(slot.start)} – {formatTime(slot.end)}
                    </span>
                    {duration && <span className="slot-duration-pill">{duration}</span>}
                  </div>
                  {isSlotLive && <span className="slot-live-pill">OPEN NOW</span>}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="lab-card-footer">
        <span className="dept-subtext">{room.department}</span>
      </div>
    </article>
  );
}
