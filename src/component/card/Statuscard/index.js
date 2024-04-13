import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { FaArrowLeft } from "react-icons/fa6";
import { BsEmojiSmile } from "react-icons/bs";
import { PiSticker } from "react-icons/pi";
import { IoSendSharp } from "react-icons/io5";
import Input from "../../Input";

const Statuscard = ({ userimg, userday, username, usertime }) => {
  const [activeStatus, setActiveStatus] = useState(null);
  const handelStatus = (toggleStatus) => {
    setActiveStatus(toggleStatus);
  };

  const [activeReplay, setActiveReplay] = useState(null);
  const handelReplay = (toggleReplay) => {
    setActiveReplay(toggleReplay);
  };
  return (
    <div className="">
      <button
        onClick={() => handelStatus("status")}
        className="parent w-full flex flex-row justify-center items-start hover:bg-dark3"
      >
        <div className="p-3">
          <div className="w-10 h-10 border-2 border-green-400 rounded-full overflow-hidden text-center bg-dark5">
            <img src={userimg} alt="Bird" />
          </div>
        </div>
        <div className="user-top-border w-full py-3 flex flex-col justify-start items-start">
          <h1 className="font-semibold">{username}</h1>
          <div className="flex flex-row gap-2 text-slate-400">
            <h4 className="text-sm font-thin">{userday} at</h4>
            <h3 className="text-sm">{usertime}</h3>
          </div>
        </div>
      </button>
      {activeStatus === "status" && (
        <div className="absolute w-full h-screen top-0 left-0 bg-dark1 opacity-85 z-50 flex flex-col justify-between items-center">
          <div className="w-full flex flex-row justify-between text-white items-start text-2xl p-6">
            <button onClick={() => setActiveStatus(false)}>
              <FaArrowLeft />
            </button>
            <button onClick={() => setActiveStatus(false)}>
              <RxCross1 />
            </button>
          </div>
          <div className="w-full flex justify-center">
            <div className="opacity-100 w-[30%]">
              <img src="amitimg.png" alt="Bird" />
            </div>
          </div>
          <div className="flex flex-col">
            {activeReplay === "emoji" && (
              <div className="bg-red-400 h-[100px]">
                <div className="">Emoji</div>
              </div>
            )}
            {activeReplay === "sticker" && (
              <div className="bg-blue-400 h-[100px]">sticker</div>
            )}
            <div className="bg-dark3 px-6 text-2xl w-[650px] rounded-xl flex flex-row justify-between gap-4">
              {activeReplay && (
                <button onClick={() => setActiveReplay(false)}>
                  <RxCross1 />
                </button>
              )}
              <button
                onClick={() => handelReplay("emoji")}
                className={`${
                  activeReplay === "emoji" ? "text-teal-500" : "text-slate-400"
                }`}
              >
                <BsEmojiSmile />
              </button>
              <button
                onClick={() => handelReplay("sticker")}
                className={`${
                  activeReplay === "sticker"
                    ? "text-teal-500"
                    : "text-slate-400"
                }`}
              >
                <PiSticker />
              </button>
              <Input
                placeholder="Type a replay..."
                className="outline-none bg-dark5 w-96 px-3 py-2 text-2xl"
              />
              <button>
                <IoSendSharp />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Statuscard;
