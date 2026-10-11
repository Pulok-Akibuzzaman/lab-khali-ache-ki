import React from "react";
import { formatTime, getTimeRemaining, toMinutes } from "../utils/time.js";
import { findRoom } from "../utils/format.js";

export default function HappeningNow({ activeHours, nowMinutes, onSelectRoom }) {
  if (activeHours.length === 0) {
    return (
      <div className="live-status-card live-status-empty">
        <div className="live-status-icon">☕</div>
        <div className="live-status-content">
          <h4>No Lab Practice Hours Happening Right Now</h4>
          <p>
            Scheduled lectures may be in progress or campus is outside operating hours. Check upcoming slots below.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="live-status-card live-status-active">
      <div className="live-status-top">
        <div className="live-heading-wrap">
          <span className="live-pulse-ring" />
          <h2 className="live-section-title">Open for Practice Right Now ({activeHours.length})</h2>
        </div>
        <span className="live-badge-glow">HAPPENING NOW</span>
      </div>

      <div className="live-rooms-grid">
        {activeHours.map((hour) => {
          const room = findRoom(hour.roomId);
          return (
            <div
              key={`${hour.roomId}-${hour.start}`}
              className="live-room-item"
              onClick={() => onSelectRoom && onSelectRoom(room.id)}
              role="button"
              tabIndex={0}
              title={`Click to view ${room.name} details`}
            >
              <div className="live-room-header">
                <div className="live-room-number">Room {room.room}</div>
                <span className="floor-badge">{room.floor}</span>
              </div>
              <div className="live-lab-name">{room.name}</div>
              <div className="live-timing-footer">
                <span className="live-time-range">Until {formatTime(hour.end)}</span>
                <span className="live-countdown-badge">{getTimeRemaining(hour.end, nowMinutes)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
