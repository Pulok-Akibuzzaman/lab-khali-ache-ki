import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import HappeningNow from "./components/HappeningNow.jsx";
import UpNext from "./components/UpNext.jsx";
import DaySchedule from "./components/DaySchedule.jsx";
import WeekView from "./components/WeekView.jsx";
import { practiceHours, lastUpdated } from "./data/schedule.js";
import { getDhakaNow, isActive, toMinutes, WEEKDAYS } from "./utils/time.js";
import "./App.css";

const REFRESH_MS = 30000; // refresh status every 30 seconds
const FULL_WEEK = "Full week";
const DAY_OPTIONS = [...WEEKDAYS, FULL_WEEK];

export default function App() {
  const [now, setNow] = useState(() => new Date());
  const [chosenOption, setChosenOption] = useState(null); // null = follow today

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), REFRESH_MS);
    return () => clearInterval(id);
  }, []);

  // Current Dhaka weekday and time, independent of the visitor's device timezone.
  const { day: today, minutes: nowMinutes } = getDhakaNow(now);
  const isSchoolDay = WEEKDAYS.includes(today);

  // Today's practice hours, used by the status sections.
  const todaysHours = practiceHours.filter((hour) => hour.day === today);
  const activeHours = todaysHours.filter((hour) => isActive(hour, nowMinutes));
  const upcomingHours = todaysHours
    .filter((hour) => toMinutes(hour.start) > nowMinutes)
    .sort((a, b) => toMinutes(a.start) - toMinutes(b.start));

  // Browse section: defaults to today on school days, otherwise Sunday.
  const defaultOption = isSchoolDay ? today : "Sunday";
  const selectedOption = chosenOption ?? defaultOption;

  return (
    <div className="app">
      <Header now={now} />

      <main>
        <HappeningNow activeHours={activeHours} />

        <UpNext
          upcoming={upcomingHours}
          emptyText={
            isSchoolDay ? "No more practice hours today." : "No practice hours today."
          }
        />

        <DaySchedule
          title="Today's schedule"
          day={today}
          emptyText="No practice hours today."
        />

        <section className="card">
          <h2>Browse by day</h2>
          <div className="day-buttons" role="group" aria-label="Choose a day">
            {DAY_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                className={option === selectedOption ? "active" : ""}
                aria-pressed={option === selectedOption}
                onClick={() => setChosenOption(option)}
              >
                {option}
              </button>
            ))}
          </div>

          {selectedOption === FULL_WEEK ? (
            <WeekView />
          ) : (
            <DaySchedule
              title={`${selectedOption} schedule`}
              day={selectedOption}
              emptyText={`No practice hours on ${selectedOption}.`}
            />
          )}
        </section>
      </main>

      <footer>
        <p>Data source: Fall 2026 lab schedule, East West University</p>
        <p>Last updated: {lastUpdated}</p>
      </footer>
    </div>
  );
}
