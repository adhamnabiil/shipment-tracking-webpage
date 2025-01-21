import TimelineDisplay from "../TimelineDisplay/TimelineDisplay";
import { useEffect, useState } from "react";

export default function ProgressTimeline({ order }) {
  const [eventsGroupedByDate, setEventsGroupedByDate] = useState({});
  const [orderedDates, setOrderedDates] = useState([]);

  // Grouping the transit events by date
  useEffect(() => {
    if (!order.TransitEvents) return;

    const groupedByDate = order.TransitEvents?.reduce((acc, event) => {
      const date = new Date(event.timestamp).toISOString().split("T")[0]; // Extract the date part
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(event);
      return acc;
    }, {});

    // Reverse events to display newest events within each date first
    Object.keys(groupedByDate).forEach((date) => {
      groupedByDate[date].reverse();
    });

    // Sort dates in a new array to show latest first
    const reversedDates = Object.keys(groupedByDate).sort(
      (a, b) => new Date(b) - new Date(a)
    );
    setOrderedDates(reversedDates);
    setEventsGroupedByDate(groupedByDate);
  }, []);

  //function to format the date
  function dateFormat(date) {
    if (!date) return;

    const formattedDate = new Date(date).toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
    return formattedDate;
  }

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
            {orderedDates.map((date) => {
              return (
                <div
                  key={date}
                  className="relative after:absolute after:top-[25px] after:left-[7px] after:w-[2px] after:h-[100%] after:bg-[#d0d5dd] after:content-['']"
                >
                  <div className="flex items-center justify-start gap-2 my-6">
                    <div className="w-[15px] h-[15px] bg-[#d0d5dd] rounded-full"></div>
                    <h2 className="text-[black] font-[600]">
                      {dateFormat(date)}
                    </h2>
                  </div>
                  {eventsGroupedByDate[date]?.map((event, index) => (
                    <TimelineDisplay event={event} key={index} />
                  ))}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
