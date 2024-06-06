import React, { useState } from "react";
// import Statuscard from "../card/Statuscard";
import { RxCross1 } from "react-icons/rx";
import { FaArrowLeft } from "react-icons/fa6";
import { BsEmojiSmile } from "react-icons/bs";
import { PiSticker } from "react-icons/pi";
import { IoSendSharp } from "react-icons/io5";
import Input from "../Input";

const Status = () => {
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
      <div className="w-full bg-dark6 ">
        <h1 className="text-xl font-bold p-5 bg-dark6">Status</h1>
        <button
          onClick={() => handelStatus("status")}
          className="flex flex-row justify-start items-center gap-4 px-4 py-6"
        >
          <div className="w-10 h-10 rounded-full border overflow-hidden">
            <img src="help.png" alt="Bird" />
          </div>
          <div className="text-start">
            <h1 className="text-xl">My status</h1>
            <h4 className="text-xs">No updates</h4>
          </div>
        </button>
        <div className="scrollbaruser overflow-y-scroll h-[580px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          <h1 className="text-whitmix1 w-full px-10 py-3 uppercase">Recent</h1>
          <div className="mt-3 bg-dark6">
            {/* {userStatusData.map(
              (ele) =>
                ele.viewstatus === "true" && (
                  <Statuscard
                    key={ele.id}
                    userimg={ele.userimg}
                    username={ele.username}
                    userday={ele.userday}
                    viewstatus={ele.viewstatus}
                    handelStatus={handelStatus}
                    usertime={ele.usertime}
                  />
                )
            )} */}
            Comming Soon....
          </div>
        </div>
      </div>

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

export default Status;
