import { useEffect, useState } from "react";
import styles from "./progressBar.module.css";

export default function ProgressBar({ order }) {
  const [stepsDone, setStepsDone] = useState(0);
  const [date, setDate] = useState("");

  let steps = ["picked up", "processing", "out for delivery", "delivered"];

  useEffect(() => {
    if (!order) return;

    if (order?.CurrentStatus?.state.toLowerCase() === "picked up") {
      setStepsDone(1);
    } else if (
      order.CurrentStatus.state.toLowerCase() === "processing" ||
      order?.CurrentStatus?.state.toLowerCase() === "received at warehouse"
    ) {
      setStepsDone(2);
    } else if (order.CurrentStatus.state.toLowerCase() === "out for delivery") {
      setStepsDone(3);
    } else if (
      order.CurrentStatus.state.toLowerCase() === "delivered" ||
      order.CurrentStatus.state.toLowerCase() === "returned"
    ) {
      setStepsDone(4);
    } else {
      setStepsDone(0);
    }

    setDate(dateFormat(order.CurrentStatus.timestamp));
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
    <div className="flex flex-col sm:flex-row items-start sm:items-stretch justify-center text-center py-4">
      {steps.map((step, index) => (
        <div
          className={`${styles.step} ${
            index + 1 <= stepsDone ? styles.complete : ""
          }`}
          key={step}
        >
          <div
            className={`${styles.checkpoint} ${
              index + 1 <= stepsDone ? styles.done : ""
            }`}
          >
            {index + 1 <= stepsDone ? <img src="./tick.svg" alt="done" /> : ""}
          </div>
          <div
            className={`${
              index + 1 <= stepsDone ? styles.stepDone : styles.stepName
            }`}
          >
            {step}
            {index + 1 == stepsDone && <p className="text-[12px]">{date}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
