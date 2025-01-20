import { useEffect, useState } from "react";
import ProgressBar from "../ProgressBar/ProgressBar";

export default function OrderStatus({ order }) {
  const [arriveDate, setArriveDate] = useState("");

  useEffect(() => {
    const date = dateFormat(order.PromisedDate);
    setArriveDate(date);
  }, [order]);

  function dateFormat(timestamp) {
    if (!timestamp) return;

    const date = new Date(timestamp);
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }).format(date);
    return formattedDate;
  }

  return (
    <div className="mx-4 mt-8 sm:mt-20 mb-8">
      <div className="max-w-[900px] mx-auto border-2 shadow rounded-[8px]">
        <div className="p-4">
          <p className="text-[#667085] text-[12px]">
            ORDER #{order.TrackingNumber}
          </p>
          {/* if delivery reached final state or has no delivery date, show the state instead of date */}
          {order.CurrentStatus.state.toLowerCase() == "delivered" ||
          order.CurrentStatus.state.toLowerCase() == "returned" ||
          !order.PromisedDate ? (
            <h1 className="text-black text-[24px] font-[700]">
              {order.CurrentStatus.state}
            </h1>
          ) : (
            <h1 className="text-black text-[24px] font-[700]">
              Arriving by
              <span className="text-[#0098a5]"> {arriveDate}</span>
            </h1>
          )}
        </div>

        <hr className="border" />

        <ProgressBar order={order} />
      </div>
    </div>
  );
}
