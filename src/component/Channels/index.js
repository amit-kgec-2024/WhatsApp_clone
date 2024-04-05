import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import userChannelData from "../../utils/userChannelData";
import { GoPlus } from "react-icons/go";
import useClickOutside from "../../hooks/useClickOutside";
import Channelcard from "../card/Channelcard";

const Channels = () => {
  const [isClick, setIsclick] = useState(false);
  const dropDownRef = useRef(null);
  const buttonRef = useRef(null);
  const handleClick = () => setIsclick((prev) => !prev);

  useClickOutside([dropDownRef, buttonRef], () => {
    setIsclick(false);
  });
  return (
    <div className="w-full bg-dark6 h-screen">
      <div className="bg-dark3 p-4 pl-6 pt-16 flex flex-row justify-start items-center gap-8">
        <Link to="/" className="text-lg">
          <FaArrowLeft />
        </Link>
        <h1 className="text-lg font-semibold">Channels</h1>
        <div className="relative w-full flex justify-end">
          <button
            onClick={handleClick}
            ref={buttonRef}
            className={`flex justify-end text-3xl`}
          >
            <GoPlus
              className={`p-1 ${
                isClick ? "rounded-full text-3xl bg-dark5 p-1" : "bg-none"
              }`}
            />
          </button>
          {isClick && (
            <div
              ref={dropDownRef}
              className="absolute flex flex-col justify-start items-start py-2 bg-dark4 shadow-md w-44 mt-9 z-50 rounded-sm"
            >
              <button className="py-2 px-5 hover:bg-dark6 w-full text-start">
                Create channel
              </button>
              <button className="py-2 px-5 hover:bg-dark6 w-full text-start">
                Find channels
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="scrollbaruser overflow-y-scroll h-[630px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        {userChannelData.map((ele) => (
          <Channelcard
            key={ele.id}
            userimg={ele.userimg}
            username={ele.username}
            usertexts={ele.usertexts}
            usertime={ele.usertime}
          />
        ))}
      </div>
    </div>
  );
};

export default Channels;
