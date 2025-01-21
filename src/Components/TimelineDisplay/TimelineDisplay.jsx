import { useEffect, useState } from "react";

export default function TimelineDisplay({ event }) {
  const [eventTime, setEventTime] = useState(null);

  // get time in required format
  useEffect(() => {
    const time = timeFormat(event.timestamp);
    setEventTime(time);
  }, [event]);

  //function to format the time
  function timeFormat(timestamp) {
    if (!timestamp) return;

    const date = new Date(timestamp);

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;

    const formattedMinutes = String(minutes).padStart(2, 0);

    return `${hours}:${formattedMinutes} ${period}`;
  }

  return (
    <div className="ml-6 border border-[#d0d5dd] px-4 py-2 my-2 rounded-[5px] font-[400]">
      {event.state}
      <p className="text-[#667085]">{eventTime}</p>
    </div>
  );
}
