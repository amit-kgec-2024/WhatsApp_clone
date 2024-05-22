import React from "react";

const LoaderCard = () => {

  return (
    <div className="">
      <button
        className="parent w-full flex flex-row justify-center items-start gap-2 bg-dark4"
      >
        <div className="p-3">
          <div className="w-12 h-12 border rounded-full overflow-hidden text-center bg-slate-300"></div>
        </div>
        <div className="user-top-border w-full py-3 px-2 gap-3 flex flex-col justify-between items-center">
            <div className="p-2 bg-slate-400 w-full"></div>
          <div className="flex flex-row justify-between items-center w-full">
            <div className="p-2 w-44 bg-slate-400"></div>
            <div className="p-2 w-10 bg-slate-400"></div>
          </div>
        </div>
      </button>
    </div>
  );
};

export default LoaderCard;
