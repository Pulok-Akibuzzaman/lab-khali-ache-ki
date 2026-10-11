import { formatTime } from "../utils/time.js";
import { findRoom, roomLabel } from "../utils/format.js";

export default function UpNext({ upcoming, emptyText }) {
  return (
    <section className="card">
      <h2>Up next</h2>
      {upcoming.length === 0 ? (
        <p className="empty">{emptyText}</p>
      ) : (
        <ul className="list">
          {upcoming.map((hour) => {
            const room = findRoom(hour.roomId);
            return (
              <li key={`${hour.roomId}-${hour.start}`}>
                <div>
                  <strong className="room-title">{roomLabel(room)}</strong>
                  <div className="muted">{room.name}</div>
                </div>
                <span className="start-time">{formatTime(hour.start)}</span>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
