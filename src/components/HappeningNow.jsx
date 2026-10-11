import { formatTime } from "../utils/time.js";
import { findRoom, roomLabel } from "../utils/format.js";

export default function HappeningNow({ activeHours }) {
  return (
    <section className="card">
      <h2>Happening now</h2>
      {activeHours.length === 0 ? (
        <p className="empty">No practice hour right now.</p>
      ) : (
        <ul className="list">
          {activeHours.map((hour) => {
            const room = findRoom(hour.roomId);
            return (
              <li key={`${hour.roomId}-${hour.start}`} className="live-item">
                <div>
                  <strong className="room-title">{roomLabel(room)}</strong>
                  <div className="muted">{room.name}</div>
                  <div>until {formatTime(hour.end)}</div>
                </div>
                <span className="badge-live">LIVE</span>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
