import React, { useRef, useState } from "react";
import { MdOutlineGroups } from "react-icons/md";
import { IoSyncCircleOutline } from "react-icons/io5";
import { RiChatVoiceFill, RiChatNewFill } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import useClickOutside from "../../hooks/useClickOutside";
import Profile from "../Profile";
import Communities from "../Communities";
import Status from "../Status";
import Channels from "../Channels";
import Newchats from "../Newchats";
import Newgroup from "../Newgroup";
import Sattings from "../Sattings";
import Newcommunity from "../Newcommunity";
import Starredmessage from "../Starredmessage"
import Modal from "../Modal";

const Navbar = () => {
  // Three dot................
  const [isClick, setIsclick] = useState(false);
  const dropDownRef = useRef(null);
  const buttonRef = useRef(null);
  
  useClickOutside([dropDownRef, buttonRef], () => {
    setIsclick(false);
  });
  // profile...............
  const [isModal, setIsModal] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };


  return (
    <div>
      <div
        className={`w-full bg-dark3 py-2 px-4 flex flex-row justify-between items-center ${
          activeButton ? "hidden" : ""
        }`}
      >
        <button
          onClick={() => handleButtonClick("profile")}
          className="rounded-full border-2 overflow-hidden bg-slate-500 border-white w-10 h-10"
        >
          <img src="amitimg.png" alt="Bird" />
        </button>
        <div className="flex flex-row gap-5 text-slate-400 text-xl">
          <button
            onClick={() => handleButtonClick("communities")}
            className={`p-1 ${
              activeButton ? "rounded-full bg-dark5" : "bg-none"
            }`}
          >
            <MdOutlineGroups />
          </button>
          <button
            onClick={() => handleButtonClick("status")}
            className={`p-1 ${
              activeButton ? "rounded-full bg-dark5" : "bg-none"
            }`}
          >
            <IoSyncCircleOutline />
          </button>
          <button
            onClick={() => handleButtonClick("channels")}
            className={`p-1 ${
              activeButton ? "rounded-full bg-dark5" : "bg-none"
            }`}
          >
            <RiChatVoiceFill />
          </button>
          <button
            onClick={() => handleButtonClick("newchats")}
            className={`p-1 ${
              activeButton ? "rounded-full bg-dark5" : "bg-none"
            }`}
          >
            <RiChatNewFill />
          </button>
          <div className="relative">
            <button
              onClick={() => setIsclick((prev) => !prev)}
              ref={buttonRef}
              className={`p-1 ${isClick ? "rounded-full bg-dark5" : "bg-none"}`}
            >
              <BsThreeDotsVertical />
            </button>
            {isClick && (
              <div
                ref={dropDownRef}
                className="absolute z-50 text-xs flex flex-col justify-start items-start py-2 bg-dark4 shadow-md w-52 right-0 mt-1 rounded-sm"
              >
                <button
                  onClick={() => handleButtonClick("newgroup")}
                  className="py-3 px-6 hover:bg-dark6 w-full text-start"
                >
                  New Group
                </button>
                <button
                  onClick={() => handleButtonClick("newcommunity")}
                  className="py-3 px-6 hover:bg-dark6 w-full text-start"
                >
                  New Community
                </button>
                <button
                  onClick={() => handleButtonClick("starrdemessage")}
                  className="py-3 px-6 hover:bg-dark6 w-full text-start"
                >
                  Starred messages
                </button>
                <button className="py-3 px-6 hover:bg-dark6 w-full text-start">
                  Select chats
                </button>
                <button
                  onClick={() => handleButtonClick("sattings")}
                  className="py-3 px-6 hover:bg-dark6 w-full text-start"
                >
                  Settings
                </button>
                <button className="py-3 px-6 hover:bg-dark6 w-full text-start">
                  Log out
                </button>
                <li className="user-top-border list-none w-full my-1" />
                <button
                  onClick={() => setIsModal((prev) => !prev)}
                  className="py-2 px-5 w-full hover:bg-dark6"
                >
                  Get WhatsApp for Windows
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {activeButton === "profile" && (
        <Profile onClick={() => setActiveButton(false)} />
      )}
      {activeButton === "communities" && (
        <Communities onClick={() => setActiveButton(false)} />
      )}
      {activeButton === "status" && (
        <Status onClick={() => setActiveButton(false)} />
      )}
      {activeButton === "channels" && (
        <Channels onClick={() => setActiveButton(false)} />
      )}
      {activeButton === "newchats" && (
        <Newchats onClick={() => setActiveButton(false)} />
      )}
      {activeButton === "newgroup" && (
        <Newgroup onClick={() => setActiveButton(false)} />
      )}
      {activeButton === "sattings" && (
        <Sattings onClick={() => setActiveButton(false)} />
      )}
      {activeButton === "newcommunity" && (
        <Newcommunity onClick={() => setActiveButton(false)} />
      )}
      {activeButton === "starrdemessage" && (
        <Starredmessage onClick={() => setActiveButton(false)} />
      )}
      {isModal && (
        <div className="absolute top-1 right-80">
          <Modal onClick={() => setIsModal(false)} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
