import React, { useEffect, useRef, useState } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import { IoVideocam } from "react-icons/io5";
import { FaAngleDown, FaPlus} from "react-icons/fa6";
import { IoMdSearch } from "react-icons/io";
import {MdKeyboardVoice} from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import Searchmessage from "../menu/Searchmessage";
import Modal from "../menu/Modal";
import { BiHappy } from "react-icons/bi";
import Userprofile from "./Userprofile";
import SenderChatPanel from "./SenderChatPanel";
import ReceiverChatPanel from "./ReceiverChatPanel";
import FileUploadSection from "../FileUploadSection";
import EmojiSection from "../EmojiSection";

const Chats = ({ userId, theme }) => {
  const [isModal, setIsModal] = useState(false);
  const [activeNavbar, setActiveNavbar] = useState(null);
  const handleNavbarClick = (navbarIndex) => {
    setActiveNavbar(navbarIndex);
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

  // User Details........................
  const defaultImage = "/profiledefaultimage.jpg";
  const [userDetails, setUserDetails] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://whats-app-clone-server-psi.vercel.app/api/userdetails/${userId}`
        );
        const jsonData = await res.json();
        setUserDetails(jsonData);
      } catch (error) {
        console.log("Error Fetching Data", error);
      }
    };
    fetchData();
  }, [userId]);
  // Chats...........POST.......................
  const [message, setMessage] = useState("");
  const handelInputMessage = (e) => {
    setMessage(e.target.value);
  };
  // User Details
  const [users] = useState(
    () => JSON.parse(localStorage.getItem("users:detail")) || {}
  );
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };
  const handleSendMessage = () => {
    const data = {
      sender: userId,
      receiver: users.id,
      message: message,
    };

    fetch("https://whats-app-clone-server-psi.vercel.app/api/post/chats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setMessage("");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // Chats.............GET...................
  const [getChats, stGetChats] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://whats-app-clone-server-psi.vercel.app/api/get/chats"
        );
        const jsonData = await res.json();
        stGetChats(jsonData);
      } catch (error) {
        console.log("Error Fetching Data", error);
      }
    };
    fetchData();
  }, []);
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
                  backgroundImage: `url(${
                    userDetails.userimage || defaultImage
                  })`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              />
              <h2 className="flex flex-col items-start">
                {userDetails.username || userDetails.mobile}
                <span className="text-xs font-light">online</span>
              </h2>
            </button>
            <div className="flex flex-row gap-6 pr-2">
              <div className="relative">
                <button
                  onClick={() => setIsclick((prev) => !prev)}
                  ref={buttonRef}
                  className={`flex flex-row justify-center items-center text-xl p-1 text-slate-600 gap-1 ${
                    isClick
                      ? theme === "#000000"
                        ? "rounded-full bg-dark5"
                        : "rounded-full bg-slate-200"
                      : "bg-none"
                  }`}
                >
                  <IoVideocam />
                  <FaAngleDown />
                </button>
                {isClick && (
                  <div
                    ref={dropDownRef}
                    className={`absolute right-5 mt-2 ${
                      theme === "#000000" ? "bg-dark5" : "bg-slate-200"
                    } w-[450px] rounded-lg gap-5 p-3 flex flex-row`}
                  >
                    <p className="flex flex-col py-3">
                      Make calls with the Windows app{" "}
                      <span className="text-xs">
                        Download WhatsApp for windown to start making calls.
                      </span>
                    </p>
                    <button
                      onClick={() => setIsModal((prev) => !prev)}
                      className="bg-green-600 text-xs font-semibold text-black px-4 my-4 rounded-full"
                    >
                      Get the app
                    </button>
                  </div>
                )}
                {isModal && (
                  <div className="absolute -top-7 right-80">
                    <Modal onClick={() => setIsModal(false)} />
                  </div>
                )}
              </div>
              <button
                onClick={() => handleNavbarClick("searchchats")}
                className={`text-xl p-1`}
              >
                <IoMdSearch />
              </button>
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
                      Contact info
                    </button>
                    <button
                      className={`py-2 px-6 ${
                        theme === "#000000"
                          ? "hover:bg-dark6"
                          : "hover:bg-slate-100"
                      } w-full text-start`}
                    >
                      Select messages
                    </button>
                    <button
                      className={`py-2 px-6 ${
                        theme === "#000000"
                          ? "hover:bg-dark6"
                          : "hover:bg-slate-100"
                      } w-full text-start`}
                    >
                      Close chat
                    </button>
                    <button
                      className={`py-2 px-6 ${
                        theme === "#000000"
                          ? "hover:bg-dark6"
                          : "hover:bg-slate-100"
                      } w-full text-start`}
                    >
                      Mute notifications
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
                      Clear chat
                    </button>
                    <button
                      className={`py-2 px-6 ${
                        theme === "#000000"
                          ? "hover:bg-dark6"
                          : "hover:bg-slate-100"
                      } w-full text-start`}
                    >
                      Delet chat
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
                      Block
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
            <div className="chat-container">
              {Array.isArray(getChats) && getChats.length > 0 ? (
                getChats.map((chat) => {
                  if (
                    (chat.sender === users.id && chat.receiver === userId) ||
                    (chat.sender === userId && chat.receiver === users.id)
                  ) {
                    return (
                      <div key={chat._id}>
                        {chat.sender === userId ? (
                          <ReceiverChatPanel
                            key={chat._id}
                            chatId={chat._id}
                            message={chat.message}
                            time={chat.timestamp?.time}
                          />
                        ) : (
                          <SenderChatPanel
                            key={chat._id}
                            chatId={chat._id}
                            message={chat.message}
                            time={chat.timestamp?.time}
                          />
                        )}
                      </div>
                    );
                  }
                  return null;
                })
              ) : (
                <p>No chats available</p>
              )}
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
                onChange={handelInputMessage}
                onKeyPress={handleKeyPress}
                placeholder="Type a message"
                className={`text-sm py-2 mx-2 w-full outline-none ${
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
            <Searchmessage
              theme={theme}
              userId={userId}
              onClick={() => setActiveNavbar(false)}
            />
          )}
          {activeNavbar === "profiledetails" && (
            <Userprofile
              userId={userId}
              onClick={() => setActiveNavbar(false)}
              theme={theme}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Chats;
