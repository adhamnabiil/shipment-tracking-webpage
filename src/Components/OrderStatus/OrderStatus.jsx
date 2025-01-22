import { useEffect, useState } from "react";
import ProgressBar from "../ProgressBar/ProgressBar";
import { useTranslation } from "react-i18next";

export default function OrderStatus({ order, selectedLang }) {
  const [arriveDate, setArriveDate] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    const date = dateFormat(order.PromisedDate);
    setArriveDate(date);
  }, [order, selectedLang]);

  function dateFormat(timestamp) {
    if (!timestamp) return;

    const date = new Date(timestamp);
    const local = selectedLang === "en" ? "en-US" : "ar-EG";
    const formattedDate = new Intl.DateTimeFormat(local, {
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
          <p
            className={`text-[#667085] ${
              selectedLang === "ar" && "text-right"
            } text-[12px]`}
          >
            {t("order")} {order.TrackingNumber}
          </p>
          {/* if delivery reached final state or has no delivery date, show the state instead of date */}
          {order.CurrentStatus.state.toLowerCase() == "delivered" ||
          order.CurrentStatus.state.toLowerCase() == "returned" ||
          !order.PromisedDate ? (
            <h1
              className={`text-black ${
                selectedLang === "ar" && "text-right"
              } text-[24px] font-[700]`}
            >
              {t(`${order.CurrentStatus.state}`)}
            </h1>
          ) : (
            <div
              className={`flex gap-2 ${
                selectedLang === "ar" && "text-right flex-row-reverse"
              }`}
            >
              <h1 className={`text-black text-[24px] font-[700]`}>
                {t("arrival")}
              </h1>
              <h1 className="text-[#0098a5] text-[24px] font-[700]">
                {" "}
                {arriveDate}
              </h1>
            </div>
          )}
        </div>

        <hr className="border" />

        <ProgressBar order={order} selectedLang={selectedLang} />
      </div>
    </div>
  );
}
