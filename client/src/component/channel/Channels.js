import React, { useEffect, useRef, useState } from "react";
import { GoPlus } from "react-icons/go";
import useClickOutside from "../../hooks/useClickOutside";
import Channelcard from "../card/Channelcard";
import CreateChannel from "./CreateChannel";
import { RiChatVoiceFill } from "react-icons/ri";
import { MdOutlinePublic, MdPrivacyTip } from "react-icons/md";
import { FaChevronRight, FaRegEyeSlash } from "react-icons/fa";
import Findchannel from "./Findchannel";
import CardDefault from "./CardDefault";
import LoaderCard from "../card/LoaderCard";

const Channels = ({ handelUserChatsClick }) => {
  const [isClick, setIsclick] = useState(false);
  const dropDownRef = useRef(null);
  const buttonRef = useRef(null);
  const handleClick = () => setIsclick((prev) => !prev);

  useClickOutside([dropDownRef, buttonRef], () => {
    setIsclick(false);
  });

  const [onClickShow, setOnClickShow] = useState(false);
  const [isChannel, setIsChannel] = useState(null);
  const handelToggelChannel = (toggleChannel) => {
    setIsChannel(toggleChannel);
  };

  // Admin channel Gets...................................
  const [users] = useState(
    () => JSON.parse(localStorage.getItem("users:detail")) || {}
  );
  const [isAdmin, setIsAdmin] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://whats-app-clone-server-psi.vercel.app/api/channel/admin/${users.id}`
        );
        if (!res.ok) {
          throw new Error("Network response was not ok " + res.statusText);
        }
        const jsonData = await res.json();
        setIsAdmin(jsonData);
      } catch (error) {
        console.error("Error Fetching Data", error);
      }
    };

    fetchData();
  }, [users.id]);
  return (
    <div className="w-full bg-dark6 h-screen">
      <div className={`${isChannel ? "hidden" : ""}`}>
        <div className="p-4 pl-6 flex flex-row justify-items-center">
          <h1 className="text-lg font-bold">Channels</h1>
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
                <button
                  onClick={() => setOnClickShow((prev) => !prev)}
                  className="py-2 px-5 hover:bg-dark6 w-full text-start"
                >
                  Create channel
                </button>
                <button className="py-2 px-5 hover:bg-dark6 w-full text-start">
                  Find channels
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="scrollbaruser overflow-y-scroll h-[650px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          {isAdmin && isAdmin.lastChats && isAdmin.lastChats.length > 0 ? (
            <ul>
              {isAdmin.lastChats.map((channel) => (
                <Channelcard
                  key={channel._id}
                  channelId={channel?.channelDetails?._id}
                  channelimage={channel?.channelDetails?.channelimage}
                  channelname={channel?.channelDetails?.channelname}
                  message={channel?.lastChat?.message}
                  time={channel?.lastChat?.timestamp}
                  handelUserChatsClick={handelUserChatsClick}
                />
              ))}
            </ul>
          ) : (
            <LoaderCard
              setIsChannel={setIsChannel}
              handelUserChatsClick={handelUserChatsClick}
            />
          )}
          <div className="w-full px-3">
            <div className="flex flex-row justify-between items-center my-3">
              <h1>Find channel</h1>
              <button
                onClick={() => handelToggelChannel("findchannel")}
                className="flex text-sm items-center gap-1 text-whitmix1 font-bold"
              >
                See all <FaChevronRight />
              </button>
            </div>
            <CardDefault />
          </div>
        </div>
      </div>
      {isChannel === "channelcreate" && (
        <CreateChannel setIsChannel={setIsChannel} />
      )}
      {isChannel === "findchannel" && (
        <Findchannel
          setIsChannel={setIsChannel}
          handelUserChatsClick={handelUserChatsClick}
        />
      )}
      {onClickShow && (
        <div className="w-full h-screen z-50 top-0 left-0 absolute flex justify-center items-center bg-dark1 bg-opacity-85">
          <div className="w-[35%] px-10 bg-dark5 flex flex-col items-center rounded-md py-2">
            <RiChatVoiceFill className="w-32 h-32 text-whitmix1" />
            <h1 className="font-bold text-xl p-3">
              Create a channel to reach unlimited followers
            </h1>
            <div className="flex flex-row text-2xl items-center gap-5 py-3">
              <MdOutlinePublic className="text-whitmix1" />
              <div className="flex flex-col justify-start">
                <h1 className="text-xl">Anyone can discover your channel</h1>
                <h2 className="text-sm text-slate-400">
                  Channels are public, so anyone can find them and see 30 days
                  of history.
                </h2>
              </div>
            </div>
            <div className="flex flex-row text-2xl items-center gap-5 py-3">
              <FaRegEyeSlash className="text-whitmix1" />
              <div className="flex flex-col justify-start">
                <h1 className="text-xl">People see your channel, not you</h1>
                <h2 className="text-sm text-slate-400">
                  Followers can't see your phone number, profile picture or
                  name, but other admins can.
                </h2>
              </div>
            </div>
            <div className="flex flex-row text-2xl items-center gap-5 py-3">
              <MdPrivacyTip className="text-whitmix1" />
              <div className="flex flex-col justify-start">
                <h1 className="text-xl">You're responsible for your channel</h1>
                <h2 className="text-sm text-slate-400">
                  Your channel needs to follow our guidelines and is reviewed
                  against them.
                </h2>
              </div>
            </div>
            <div className="w-full flex justify-end py-3 gap-5">
              <button
                onClick={() => setOnClickShow(false)}
                className="px-3 py-1 rounded-full border border-slate-400 font-bold text-whitmix2 hover:text-whitmix1"
              >
                Close
              </button>
              <button
                onClick={() =>
                  handelToggelChannel("channelcreate", setOnClickShow(false))
                }
                className="px-3 py-1 rounded-full shadow-sm bg-whitmix1 font-bold text-black hover:bg-whitmix2"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Channels;
