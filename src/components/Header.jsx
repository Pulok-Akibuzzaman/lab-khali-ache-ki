import React from "react";
import { DHAKA_TZ } from "../utils/time.js";

export default function Header({
  now,
  theme,
  onToggleTheme,
  activeCount,
  upcomingCount,
  semester,
  visitorCount,
  onQuickFilterActive
}) {
  const dateText = now.toLocaleDateString("en-US", {
    timeZone: DHAKA_TZ,
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const timeText = now.toLocaleTimeString("en-US", {
    timeZone: DHAKA_TZ,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return (
    <header className="site-header">
      <div className="header-top-row">
        <div className="brand-group">
          <div className="brand-badge-logo">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <div className="brand-institution">EAST WEST UNIVERSITY</div>
            <h1 className="brand-title">
              Lab Practice Hours <span className="brand-bangla">· ল্যাব খালি আছে কি?</span>
            </h1>
          </div>
        </div>

        <div className="header-actions">
          {/* Live Clock Card */}
          <div className="live-clock-card" title="Synchronized with Asia/Dhaka (GMT+6)">
            <div className="clock-status-indicator">
              <span className="live-pulse-dot" />
              <span className="clock-label">DHAKA TIME (GMT+6)</span>
            </div>
            <div className="clock-time-display">{timeText}</div>
            <div className="clock-date-display">{dateText}</div>
          </div>

          {/* Theme Toggle Button */}
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Quick Overview Strip */}
      <div className="quick-summary-strip">
        <button
          type="button"
          className={`stat-pill ${activeCount > 0 ? "stat-pill-live" : ""}`}
          onClick={onQuickFilterActive}
          title="Click to view open labs right now"
        >
          <span className="stat-pill-icon">{activeCount > 0 ? "🟢" : "⚪"}</span>
          <span className="stat-pill-text">
            <strong>{activeCount}</strong> {activeCount === 1 ? "Lab" : "Labs"} Free Right Now
          </span>
          {activeCount > 0 && <span className="stat-pill-action">View &rarr;</span>}
        </button>

        <div className="stat-pill">
          <span className="stat-pill-icon">⏳</span>
          <span className="stat-pill-text">
            <strong>{upcomingCount}</strong> Upcoming Today
          </span>
        </div>

        <div className="stat-pill stat-pill-semester">
          <span className="stat-pill-icon">🏛️</span>
          <span className="stat-pill-text">
            Semester: <strong>{semester}</strong>
          </span>
        </div>

        {visitorCount !== null && (
          <div className="stat-pill stat-pill-visitor" title="Live total visits counted across all sessions">
            <span className="visitor-pulse-dot" />
            <span className="stat-pill-text">
              Visitors: <strong>{visitorCount.toLocaleString()}</strong>
            </span>
          </div>
        )}
      </div>
    </header>
  );
}
