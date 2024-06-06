import React, { useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import useClickOutside from "../../hooks/useClickOutside";

const Achivedcard = ({ username, userchats, usertime, handelUserChatsClick }) => {
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
        onClick={() => handelUserChatsClick("userchats")}
        className="parent w-full flex flex-row justify-center items-start hover:bg-dark3"
      >
        <div className="p-3">
          <div className="w-12 h-12 border rounded-full overflow-hidden text-center bg-dark5">
            x
          </div>
        </div>
        <div className="user-top-border w-full py-3 flex flex-row justify-between items-center">
          <div className="flex flex-col items-start">
            <h1 className="font-semibold">{username}</h1>
            <h4 className="text-xs text-slate-400 font-thin">{userchats}</h4>
          </div>
          <div className="pr-4  float-right">
            <h3 className="text-xs text-slate-400">{usertime}</h3>
            <div className="relative">
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
                  className="absolute bg-dark3 right-4 mt-10 w-40 py-2 text-sm flex flex-col justify-start items-start z-50 rounded-sm"
                >
                  <button className="hover:bg-dark6 w-full text-start px-5 py-2">
                    Unarchive chat
                  </button>
                  <button className="hover:bg-dark6 w-full text-start px-5 py-2">
                    Delet chat
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
          </div>
        </div>
      </button>
    </div>
  );
};

export default Achivedcard;
