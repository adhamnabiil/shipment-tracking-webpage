import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function TimelineDisplay({ event, selectedLang }) {
  const [eventTime, setEventTime] = useState(null);
  const { t } = useTranslation();

  // get time in required format
  useEffect(() => {
    const time = timeFormat(event.timestamp);
    setEventTime(time);
  }, [event, selectedLang]);

  //function to format the time
  function timeFormat(timestamp) {
    if (!timestamp) return;

    const date = new Date(timestamp);

    let hours = date.getHours();
    const minutes = date.getMinutes();
    let period;
    if (selectedLang === "en") {
      period = hours >= 12 ? "PM" : "AM";
    } else {
      period = hours >= 12 ? "م" : "ص";
    }

    hours = hours % 12 || 12;

    const formattedMinutes = String(minutes).padStart(2, 0);

    return `${hours}:${formattedMinutes} ${period}`;
  }

  return (
    <div
      className={`ml-6 ${
        selectedLang === "ar" && "mr-6 text-right"
      } border border-[#d0d5dd] px-4 py-2 my-2 rounded-[5px] font-[400]`}
    >
      {t(`${event.state}`)}
      <p className="text-[#667085]">{eventTime}</p>
    </div>
  );
}
