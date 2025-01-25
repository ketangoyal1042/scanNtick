export const GetFormatDateTime = (timestamp) => {
  const utcDate = new Date(timestamp);

  // Convert to IST (UTC+5:30)
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istDate = new Date(utcDate.getTime() + istOffset);

  // Format time in HH:MM AM/PM
  let hours = istDate.getHours();
  const minutes = istDate.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} ${ampm}`;

  const day = istDate.getDate().toString().padStart(2, "0");
  const month = istDate.toLocaleString("en-US", { month: "short" });
  const year = istDate.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;

  return [formattedDate, formattedTime];
};
