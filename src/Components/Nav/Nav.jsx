import { useState } from "react";

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
    <nav className="sm:hidden py-2 px-4 shadow-lg flex justify-between gap-8 items-center">
      <img src="./Logo.png" alt="logo" width={90} />
      <div className="flex">
        <img
          className="cursor-pointer"
          onClick={handleClick}
          src="./searchGray.svg"
          alt="search"
        />
        {active && (
          <form action="#" onSubmit={(e) => handleSubmit(e)}>
            <input
              className="w-full text-[14px] border-2 rounded-lg px-2 py-1 outline-none"
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
