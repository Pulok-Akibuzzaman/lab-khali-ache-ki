/*
 * Time helpers for the practice hour site.
 *
 * Every "current time" calculation uses the Asia/Dhaka timezone through
 * Intl.DateTimeFormat. This means the result is correct even if the
 * visitor's phone or laptop is set to a different timezone.
 */

export const DHAKA_TZ = "Asia/Dhaka";

// Days the university runs practice hours (Friday and Saturday are off).
export const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];

const dhakaFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: DHAKA_TZ,
  weekday: "long",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23", // 00-23, so midnight is "00" and not "24"
});

/** Converts "HH:MM" (24-hour) into minutes since midnight. "13:20" -> 800 */
export function toMinutes(hhmm) {
  const [hours, minutes] = hhmm.split(":").map(Number);
  return hours * 60 + minutes;
}

/** Converts minutes since midnight into a 12-hour label. 800 -> "1:20 PM" */
export function formatMinutes(totalMinutes) {
  const hours24 = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const suffix = hours24 >= 12 ? "PM" : "AM";
  const hours12 = hours24 % 12 || 12;
  return `${hours12}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

/** Converts "HH:MM" (24-hour) into a 12-hour label. "13:20" -> "1:20 PM" */
export function formatTime(hhmm) {
  return formatMinutes(toMinutes(hhmm));
}

/**
 * Returns the current weekday name and the minutes since midnight in Dhaka.
 * Example: { day: "Sunday", minutes: 610 }
 */
export function getDhakaNow(date = new Date()) {
  const parts = dhakaFormatter.formatToParts(date);
  const read = (type) => parts.find((part) => part.type === type)?.value;
  const hours = Number(read("hour"));
  const minutes = Number(read("minute"));
  return {
    day: read("weekday"),
    minutes: hours * 60 + minutes,
  };
}

/**
 * A practice hour is active when start <= now < end.
 * The end time is exclusive, so at exactly 1:20 PM the block is over.
 */
export function isActive(hour, nowMinutes) {
  return toMinutes(hour.start) <= nowMinutes && nowMinutes < toMinutes(hour.end);
}
