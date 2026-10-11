import React, { useState } from "react";

export default function PracticeHourGuide() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="guide-card">
      <div className="guide-header" onClick={() => setIsOpen((prev) => !prev)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && setIsOpen((prev) => !prev)}>
        <div className="guide-title-row">
          <span className="guide-icon">💡</span>
          <div>
            <h3 className="guide-heading">What is "Practice Hour"? (ল্যাব প্র্যাকটিস আওয়ার)</h3>
            <p className="guide-subheading">
              Official open lab hours for EWU students to practice, code & complete assignments.
            </p>
          </div>
        </div>
        <button 
          type="button" 
          className="guide-toggle-btn"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Collapse guide" : "Expand guide"}
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen((prev) => !prev);
          }}
        >
          {isOpen ? "Hide Guide ▲" : "How It Works ▼"}
        </button>
      </div>

      {isOpen && (
        <div className="guide-content">
          <div className="guide-columns">
            <div className="guide-col">
              <h4>🎯 Purpose</h4>
              <p>
                During practice hours, university lab rooms are free from scheduled class lectures. 
                Any enrolled student can enter the room to use the workstations, lab equipment, 
                and software for study and practice.
              </p>
            </div>
            <div className="guide-col">
              <h4>🚦 Color Status Guide</h4>
              <ul className="guide-legend-list">
                <li>
                  <span className="legend-chip legend-live">● Live Now</span>
                  <span>Lab is currently open for practice right this moment.</span>
                </li>
                <li>
                  <span className="legend-chip legend-upcoming">⏳ Upcoming</span>
                  <span>Practice session starts later today.</span>
                </li>
                <li>
                  <span className="legend-chip legend-closed">○ In Class / Off</span>
                  <span>Lab is hosting a scheduled lecture or campus hours are over.</span>
                </li>
              </ul>
            </div>
            <div className="guide-col">
              <h4>🕒 Dhaka Standard Time</h4>
              <p>
                All timings are automatically synchronized to <strong>Bangladesh Standard Time (GMT+6)</strong>, 
                so you always see the correct live status even if your device is in a different timezone.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
