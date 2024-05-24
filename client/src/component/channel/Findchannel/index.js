import React, { useState } from "react";
import {
  FaArrowLeftLong,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa6";
import SmallCard from "../SmallCard";
import { MdSearch } from "react-icons/md";
import ExploreChannel from "../ExploreChannel";

const Findchannel = ({ onClick }) => {
  const [isExplore, setIsExplore] = useState(false);
  // Channel short card...........................
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15];
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 4; // Number of items to display per page

  const handleLeftClick = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
  };

  const handleRightClick = () => {
    setStartIndex((prevIndex) =>
      Math.min(prevIndex + itemsPerPage, items.length - itemsPerPage)
    );
  };
  return (
    <div className="">
      <div className={`${isExplore ? "hidden" : ""}`}>
        <div className="flex flex-row gap-6 my-4 p-3 justify-start items-center w-full">
          <button onClick={onClick} className="text-xl text-slate-400">
            <FaArrowLeftLong />
          </button>
          <h1 className="">Find channel</h1>
        </div>
        <div className="bg-dark3 flex flex-row px-4 py-1 rounded-md mx-3">
          <button className="text-2xl">
            <MdSearch />
          </button>
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-dark3 outline-none px-2"
          />
        </div>
        {/* find channels........ */}
        <div className="scrollbaruser overflow-x-scroll">
          <div className="w-full px-3 my-5">
            <div className="flex flex-row justify-between items-center my-3">
              <h1>Explore channel</h1>
              <button
                onClick={() => setIsExplore((prev) => !prev)}
                className="flex text-sm items-center gap-1 text-whitmix1 font-bold"
              >
                See all <FaChevronRight />
              </button>
            </div>
            <div className="relative flex items-center">
              <button
                onClick={handleLeftClick}
                disabled={startIndex === 0}
                className="absolute p-2 text-xl left-0 rounded-full bg-dark2 disabled:opacity-50"
              >
                <FaChevronLeft />
              </button>
              <div className="flex flex-row gap-2 overflow-hidden mx-auto">
                {items
                  .slice(startIndex, startIndex + itemsPerPage)
                  .map((elt) => (
                    <div
                      key={elt}
                      className="only_border w-[120px] h-[180px] px-5 rounded-md shadow-xl bg-dark6 flex flex-col justify-around items-center"
                    >
                      <div className="w-20 h-20 bg-red-400 rounded-full"></div>
                      <h1 className="font-light">Name</h1>
                      <button className="font-light text-green-300">
                        Follow
                      </button>
                    </div>
                  ))}
              </div>
              <button
                onClick={handleRightClick}
                disabled={startIndex >= items.length - itemsPerPage}
                className="absolute p-2 text-xl right-0 rounded-full bg-dark2 disabled:opacity-50"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
          {/* Cards................................. */}
          <SmallCard />
        </div>
      </div>
      {isExplore && <ExploreChannel onClick={()=> setIsExplore(false)}/>}
    </div>
  );
};

export default Findchannel;
