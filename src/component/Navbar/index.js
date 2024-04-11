import React, { useState } from "react";
import { MdOutlineGroups } from "react-icons/md";
import { IoSyncCircleOutline } from "react-icons/io5";
import { RiChatVoiceFill } from "react-icons/ri";
import { IoIosStar } from "react-icons/io";
import { TbSettings } from "react-icons/tb";
import { MdChat } from "react-icons/md";
import { RiInboxArchiveLine } from "react-icons/ri";
import Profile from "../Profile";
import Communities from "../Communities";
import Status from "../Status";
import Channels from "../Channels";
import Sattings from "../Sattings";
import Starredmessage from "../Starredmessage"
import Users from "../Users";
import Archived from "../Archived";
import Help from "../satting/Help";


const Navbar = () => {
  
  // profile...............
  const [activeButton, setActiveButton] = useState('chats');
  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };


  return (
    <div className="flex flex-row w-full h-screen">
      <div
        className={`w-[11%] bg-dark3 flex flex-col items-center justify-between py-5`}
      >
        <div className="flex flex-col gap-5 text-slate-400 text-2xl">
          <button
            onClick={() => handleButtonClick("chats")}
            className={`p-2 ${
              activeButton === "chats" ? "rounded-full bg-dark5" : "bg-none"
            }`}
          >
            <MdChat />
          </button>
          <button
            onClick={() => handleButtonClick("communities")}
            className={`p-2 ${
              activeButton === "communities"
                ? "rounded-full bg-dark5"
                : "bg-none"
            }`}
          >
            <MdOutlineGroups />
          </button>
          <button
            onClick={() => handleButtonClick("channels")}
            className={`p-2 ${
              activeButton === "channels" ? "rounded-full bg-dark5" : "bg-none"
            }`}
          >
            <RiChatVoiceFill />
          </button>
          <button
            onClick={() => handleButtonClick("status")}
            className={`user-top-bottom-border p-2 ${
              activeButton === "status" ? "rounded-full bg-dark5" : "bg-none"
            }`}
          >
            <IoSyncCircleOutline />
          </button>
          <button
            onClick={() => handleButtonClick("archived")}
            className={`p-2 ${
              activeButton === "archived" ? "rounded-full bg-dark5" : "bg-none"
            }`}
          >
            <RiInboxArchiveLine />
          </button>
          <button
            onClick={() => handleButtonClick("starrdemessage")}
            className={`p-2 ${
              activeButton === "starrdemessage"
                ? "rounded-full bg-dark5"
                : "bg-none"
            }`}
          >
            <IoIosStar />
          </button>
        </div>
        <div className="flex flex-col gap-5 text-slate-400 text-2xl">
          <button
            onClick={() => handleButtonClick("help")}
            className={` px-1 py-3 text-xs ${
              activeButton === "help" ? "rounded-full bg-dark5" : "bg-none shadow"
            }`}
          >
            BEAT
          </button>
          <button
            onClick={() => handleButtonClick("sattings")}
            className={`p-2 ${
              activeButton === "sattings" ? "rounded-full bg-dark5" : "bg-none"
            }`}
          >
            <TbSettings />
          </button>
          <button
            onClick={() => handleButtonClick("profile")}
            className="rounded-full border-2 overflow-hidden bg-slate-500 border-white w-10 h-10"
          >
            <img src="amitimg.png" alt="Bird" />
          </button>
        </div>
      </div>
      <div className="w-[89%]">
        {activeButton === "chats" && <Users />}
        {activeButton === "help" && <Help />}
        {activeButton === "profile" && <Profile />}
        {activeButton === "communities" && <Communities />}
        {activeButton === "status" && <Status />}
        {activeButton === "channels" && <Channels />}
        {activeButton === "sattings" && <Sattings />}
        {activeButton === "starrdemessage" && <Starredmessage />}
        {activeButton === "archived" && <Archived />}
      </div>
    </div>
  );
};

export default Navbar;
