import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { MdOutlineGroups } from "react-icons/md";
import { IoSyncCircleOutline } from "react-icons/io5";
import { RiChatVoiceFill, RiChatNewFill } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";

const Navbar = () => {
  const [isClick, setIsclick] = useState(false);
  const handelClick = () => {
    setIsclick(!isClick);
  };
  return (
    <div>
      <div className="w-full bg-slate-600 py-3 px-4 flex flex-row justify-between items-center">
        <NavLink
          to="/profile"
          className="rounded-full border-2 bg-slate-500 border-white w-10 h-10"
        ></NavLink>
        <div className="flex flex-row gap-8 text-2xl">
          <NavLink to="/communities">
            <MdOutlineGroups />
          </NavLink>
          <NavLink to="/status">
            <IoSyncCircleOutline />
          </NavLink>
          <NavLink to="/channels">
            <RiChatVoiceFill />
          </NavLink>
          <NavLink to="/newchats">
            <RiChatNewFill />
          </NavLink>
          <button onClick={handelClick}>
            <BsThreeDotsVertical />
          </button>
        </div>
      </div>
      {isClick && (
        <div className="flex flex-col justify-start items-start bg-slate-400 w-60 float-right mr-4 -mt-2 rounded-sm">
          <button className="py-3 px-4">New Group</button>
          <button className="py-3 px-4">New Community</button>
          <button className="py-3 px-4">Starred messages</button>
          <button className="py-3 px-4">Select chats</button>
          <button className="py-3 px-4">Settings</button>
          <button className="py-3 px-4">Log out</button>
          <button className="py-3 px-4 border-t-2 w-full">Get WhatsApp for Windows</button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
