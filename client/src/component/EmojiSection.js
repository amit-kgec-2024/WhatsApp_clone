import React, { useState } from 'react'
import { MdOutlineGifBox } from "react-icons/md";
import { BiHappy } from "react-icons/bi";
import { PiStickerFill } from "react-icons/pi";

const EmojiSection = ({theme}) => {
    const [activeBottomNavbar, setActiveBottomNavbar] = useState("emoji");
    const handleBottomNavbarClick = (navbarBottomIndex) => {
      setActiveBottomNavbar(navbarBottomIndex);
    };
  return (
    <div
      className={`absolute shadow-lg ${
        theme === "#000000" ? "bg-dark6" : "bg-slate-100"
      } bottom-16 ml-28 w-96 h-[70%] flex flex-col justify-between rounded-lg`}
    >
      <div className="user-top-bottom-border py-3">
        {activeBottomNavbar === "emoji" && "Emoji"}
        {activeBottomNavbar === "gif" && "GIF"}
        {activeBottomNavbar === "sticker" && "Sticker"}
      </div>
      <div className="scrollbaruser bg-red-400 h-full p-3 overflow-y-scroll">
        {activeBottomNavbar === "emoji" && "Emoji"}
        {activeBottomNavbar === "gif" && "GIF"}
        {activeBottomNavbar === "sticker" && "Sticker"}
      </div>
      <div className="flex flex-row justify-center items-center py-3 gap-3">
        <button
          onClick={() => handleBottomNavbarClick("emoji")}
          className={`text-2xl  
                  ${
                    activeBottomNavbar === "emoji"
                      ? "text-teal-700"
                      : "text-slate-300"
                  }`}
        >
          <BiHappy />
        </button>
        <button
          onClick={() => handleBottomNavbarClick("gif")}
          className={`text-2xl ${
            activeBottomNavbar === "gif" ? "text-teal-700" : "text-slate-300"
          }`}
        >
          <MdOutlineGifBox />
        </button>
        <button
          onClick={() => handleBottomNavbarClick("sticker")}
          className={`text-2xl ${
            activeBottomNavbar === "sticker"
              ? "text-teal-700"
              : "text-slate-300"
          }`}
        >
          <PiStickerFill />
        </button>
      </div>
    </div>
  );
}

export default EmojiSection
