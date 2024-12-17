import { useEffect, useState } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Nav from "./Components/Nav/Nav";
import OrderStatus from "./Components/OrderStatus/OrderStatus";
import ProgressTimeline from "./Components/ProgressTimeline/ProgressTimeline";

export default function App() {
  const [trackingNumber, setTrackingNumber] = useState();
  const [order, setOrder] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      if (!trackingNumber) return;
      try {
        const response = await fetch(
          `https://tracking.bosta.co/shipments/track/${trackingNumber}`,
          {
            method: "GET",
            headers: {
              "x-requested-by": "Bosta",
            },
          }
        );

        if (!response.ok) {
          setError("oops! Invalid tracking number");
          return;
        } else {
          setError(null);
        }

        const data = await response.json();
        console.log(data);
        setOrder(data);
      } catch (error) {
        console.error("Error fetching order data:", error.message);
      }
    }

    getData();
  }, [trackingNumber]);

  return (
    <div className="App">
      <Nav setTrackingNumber={setTrackingNumber} />
      <Header setTrackingNumber={setTrackingNumber} />
      {error ? (
        <div className="error">{error}</div>
      ) : !order ? (
        <></>
      ) : (
        <>
          <OrderStatus order={order} />
          <ProgressTimeline order={order} />
        </>
      )}
    </div>
  );
}
