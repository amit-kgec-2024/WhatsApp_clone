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
  const [isProfile, setIsProfile] = useState(false);
  const [isCommunities, setIsCommunities] = useState(false);
  const [isStatus, setIsStatus] = useState(false);
  const [isChannels, setIsChannels] = useState(false);
  const [isNewchats, setIsNewchats] = useState(false);
  const [isNewgroup, setIsNewgroup] = useState(false);
  const [isSattings, setIsSattings] = useState(false);
  const [isNewcommunity, setIsNewcommunity] = useState(false);
  const [isStarredmessage, setIsStarredmessage] = useState(false);
  const [isModal, setIsModal] = useState(false);


  return (
    <div>
      <div className="w-full bg-dark3 py-2 px-4 flex flex-row justify-between items-center">
        <button
          onClick={() => setIsProfile((prev) => !prev)}
          className="rounded-full border-2 overflow-hidden bg-slate-500 border-white w-10 h-10"
        >
          <img src="amitimg.png" alt="Bird" />
        </button>
        <div className="flex flex-row gap-5 text-slate-400 text-xl">
          <button
            onClick={() => setIsCommunities((prev) => !prev)}
            className={`p-1 ${
              isChannels ? "rounded-full bg-dark5" : "bg-none"
            }`}
          >
            <MdOutlineGroups />
          </button>
          <button
            onClick={() => setIsStatus((prev) => !prev)}
            className={`p-1 ${
              isChannels ? "rounded-full bg-dark5" : "bg-none"
            }`}
          >
            <IoSyncCircleOutline />
          </button>
          <button
            onClick={() => setIsChannels((prev) => !prev)}
            className={`p-1 ${
              isChannels ? "rounded-full bg-dark5" : "bg-none"
            }`}
          >
            <RiChatVoiceFill />
          </button>
          <button
            onClick={() => setIsNewchats((prev) => !prev)}
            className={`p-1 ${
              isChannels ? "rounded-full bg-dark5" : "bg-none"
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
                  onClick={() => setIsNewgroup((prev) => !prev)}
                  className="py-3 px-6 hover:bg-dark6 w-full text-start"
                >
                  New Group
                </button>
                <button
                  onClick={() => setIsNewcommunity((prev) => !prev)}
                  className="py-3 px-6 hover:bg-dark6 w-full text-start"
                >
                  New Community
                </button>
                <button
                  onClick={() => setIsStarredmessage((prev) => !prev)}
                  className="py-3 px-6 hover:bg-dark6 w-full text-start"
                >
                  Starred messages
                </button>
                <button className="py-3 px-6 hover:bg-dark6 w-full text-start">
                  Select chats
                </button>
                <button
                  onClick={() => setIsSattings((prev) => !prev)}
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
      {isProfile && (
        <div className={`absolute -mt-14 z-50 w-[447px]`}>
          <Profile onClick={() => setIsProfile(false)} />
        </div>
      )}
      {isCommunities && (
        <div className="absolute -mt-14 z-50 w-[447px]">
          <Communities onClick={() => setIsCommunities(false)} />
        </div>
      )}
      {isStatus && (
        <div className="absolute -mt-14 z-50 w-[447px]">
          <Status onClick={() => setIsStatus(false)} />
        </div>
      )}
      {isChannels && (
        <div className="absolute -mt-14 z-50 w-[447px]">
          <Channels onClick={() => setIsChannels(false)} />
        </div>
      )}
      {isNewchats && (
        <div className="absolute -mt-14 z-50 w-[447px]">
          <Newchats onClick={() => setIsNewchats(false)} />
        </div>
      )}
      {isNewgroup && (
        <div className="absolute -mt-14 z-50 w-[447px]">
          <Newgroup onClick={() => setIsNewgroup(false)} />
        </div>
      )}
      {isSattings && (
        <div className="absolute -mt-14 z-50 w-[447px]">
          <Sattings onClick={() => setIsSattings(false)} />
        </div>
      )}
      {isNewcommunity && (
        <div className="absolute -mt-14 z-50 w-[447px]">
          <Newcommunity onClick={() => setIsNewcommunity(false)} />
        </div>
      )}
      {isStarredmessage && (
        <div className="absolute -mt-14 z-50 w-[447px]">
          <Starredmessage onClick={() => setIsStarredmessage(false)} />
        </div>
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
