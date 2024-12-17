import { useEffect, useState } from "react";
import ProgressBar from "../ProgressBar/ProgressBar";
import styles from "./orderStatus.module.css";

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
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.textWrapper}>
          <p>ORDER #{order.TrackingNumber}</p>
          {/* if delivery reached final state or has no delivery date, show the state instead of date */}
          {order.CurrentStatus.state.toLowerCase() == "delivered" ||
          order.CurrentStatus.state.toLowerCase() == "returned" ||
          !order.PromisedDate ? (
            <h1>{order.CurrentStatus.state}</h1>
          ) : (
            <h1>
              Arriving by
              <span className={styles.date}> {arriveDate}</span>
            </h1>
          )}
        </div>

        <hr className={styles.line} />

        <ProgressBar order={order} />
      </div>
    </div>
  );
}
