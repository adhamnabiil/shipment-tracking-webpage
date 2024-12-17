import { useEffect, useState } from "react";
import styles from "./timelineDisplay.module.css";

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
      <div className={styles.timelinePoint}>
        <div className={styles.head}>
          <div className={styles.circle}></div>
          <h2>{eventDate}</h2>
        </div>
        <div className={styles.body}>
          {event.state}
          <p className={styles.time}>{eventTime}</p>
        </div>
      </div>
    </div>
  );
}
