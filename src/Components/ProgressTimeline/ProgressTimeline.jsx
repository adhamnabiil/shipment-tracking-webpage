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
    <div className="max-w-[900px] mx-auto px-4">
      {!order.TransitEvents ? (
        <h1 className="text-[20px] text-[#667085] font-[600]">
          No tracking details available
        </h1>
      ) : (
        <>
          <h1 className="text-[20px] text-[#667085] font-[600]">
            Tracking details
          </h1>

          {/* timeline */}
          <div className="my-6">
            {orderedEvents?.map((event, index) => (
              <TimelineDisplay event={event} key={index} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
