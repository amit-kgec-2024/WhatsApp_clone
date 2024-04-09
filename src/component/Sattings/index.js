import React, { useState } from "react";
import { FaArrowLeft, FaFileLines, FaDownLong } from "react-icons/fa6";
import {
  MdOutlineSearch,
  MdOutlineWallpaper,
  MdOutlineSecurity,
} from "react-icons/md";
import {
  IoIosLogOut,
  IoIosHelpCircle,
  IoIosNotifications,
} from "react-icons/io";
import { BsFillPatchPlusFill } from "react-icons/bs";
import { VscColorMode } from "react-icons/vsc";
import { PiLockFill } from "react-icons/pi";
import Profile from "../Profile";
import Privecy from "../satting/Privecy";
import Notifications from "../satting/Notifications";
import Security from "../satting/Security";
import Theme from "../satting/Theme";
import Chatwalpaper from "../satting/Chatwalpaper";
import Mediaauto from "../satting/Mediaauto";
import Accountinfor from "../satting/Accountinfor";
import Keyshort from "../satting/Keyshort";
import Help from "../satting/Help";


const Sattings = ({ onClick }) => {
  const [activeButton, setActiveButton] = useState(null);
  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };
  
  return (
    <div className="w-full bg-dark6 h-screen">
      <div className={`${activeButton ? "hidden" : ""}`}>
        <div className="bg-dark3 p-4 pl-6 pt-16 flex flex-row justify-start items-center gap-8">
          <button onClick={onClick} className="text-lg">
            <FaArrowLeft />
          </button>
          <div className="text-lg font-semibold">Sattings</div>
        </div>
        <div className="bg-dark3 my-2 mx-3 p-2 gap-3 flex flex-row rounded-md">
          <button className="text-xl">
            <MdOutlineSearch />
          </button>
          <input
            type="text"
            placeholder="Search name or number"
            className="user-top-bottom-border text-xs px-2 outline-none bg-dark3 w-full"
          />
        </div>
        <div className="scrollbaruser overflow-y-scroll h-[500px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          <button
            onClick={() => handleButtonClick("profile")}
            className="flex flex-row justify-start items-center w-full py-2 px-3 gap-3 hover:bg-dark3"
          >
            <div className="w-20 h-20 overflow-hidden rounded-full border">
              <img src="amitimg.png" alt="Bird" />
            </div>
            <h1 className="flex flex-col text-start">
              <span>Amit Mandal</span>
              <span className="text-xs">Hi its WhatsApp Clone Copy</span>
            </h1>
          </button>
          <div className="">
            <button
              onClick={() => handleButtonClick("notification")}
              className="flex flex-row w-full gap-6 px-5 justify-start items-center hover:bg-dark3"
            >
              <IoIosNotifications className="text-2xl" />
              <span className="user-top-bottom-border text-start py-4 text-base w-full">
                Notifications
              </span>
            </button>
            <button
              onClick={() => handleButtonClick("privecy")}
              className="flex flex-row w-full gap-6 px-5 justify-start items-center hover:bg-dark3"
            >
              <PiLockFill className="text-2xl" />
              <span className="user-top-bottom-border text-start py-4 text-base w-full">
                Privecy
              </span>
            </button>
            <button
              onClick={() => handleButtonClick("security")}
              className="flex flex-row w-full gap-6 px-5 justify-start items-center hover:bg-dark3"
            >
              <MdOutlineSecurity className="text-2xl" />
              <span className="user-top-bottom-border text-start py-4 text-base w-full">
                Security
              </span>
            </button>
            <button
              onClick={() => handleButtonClick("theme")}
              className="flex flex-row w-full gap-6 px-5 justify-start items-center hover:bg-dark3"
            >
              <VscColorMode className="text-2xl" />
              <span className="user-top-bottom-border text-start py-4 text-base w-full">
                Theme
              </span>
            </button>
            <button
              onClick={() => handleButtonClick("chatwallpaper")}
              className="flex flex-row w-full gap-6 px-5 justify-start items-center hover:bg-dark3"
            >
              <MdOutlineWallpaper className="text-2xl" />
              <span className="user-top-bottom-border text-start py-4 text-base w-full">
                Chat wallpaper
              </span>
            </button>
            <button
              onClick={() => handleButtonClick("mediaaudio")}
              className="flex flex-row w-full gap-6 px-5 justify-start items-center hover:bg-dark3"
            >
              <FaDownLong className="text-2xl" />
              <span className="user-top-bottom-border text-start py-4 text-base w-full">
                Media auto-download
              </span>
            </button>
            <button
              onClick={() => handleButtonClick("accountinfo")}
              className="flex flex-row w-full gap-6 px-5 justify-start items-center hover:bg-dark3"
            >
              <FaFileLines className="text-2xl" />
              <span className="user-top-bottom-border text-start py-4 text-base w-full">
                Request account info
              </span>
            </button>
            <button
              onClick={() => handleButtonClick("keyshort")}
              className="flex flex-row w-full gap-6 px-5 justify-start items-center hover:bg-dark3"
            >
              <BsFillPatchPlusFill className="text-2xl" />
              <span className="user-top-bottom-border text-start py-4 text-base w-full">
                Keyboard shortcuts
              </span>
            </button>
            <button
              onClick={() => handleButtonClick("help")}
              className="flex flex-row w-full gap-6 px-5 justify-start items-center hover:bg-dark3"
            >
              <IoIosHelpCircle className="text-2xl" />
              <span className="user-top-bottom-border text-start py-4 text-base w-full">
                Help
              </span>
            </button>
            <button className="flex flex-row w-full gap-6 px-5 text-red-600 justify-start items-center hover:bg-dark3">
              <IoIosLogOut className="text-2xl" />
              <span className="user-top-bottom-border text-start py-4 text-base w-full">
                Log out
              </span>
            </button>
          </div>
        </div>
      </div>
      {activeButton === "profile" && (
        <Profile onClick={() => setActiveButton(false)} />
      )}
      {activeButton === "notification" && (
        <Notifications onClick={() => setActiveButton(false)} />
      )}
      {activeButton === "privecy" && (
        <Privecy onClick={() => setActiveButton(false)} />
      )}
      {activeButton === "security" && (
        <Security onClick={() => setActiveButton(false)} />
      )}
      {activeButton === "theme" && (
        <Theme onClick={() => setActiveButton(false)} />
      )}
      {activeButton === "chatwallpaper" && (
        <Chatwalpaper onClick={() => setActiveButton(false)} />
      )}
      {activeButton === "mediaaudio" && (
        <Mediaauto onClick={() => setActiveButton(false)} />
      )}
      {activeButton === "accountinfo" && (
        <Accountinfor onClick={() => setActiveButton(false)} />
      )}
      {activeButton === "keyshort" && (
        <Keyshort onClick={() => setActiveButton(false)} />
      )}
      {activeButton === "help" && (
        <Help onClick={() => setActiveButton(false)} />
      )}
    </div>
  );
};

export default Sattings;
