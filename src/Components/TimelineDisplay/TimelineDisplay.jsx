import { useEffect, useState } from "react";

export default function TimelineDisplay({ event }) {
  const [eventDate, setEventDate] = useState(null);
  const [eventTime, setEventTime] = useState(null);

  // get date and time in required format
  useEffect(() => {
    const date = dateFormat(event.timestamp);
    const time = timeFormat(event.timestamp);
    setEventDate(date);
    setEventTime(time);
  }, [event]);

  //function to format the date
  function dateFormat(timestamp) {
    if (!timestamp) return;

    const date = new Date(timestamp);
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
    return formattedDate;
  }

  //function to format the time
  function timeFormat(timestamp) {
    if (!timestamp) return;

    const date = new Date(timestamp);

    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const period = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;

    const formattedMinutes = String(minutes).padStart(2, 0);

    return `${hours}:${formattedMinutes} ${period}`;
  }

  return (
    <div>
      <div className="relative my-2 after:absolute after:top-[23%] after:left-[6px] after:w-[3px] after:h-[80%] after:bg-[#d0d5dd] after:content-['']">
        <div className="flex items-center justify-start gap-2 mb-2">
          <div className="w-[15px] h-[15px] bg-[#d0d5dd] rounded-full"></div>
          <h2 className="text-[black] font-[600]">{eventDate}</h2>
        </div>
        <div className="ml-6 border border-[#d0d5dd] px-4 py-2 rounded-[5px] font-[400]">
          {event.state}
          <p className="text-[#667085]">{eventTime}</p>
        </div>
      </div>
    </div>
  );
}
