export default function convertTo12HourFormat(isoDate) {
  // Parse the ISO date string
  const date = new Date(isoDate);

  // Extract hours and minutes
  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  // Determine AM or PM
  const amPm = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  hours = hours % 12 || 12; // Convert '0' hour to '12'

  // Pad minutes with leading zero if necessary
  const paddedMinutes = minutes.toString().padStart(2, "0");

  // Return formatted time
  return `${hours}:${paddedMinutes}${amPm}`;
}
