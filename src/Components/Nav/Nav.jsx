import { useState } from "react";
import styles from "./nav.module.css";

export default function Nav({ setTrackingNumber }) {
  const [active, setActive] = useState(false);
  const [value, setValue] = useState("");
  function handleClick() {
    setActive(!active);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setTrackingNumber(value);
  }

  return (
    <nav className={styles.navbar}>
      <img src="./Logo.png" alt="logo" width={90} />
      <div className={styles.search}>
        <img onClick={handleClick} src="./searchGray.svg" alt="search" />
        {active && (
          <form action="#" onSubmit={(e) => handleSubmit(e)}>
            <input
              type="search"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </form>
        )}
      </div>
    </nav>
  );
}
