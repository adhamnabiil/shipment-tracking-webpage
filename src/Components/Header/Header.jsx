import { useState } from "react";
import styles from "./header.module.css";

export default function Header({ setTrackingNumber }) {
  const [value, setValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setTrackingNumber(value);
  }
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <img className={styles.logo} src="./Logo.png" alt="logo" />
        <img className={styles.specular} src="./specular.png" alt="specular" />
        <h1>Track Your Order</h1>
        <p>All order updates will be available through this link</p>

        <div className={styles.searchContainer}>
          <div className={styles.search}>
            <form action="#" onSubmit={(e) => handleSubmit(e)}>
              <input
                type="search"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <img src="./search.svg" alt="search" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
