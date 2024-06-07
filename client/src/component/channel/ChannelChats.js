import React, { useEffect, useRef, useState } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import { FaPlus } from "react-icons/fa6";
import {MdOutlineNotificationsActive,MdOutlineNotificationsOff} from "react-icons/md";
import {MdKeyboardVoice} from "react-icons/md";
import { IoLink } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import Searchmessage from "../menu/Searchmessage";
import { BiHappy } from "react-icons/bi";
import ChannelProfile from "./ChannelProfile";
import SenderChannelChats from "./SenderChannelChats";
import EmojiSection from "../EmojiSection";
import FileUploadSection from "../FileUploadSection";

const ChannelChats = ({ channelId, theme }) => {
  const [activeNavbar, setActiveNavbar] = useState(null);
  const handleNavbarClick = (navbarIndex) => {
    setActiveNavbar(navbarIndex);
  };
  const [isNotification, setIsNotification] = useState(true);
  const handelNotification = () => {
    setIsNotification(false);
  };
  // Video call modal................
  const [isClick, setIsclick] = useState(false);
  const dropDownRef = useRef(null);
  const buttonRef = useRef(null);
  useClickOutside([dropDownRef, buttonRef], () => {
    setIsclick(false);
  });
  // three dot..................
  const [isClickMenu, setIsclickMenu] = useState(false);
  const dropDownRefMenu = useRef(null);
  const buttonRefMenu = useRef(null);
  useClickOutside([dropDownRefMenu, buttonRefMenu], () => {
    setIsclickMenu(false);
  });
  // Plus.................
  const [isClickDocument, setIsclickDocument] = useState(false);
  const dropDownRefDocument = useRef(null);
  const buttonRefDocument = useRef(null);
  useClickOutside([dropDownRefDocument, buttonRefDocument], () => {
    setIsclickDocument(false);
  });
  // Emoji.................
  const [isClickEmoji, setIsclickEmoji] = useState(false);
  const dropDownRefEmoji = useRef(null);
  const buttonRefEmoji = useRef(null);
  useClickOutside([dropDownRefEmoji, buttonRefEmoji], () => {
    setIsclickEmoji(false);
  });

  // User Details
  const [users] = useState(
    () => JSON.parse(localStorage.getItem("users:detail")) || {}
  );
  const [isAllChannel, setIsAllChannel] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://whats-app-clone-server-psi.vercel.app/api/channel/details/${channelId}`
        );
        const jsonData = await res.json();
        setIsAllChannel(jsonData);
      } catch (error) {
        console.log("Error Fetching Data", error);
      }
    };
    fetchData();
  }, [channelId]);
  // Messages Posts.................
  const [message, setMessage] = useState("");

  const handleInputMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      await sendMessage();
    }
  };

  const sendMessage = async () => {
    console.log(channelId, message);
    try {
      const response = await fetch(
        "https://whats-app-clone-server-psi.vercel.app/api/channelchats/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            channelId,
            message,
          }),
        }
      );
      await response.json();
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  // Chats GET......................
  const [chatsChannel, setChatsChannel] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://whats-app-clone-server-psi.vercel.app/api/channelchats/chatShow/${channelId}`
        );
        const jsonData = await res.json();
        setChatsChannel(jsonData);
      } catch (error) {
        console.log("Error Fetching Data", error);
      }
    };
    fetchData();
  }, [channelId]);
  return (
    <div
      className=" w-full h-full pd-2"
      style={{
        backgroundColor: theme === "#000000" ? "#111b21" : "#F8F8F8",
        color: theme === "#000000" ? "#ffffff" : "#000000",
      }}
    >
      <div className="flex flex-row w-full justify-between">
        <div
          className={`h-screen flex flex-col justify-between ${
            activeNavbar ? "w-[60%]" : "w-full"
          }`}
        >
          <div className="w-full py-2 px-4 h-14 flex flex-row justify-between items-center">
            <button
              onClick={() => handleNavbarClick("profiledetails")}
              className="flex flex-row gap-3 w-full"
            >
              <div
                className="w-8 h-8 rounded-full overflow-hidden"
                style={{
                  backgroundImage: `url(${isAllChannel?.channelDetails?.channelimage})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              />
              <h2 className="flex flex-col items-start">
                {isAllChannel?.channelDetails?.channelname}
                <span className="text-xs font-light">
                  {isAllChannel?.memberDetails?.length} Followers
                </span>
              </h2>
            </button>
            <div className="flex flex-row gap-6 pr-2">
              {isAllChannel?.channelDetails?.channeladminId === users.id ? (
                <button
                  onClick={() => setIsclick((prev) => !prev)}
                  className={`flex flex-row justify-center items-center text-xl p-1 text-slate-400 gap-1 ${
                    isClick ? "rounded-full bg-dark5" : "bg-none"
                  }`}
                >
                  <IoLink />
                </button>
              ) : (
                <div className="flex items-center">
                  {isNotification ? (
                    <button
                      onClick={handelNotification}
                      className="text-xl text-slate-400"
                    >
                      <MdOutlineNotificationsActive />
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsNotification(true)}
                      className="text-xl text-slate-400"
                    >
                      <MdOutlineNotificationsOff />
                    </button>
                  )}
                </div>
              )}
              <div className="relative">
                <button
                  onClick={() => setIsclickMenu((prev) => !prev)}
                  ref={buttonRefMenu}
                  className={`text-xl p-1 ${
                    isClickMenu
                      ? theme === "#000000"
                        ? "rounded-full bg-dark5"
                        : "rounded-full bg-slate-200"
                      : "bg-none"
                  }`}
                >
                  <BsThreeDotsVertical />
                </button>
                {isClickMenu && (
                  <div
                    ref={dropDownRefMenu}
                    className={`absolute right-5 mt-2 ${
                      theme === "#000000" ? "bg-dark5" : "bg-slate-200"
                    } w-48 py-2 text-sm flex flex-col`}
                  >
                    <button
                      className={`py-2 px-6 ${
                        theme === "#000000"
                          ? "hover:bg-dark6"
                          : "hover:bg-slate-100"
                      } w-full text-start`}
                    >
                      Channel info
                    </button>
                    <button
                      className={`py-2 px-6 ${
                        theme === "#000000"
                          ? "hover:bg-dark6"
                          : "hover:bg-slate-100"
                      } w-full text-start`}
                    >
                      Channel setting
                    </button>
                    <button
                      className={`py-2 px-6 ${
                        theme === "#000000"
                          ? "hover:bg-dark6"
                          : "hover:bg-slate-100"
                      } w-full text-start`}
                    >
                      Select updates
                    </button>
                    <button
                      className={`py-2 px-6 ${
                        theme === "#000000"
                          ? "hover:bg-dark6"
                          : "hover:bg-slate-100"
                      } w-full text-start`}
                    >
                      Close channel
                    </button>
                    <button
                      className={`py-2 px-6 ${
                        theme === "#000000"
                          ? "hover:bg-dark6"
                          : "hover:bg-slate-100"
                      } w-full text-start`}
                    >
                      Dispanding messages
                    </button>
                    <button
                      className={`py-2 px-6 ${
                        theme === "#000000"
                          ? "hover:bg-dark6"
                          : "hover:bg-slate-100"
                      } w-full text-start`}
                    >
                      Report
                    </button>
                    <button
                      className={`py-2 px-6 ${
                        theme === "#000000"
                          ? "hover:bg-dark6"
                          : "hover:bg-slate-100"
                      } w-full text-start`}
                    >
                      Unfollow
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Chats pannel */}
          <div
            className="scrollbaruser w-full h-screen md:px-16 py-1 md:py-3 overflow-y-scroll"
            style={{
              backgroundImage: "url(wpbg.jpg)",
              backgroundattachment: "fixed",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className="chat-container w-full flex flex-col items-center justify-center">
              {chatsChannel?.map((ele, indx) => (
                <SenderChannelChats
                  key={indx}
                  message={ele.message}
                  timestamp={ele.timestamp}
                />
              ))}
            </div>
          </div>
          {/* oooooo Buttom emoj input file oooooooo */}
          {isClickEmoji && (
            <div ref={dropDownRefEmoji}>
              <EmojiSection theme={theme} />
            </div>
          )}
          <div className="w-full py-3 px-4 flex flex-row gap-4">
            <div className="relative">
              {isClickDocument && (
                <div ref={dropDownRefDocument}>
                  <FileUploadSection theme={theme} />
                </div>
              )}
              <button
                onClick={() => setIsclickDocument((prev) => !prev)}
                ref={buttonRefDocument}
                className={`text-2xl text-slate-300 p-1 ${
                  isClickDocument
                    ? theme === "#000000"
                      ? "bg-dark6 rounded-full rotate-45"
                      : "bg-slate-200 rounded-full rotate-45"
                    : "bg-none"
                }`}
              >
                <FaPlus />
              </button>
            </div>
            <div
              className={`flex items-center w-full px-2 rounded-md ${
                theme === "#000000" ? "bg-dark5" : "bg-slate-200"
              }`}
            >
              <button
                ref={buttonRefEmoji}
                onClick={() => setIsclickEmoji((prev) => !prev)}
                className={`text-2xl text-slate-300 ${
                  isClickEmoji ? "text-teal-700" : "text-slate-400"
                }`}
              >
                <BiHappy />
              </button>
              <input
                type="text"
                value={message}
                onChange={handleInputMessage}
                onKeyPress={handleKeyPress}
                placeholder="Type a message"
                className={`text-sm py-2 px-4 w-full outline-none ${
                  theme === "#000000" ? "bg-dark5" : "bg-slate-200"
                } text-slate-400`}
              />
            </div>
            <button className="text-2xl text-slate-300">
              <MdKeyboardVoice />
            </button>
          </div>
        </div>
        <div className={`${activeNavbar ? "w-[40%]" : ""}`}>
          {activeNavbar === "searchchats" && (
            <Searchmessage onClick={() => setActiveNavbar(false)} />
          )}
          {activeNavbar === "profiledetails" && (
            <ChannelProfile
              theme={theme}
              onClick={() => setActiveNavbar(false)}
              channelId={channelId}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChannelChats;
