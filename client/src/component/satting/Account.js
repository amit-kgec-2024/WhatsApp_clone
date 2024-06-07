import React, { useState } from "react";
import { FaArrowLeft, FaFileLines } from "react-icons/fa6";
import Security from "./Security";
import Accountinfor from "./Accountinfor";
import { MdOutlineSecurity } from "react-icons/md";

const Account = ({ onClick, theme }) => {
  const [activeButton, setActiveButton] = useState(null);
  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };
  return (
    <div className="profile-animation w-full h-screen">
      <div className={`${activeButton ? "hidden" : ""}`}>
        <div className="p-4 pl-6 flex flex-row items-center gap-8">
          <button onClick={onClick} className="text-lg">
            <FaArrowLeft />
          </button>
          <h1 className="text-lg font-semibold">Account</h1>
        </div>
        <div className="">
          <button
            onClick={() => handleButtonClick("security")}
            className={`flex flex-row w-full gap-6 px-5 justify-start items-center ${theme === "#000000" ? "hover:bg-dark3" : "hover:bg-slate-200"}`}
          >
            <MdOutlineSecurity className="text-2xl" />
            <span className="user-top-bottom-border text-start py-4 text-base w-full">
              Security
            </span>
          </button>
          <button
            onClick={() => handleButtonClick("accountinfo")}
            className={`flex flex-row w-full gap-6 px-5 justify-start items-center ${theme === "#000000" ? "hover:bg-dark3" : "hover:bg-slate-200"}`}
          >
            <FaFileLines className="text-2xl" />
            <span className="user-top-bottom-border text-start py-4 text-base w-full">
              Request account info
            </span>
          </button>
        </div>
      </div>
      {activeButton === "security" && (
        <Security onClick={() => setActiveButton(false)} />
      )}
      {activeButton === "accountinfo" && (
        <Accountinfor onClick={() => setActiveButton(false)} />
      )}
    </div>
  );
};

export default Account;
