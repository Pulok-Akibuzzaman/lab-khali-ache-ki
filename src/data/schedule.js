/*
 * =====================================================================
 *  HOW TO UPDATE THE SCHEDULE EACH SEMESTER
 * =====================================================================
 *  1. Update `lastUpdated` below so students see when data changed.
 *  2. In `rooms`, set the real room number for each lab
 *     (use "TBD" if the room is not known yet; it will show as "Room TBD").
 *  3. In `practiceHours`, add/remove/edit one line per practice block:
 *       { roomId: "<id from rooms>", day: "Sunday", start: "10:10", end: "13:20" }
 *     - day must be one of: Sunday, Monday, Tuesday, Wednesday, Thursday
 *     - start and end use 24-hour "HH:MM" format (13:20 = 1:20 PM)
 *     - a block is active while start <= now < end
 *  4. Save, commit, and push to GitHub. Vercel redeploys automatically.
 * =====================================================================
 */

export const lastUpdated = "October 11, 2026";

export const rooms = [
  { id: "ai-638", name: "Artificial Intelligence Lab", room: "638" },
  { id: "db-637", name: "Database Lab", room: "637" },
  { id: "dsl", name: "Digital Systems Lab", room: "TBD" },
  { id: "se-630", name: "Software Engineering Lab", room: "630" }
];

export const practiceHours = [
  // Artificial Intelligence Lab (638)
  { roomId: "ai-638", day: "Sunday", start: "10:10", end: "13:20" },
  { roomId: "ai-638", day: "Sunday", start: "15:40", end: "17:00" },
  { roomId: "ai-638", day: "Monday", start: "08:00", end: "10:00" },
  { roomId: "ai-638", day: "Monday", start: "12:20", end: "17:00" },
  { roomId: "ai-638", day: "Tuesday", start: "12:20", end: "13:20" },
  { roomId: "ai-638", day: "Wednesday", start: "08:00", end: "13:20" },
  { roomId: "ai-638", day: "Thursday", start: "12:20", end: "13:20" },
  { roomId: "ai-638", day: "Thursday", start: "15:40", end: "16:40" },

  // Database Lab (637)
  { roomId: "db-637", day: "Sunday", start: "16:40", end: "17:00" },
  { roomId: "db-637", day: "Monday", start: "09:00", end: "11:40" },
  { roomId: "db-637", day: "Monday", start: "16:50", end: "18:50" },
  { roomId: "db-637", day: "Tuesday", start: "09:00", end: "13:20" },
  { roomId: "db-637", day: "Thursday", start: "09:00", end: "10:00" },

  // Digital Systems Lab (room number TBD)
  { roomId: "dsl", day: "Sunday", start: "09:00", end: "10:00" },
  { roomId: "dsl", day: "Sunday", start: "12:20", end: "13:20" },
  { roomId: "dsl", day: "Sunday", start: "13:30", end: "15:30" },
  { roomId: "dsl", day: "Sunday", start: "15:40", end: "16:40" },
  { roomId: "dsl", day: "Monday", start: "09:00", end: "12:00" },
  { roomId: "dsl", day: "Monday", start: "12:20", end: "13:20" },
  { roomId: "dsl", day: "Monday", start: "15:40", end: "16:40" },
  { roomId: "dsl", day: "Tuesday", start: "12:20", end: "13:20" },
  { roomId: "dsl", day: "Tuesday", start: "15:40", end: "16:40" },
  { roomId: "dsl", day: "Wednesday", start: "12:20", end: "13:20" },
  { roomId: "dsl", day: "Wednesday", start: "13:30", end: "15:30" },
  { roomId: "dsl", day: "Wednesday", start: "15:40", end: "16:40" },
  { roomId: "dsl", day: "Thursday", start: "09:00", end: "10:00" },
  { roomId: "dsl", day: "Thursday", start: "12:20", end: "13:20" },
  { roomId: "dsl", day: "Thursday", start: "15:40", end: "16:40" },

  // Software Engineering Lab (630)
  { roomId: "se-630", day: "Sunday", start: "15:40", end: "16:40" },
  { roomId: "se-630", day: "Monday", start: "09:00", end: "11:30" },
  { roomId: "se-630", day: "Monday", start: "15:40", end: "16:40" },
  { roomId: "se-630", day: "Tuesday", start: "15:40", end: "16:40" },
  { roomId: "se-630", day: "Wednesday", start: "10:10", end: "11:10" },
  { roomId: "se-630", day: "Wednesday", start: "15:40", end: "16:40" },
  { roomId: "se-630", day: "Thursday", start: "12:20", end: "13:20" },
  { roomId: "se-630", day: "Thursday", start: "15:40", end: "16:40" }
];
