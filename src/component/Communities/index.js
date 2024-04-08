import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import userData from "../../utils/userData";
import Usercard from "../card/Usercard";
import { MdGroups } from "react-icons/md";
import Newcommunity from "../Newcommunity";

const Communities = ({onClick}) => {
  const [activeButton, setActiveButton] = useState(null);
  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };

  return (
    <div className="w-full bg-dark1 h-screen">
      <div className={`${activeButton ? "hidden" : ""}`}>
        <div className="bg-dark3 p-4 pl-6 pt-14 flex flex-row justify-start items-center gap-8">
          <button onClick={onClick} className="text-lg">
            <FaArrowLeft />
          </button>
          <h1 className="text-lg font-semibold">Communities</h1>
        </div>
        <div className="scrollbaruser overflow-y-scroll h-[630px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          <button
            onClick={() => handleButtonClick("newcommunity")}
            className="w-full flex flex-row items-center gap-3 p-3 bg-dark6 hover:bg-dark3"
          >
            <MdGroups className="bg-whitmix1 text-5xl p-2 rounded-lg" />{" "}
            <p className="font-semibold">New community</p>
          </button>
          <div className="mt-3 bg-dark6">
            {userData.map((ele) => (
              <Usercard
                key={ele.id}
                username={ele.username}
                userchats={ele.userchats}
                usertime={ele.usertime}
              />
            ))}
          </div>
        </div>
      </div>
      {activeButton === "newcommunity" && (
          <Newcommunity onClick={() => setActiveButton(false)} />
      )}
    </div>
  );
};

export default Communities;
