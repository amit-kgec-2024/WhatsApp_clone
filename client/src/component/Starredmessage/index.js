import React, { useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import useClickOutside from "../../hooks/useClickOutside";


const Starredmessage = ({onClick}) => {
  const [isClick, setIsclick] = useState(false);
  const dropDownRef = useRef(null);
  const buttonRef = useRef(null);
  const handleClick = () => setIsclick((prev) => !prev);

  useClickOutside([dropDownRef, buttonRef], () => {
    setIsclick(false);
  });
  return (
    <div className="profile-animation w-full bg-dark6 h-screen">
      <div className="p-4 pl-6 flex flex-row justify-between items-center gap-8">
        <div className="flex flex-row gap-4">
          <button onClick={onClick} className="text-xl px-3">
            <FaArrowLeft />
          </button>
        <h1 className="text-lg font-bold">Starred messages</h1>
        </div>
        <div className="">
          <button
            onClick={handleClick}
            ref={buttonRef}
            className={`p-2 ${isClick ? "rounded-full bg-dark4 " : "bg-none"}`}
          >
            <BsThreeDotsVertical />
          </button>
          {isClick && (
            <div
              ref={dropDownRef}
              className="absolute right-4 mt-5  bg-dark3 shadow-2xl text-xs py-2 flex flex-col justify-start items-start z-50 rounded-sm"
            >
              <button className="w-full text-start px-4">Unstar all</button>
            </div>
          )}
        </div>
      </div>
      <div className="">
        <h4 className="text-xs text-slate-400 w-full text-center mt-[250px]">
          No starred messages
        </h4>
        <h4 className="user-top-border mt-[250px] w-full text-xs text-slate-400 text-center  py-3">
          Use WhatsApp on your phone to see older chats and messages.
        </h4>
      </div>
    </div>
  );
};

export default Starredmessage;
