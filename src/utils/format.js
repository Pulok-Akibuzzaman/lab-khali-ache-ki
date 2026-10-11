import { rooms } from "../data/schedule.js";

/** Finds a room object by its id, with a safe fallback if the id is wrong. */
export function findRoom(roomId) {
  return rooms.find((room) => room.id === roomId) ?? { id: roomId, name: "Unknown lab", room: "?" };
}

/** Shows "Room 638" or "Room TBD" for rooms whose number is not known yet. */
export function roomLabel(room) {
  return room.room === "TBD" ? "Room TBD" : `Room ${room.room}`;
}
