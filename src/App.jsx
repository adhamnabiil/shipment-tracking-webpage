import { useEffect, useState } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Nav from "./Components/Nav/Nav";
import OrderStatus from "./Components/OrderStatus/OrderStatus";
import ProgressTimeline from "./Components/ProgressTimeline/ProgressTimeline";
import Loading from "./Components/Loading/Loading";
import { useTranslation } from "react-i18next";
import "./i18n";

export default function App() {
  const [trackingNumber, setTrackingNumber] = useState();
  const [order, setOrder] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en");
  const { i18n } = useTranslation();

  //change language when the selected language changes
  useEffect(() => {
    i18n.changeLanguage(selectedLang);
  }, [selectedLang]);

  useEffect(() => {
    async function getData() {
      if (!trackingNumber) return;
      try {
        setIsLoading(true);
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
          throw new Error(`HTTP error! status: ${response.status}`);
        } else {
          setError(null);
        }

        const data = await response.json();
        console.log(data);
        setOrder(data);
      } catch (error) {
        console.error("Error fetching order data:", error.message);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [trackingNumber]);

  return (
    <div className="App">
      <Nav
        setTrackingNumber={setTrackingNumber}
        selectedLang={selectedLang}
        setSelectedLang={setSelectedLang}
      />
      <Header
        setTrackingNumber={setTrackingNumber}
        selectedLang={selectedLang}
        setSelectedLang={setSelectedLang}
      />
      {isLoading ? (
        <Loading />
      ) : error ? (
        <div className="text-center mt-20">{error}</div>
      ) : !order ? (
        <></>
      ) : (
        <>
          <OrderStatus order={order} selectedLang={selectedLang} />
          <ProgressTimeline order={order} selectedLang={selectedLang} />
        </>
      )}
    </div>
  );
}
