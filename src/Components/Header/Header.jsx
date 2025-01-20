import { useState } from "react";

export default function Header({ setTrackingNumber }) {
  const [value, setValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setTrackingNumber(value);
  }
  return (
    <div className="relative bg-[#F3FAFB] mt-6 sm:mt-0 px-8 pt-4 sm:pb-14 text-center">
      <div className="max-w-[800px] mx-auto mt-6">
        <img className="hidden sm:block" src="./Logo.png" alt="logo" />
        <img
          className="mx-auto w-[110px] sm:w-[160px]"
          src="./specular.png"
          alt="specular"
        />
        <h1 className="text-[20px] sm:text-[40px] font-[650] sm:font-[700]">
          Track Your Order
        </h1>
        <p className="text-[15px] sm:hidden font-[400]">
          All order updates will be available through this link
        </p>

        <div className="absolute top-[100%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <div className="relative">
            <form action="#" onSubmit={(e) => handleSubmit(e)}>
              <input
                className="hidden sm:block shadow-lg rounded-[8px] w-[395px] h-[68px] py-2 pl-[70px] pr-2 outline-none"
                type="search"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <img
                className="absolute top-0 bg-[#E30613] w-[60px] h-full rounded-l-[8px]"
                src="./search.svg"
                alt="search"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
