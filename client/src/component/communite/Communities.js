import React, { useState } from "react";
// import Usercard from "../card/Usercard";
import { MdGroups } from "react-icons/md";
import Newcommunity from "./Newcommunity";

const Communities = ({ handelUserChatsClick, theme }) => {
  const [activeButton, setActiveButton] = useState(null);
  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };

  return (
    <div style={{ color: theme === "#000000" ? "#ffffff" : "#000000" }}
      className="w-full h-screen">
      <div className={`${activeButton ? "hidden" : ""}`}>
        <h1 className="text-xl font-bold p-5">Communities</h1>
        <div className="scrollbaruser overflow-y-scroll h-[700px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          <button
            onClick={() => handleButtonClick("newcommunity")}
            className={`w-full flex flex-row items-center gap-3 p-3 ${theme === "#000000" ? "hover:bg-dark3" : "hover:bg-slate-200"}`}
          >
            <MdGroups className="bg-whitmix1 text-5xl p-2 rounded-lg" />{" "}
            <p className="font-semibold">New community</p>
          </button>
          <div className="my-3">
            {/* {userData.map((ele) => (
              <Usercard
                key={ele.id}
                username={ele.username}
                userchats={ele.userchats}
                handelUserChatsClick={handelUserChatsClick}
                usertime={ele.usertime}
              />
            ))} */}
            Comming Soon.....
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
