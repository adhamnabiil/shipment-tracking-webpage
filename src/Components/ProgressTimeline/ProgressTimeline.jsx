import { useTranslation } from "react-i18next";
import TimelineDisplay from "../TimelineDisplay/TimelineDisplay";
import { useEffect, useState } from "react";

export default function ProgressTimeline({ order, selectedLang }) {
  const [eventsGroupedByDate, setEventsGroupedByDate] = useState({});
  const [orderedDates, setOrderedDates] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { t } = useTranslation();

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

    const local = selectedLang === "en" ? "en-US" : "ar-EG";
    const formattedDate = new Date(date).toLocaleDateString(local, {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
    return formattedDate;
  }

  return (
    <div className="pb-8">
      {/* set max height on collapse to hide events */}
      <div
        className={`relative max-w-[900px] ${
          isCollapsed && "max-h-[500px] overflow-hidden"
        } mx-auto px-4 mb-6`}
      >
        {!order.TransitEvents ? (
          <h1
            className={`text-[20px] ${
              selectedLang === "ar" && "text-right"
            } text-[#667085] font-[600]`}
          >
            {t("noDetails")}
          </h1>
        ) : (
          <>
            <h1
              className={`text-[20px] text-[#667085] ${
                selectedLang === "ar" && "text-right"
              } font-[600]`}
            >
              {t("detailsTitle")}
            </h1>

            {/* timeline */}
            <div className="my-6">
              {orderedDates.map((date) => {
                dateFormat(date);
                return (
                  <div
                    key={date}
                    className={`relative after:absolute after:top-[25px] ${
                      selectedLang === "en"
                        ? "after:left-[7px]"
                        : "after:right-[7px]"
                    } after:w-[2px] after:h-[100%] after:bg-[#d0d5dd] after:content-['']`}
                  >
                    <div
                      className={`flex ${
                        selectedLang === "ar" && "flex-row-reverse"
                      } items-center justify-start gap-2 my-6`}
                    >
                      <div className="w-[15px] h-[15px] bg-[#d0d5dd] rounded-full"></div>
                      <h2 className="text-[black] font-[600]">
                        {dateFormat(date)}
                      </h2>
                    </div>
                    {eventsGroupedByDate[date]?.map((event, index) => (
                      <TimelineDisplay
                        event={event}
                        key={index}
                        selectedLang={selectedLang}
                      />
                    ))}
                  </div>
                );
              })}
            </div>
          </>
        )}
        {isCollapsed && (
          <div className="absolute top-0 translate-y-[30px] w-full h-full bg-gradient-to-b from-transparent to-white z-[10]"></div>
        )}
      </div>
      {/* collapse button */}
      <div className="flex justify-center">
        <button
          onClick={() => setIsCollapsed((prev) => !prev)}
          className="flex items-center text-[#0098A5] text-[16px]"
        >
          {isCollapsed ? `${t("showMore")}` : `${t("showLess")}`}
          {isCollapsed ? (
            <img src="./arrowUp.png" alt="arrow" />
          ) : (
            <img src="./arrowDown.png" alt="arrow" />
          )}
        </button>
      </div>
    </div>
  );
}
