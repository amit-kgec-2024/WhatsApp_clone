import React, { useEffect, useState } from "react";

const Loaderhome = () => {
  const [progress, setProgress] = useState(0);
  const [percent, setPercent] = useState(progress);
  useEffect(() => {
    setInterval(() => {
      setProgress((val) => val + 1);
    }, 100);
  }, []);
  useEffect(() => {
    if (percent < 100) {
      setTimeout(() => setPercent((nval) => nval + 2), 200);
    }
  }, [percent]);
  return (
    <div className="w-full h-screen bg-dark6 text-white flex flex-col gap-6 justify-center items-center">
      <div className=" border-x-8 border-yellow-700 border-x-lime-700 rounded-full p-4 animate-rotate-left-to-right">
        <div className="border-y-8 border-emerald-700 border-x-cyan-700 rounded-full p-4 animate-rotate-right-to-left">
          <div className="border-x-8 border-blue-700 border-x-pink-700 rounded-full p-4 animate-rotate-right-to-left">
            <div className="animate-rotate-left-to-right border-x-8 border-red-700 border-x-white gap-2 rounded-full flex justify-center items-center px-4 sm:px-7 md:px-8 lg:px-9 py-10 sm:py-16 md:py-20 lg:py-24">
              <h1 className="uppercase animate-text-white shadow-sm shadow-red-300 font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-6xl">
                r
              </h1>
              <h1 className="uppercase animate-text-red shadow-sm shadow-red-300 text-2xl sm:text-4xl md:text-5xl font-extrabold lg:text-6xl">
                e
              </h1>
              <h1 className="uppercase animate-text-red shadow-sm shadow-red-300 text-2xl sm:text-4xl md:text-5xl font-extrabold lg:text-6xl">
                a
              </h1>
              <h1 className="uppercase animate-text-white shadow-sm shadow-red-300 font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-6xl">
                l
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-dark4 w-[30%] h-1.5">
        <div
          className="bg-whitmix1 h-[100%]"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
      <div className="text-white">{percent}%</div>
    </div>
  );
};

export default Loaderhome;
