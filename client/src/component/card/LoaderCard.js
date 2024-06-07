import React from "react";

const LoaderCard = ({theme}) => {

  return (
    <div className="">
      <button
        style={{ backgroundColor: theme === "#000000" ? "#233138" : "#cbd5e1" }}
        className="parent w-full flex flex-row justify-center items-start gap-2"
      >
        <div className="p-3">
          <div className={`w-12 h-12 border rounded-full overflow-hidden text-center ${theme === "#000000" ? "bg-dark1" : "bg-slate-200"}`}></div>
        </div>
        <div className="user-top-border w-full py-3 px-2 gap-3 flex flex-col justify-between items-center">
          <div className={`p-2 ${theme === "#000000" ? "bg-dark1" : "bg-slate-200"} w-full`}></div>
          <div className="flex flex-row justify-between items-center w-full">
            <div className={`p-2 w-44 ${theme === "#000000" ? "bg-dark1" : "bg-slate-200"}`}></div>
            <div className={`p-2 w-10 ${theme === "#000000" ? "bg-dark1" : "bg-slate-200"}`}></div>
          </div>
        </div>
      </button>
    </div>
  );
};

export default LoaderCard;
