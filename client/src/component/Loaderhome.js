import React from "react";

const Loaderhome = ({ percent }) => {
  return (
    <>
      <div className="w-full h-screen bg-dark6 text-white flex flex-col gap-6 justify-center items-center">
        <div className="animate-rotate-left-to-right border-8 border-t-whitmix1 border-b-whitmix2 border-r-teal-500 border-l-green-500 w-28 sm:w-44 h-28 sm:h-44 overflow-hidden rounded-full">
          <div className="animate-rotate-right-to-left flex flex-row justify-center items-center gap-2 w-full h-full bg-dark6">
            <h1 className="uppercase animate-text-white shadow-sm shadow-cyan-300 font-extrabold text-2xl sm:text-2xl md:text-5xl lg:text-4xl">
              c
            </h1>
            <h1 className="uppercase animate-text-red shadow-sm shadow-cyan-300 text-2xl sm:text-4xl md:text-3xl font-extrabold lg:text-4xl">
              h
            </h1>
            <h1 className="uppercase animate-text-red shadow-sm shadow-cyan-300 text-2xl sm:text-4xl md:text-3xl font-extrabold lg:text-4xl">
              a
            </h1>
            <h1 className="uppercase animate-text-white shadow-sm shadow-cyan-300 font-extrabold text-2xl sm:text-2xl md:text-5xl lg:text-4xl">
              t
            </h1>
          </div>
        </div>
        <div className="bg-dark4 w-[30%] h-1">
          <div
            className="bg-whitmix1 h-[100%]"
            style={{ width: `${percent}%` }}
          ></div>
        </div>
        <div className="text-slate-400 my-5 ">WhatsApp</div>
      </div>
      {/* Style in animations */}
      <style>
        {`
      .animate-rotate-left-to-right {
    animation: rotate-left-to-right 4s linear infinite;
}
.animate-rotate-right-to-left {
    animation: rotate-right-to-left 4s linear infinite;
}

@keyframes rotate-left-to-right {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

@keyframes rotate-right-to-left {
    0% {
        transform: rotate(360deg);
    }

    100% {
        transform: rotate(0deg);
    }
}
.animate-text-white {
    animation: text-animation-white 4s ease infinite alternate;
}

@keyframes text-animation-white {
    0% {
        transform: scale(1);
        color: #0d9488;
    }

    100% {
        transform: scale(1.2);
        color: #6ee7b7;
    }
}
.animate-text-red {
    animation: text-animation-red 4s ease infinite alternate;
}

@keyframes text-animation-red {
    0% {
        transform: scale(1);
        color: #6ee7b7;
    }

    100% {
        transform: scale(1.2);
        color: #0d9488;
    }
}
      `}
      </style>
    </>
  );
};

export default Loaderhome;
