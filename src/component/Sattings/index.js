import React, { useState } from "react";
import { MdOutlineSearch} from "react-icons/md";
import {
  IoIosLogOut,
  IoIosHelpCircle,
  IoIosNotifications,
  IoIosInformationCircle,
} from "react-icons/io";
import { BsFillPatchPlusFill, BsFillChatSquareTextFill } from "react-icons/bs";
import { PiLockFill } from "react-icons/pi";
import { FaUserCircle } from "react-icons/fa";
import Profile from "../Profile";
import Privecy from "../satting/Privecy";
import Notifications from "../satting/Notifications";
import Keyshort from "../satting/Keyshort";
import Help from "../satting/Help";
import Account from "../satting/Account";
import Chatsatting from "../satting/Chatsatting";


const Sattings = () => {
  const [activeButton, setActiveButton] = useState(null);
  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };
  const handleDeletAccountClick = () => {
    window.open("https://faq.whatsapp.com/2138577903196467/?cms_platform=android&lang=en", "_blank");
  };
  return (
    <div className="w-full bg-dark6 h-screen flex flex-row">
      <div className={`${activeButton ? "hidden" : "w-full"}`}>
        <h1 className="text-xl font-bold p-5 bg-dark6">Sattings</h1>
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
        <div className="scrollbaruser overflow-y-scroll h-[550px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
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
              onClick={() => handleButtonClick("account")}
              className="flex flex-row w-full gap-6 pl-6 justify-start items-center hover:bg-dark3"
            >
              <FaUserCircle className="text-2xl" />
              <span className="user-top-bottom-border text-start py-4 text-base w-full">
                Account
              </span>
            </button>
            <button
              onClick={() => handleButtonClick("privecy")}
              className="flex flex-row w-full gap-6 pl-6 justify-start items-center hover:bg-dark3"
            >
              <PiLockFill className="text-2xl" />
              <span className="user-top-bottom-border text-start py-4 text-base w-full">
                Privecy
              </span>
            </button>
            <button
              onClick={() => handleButtonClick("chats")}
              className="flex flex-row w-full gap-6 pl-6 justify-start items-center hover:bg-dark3"
            >
              <BsFillChatSquareTextFill className="text-2xl" />
              <span className="user-top-bottom-border text-start py-4 text-base w-full">
                Chats
              </span>
            </button>
            <button
              onClick={() => handleButtonClick("notification")}
              className="flex flex-row w-full gap-6 pl-6 justify-start items-center hover:bg-dark3"
            >
              <IoIosNotifications className="text-2xl" />
              <span className="user-top-bottom-border text-start py-4 text-base w-full">
                Notifications
              </span>
            </button>
            <button
              onClick={() => handleButtonClick("keyshort")}
              className="flex flex-row w-full gap-6 pl-6 justify-start items-center hover:bg-dark3"
            >
              <BsFillPatchPlusFill className="text-2xl" />
              <span className="user-top-bottom-border text-start py-4 text-base w-full">
                Keyboard shortcuts
              </span>
            </button>
            <button
              onClick={() => handleButtonClick("help")}
              className="flex flex-row w-full gap-6 pl-6 justify-start items-center hover:bg-dark3"
            >
              <IoIosHelpCircle className="text-2xl" />
              <span className="user-top-bottom-border text-start py-4 text-base w-full">
                Help
              </span>
            </button>
            <button
              onClick={handleDeletAccountClick}
              className="flex flex-row w-full gap-6 pl-6 justify-start items-center hover:bg-dark3"
            >
              <IoIosInformationCircle className="text-2xl" />
              <span className="user-top-bottom-border text-start py-4 text-base w-full">
                Delet account
              </span>
            </button>
            <button className="flex flex-row w-full gap-6 pl-6 text-red-600 justify-start items-center hover:bg-dark3">
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
      {activeButton === "account" && (
        <Account onClick={() => setActiveButton(false)} />
      )}
      {activeButton === "notification" && (
        <Notifications onClick={() => setActiveButton(false)} />
      )}
      {activeButton === "privecy" && (
        <Privecy onClick={() => setActiveButton(false)} />
      )}
      {activeButton === "chats" && (
        <Chatsatting onClick={() => setActiveButton(false)} />
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
