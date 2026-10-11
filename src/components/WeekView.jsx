import { practiceHours } from "../data/schedule.js";
import { WEEKDAYS, toMinutes, formatTime } from "../utils/time.js";
import { findRoom, roomLabel } from "../utils/format.js";

/** Shows the full Sunday to Thursday timetable as stacked cards. */
export default function WeekView() {
  return (
    <div className="week">
      {WEEKDAYS.map((day) => {
        const items = practiceHours
          .filter((hour) => hour.day === day)
          .sort((a, b) => toMinutes(a.start) - toMinutes(b.start));

        return (
          <div className="week-day" key={day}>
            <h3>{day}</h3>
            {items.length === 0 ? (
              <p className="empty">No practice hours</p>
            ) : (
              <ul className="slots">
                {items.map((hour) => (
                  <li key={`${hour.roomId}-${hour.start}`}>
                    <strong>
                      {formatTime(hour.start)} – {formatTime(hour.end)}
                    </strong>
                    <span className="muted"> · {roomLabel(findRoom(hour.roomId))}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}
