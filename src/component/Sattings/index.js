import React from "react";
import { Link, NavLink } from "react-router-dom";
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

const Sattings = () => {
  return (
    <div className="w-full bg-dark6 h-screen">
      <div className="bg-dark3 p-4 pl-6 pt-16 flex flex-row justify-start items-center gap-8">
        <Link to="/" className="text-lg">
          <FaArrowLeft />
        </Link>
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
        <NavLink
          to="/profile"
          className="flex flex-row justify-start items-center w-full py-2 px-6 gap-5 hover:bg-dark3"
        >
          <div className="w-20 h-20 rounded-full border">
            <img src="logo192.png" alt="Bird" />
          </div>
          <h1 className="flex flex-col">
            <span>Amit Mandal</span>
            <span className="text-sm">Hi its WhatsApp Clone Copy</span>
          </h1>
        </NavLink>
        <div className="">
          <NavLink className="flex flex-row gap-6 px-6 justify-start items-center hover:bg-dark3">
            <IoIosNotifications className="text-2xl" />
            <span className="user-top-bottom-border py-4 text-lg w-full">
              Notifications
            </span>
          </NavLink>
          <NavLink className="flex flex-row gap-6 px-6 justify-start items-center hover:bg-dark3">
            <PiLockFill className="text-2xl" />
            <span className="user-top-bottom-border py-4 text-lg w-full">
              Privecy
            </span>
          </NavLink>
          <NavLink className="flex flex-row gap-6 px-6 justify-start items-center hover:bg-dark3">
            <MdOutlineSecurity className="text-2xl" />
            <span className="user-top-bottom-border py-4 text-lg w-full">
              Security
            </span>
          </NavLink>
          <NavLink className="flex flex-row gap-6 px-6 justify-start items-center hover:bg-dark3">
            <VscColorMode className="text-2xl" />
            <span className="user-top-bottom-border py-4 text-lg w-full">
              Them
            </span>
          </NavLink>
          <NavLink className="flex flex-row gap-6 px-6 justify-start items-center hover:bg-dark3">
            <MdOutlineWallpaper className="text-2xl" />
            <span className="user-top-bottom-border py-4 text-lg w-full">
              Chat wallpaper
            </span>
          </NavLink>
          <NavLink className="flex flex-row gap-6 px-6 justify-start items-center hover:bg-dark3">
            <FaDownLong className="text-2xl" />
            <span className="user-top-bottom-border py-4 text-lg w-full">
              Media auto-download
            </span>
          </NavLink>
          <NavLink className="flex flex-row gap-6 px-6 justify-start items-center hover:bg-dark3">
            <FaFileLines className="text-2xl" />
            <span className="user-top-bottom-border py-4 text-lg w-full">
              Request account info
            </span>
          </NavLink>
          <NavLink className="flex flex-row gap-6 px-6 justify-start items-center hover:bg-dark3">
            <TbHexagonLetterA className="text-2xl" />
            <span className="user-top-bottom-border py-4 text-lg w-full">
              Keyboard shortcuts
            </span>
          </NavLink>
          <NavLink className="flex flex-row gap-6 px-6 justify-start items-center hover:bg-dark3">
            <IoIosHelpCircle className="text-2xl" />
            <span className="user-top-bottom-border py-4 text-lg w-full">
              Help
            </span>
          </NavLink>
          <NavLink className="flex flex-row gap-6 px-6 text-red-600 justify-start items-center hover:bg-dark3">
            <IoIosLogOut className="text-2xl" />
            <span className="user-top-bottom-border py-4 text-lg w-full">
              Log out
            </span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sattings;
