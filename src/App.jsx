import React, { useEffect, useState, useMemo } from "react";
import Header from "./components/Header.jsx";
import HappeningNow from "./components/HappeningNow.jsx";
import UpNext from "./components/UpNext.jsx";
import LabCard from "./components/LabCard.jsx";
import WeeklyMatrix from "./components/WeeklyMatrix.jsx";
import TimelineView from "./components/TimelineView.jsx";
import { practiceHours, rooms, lastUpdated, semester, labCategories } from "./data/schedule.js";
import { getDhakaNow, isActive, toMinutes, WEEKDAYS } from "./utils/time.js";
import "./App.css";

const REFRESH_MS = 1000; // update clock every 1 second in real time

export default function App() {
  const [now, setNow] = useState(() => new Date());
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("ewu-theme");
    if (saved) return saved;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  // Filters & Navigation
  const [selectedDay, setSelectedDay] = useState(null); // null = defaults to today
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedFloor, setSelectedFloor] = useState("all");
  const [onlyActiveNow, setOnlyActiveNow] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "timeline" | "matrix"

  // Live Visitor Counter
  const [visitorCount, setVisitorCount] = useState(null);

  useEffect(() => {
    // Check session to count unique visitor per browser session
    const hasVisitedThisSession = sessionStorage.getItem("ewu_lab_visited");
    const endpoint = hasVisitedThisSession
      ? "https://abacus.jasoncameron.dev/get/lab-khali-ache-ki/visits"
      : "https://abacus.jasoncameron.dev/hit/lab-khali-ache-ki/visits";

    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.value === "number") {
          setVisitorCount(data.value);
          sessionStorage.setItem("ewu_lab_visited", "true");
        }
      })
      .catch(() => {
        // Fallback gracefully if offline
      });
  }, []);

  // Sync theme with html root element
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("ewu-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Clock tick timer
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), REFRESH_MS);
    return () => clearInterval(id);
  }, []);

  // Dhaka time helpers
  const { day: todayDhaka, minutes: nowMinutes } = getDhakaNow(now);
  const isSchoolDay = WEEKDAYS.includes(todayDhaka);

  // Active day selection: defaults to today if weekday, otherwise Sunday
  const activeDay = selectedDay ?? (isSchoolDay ? todayDhaka : "Sunday");
  const isViewingToday = activeDay === todayDhaka;

  // Real-time live & upcoming calculations
  const todaysHours = useMemo(() => {
    return practiceHours.filter((hour) => hour.day === todayDhaka);
  }, [todayDhaka]);

  const activeHours = useMemo(() => {
    return todaysHours.filter((hour) => isActive(hour, nowMinutes));
  }, [todaysHours, nowMinutes]);

  const upcomingHours = useMemo(() => {
    return todaysHours
      .filter((hour) => toMinutes(hour.start) > nowMinutes)
      .sort((a, b) => toMinutes(a.start) - toMinutes(b.start));
  }, [todaysHours, nowMinutes]);

  // Extract distinct floors from data
  const distinctFloors = useMemo(() => {
    const floors = Array.from(new Set(rooms.map((r) => r.floor)));
    return ["all", ...floors];
  }, []);

  // Practice hours for current viewing day
  const hoursForActiveDay = useMemo(() => {
    return practiceHours.filter((h) => h.day === activeDay);
  }, [activeDay]);

  // Filtered rooms list
  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      // Search filter: matches room number, lab name, or department
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase().trim();
        const matchesRoom = room.room.toLowerCase().includes(query);
        const matchesName = room.name.toLowerCase().includes(query);
        const matchesDept = room.department.toLowerCase().includes(query);
        if (!matchesRoom && !matchesName && !matchesDept) return false;
      }

      // Category filter
      if (selectedCategory !== "all" && room.category !== selectedCategory) {
        return false;
      }

      // Floor filter
      if (selectedFloor !== "all" && room.floor !== selectedFloor) {
        return false;
      }

      // Only active now filter
      if (onlyActiveNow) {
        const isRoomActive = activeHours.some((h) => h.roomId === room.id);
        if (!isRoomActive) return false;
      }

      return true;
    });
  }, [searchTerm, selectedCategory, selectedFloor, onlyActiveNow, activeHours]);

  // Slots for filtered rooms on the active day
  const filteredSlotsForActiveDay = useMemo(() => {
    const allowedRoomIds = new Set(filteredRooms.map((r) => r.id));
    return hoursForActiveDay.filter((h) => allowedRoomIds.has(h.roomId));
  }, [filteredRooms, hoursForActiveDay]);

  // Quick jump from Live / Upcoming card to a specific room
  const handleSelectRoom = (roomId) => {
    const targetRoom = rooms.find((r) => r.id === roomId);
    if (targetRoom) {
      setSearchTerm(targetRoom.room);
      setViewMode("grid");
      if (onlyActiveNow) setOnlyActiveNow(false);
    }
  };

  const handleQuickFilterActive = () => {
    setOnlyActiveNow(true);
    setViewMode("grid");
    setSelectedDay(todayDhaka);
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedFloor("all");
    setOnlyActiveNow(false);
  };

  const hasActiveFilters =
    Boolean(searchTerm.trim()) ||
    selectedCategory !== "all" ||
    selectedFloor !== "all" ||
    onlyActiveNow;

  return (
    <div className="app-layout">
      {/* Top Header */}
      <Header
        now={now}
        theme={theme}
        onToggleTheme={toggleTheme}
        activeCount={activeHours.length}
        upcomingCount={upcomingHours.length}
        semester={semester}
        visitorCount={visitorCount}
        onQuickFilterActive={handleQuickFilterActive}
      />

      <main className="main-content">
        {/* Live Happening Now & Coming Up Bar (High impact, compact) */}
        <div className="live-dashboard-row">
          <HappeningNow
            activeHours={activeHours}
            nowMinutes={nowMinutes}
            onSelectRoom={handleSelectRoom}
          />
          <UpNext
            upcoming={upcomingHours}
            nowMinutes={nowMinutes}
            onSelectRoom={handleSelectRoom}
          />
        </div>

        {/* Interactive Controls & Filters Toolbar */}
        <section className="control-toolbar-card">
          <div className="toolbar-top-row">
            {/* Search Input */}
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                className="search-input"
                placeholder="Search lab name or room (e.g. 450, 634, Networking)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search labs by room number or name"
              />
              {searchTerm && (
                <button
                  type="button"
                  className="clear-search-btn"
                  onClick={() => setSearchTerm("")}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* View Mode Switcher */}
            <div className="view-mode-toggle" role="radiogroup" aria-label="Display View">
              <button
                type="button"
                className={`view-btn ${viewMode === "grid" ? "view-btn-active" : ""}`}
                onClick={() => setViewMode("grid")}
                title="Lab Cards Grid view"
              >
                🗂️ Lab Cards
              </button>
              <button
                type="button"
                className={`view-btn ${viewMode === "timeline" ? "view-btn-active" : ""}`}
                onClick={() => setViewMode("timeline")}
                title="Chronological timeline view"
              >
                ⏱️ Timeline
              </button>
              <button
                type="button"
                className={`view-btn ${viewMode === "matrix" ? "view-btn-active" : ""}`}
                onClick={() => setViewMode("matrix")}
                title="Full week timetable matrix"
              >
                📅 Weekly Matrix
              </button>
            </div>
          </div>

          {/* Quick Room Shortcuts */}
          <div className="quick-room-shortcuts">
            <span className="shortcuts-label">Quick Jump:</span>
            {[
              { room: "450", label: "Room 450 (Networking)" },
              { room: "634", label: "Room 634 (Digital Systems)" },
              { room: "638", label: "Room 638 (AI Lab)" },
              { room: "630", label: "Room 630 (Software Eng)" },
              { room: "548", label: "Room 548 (Circuits)" },
              { room: "215", label: "Room 215 (GPP Lab)" }
            ].map((item) => (
              <button
                key={item.room}
                type="button"
                className={`shortcut-chip ${searchTerm === item.room ? "shortcut-chip-active" : ""}`}
                onClick={() => {
                  setSearchTerm((prev) => (prev === item.room ? "" : item.room));
                  if (viewMode === "matrix") setViewMode("grid");
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Day Selector (Tabs) */}
          {viewMode !== "matrix" && (
            <div className="day-tabs-container">
              <div className="day-tabs-label">Select Day:</div>
              <div className="day-tabs-list" role="tablist">
                {WEEKDAYS.map((day) => {
                  const isDayToday = day === todayDhaka;
                  const isSelected = day === activeDay;
                  return (
                    <button
                      key={day}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      className={`day-tab-btn ${isSelected ? "day-tab-active" : ""}`}
                      onClick={() => setSelectedDay(day)}
                    >
                      <span className="day-tab-name">{day}</span>
                      {isDayToday && <span className="day-today-indicator">TODAY</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Secondary Filter Chips */}
          <div className="filter-chips-row">
            {/* Category Chips */}
            <div className="chips-group">
              <span className="chips-group-title">Category:</span>
              {labCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`chip-btn ${selectedCategory === cat.id ? "chip-btn-active" : ""}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Floor Filter */}
            <div className="chips-group">
              <span className="chips-group-title">Floor:</span>
              <select
                className="floor-select"
                value={selectedFloor}
                onChange={(e) => setSelectedFloor(e.target.value)}
                aria-label="Filter by floor"
              >
                <option value="all">All Floors</option>
                {distinctFloors
                  .filter((f) => f !== "all")
                  .map((floor) => (
                    <option key={floor} value={floor}>
                      {floor}
                    </option>
                  ))}
              </select>
            </div>

            {/* Only Live Now Toggle */}
            <label className={`live-toggle-label ${onlyActiveNow ? "live-toggle-on" : ""}`}>
              <input
                type="checkbox"
                checked={onlyActiveNow}
                onChange={(e) => setOnlyActiveNow(e.target.checked)}
              />
              <span className="toggle-custom-box" />
              <span>Free Right Now Only</span>
            </label>

            {/* Clear Filters Button */}
            {hasActiveFilters && (
              <button
                type="button"
                className="clear-all-filters-btn"
                onClick={clearAllFilters}
              >
                Reset Filters ↺
              </button>
            )}
          </div>
        </section>

        {/* Main Content Area Based on View Mode */}
        {viewMode === "matrix" ? (
          <WeeklyMatrix
            rooms={filteredRooms}
            practiceHours={practiceHours}
            currentDay={todayDhaka}
            nowMinutes={nowMinutes}
          />
        ) : viewMode === "timeline" ? (
          <TimelineView
            day={activeDay}
            slots={filteredSlotsForActiveDay}
            isToday={isViewingToday}
            nowMinutes={nowMinutes}
          />
        ) : (
          /* Grid View of Lab Cards */
          <section className="labs-grid-section">
            <div className="results-header">
              <div className="results-title-wrap">
                <h2 className="results-heading">
                  {activeDay} Lab Practice Schedule
                  {isViewingToday && <span className="today-heading-badge">(Today)</span>}
                </h2>
                <span className="results-count-badge">
                  Showing {filteredRooms.length} of {rooms.length} Labs
                </span>
              </div>

              {onlyActiveNow && (
                <div className="active-filter-banner">
                  <span>Filtered: Showing only labs currently open for practice</span>
                </div>
              )}
            </div>

            {filteredRooms.length === 0 ? (
              <div className="empty-state-card">
                <div className="empty-icon">🔎</div>
                <h3>No Matching Labs Found</h3>
                <p>Try searching for a different room number, name, or resetting your filters.</p>
                <button type="button" className="btn-primary" onClick={clearAllFilters}>
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="labs-grid">
                {filteredRooms.map((room) => {
                  const roomSlots = hoursForActiveDay
                    .filter((h) => h.roomId === room.id)
                    .sort((a, b) => toMinutes(a.start) - toMinutes(b.start));

                  return (
                    <LabCard
                      key={room.id}
                      room={room}
                      slots={roomSlots}
                      nowMinutes={nowMinutes}
                      isToday={isViewingToday}
                      dayName={activeDay}
                      onFilterRoom={() => setSearchTerm(room.room)}
                    />
                  );
                })}
              </div>
            )}
          </section>
        )}
      </main>

      {/* Modern Footer */}
      <footer className="site-footer">
        <div className="footer-container">
          <div className="footer-left">
            <strong>East West University · Lab Practice Hours Portal</strong>
            <p>A/2 Jahurul Islam Avenue, Jahurul Islam City, Aftabnagar, Dhaka-1212</p>
          </div>
          <div className="footer-right">
            <p>Verified from Practice Hour Schedule (Fall 2026)</p>
            <p className="footer-timestamp">Last updated: {lastUpdated} · Dhaka Standard Time (GMT+6)</p>
            {visitorCount !== null && (
              <p className="footer-visitor-counter">
                <span className="visitor-badge-pulse" />
                Total Visits: <strong>{visitorCount.toLocaleString()}</strong>
              </p>
            )}
            <p className="footer-credits">Made with the help of Gemini and Claude</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
