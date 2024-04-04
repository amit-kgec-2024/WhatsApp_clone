import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { MdOutlineGroups } from "react-icons/md";
import { IoSyncCircleOutline } from "react-icons/io5";
import { RiChatVoiceFill, RiChatNewFill } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import useClickOutside from "../../hooks/useClickOutside";

const Navbar = () => {
  const [isClick, setIsclick] = useState(false);
  const dropDownRef = useRef(null);
  const buttonRef = useRef(null);
  const handleClick = () => setIsclick((prev) => !prev);

  useClickOutside([dropDownRef, buttonRef], () => {
    setIsclick(false);
  });

  return (
    <div>
      <div className="w-full bg-dark3 py-2 px-4 flex flex-row justify-between items-center">
        <NavLink
          to="/profile"
          className="rounded-full border-2 bg-slate-500 border-white w-10 h-10"
        ></NavLink>
        <div className="flex flex-row gap-2 text-2xl">
          <NavLink to="/communities" className={"p-2"}>
            <MdOutlineGroups />
          </NavLink>
          <NavLink to="/status" className={"p-2"}>
            <IoSyncCircleOutline />
          </NavLink>
          <NavLink to="/channels" className={"p-2"}>
            <RiChatVoiceFill />
          </NavLink>
          <NavLink to="/newchats" className={"p-2"}>
            <RiChatNewFill />
          </NavLink>
          <button
            onClick={handleClick}
            ref={buttonRef}
            className={`p-2 ${isClick ? "rounded-full bg-dark5" : "bg-none"}`}
          >
            <BsThreeDotsVertical />
          </button>
        </div>
      </div>
      {isClick && (
        <div
          ref={dropDownRef}
          className="flex flex-col justify-start items-start py-2 bg-dark4 shadow-md w-60 float-right mr-4 -mt-1 rounded-sm"
        >
          <button className="py-2 px-5 hover:bg-dark6 w-full text-start">
            New Group
          </button>
          <button className="py-2 px-5 hover:bg-dark6 w-full text-start">
            New Community
          </button>
          <button className="py-2 px-5 hover:bg-dark6 w-full text-start">
            Starred messages
          </button>
          <button className="py-2 px-5 hover:bg-dark6 w-full text-start">
            Select chats
          </button>
          <button className="py-2 px-5 hover:bg-dark6 w-full text-start">
            Settings
          </button>
          <button className="py-2 px-5 hover:bg-dark6 w-full text-start">
            Log out
          </button>
          <li className="border list-none w-full my-2" />
          <button className="py-2 px-5 w-full hover:bg-dark6">
            Get WhatsApp for Windows
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
