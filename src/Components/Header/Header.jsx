import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Header({
  setTrackingNumber,
  selectedLang,
  setSelectedLang,
}) {
  const [value, setValue] = useState("");
  const { t } = useTranslation();

  function handleSubmit(e) {
    e.preventDefault();
    setTrackingNumber(value);
  }
  return (
    <div className="relative bg-[#F3FAFB] mt-6 sm:mt-0 px-8 pt-4 sm:pb-14 text-center">
      <nav
        className={`hidden sm:flex ${
          selectedLang === "ar" && "sm:flex-row-reverse"
        } justify-between items-center`}
      >
        {selectedLang === "en" ? (
          <img src="./Logo.png" alt="logo" />
        ) : (
          <img src="./LogoAr.png" alt="logo" />
        )}
        <select
          name="language"
          id="language"
          className="bg-[#F3FAFB] outline-none"
          value={selectedLang}
          onChange={(e) => setSelectedLang(e.target.value)}
        >
          <option value="en">English</option>
          <option value="ar">عربي</option>
        </select>
      </nav>
      <div className="max-w-[800px] mx-auto mt-6">
        <img
          className="mx-auto w-[110px] sm:w-[160px]"
          src="./specular.png"
          alt="specular"
        />
        <h1 className="text-[20px] sm:text-[40px] font-[650] sm:font-[700]">
          {t("orderTitle")}
        </h1>
        <p className="text-[15px] sm:hidden font-[400]">{t("orderSubTitle")}</p>

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
