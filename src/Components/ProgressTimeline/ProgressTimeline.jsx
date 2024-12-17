import styles from "./progressTimeline.module.css";
import TimelineDisplay from "../TimelineDisplay/TimelineDisplay";
import { useEffect, useState } from "react";

export default function ProgressTimeline({ order }) {
  const [orderedEvents, setOrderedEvents] = useState([]);

  //show latest events first on timeline
  useEffect(() => {
    if (!order.TransitEvents) return;
    setOrderedEvents(order.TransitEvents.reverse());
  }, [order]);

  return (
    <div className={styles.container}>
      {!order.TransitEvents ? (
        <h1>No tracking details available</h1>
      ) : (
        <>
          <h1>Tracking details</h1>

          {/* timeline */}
          <div className={styles.timelineWrapper}>
            {orderedEvents?.map((event, index) => (
              <TimelineDisplay event={event} key={index} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
