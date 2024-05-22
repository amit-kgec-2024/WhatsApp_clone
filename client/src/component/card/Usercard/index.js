import React, { useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import useClickOutside from "../../../hooks/useClickOutside";

const Usercard = ({
  username,
  userimage,
  userId,
  lastmessage,
  timestamp,
  readmsg,
  handelUserChatsClick,
}) => {
  const [isClick, setIsclick] = useState(false);
  const dropDownRef = useRef(null);
  const buttonRef = useRef(null);
  const handleClick = () => setIsclick((prev) => !prev);

  useClickOutside([dropDownRef, buttonRef], () => {
    setIsclick(false);
  });

  return (
    <div className="">
      <button
        onClick={() => handelUserChatsClick("userchats", userId)}
        className="parent w-full flex flex-row justify-center items-start gap-2 hover:bg-dark3"
      >
        <div className="p-3">
          <div
            className="w-12 h-12 border rounded-full overflow-hidden text-center bg-dark5"
            style={{
              backgroundImage: `url(${userimage})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
          </div>
        </div>
        <div className="user-top-border w-full py-3 flex flex-row justify-between items-center">
          <div className="flex flex-col items-start">
            <h1 className="font-light">{username}</h1>
            <h4 className="text-xs text-slate-400 font-thin">{lastmessage}</h4>
          </div>
          <div className="pr-4 float-right">
            <h3 className="text-xs text-slate-400">{timestamp}</h3>
            <div className="relative flex justify-around">
              {readmsg === "true" ? (
                <h1 className="text-xs bg-teal-500 rounded-full text-black w-6 h-6  p-1">
                  15
                </h1>
              ) : (
                ""
              )}
              <button
                onClick={handleClick}
                ref={buttonRef}
                className="-mr-4 opacity-0 float-right"
              >
                <IoIosArrowDown />
              </button>
              {isClick && (
                <div
                  ref={dropDownRef}
                  className="absolute z-50 -ml-32 bg-dark4 w-44 shadow-2xl text-xs py-2 flex flex-col justify-start items-start rounded-sm"
                >
                  <button className="hover:bg-dark6 w-full text-start px-5 py-3">
                    Archive chat
                  </button>
                  <button className="hover:bg-dark6 w-full text-start px-5 py-3">
                    Mute notifications
                  </button>
                  <button className="hover:bg-dark6 w-full text-start px-5 py-3">
                    Delet chat
                  </button>
                  <button className="hover:bg-dark6 w-full text-start px-5 py-3">
                    Pin chat
                  </button>
                  <button className="hover:bg-dark6 w-full text-start px-5 py-3">
                    Mark as unread
                  </button>
                  <button className="hover:bg-dark6 w-full text-start px-5 py-3">
                    Block
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};

export default Usercard;
