import { practiceHours, rooms } from "../data/schedule.js";
import { toMinutes, formatTime } from "../utils/time.js";
import { roomLabel } from "../utils/format.js";

/** Lists one day's practice hours, grouped by room. */
export default function DaySchedule({ title, day, emptyText }) {
  const hoursForDay = practiceHours.filter((hour) => hour.day === day);

  const groups = rooms
    .map((room) => ({
      room,
      items: hoursForDay
        .filter((hour) => hour.roomId === room.id)
        .sort((a, b) => toMinutes(a.start) - toMinutes(b.start)),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <section className="card">
      <h2>{title}</h2>
      {groups.length === 0 ? (
        <p className="empty">{emptyText}</p>
      ) : (
        groups.map(({ room, items }) => (
          <div className="room-group" key={room.id}>
            <h3>
              {roomLabel(room)} <span className="muted">· {room.name}</span>
            </h3>
            <ul className="slots">
              {items.map((hour) => (
                <li key={hour.start}>
                  {formatTime(hour.start)} – {formatTime(hour.end)}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </section>
  );
}
