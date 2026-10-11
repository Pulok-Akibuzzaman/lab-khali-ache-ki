/*
 * =====================================================================
 *  EAST WEST UNIVERSITY - LAB CLASS SCHEDULE & PRACTICE HOURS (FALL 2026)
 * =====================================================================
 *  Verified from Practice Hour.pdf (19 pages)
 *  Last updated: October 11, 2026
 * =====================================================================
 */

export const lastUpdated = "October 11, 2026";
export const semester = "Fall 2026";
export const institution = "East West University";

export const labCategories = [
  { id: "all", label: "All Labs" },
  { id: "cse", label: "CSE Labs" },
  { id: "eee", label: "EEE Labs" },
  { id: "natural-sciences", label: "Natural Sciences" }
];

export const rooms = [
  {
    id: "ai-638",
    name: "Artificial Intelligence Lab",
    room: "638",
    category: "cse",
    floor: "6th Floor",
    department: "Department of Computer Science & Engineering"
  },
  {
    id: "db-637",
    name: "Database Lab",
    room: "637",
    category: "cse",
    floor: "6th Floor",
    department: "Department of Computer Science & Engineering"
  },
  {
    id: "dsl-634",
    name: "Digital Systems Lab",
    room: "634",
    category: "cse",
    floor: "6th Floor",
    department: "Department of Computer Science & Engineering"
  },
  {
    id: "se-630",
    name: "Software Engineering Lab",
    room: "630",
    category: "cse",
    floor: "6th Floor",
    department: "Department of Computer Science & Engineering"
  },
  {
    id: "ec-548",
    name: "Electrical Circuit Lab",
    room: "548",
    category: "eee",
    floor: "5th Floor",
    department: "Department of Electrical & Electronic Engineering"
  },
  {
    id: "el-547",
    name: "Electronics Lab",
    room: "547",
    category: "eee",
    floor: "5th Floor",
    department: "Department of Electrical & Electronic Engineering"
  },
  {
    id: "cc-431",
    name: "Cloud Computing Lab",
    room: "431",
    category: "cse",
    floor: "4th Floor",
    department: "Department of Computer Science & Engineering"
  },
  {
    id: "bda-434",
    name: "Big Data Analytics Lab",
    room: "434",
    category: "cse",
    floor: "4th Floor",
    department: "Department of Computer Science & Engineering"
  },
  {
    id: "cp-436",
    name: "Competitive Programming Lab",
    room: "436",
    category: "cse",
    floor: "4th Floor",
    department: "Department of Computer Science & Engineering"
  },
  {
    id: "cs-437",
    name: "Cyber Security Lab",
    room: "437",
    category: "cse",
    floor: "4th Floor",
    department: "Department of Computer Science & Engineering"
  },
  {
    id: "telecom-449",
    name: "Telecommunication Lab",
    room: "449",
    category: "eee",
    floor: "4th Floor",
    department: "Department of Electrical & Electronic Engineering"
  },
  {
    id: "net-450",
    name: "Networking Lab",
    room: "450",
    category: "cse",
    floor: "4th Floor",
    department: "Department of Computer Science & Engineering"
  },
  {
    id: "phy-460",
    name: "Physics Lab-1",
    room: "460",
    category: "natural-sciences",
    floor: "4th Floor",
    department: "Department of Mathematical & Physical Sciences",
    note: "Practice & Makeup Lab"
  },
  {
    id: "gpp-215",
    name: "General Purpose Programming Lab",
    room: "215",
    category: "cse",
    floor: "2nd Floor",
    department: "Department of Computer Science & Engineering"
  }
];

