import React, { useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import useClickOutside from "../../hooks/useClickOutside";

const Usercard = ({ username, userchats, usertime }) => {
  const [isClick, setIsclick] = useState(false);
  const dropDownRef = useRef(null);
  const buttonRef = useRef(null);
  const handleClick = () => setIsclick((prev) => !prev);

  useClickOutside([dropDownRef, buttonRef], () => {
    setIsclick(false);
  });

  return (
    <div className="">
      <button className="parent overflow-hidden w-full flex flex-row justify-center items-start hover:bg-dark3">
        <div className="p-3">
          <div className="w-12 h-12 border rounded-full overflow-hidden text-center bg-dark5">
            x
          </div>
        </div>
        <div className="user-top-border w-full py-3 flex flex-row justify-between items-center">
          <div className="flex flex-col items-start">
            <h1 className="font-semibold">{username}</h1>
            <h4 className="text-sm font-thin">{userchats}</h4>
          </div>
          <div className="pr-4  float-right">
            <h3 className="">{usertime}</h3>
            <button
              onClick={handleClick}
              ref={buttonRef}
              className="-mr-8 float-right"
            >
              <IoIosArrowDown />
            </button>
          </div>
        </div>
      </button>
      {isClick && (
        <div
          ref={dropDownRef}
          className="absolute bg-dark3 py-2 flex flex-col justify-start items-start z-50 rounded-md"
        >
          <button className="hover:bg-dark6 w-full text-start px-5 py-2">
            Archive chat
          </button>
          <button className="hover:bg-dark6 w-full text-start px-5 py-2">
            Mute notifications
          </button>
          <button className="hover:bg-dark6 w-full text-start px-5 py-2">
            Delet chat
          </button>
          <button className="hover:bg-dark6 w-full text-start px-5 py-2">
            Pin chat
          </button>
          <button className="hover:bg-dark6 w-full text-start px-5 py-2">
            Mark as unread
          </button>
          <button className="hover:bg-dark6 w-full text-start px-5 py-2">
            Block
          </button>
        </div>
      )}
    </div>
  );
};

export default Usercard;
