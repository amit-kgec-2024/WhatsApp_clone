import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdSearch } from "react-icons/md";
import LoaderCard from "../card/LoaderCard";

const ExploreChannel = ({ onClick, theme}) => {
  const [activeButton, setActiveButton] = useState("explore");
  const handelExplore = (toggleExplore) => {
    setActiveButton(toggleExplore);
  };
  return (
    <div>
      <div className="flex flex-row gap-6 my-4 p-3 justify-start items-center w-full">
        <button onClick={onClick} className="text-xl text-slate-400">
          <FaArrowLeftLong />
        </button>
        <h1 className="">Find channel</h1>
      </div>
      <div
        className="flex flex-row px-4 py-1 my-4 rounded-md mx-3"
        style={{ backgroundColor: theme === "#000000" ? "#233138" : "#cbd5e1" }}
      >
        <button className="text-2xl">
          <MdSearch />
        </button>
        <input
          type="text"
          placeholder="Search"
          className="w-full outline-none px-2"
          style={{
            backgroundColor: theme === "#000000" ? "#233138" : "#cbd5e1",
          }}
        />
      </div>
      <div className="flex flex-row gap-2 px-3 py-3 user-top-bottom-border">
        <button
          onClick={() => handelExplore("explore")}
          className={`px-4 py-1 rounded-full ${
            activeButton === "explore" ? "bg-teal-300 text-whitmix2" : (theme === "#000000" ? "bg-dark3 text-slate-400" : "bg-slate-200 text-black")
          }`}
        >
          Explore
        </button>
        <button
          onClick={() => handelExplore("mostactive")}
          className={`px-4 py-1 rounded-full ${
            activeButton === "mostactive" ? "bg-teal-300 text-whitmix2" : (theme === "#000000" ? "bg-dark3 text-slate-400" : "bg-slate-200 text-black")
          }`}
        >
          Most active
        </button>
        <button
          onClick={() => handelExplore("popular")}
          className={`px-4 py-1 rounded-full ${
            activeButton === "popular" ? "bg-teal-300 text-whitmix2" : (theme === "#000000" ? "bg-dark3 text-slate-400" : "bg-slate-200 text-black")
          }`}
        >
          Popular
        </button>
        <button
          onClick={() => handelExplore("new")}
          className={`px-4 py-1 rounded-full ${
            activeButton === "new" ? "bg-teal-300 text-whitmix2" : (theme === "#000000" ? "bg-dark3 text-slate-400" : "bg-slate-200 text-black")
          }`}
        >
          New
        </button>
      </div>
      <div className="scrollbaruser overflow-y-scroll">
        {activeButton === "explore" && <LoaderCard theme={theme}/>}
        {activeButton === "mostactive" && <LoaderCard theme={theme}/>}
        {activeButton === "popular" && <LoaderCard theme={theme}/>}
        {activeButton === "new" && <LoaderCard theme={theme}/>}
      </div>
    </div>
  );
};

export default ExploreChannel;