export const practiceHours = [
  // ==========================================
  // Artificial Intelligence Lab (Room 638)
  // ==========================================
  { roomId: "ai-638", day: "Sunday", start: "10:10", end: "13:20" },
  { roomId: "ai-638", day: "Sunday", start: "15:40", end: "17:00" },
  { roomId: "ai-638", day: "Monday", start: "08:00", end: "10:00" },
  { roomId: "ai-638", day: "Monday", start: "12:20", end: "17:00" },
  { roomId: "ai-638", day: "Tuesday", start: "12:20", end: "13:20" },
  { roomId: "ai-638", day: "Wednesday", start: "08:00", end: "13:20" },
  { roomId: "ai-638", day: "Thursday", start: "12:20", end: "13:20" },
  { roomId: "ai-638", day: "Thursday", start: "15:40", end: "16:40" },

  // ==========================================
  // Database Lab (Room 637)
  // ==========================================
  { roomId: "db-637", day: "Sunday", start: "16:40", end: "17:00" },
  { roomId: "db-637", day: "Monday", start: "09:00", end: "11:40" },
  { roomId: "db-637", day: "Monday", start: "16:50", end: "18:50" },
  { roomId: "db-637", day: "Tuesday", start: "09:00", end: "13:20" },
  { roomId: "db-637", day: "Thursday", start: "09:00", end: "10:00" },

  // ==========================================
  // Digital Systems Lab (Room 634)
  // ==========================================
  { roomId: "dsl-634", day: "Sunday", start: "09:00", end: "10:00" },
  { roomId: "dsl-634", day: "Sunday", start: "12:20", end: "13:20" },
  { roomId: "dsl-634", day: "Sunday", start: "13:30", end: "15:30" },
  { roomId: "dsl-634", day: "Sunday", start: "15:40", end: "16:40" },
  { roomId: "dsl-634", day: "Monday", start: "09:00", end: "12:00" },
  { roomId: "dsl-634", day: "Monday", start: "12:20", end: "13:20" },
  { roomId: "dsl-634", day: "Monday", start: "15:40", end: "16:40" },
  { roomId: "dsl-634", day: "Tuesday", start: "12:20", end: "13:20" },
  { roomId: "dsl-634", day: "Tuesday", start: "15:40", end: "16:40" },
  { roomId: "dsl-634", day: "Wednesday", start: "12:20", end: "13:20" },
  { roomId: "dsl-634", day: "Wednesday", start: "13:30", end: "15:30" },
  { roomId: "dsl-634", day: "Wednesday", start: "15:40", end: "16:40" },
  { roomId: "dsl-634", day: "Thursday", start: "09:00", end: "10:00" },
  { roomId: "dsl-634", day: "Thursday", start: "12:20", end: "13:20" },
  { roomId: "dsl-634", day: "Thursday", start: "15:40", end: "16:40" },

  // ==========================================
  // Software Engineering Lab (Room 630)
  // ==========================================
  { roomId: "se-630", day: "Sunday", start: "15:40", end: "16:40" },
  { roomId: "se-630", day: "Monday", start: "09:00", end: "11:30" },
  { roomId: "se-630", day: "Monday", start: "15:40", end: "16:40" },
  { roomId: "se-630", day: "Tuesday", start: "15:40", end: "16:40" },
  { roomId: "se-630", day: "Wednesday", start: "10:10", end: "11:10" },
  { roomId: "se-630", day: "Wednesday", start: "15:40", end: "16:40" },
  { roomId: "se-630", day: "Thursday", start: "12:20", end: "13:20" },
  { roomId: "se-630", day: "Thursday", start: "15:40", end: "16:40" },

  // ==========================================
  // Electrical Circuit Lab (Room 548)
  // ==========================================
  { roomId: "ec-548", day: "Sunday", start: "15:40", end: "16:30" },
  { roomId: "ec-548", day: "Monday", start: "15:40", end: "16:30" },
  { roomId: "ec-548", day: "Tuesday", start: "15:40", end: "16:30" },
  { roomId: "ec-548", day: "Wednesday", start: "15:40", end: "16:30" },
  { roomId: "ec-548", day: "Thursday", start: "15:40", end: "16:30" },

  // ==========================================
  // Electronics Lab (Room 547)
  // ==========================================
  { roomId: "el-547", day: "Sunday", start: "10:10", end: "12:10" },
  { roomId: "el-547", day: "Sunday", start: "15:40", end: "16:30" },
  { roomId: "el-547", day: "Monday", start: "15:40", end: "16:30" },
  { roomId: "el-547", day: "Tuesday", start: "15:40", end: "16:30" },
  { roomId: "el-547", day: "Wednesday", start: "15:40", end: "16:30" },
  { roomId: "el-547", day: "Thursday", start: "15:40", end: "16:30" },

  // ==========================================
  // Cloud Computing Lab (Room 431)
  // ==========================================
  { roomId: "cc-431", day: "Monday", start: "08:30", end: "10:10" },
  { roomId: "cc-431", day: "Monday", start: "12:20", end: "13:00" },
  { roomId: "cc-431", day: "Monday", start: "15:40", end: "16:40" },
  { roomId: "cc-431", day: "Tuesday", start: "12:20", end: "13:00" },
  { roomId: "cc-431", day: "Thursday", start: "11:10", end: "13:00" },
  { roomId: "cc-431", day: "Thursday", start: "15:40", end: "16:40" },

  // ==========================================
  // Big Data Analytics Lab (Room 434)
  // ==========================================
  { roomId: "bda-434", day: "Sunday", start: "12:20", end: "13:00" },
  { roomId: "bda-434", day: "Sunday", start: "15:40", end: "16:40" },
  { roomId: "bda-434", day: "Monday", start: "10:10", end: "12:10" },
  { roomId: "bda-434", day: "Monday", start: "14:00", end: "15:00" },
  { roomId: "bda-434", day: "Tuesday", start: "12:20", end: "13:00" },
  { roomId: "bda-434", day: "Tuesday", start: "15:40", end: "16:40" },
  { roomId: "bda-434", day: "Wednesday", start: "12:20", end: "13:00" },
  { roomId: "bda-434", day: "Wednesday", start: "15:40", end: "16:40" },
  { roomId: "bda-434", day: "Thursday", start: "10:10", end: "11:40" },

  // ==========================================
  // Competitive Programming Lab (Room 436)
  // ==========================================
  { roomId: "cp-436", day: "Sunday", start: "15:40", end: "16:40" },
  { roomId: "cp-436", day: "Monday", start: "12:20", end: "13:20" },
  { roomId: "cp-436", day: "Monday", start: "15:40", end: "16:40" },
  { roomId: "cp-436", day: "Wednesday", start: "08:30", end: "10:00" },
  { roomId: "cp-436", day: "Wednesday", start: "12:20", end: "13:20" },
  { roomId: "cp-436", day: "Thursday", start: "12:20", end: "13:20" },

  // ==========================================
  // Cyber Security Lab (Room 437)
  // ==========================================
  { roomId: "cs-437", day: "Sunday", start: "11:20", end: "13:20" },
  { roomId: "cs-437", day: "Monday", start: "11:20", end: "13:20" },
  { roomId: "cs-437", day: "Wednesday", start: "10:30", end: "16:30" },

  // ==========================================
  // Telecommunication Lab (Room 449)
  // ==========================================
  { roomId: "telecom-449", day: "Monday", start: "10:10", end: "12:10" },
  { roomId: "telecom-449", day: "Monday", start: "13:30", end: "15:30" },
  { roomId: "telecom-449", day: "Wednesday", start: "13:30", end: "15:30" },

  // ==========================================
  // Networking Lab (Room 450)
  // ==========================================
  { roomId: "net-450", day: "Sunday", start: "12:20", end: "13:20" },
  { roomId: "net-450", day: "Monday", start: "08:00", end: "10:00" },
  { roomId: "net-450", day: "Monday", start: "12:20", end: "13:20" },
  { roomId: "net-450", day: "Monday", start: "15:40", end: "16:40" },
  { roomId: "net-450", day: "Tuesday", start: "12:20", end: "13:20" },
  { roomId: "net-450", day: "Wednesday", start: "08:00", end: "10:00" },
  { roomId: "net-450", day: "Wednesday", start: "10:10", end: "12:10" },
  { roomId: "net-450", day: "Wednesday", start: "12:20", end: "13:20" },
  { roomId: "net-450", day: "Thursday", start: "12:20", end: "13:20" },
  { roomId: "net-450", day: "Thursday", start: "15:40", end: "16:40" },

  // ==========================================
  // Physics Lab-1 (Room 460) - Practice & Makeup
  // ==========================================
  { roomId: "phy-460", day: "Sunday", start: "12:20", end: "13:20" },
  { roomId: "phy-460", day: "Sunday", start: "15:40", end: "16:40" },
  { roomId: "phy-460", day: "Monday", start: "12:20", end: "13:20" },
  { roomId: "phy-460", day: "Monday", start: "15:40", end: "16:40" },
  { roomId: "phy-460", day: "Tuesday", start: "12:20", end: "13:20" },
  { roomId: "phy-460", day: "Tuesday", start: "15:40", end: "16:40" },
  { roomId: "phy-460", day: "Wednesday", start: "12:20", end: "13:20" },
  { roomId: "phy-460", day: "Wednesday", start: "15:40", end: "16:40" },
  { roomId: "phy-460", day: "Thursday", start: "12:20", end: "13:20" },
  { roomId: "phy-460", day: "Thursday", start: "15:40", end: "16:40" },

  // ==========================================
  // General Purpose Programming Lab (Room 215)
  // ==========================================
  { roomId: "gpp-215", day: "Sunday", start: "08:30", end: "12:00" },
  { roomId: "gpp-215", day: "Monday", start: "10:10", end: "13:20" },
  { roomId: "gpp-215", day: "Monday", start: "15:10", end: "16:30" },
  { roomId: "gpp-215", day: "Tuesday", start: "15:40", end: "16:40" },
  { roomId: "gpp-215", day: "Wednesday", start: "08:30", end: "09:50" },
  { roomId: "gpp-215", day: "Wednesday", start: "12:20", end: "13:20" },
  { roomId: "gpp-215", day: "Thursday", start: "12:20", end: "13:20" },
  { roomId: "gpp-215", day: "Thursday", start: "15:40", end: "16:40" }
];
