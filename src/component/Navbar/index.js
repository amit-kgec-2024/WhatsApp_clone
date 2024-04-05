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

const Navbar = () => {
  // Three dot................
  const [isClick, setIsclick] = useState(false);
  const dropDownRef = useRef(null);
  const buttonRef = useRef(null);
  const handleClick = () => setIsclick((prev) => !prev);

  useClickOutside([dropDownRef, buttonRef], () => {
    setIsclick(false);
  });
  // profile...............
  const [isProfile, setIsProfile] = useState(false);
  const [isCommunities, setIsCommunities] = useState(false);
  const [isStatus, setIsStatus] = useState(false);
  const [isChannels, setIsChannels] = useState(false);
  const [isNewchats, setIsNewchats] = useState(false);
  const handelProfile = () => {
    setIsProfile((prev) => !prev);
  };
  const handelCommunities = () => {
    setIsCommunities((prev) => !prev);
  };
  const handelStatus = () => {
    setIsStatus((prev) => !prev);
  };
  const handelChannels = () => {
    setIsChannels((prev) => !prev);
  };
  const handelNewchats = () => {
    setIsNewchats((prev) => !prev);
  };
  const handleProfileNone = () => {
    setIsProfile(false);
  };
  const handleCommunitiesNone = () => {
    setIsCommunities(false);
  };
  const handleStatusNone = () => {
    setIsStatus(false);
  };
  const handleChannelsNone = () => {
    setIsChannels(false);
  };
  const handleNewchatsNone = () => {
    setIsNewchats(false);
  };
  // Menu....................
  const [isNewgroup, setIsNewgroup] = useState(false);
  const [isSattings, setIsSattings] = useState(false);
  const handelNewgroup = () => {
    setIsNewgroup((prev) => !prev);
  };
  const handelSattins = () => {
    setIsSattings((prev) => !prev);
  };
  const handelNewgroupNone = () => {
    setIsNewgroup(false);
  };
  const handelSattinsNone = () => {
    setIsSattings(false);
  };
  return (
    <div>
      <div className="w-full bg-dark3 py-2 px-4 flex flex-row justify-between items-center">
        <button
          onClick={handelProfile}
          className="rounded-full border-2 overflow-hidden bg-slate-500 border-white w-10 h-10"
        >
          <img src="amitimg.png" alt="Bird" />
        </button>
        <div className="flex flex-row gap-2 text-2xl">
          <button
            onClick={handelCommunities}
            className={`p-2 ${
              isChannels ? "rounded-full bg-dark5" : "bg-none"
            }`}
          >
            <MdOutlineGroups />
          </button>
          <button
            onClick={handelStatus}
            className={`p-2 ${
              isChannels ? "rounded-full bg-dark5" : "bg-none"
            }`}
          >
            <IoSyncCircleOutline />
          </button>
          <button
            onClick={handelChannels}
            className={`p-2 ${
              isChannels ? "rounded-full bg-dark5" : "bg-none"
            }`}
          >
            <RiChatVoiceFill />
          </button>
          <button
            onClick={handelNewchats}
            className={`p-2 ${
              isChannels ? "rounded-full bg-dark5" : "bg-none"
            }`}
          >
            <RiChatNewFill />
          </button>
          <div className="relative">
            <button
              onClick={handleClick}
              ref={buttonRef}
              className={`p-2 ${isClick ? "rounded-full bg-dark5" : "bg-none"}`}
            >
              <BsThreeDotsVertical />
            </button>
            {isClick && (
              <div
                ref={dropDownRef}
                className="absolute z-50 text-sm flex flex-col justify-start items-start py-2 bg-dark4 shadow-md w-60 right-0 mt-1 rounded-sm"
              >
                <button
                  onClick={handelNewgroup}
                  className="py-3 px-6 hover:bg-dark6 w-full text-start"
                >
                  New Group
                </button>
                <button className="py-3 px-6 hover:bg-dark6 w-full text-start">
                  New Community
                </button>
                <button className="py-3 px-6 hover:bg-dark6 w-full text-start">
                  Starred messages
                </button>
                <button className="py-3 px-6 hover:bg-dark6 w-full text-start">
                  Select chats
                </button>
                <button
                  onClick={handelSattins}
                  className="py-3 px-6 hover:bg-dark6 w-full text-start"
                >
                  Settings
                </button>
                <button className="py-3 px-6 hover:bg-dark6 w-full text-start">
                  Log out
                </button>
                <li className="user-top-border list-none w-full my-2" />
                <button className="py-2 px-5 w-full hover:bg-dark6">
                  Get WhatsApp for Windows
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {isProfile && (
        <div className="absolute -mt-14 z-50 w-[406px]">
          <Profile onClick={handleProfileNone} />
        </div>
      )}
      {isCommunities && (
        <div className="absolute -mt-14 z-50 w-[406px]">
          <Communities onClick={handleCommunitiesNone} />
        </div>
      )}
      {isStatus && (
        <div className="absolute -mt-14 z-50 w-[406px]">
          <Status onClick={handleStatusNone} />
        </div>
      )}
      {isChannels && (
        <div className="absolute -mt-14 z-50 w-[406px]">
          <Channels onClick={handleChannelsNone} />
        </div>
      )}
      {isNewchats && (
        <div className="absolute -mt-14 z-50 w-[406px]">
          <Newchats onClick={handleNewchatsNone} />
        </div>
      )}
      {isNewgroup && (
        <div className="absolute -mt-14 z-50 w-[406px]">
          <Newgroup onClick={handelNewgroupNone} />
        </div>
      )}
      {isSattings && (
        <div className="absolute -mt-14 z-50 w-[406px]">
          <Sattings onClick={handelSattinsNone} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
