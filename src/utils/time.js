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

/** Returns formatted duration string, e.g. "1h", "1h 20m", "3h 10m" */
export function formatDuration(start, end) {
  const diff = toMinutes(end) - toMinutes(start);
  if (diff <= 0) return "";
  const hours = Math.floor(diff / 60);
  const mins = diff % 60;
  if (hours > 0 && mins > 0) return `${hours}h ${mins}m`;
  if (hours > 0) return `${hours} hr${hours > 1 ? "s" : ""}`;
  return `${mins} min`;
}

/** Returns human readable remaining time for an active slot */
export function getTimeRemaining(end, nowMinutes) {
  const diff = toMinutes(end) - nowMinutes;
  if (diff <= 0) return "Ending now";
  const hours = Math.floor(diff / 60);
  const mins = diff % 60;
  if (hours > 0) return `${hours}h ${mins}m remaining`;
  return `${mins}m remaining`;
}

/** Returns human readable countdown until a slot starts */
export function getTimeUntil(start, nowMinutes) {
  const diff = toMinutes(start) - nowMinutes;
  if (diff <= 0) return "Starting now";
  const hours = Math.floor(diff / 60);
  const mins = diff % 60;
  if (hours > 0) return `in ${hours}h ${mins}m`;
  return `in ${mins}m`;
}
