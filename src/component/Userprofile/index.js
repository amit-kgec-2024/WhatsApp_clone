import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FaAngleRight } from "react-icons/fa6";
import { IoStar, IoNotificationsSharp, IoTimer } from "react-icons/io5";
import { IoMdLock } from "react-icons/io";
import { MdOutlineBlock, MdDelete } from "react-icons/md";
import { BiSolidDislike } from "react-icons/bi";
import Starredmessage from "../Starredmessage";
import Medialink from "../contactinfo/Medialink";
import Disappearing from "../contactinfo/Disappearing";
import Userpimage from "../contactinfo/Userpimage";
import Encryption from "../contactinfo/Encryption";

const Userprofile = ({ onClick }) => {
  const [activeButton, setActiveButton] = useState(null);
  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };
  const [isProfilePicture, setProfilePicture] = useState(false);
  return (
    <div className="user-left-border w-full h-screen bg-dark2">
      <div className={`${activeButton ? "hidden" : ""}`}>
        <div className="flex flex-row gap-10 h-14 justify-start items-center bg-dark3">
          <button onClick={onClick} className="ml-8">
            <RxCross2 />
          </button>
          <h1>Contact info</h1>
        </div>
        <div className="scrollbaruser overflow-y-scroll h-screen">
          <div className="w-full flex p-6 flex-col justify-center items-center bg-dark1">
            <button
              onClick={() => setProfilePicture((prev) => !prev)}
              className="w-48 h-48 rounded-full overflow-hidden"
            >
              <img src="amitimg.png" alt="Bird" />
            </button>
            {isProfilePicture && (
              <div className="absolute w-full h-screen left-0 top-0">
                <Userpimage onClick={() => setProfilePicture(false)} />
              </div>
            )}
            <h1 className="font-semibold text-2xl mt-3">Amit Mandal</h1>
            <h2 className="font-light">+91 8513089660</h2>
          </div>
          <div className="bg-dark1 mt-2 py-6 px-8">
            <h1 className="font-light mb-2">About</h1>
            <p>Hey there! I am using WhatsApp</p>
          </div>
          <div className="bg-dark1">
            <button
              onClick={() => handleButtonClick("medialinks")}
              className="flex flex-row w-full text-sm text-slate-300 justify-between items-center bg-dark1 mt-2 py-4 px-8"
            >
              <h1 className="font-light">Media, links and docs</h1>
              <h1 className="flex flex-row items-center gap-1 font-light">
                16
                <FaAngleRight />
              </h1>
            </button>
            <div className="w-full h-[130px]"></div>
          </div>
          <div className="w-full py-4 bg-dark1 mt-4 px-8">
            <button
              onClick={() => handleButtonClick("starredmessages")}
              className="flex flex-row justify-between items-center py-4 w-full"
            >
              <div className="flex flex-row items-center gap-5">
                <IoStar />
                <h1>Starred messages</h1>
              </div>
              <FaAngleRight />
            </button>
            <button className="flex flex-row justify-between items-center py-4 w-full">
              <div className="flex flex-row items-center gap-5">
                <IoNotificationsSharp />
                <h1>Mute notifications</h1>
              </div>
              <FaAngleRight />
            </button>
            <button
              onClick={() => handleButtonClick("disappearingmessages")}
              className="flex flex-row justify-between items-center py-4 w-full"
            >
              <div className="flex flex-row items-center gap-5">
                <IoTimer />
                <h1 className="flex flex-col items-start">
                  Diseppearing messages{" "}
                  <span className="text-xs font-light">Off</span>
                </h1>
              </div>
              <FaAngleRight />
            </button>
            <button
              onClick={() => handleButtonClick("encryption")}
              className="py-4 w-full"
            >
              <div className="flex flex-row items-center gap-5">
                <IoMdLock />
                <h1 className="flex flex-col items-start">
                  Encryption{" "}
                  <span className="text-xs font-light">
                    Messages are End-to-end encrypted. Click to verify.
                  </span>
                </h1>
              </div>
            </button>
          </div>
          <div className="w-full py-4 bg-dark1 mt-4 mb-20">
            <button className="flex flex-row items-center py-4 gap-6 text-xl font-light px-10 text-red-700 w-full hover:bg-dark3">
              <MdOutlineBlock />
              <h1>Block Amit Mandal</h1>
            </button>
            <button className="flex flex-row items-center py-4 gap-6 text-xl font-light px-10 text-red-700 w-full hover:bg-dark3">
              <BiSolidDislike />
              <h1>Report Amit Mandal</h1>
            </button>
            <h1 className="text-sm font-light py-2 text-slate-400">
              Delet chat
            </h1>
            <button className="flex flex-row items-center py-4 gap-6 text-xl font-light px-10 text-red-700 w-full hover:bg-dark3">
              <MdDelete />
              <h1>Delet chat</h1>
            </button>
          </div>
        </div>
      </div>
      {activeButton === "starredmessages" && (
        <Starredmessage onClick={() => setActiveButton(false)} />
      )}
      {activeButton === "medialinks" && (
        <Medialink onClick={() => setActiveButton(false)} />
      )}
      {activeButton === "disappearingmessages" && (
        <Disappearing onClick={() => setActiveButton(false)} />
      )}
      {activeButton === "encryption" && (
        <Encryption onClick={() => setActiveButton(false)} />
      )}
    </div>
  );
};

export default Userprofile;
