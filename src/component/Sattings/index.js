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
import { TbHexagonLetterA } from "react-icons/tb";
import { VscColorMode } from "react-icons/vsc";
import { PiLockFill } from "react-icons/pi";
import Profile from "../Profile";


const Sattings = ({ onClick }) => {
  const [isProfile, setIsProfile] = useState(false);
  const handelProfile = () => {
    setIsProfile((prev) => !prev);
  };
  const handleProfileNone = () => {
    setIsProfile(false);
  };
  return (
    <div className="w-full bg-dark6 h-screen">
      <div className="bg-dark3 p-4 pl-6 pt-16 flex flex-row justify-start items-center gap-8">
        <button onClick={onClick} className="text-lg">
          <FaArrowLeft />
        </button>
        <div className="text-lg font-semibold">Sattings</div>
      </div>
      <div className="bg-dark3 my-2 mx-6 p-2 gap-3 flex flex-row rounded-md">
        <button className="text-xl">
          <MdOutlineSearch />
        </button>
        <input
          type="text"
          placeholder="Search name or number"
          className="user-top-bottom-border px-2 outline-none bg-dark3 w-full"
        />
      </div>
      <div className="scrollbaruser overflow-y-scroll h-[500px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        <button
          onClick={handelProfile}
          className="flex flex-row justify-start items-center w-full py-2 px-6 gap-5 hover:bg-dark3"
        >
          <div className="w-20 h-20 overflow-hidden rounded-full border">
            <img src="amitimg.png" alt="Bird" />
          </div>
          <h1 className="flex flex-col">
            <span>Amit Mandal</span>
            <span className="text-sm">Hi its WhatsApp Clone Copy</span>
          </h1>
        </button>
        <div className="">
          <button className="flex flex-row gap-6 px-6 justify-start items-center hover:bg-dark3">
            <IoIosNotifications className="text-2xl" />
            <span className="user-top-bottom-border py-4 text-lg w-full">
              Notifications
            </span>
          </button>
          <button className="flex flex-row gap-6 px-6 justify-start items-center hover:bg-dark3">
            <PiLockFill className="text-2xl" />
            <span className="user-top-bottom-border py-4 text-lg w-full">
              Privecy
            </span>
          </button>
          <button className="flex flex-row gap-6 px-6 justify-start items-center hover:bg-dark3">
            <MdOutlineSecurity className="text-2xl" />
            <span className="user-top-bottom-border py-4 text-lg w-full">
              Security
            </span>
          </button>
          <button className="flex flex-row gap-6 px-6 justify-start items-center hover:bg-dark3">
            <VscColorMode className="text-2xl" />
            <span className="user-top-bottom-border py-4 text-lg w-full">
              Them
            </span>
          </button>
          <button className="flex flex-row gap-6 px-6 justify-start items-center hover:bg-dark3">
            <MdOutlineWallpaper className="text-2xl" />
            <span className="user-top-bottom-border py-4 text-lg w-full">
              Chat wallpaper
            </span>
          </button>
          <button className="flex flex-row gap-6 px-6 justify-start items-center hover:bg-dark3">
            <FaDownLong className="text-2xl" />
            <span className="user-top-bottom-border py-4 text-lg w-full">
              Media auto-download
            </span>
          </button>
          <button className="flex flex-row gap-6 px-6 justify-start items-center hover:bg-dark3">
            <FaFileLines className="text-2xl" />
            <span className="user-top-bottom-border py-4 text-lg w-full">
              Request account info
            </span>
          </button>
          <button className="flex flex-row gap-6 px-6 justify-start items-center hover:bg-dark3">
            <TbHexagonLetterA className="text-2xl" />
            <span className="user-top-bottom-border py-4 text-lg w-full">
              Keyboard shortcuts
            </span>
          </button>
          <button className="flex flex-row gap-6 px-6 justify-start items-center hover:bg-dark3">
            <IoIosHelpCircle className="text-2xl" />
            <span className="user-top-bottom-border py-4 text-lg w-full">
              Help
            </span>
          </button>
          <button className="flex flex-row gap-6 px-6 text-red-600 justify-start items-center hover:bg-dark3">
            <IoIosLogOut className="text-2xl" />
            <span className="user-top-bottom-border py-4 text-lg w-full">
              Log out
            </span>
          </button>
        </div>
      </div>
      {isProfile && (
        <div className="absolute top-0 z-50 w-[406px]">
          <Profile onClick={handleProfileNone} />
        </div>
      )}
    </div>
  );
};

export default Sattings;
