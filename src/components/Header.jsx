import { DHAKA_TZ } from "../utils/time.js";

export default function Header({ now }) {
  const dateText = now.toLocaleDateString("en-US", {
    timeZone: DHAKA_TZ,
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const timeText = now.toLocaleTimeString("en-US", {
    timeZone: DHAKA_TZ,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <header className="header">
      <h1>Lab Practice Hours</h1>
      <p className="subtitle">East West University · Fall 2026</p>
      <div className="clock">
        <span className="clock-date">{dateText}</span>
        <span className="clock-time">{timeText}</span>
      </div>
      <p className="tz-note">Times shown in Dhaka time (GMT+6)</p>
    </header>
  );
}
