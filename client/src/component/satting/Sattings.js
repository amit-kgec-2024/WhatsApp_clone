import React, { useState, useEffect } from "react";
import { MdOutlineSearch } from "react-icons/md";
import {
  IoIosLogOut,
  IoIosHelpCircle,
  IoIosNotifications,
  IoIosInformationCircle,
} from "react-icons/io";
import { BsFillPatchPlusFill, BsFillChatSquareTextFill } from "react-icons/bs";
import { PiLockFill } from "react-icons/pi";
import { FaUserCircle } from "react-icons/fa";
import Profile from "../users/Profile";
import Privecy from "./Privecy";
import Notifications from "./Notifications";
import Keyshort from "./Keyshort";
import Help from "./Help";
import Account from "./Account";
import Chatsatting from "./Chatsatting";
import Authorization from "../Authorization";

const Sattings = ({theme}) => {
  const [activeButton, setActiveButton] = useState(null);
  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };
  const handleDeletAccountClick = () => {
    window.open(
      "https://faq.whatsapp.com/2138577903196467/?cms_platform=android&lang=en",
      "_blank"
    );
  };
  // User Details................................
  const [users] = useState(
    () => JSON.parse(localStorage.getItem("users:detail")) || {}
  );
  // profile images.....................
  const defaultImage = "/profiledefaultimage.jpg";
  const defaultName = "WhatsApp 0";
  const defaultAbout = "Hey there! I am using WhatsApp";
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://whats-app-clone-server-psi.vercel.app/api/userdetails/${users.id}`
        );
        const jsonData = await res.json();
        setUserData(jsonData);
      } catch (error) {
        console.log("Error Fetching Data", error);
      }
    };
    fetchData();
  }, [users.id]);
  // LOG Out................
  const [isLogout, setIsLogout] = useState(false);
  const logOut = () => {
    window.localStorage.removeItem("users:token");
    window.localStorage.removeItem("users:detail");
    setIsLogout(true);
  };
  if (isLogout) {
    return (
      <div className="absolute w-full left-0 text-black">
        <Authorization />
      </div>
    );
  }
  return (
    <div
      className="w-full h-screen flex flex-row"
      style={{ color: theme === "#000000" ? "#ffffff" : "#000000" }}
    >
      <div className={`${activeButton ? "hidden" : "w-full"}`}>
        <h1 className="text-xl font-bold p-5">Sattings</h1>
        <div className="my-2 mx-3 p-2 gap-3 flex flex-row rounded-md"
        style={{ backgroundColor: theme === "#000000" ? "#233138" : "#cbd5e1" }}>
          <button className="text-xl">
            <MdOutlineSearch />
          </button>
          <input
            type="text"
            placeholder="Search name or number"
            className="text-xs px-2 outline-none w-full"
            style={{ backgroundColor: theme === "#000000" ? "#233138" : "#cbd5e1" }}
          />
        </div>
        <div className="scrollbaruser overflow-y-scroll h-[550px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          <button
            onClick={() => handleButtonClick("profile")}
            className={`flex flex-row justify-start items-center w-full py-2 px-3 gap-3 ${theme === "#000000" ? "hover:bg-dark3" : "hover:bg-slate-200"}`}
          >
            <div
              className="w-20 h-20 overflow-hidden rounded-full border"
              style={{
                backgroundImage: `url(${userData.userimage || defaultImage})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            ></div>
            <h1 className="flex flex-col text-start">
              <span className="text-lg md:text-xl font-semibold">
                {userData.username || defaultName}
              </span>
              <span className="text-sm">
                {userData.userabout || defaultAbout}
              </span>
            </h1>
          </button>
          <div className="">
            <button
              onClick={() => handleButtonClick("account")}
              className={`flex flex-row w-full gap-6 pl-6 justify-start items-center ${theme === "#000000" ? "hover:bg-dark3" : "hover:bg-slate-200"}`}
            >
              <FaUserCircle className="text-2xl" />
              <span className="user-top-bottom-border text-start py-4 text-base w-full">
                Account
              </span>
            </button>
            <button
              onClick={() => handleButtonClick("privecy")}
              className={`flex flex-row w-full gap-6 pl-6 justify-start items-center ${theme === "#000000" ? "hover:bg-dark3" : "hover:bg-slate-200"}`}
            >
              <PiLockFill className="text-2xl" />
              <span className="user-top-bottom-border text-start py-4 text-base w-full">
                Privecy
              </span>
            </button>
            <button
              onClick={() => handleButtonClick("chats")}
              className={`flex flex-row w-full gap-6 pl-6 justify-start items-center ${theme === "#000000" ? "hover:bg-dark3" : "hover:bg-slate-200"}`}
            >
              <BsFillChatSquareTextFill className="text-2xl" />
              <span className="user-top-bottom-border text-start py-4 text-base w-full">
                Chats
              </span>
            </button>
            <button
              onClick={() => handleButtonClick("notification")}
              className={`flex flex-row w-full gap-6 pl-6 justify-start items-center ${theme === "#000000" ? "hover:bg-dark3" : "hover:bg-slate-200"}`}
            >
              <IoIosNotifications className="text-2xl" />
              <span className="user-top-bottom-border text-start py-4 text-base w-full">
                Notifications
              </span>
            </button>
            <button
              onClick={() => handleButtonClick("keyshort")}
              className={`flex flex-row w-full gap-6 pl-6 justify-start items-center ${theme === "#000000" ? "hover:bg-dark3" : "hover:bg-slate-200"}`}
            >
              <BsFillPatchPlusFill className="text-2xl" />
              <span className="user-top-bottom-border text-start py-4 text-base w-full">
                Keyboard shortcuts
              </span>
            </button>
            <button
              onClick={() => handleButtonClick("help")}
              className={`flex flex-row w-full gap-6 pl-6 justify-start items-center ${theme === "#000000" ? "hover:bg-dark3" : "hover:bg-slate-200"}`}
            >
              <IoIosHelpCircle className="text-2xl" />
              <span className="user-top-bottom-border text-start py-4 text-base w-full">
                Help
              </span>
            </button>
            <button
              onClick={handleDeletAccountClick}
              className={`flex flex-row w-full gap-6 pl-6 justify-start items-center ${theme === "#000000" ? "hover:bg-dark3" : "hover:bg-slate-200"}`}
            >
              <IoIosInformationCircle className="text-2xl" />
              <span className="user-top-bottom-border text-start py-4 text-base w-full">
                Delet account
              </span>
            </button>
            <button
              onClick={() => logOut()}
              className={`flex flex-row w-full gap-6 pl-6 text-red-600 justify-start items-center ${theme === "#000000" ? "hover:bg-dark3" : "hover:bg-slate-200"}`}
            >
              <IoIosLogOut className="text-2xl" />
              <span className="user-top-bottom-border text-start py-4 text-base w-full">
                Log out
              </span>
            </button>
          </div>
        </div>
      </div>
      {activeButton === "profile" && (
        <Profile theme={theme} onClick={() => setActiveButton(false)} />
      )}
      {activeButton === "account" && (
        <Account theme={theme} onClick={() => setActiveButton(false)} />
      )}
      {activeButton === "notification" && (
        <Notifications theme={theme} onClick={() => setActiveButton(false)} />
      )}
      {activeButton === "privecy" && (
        <Privecy theme={theme} onClick={() => setActiveButton(false)} />
      )}
      {activeButton === "chats" && (
        <Chatsatting theme={theme} onClick={() => setActiveButton(false)} />
      )}
      {activeButton === "keyshort" && (
        <Keyshort theme={theme} onClick={() => setActiveButton(false)} />
      )}
      {activeButton === "help" && (
        <Help theme={theme} onClick={() => setActiveButton(false)} />
      )}
    </div>
  );
};

export default Sattings;
