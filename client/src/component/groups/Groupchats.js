import React, { useEffect, useRef, useState } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import { IoVideocam } from "react-icons/io5";
import { FaAngleDown, FaPlus, FaUserLarge } from "react-icons/fa6";
import { IoMdSearch, IoMdCamera } from "react-icons/io";
import {
  MdKeyboardVoice,
  MdPhotoLibrary,
  MdOutlineGifBox,
} from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import Searchmessage from "../menu/Searchmessage";
import Modal from "../menu/Modal";
import { HiDocumentText, HiBars3BottomLeft } from "react-icons/hi2";
import { BiHappy } from "react-icons/bi";
import { PiStickerFill } from "react-icons/pi";
import Groupprofile from "./Groupprofile";
import SenderGroupChatPanel from "./SenderGroupChatPanel";
import ReciverGroupChatPanel from "./ReciverGroupChatPanel";

const Groupchats = ({ groupId }) => {
  const [isModal, setIsModal] = useState(false);
  const [activeNavbar, setActiveNavbar] = useState(null);
  const handleNavbarClick = (navbarIndex) => {
    setActiveNavbar(navbarIndex);
  };
  const [activeBottomNavbar, setActiveBottomNavbar] = useState("emoji");
  const handleBottomNavbarClick = (navbarBottomIndex) => {
    setActiveBottomNavbar(navbarBottomIndex);
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

  const defauGroupImage = "/defaultgroupimage.png";

  // Group details........GET..........
  const [groupDetails, setGroupDetails] = useState(null);
  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const response = await fetch(
          `https://whats-app-clone-server-psi.vercel.app/api/show/groups/${groupId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch group details");
        }
        const data = await response.json();
        setGroupDetails(data.data[0]);
      } catch (error) {
        console.error("Error fetching group details:", error);
      }
    };

    fetchGroupDetails();
  }, [groupId]);
  // User Details
  const [users] = useState(
    () => JSON.parse(localStorage.getItem("users:detail")) || {}
  );
  // Group Chats Post............................
  const [message, setMessage] = useState("");
  const handelInputMessage = (e) => {
    setMessage(e.target.value);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendGroupMessage();
    }
  };
  const handleSendGroupMessage = () => {
    const data = {
      userId: users.id,
      message: message,
    };

    fetch(
      `https://whats-app-clone-server-psi.vercel.app/api/group/chats/post/${groupId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
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
  const [groupChats, setGroupChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch(
          `https://whats-app-clone-server-psi.vercel.app/api/group/chats/get/${groupId}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setGroupChats(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, [groupId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className=" w-full h-full pd-2">
      <div className="flex flex-row w-full justify-between">
        <div
          className={`h-screen flex flex-col justify-between ${
            activeNavbar ? "w-[60%]" : "w-full"
          }`}
        >
          <div className="w-full bg-dark5 py-2 px-4 h-14 flex flex-row justify-between items-center">
            <button
              onClick={() => handleNavbarClick("profiledetails")}
              className="flex flex-row gap-3 w-full"
            >
              <div
                className="w-8 h-8 rounded-full overflow-hidden"
                style={{
                  backgroundImage: `url(${
                    groupDetails?.groupimage || defauGroupImage
                  })`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              />
              <h2 className="flex flex-col items-start">
                {groupDetails?.groupname}
                <span className="text-xs font-light">online</span>
              </h2>
            </button>
            <div className="flex flex-row gap-6 pr-2">
              <div className="relative">
                <button
                  onClick={() => setIsclick((prev) => !prev)}
                  ref={buttonRef}
                  className={`flex flex-row justify-center items-center text-xl p-1 text-slate-600 gap-1 ${
                    isClick ? "rounded-full bg-dark5" : "bg-none"
                  }`}
                >
                  <IoVideocam />
                  <FaAngleDown />
                </button>
                {isClick && (
                  <div
                    ref={dropDownRef}
                    className="absolute right-5 mt-2 bg-dark5 w-[450px] rounded-lg gap-5 p-3 flex flex-row"
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
                    isClickMenu ? "rounded-full bg-dark5" : "bg-none"
                  }`}
                >
                  <BsThreeDotsVertical />
                </button>
                {isClickMenu && (
                  <div
                    ref={dropDownRefMenu}
                    className="absolute right-5 mt-2 bg-dark5 w-48 py-2 text-sm flex flex-col"
                  >
                    <button className="py-2 px-6 hover:bg-dark6 w-full text-start">
                      Contact info
                    </button>
                    <button className="py-2 px-6 hover:bg-dark6 w-full text-start">
                      Select messages
                    </button>
                    <button className="py-2 px-6 hover:bg-dark6 w-full text-start">
                      Close chat
                    </button>
                    <button className="py-2 px-6 hover:bg-dark6 w-full text-start">
                      Mute notifications
                    </button>
                    <button className="py-2 px-6 hover:bg-dark6 w-full text-start">
                      Dispanding messages
                    </button>
                    <button className="py-2 px-6 hover:bg-dark6 w-full text-start">
                      Clear chat
                    </button>
                    <button className="py-2 px-6 hover:bg-dark6 w-full text-start">
                      Delet chat
                    </button>
                    <button className="py-2 px-6 hover:bg-dark6 w-full text-start">
                      Report
                    </button>
                    <button className="py-2 px-6 hover:bg-dark6 w-full text-start">
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
              {Array.isArray(groupChats) && groupChats.length > 0 ? (
                groupChats.map((chat) => {
                  if (chat.receiver === groupId) {
                    return (
                      <div key={chat._id}>
                        {chat.sender === users.id ? (
                          <ReciverGroupChatPanel
                            chatId={chat._id}
                            message={chat.message}
                            time={chat.timestamp?.time}
                          />
                        ) : (
                          <SenderGroupChatPanel
                            chatId={chat._id}
                            message={chat.message}
                            time={chat.timestamp?.time}
                            senderDetails={chat.senderDetails}
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
          <div className="">
            {isClickEmoji && (
              <div
                ref={dropDownRefEmoji}
                className="absolute shadow-lg bg-dark6 bottom-16 ml-28 w-96 h-[70%] flex flex-col justify-between rounded-lg"
              >
                <div className="user-top-bottom-border py-3">
                  {activeBottomNavbar === "emoji" && "Emoji"}
                  {activeBottomNavbar === "gif" && "GIF"}
                  {activeBottomNavbar === "sticker" && "Sticker"}
                </div>
                <div className="scrollbaruser bg-red-400 h-full p-3 overflow-y-scroll">
                  {activeBottomNavbar === "emoji" && "Emoji"}
                  {activeBottomNavbar === "gif" && "GIF"}
                  {activeBottomNavbar === "sticker" && "Sticker"}
                </div>
                <div className="flex flex-row justify-center items-center py-3 gap-3">
                  <button
                    onClick={() => handleBottomNavbarClick("emoji")}
                    className={`text-2xl  
                  ${
                    activeBottomNavbar === "emoji"
                      ? "text-teal-700"
                      : "text-slate-300"
                  }`}
                  >
                    <BiHappy />
                  </button>
                  <button
                    onClick={() => handleBottomNavbarClick("gif")}
                    className={`text-2xl ${
                      activeBottomNavbar === "gif"
                        ? "text-teal-700"
                        : "text-slate-300"
                    }`}
                  >
                    <MdOutlineGifBox />
                  </button>
                  <button
                    onClick={() => handleBottomNavbarClick("sticker")}
                    className={`text-2xl ${
                      activeBottomNavbar === "sticker"
                        ? "text-teal-700"
                        : "text-slate-300"
                    }`}
                  >
                    <PiStickerFill />
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="w-full bg-dark3 py-3 px-4 flex flex-row gap-4">
            <div className="relative">
              {isClickDocument && (
                <div
                  ref={dropDownRefDocument}
                  className="absolute -mt-[300px] bg-dark3 px-2 py-3 rounded-xl w-52 shadow-2xl"
                >
                  <button className="flex flex-row items-center gap-3 text-xl hover:bg-dark6 py-2 px-1 w-full rounded-md">
                    <HiDocumentText className="text-violet-600" />
                    <span className="text-lg text-slate-300">Document</span>
                  </button>
                  <button className="flex flex-row items-center gap-3 text-xl hover:bg-dark6 py-2 px-1 w-full rounded-md">
                    <MdPhotoLibrary className="text-blue-600" />
                    <span className="text-lg text-slate-300">
                      Photos & videos
                    </span>
                  </button>
                  <button className="flex flex-row items-center gap-3 text-xl hover:bg-dark6 py-2 px-1 w-full rounded-md">
                    <IoMdCamera className="text-pink-600" />
                    <span className="text-lg text-slate-300">Camera</span>
                  </button>
                  <button className="flex flex-row items-center gap-3 text-xl hover:bg-dark6 py-2 px-1 w-full rounded-md">
                    <FaUserLarge className="text-cyan-600" />
                    <span className="text-lg text-slate-300">Contact</span>
                  </button>
                  <button className="flex flex-row items-center gap-3 text-xl hover:bg-dark6 py-2 px-1 w-full rounded-md">
                    <HiBars3BottomLeft className="text-yellow-600" />
                    <span className="text-lg text-slate-300">Poll</span>
                  </button>
                  <button className="flex flex-row items-center gap-3 text-xl hover:bg-dark6 py-2 px-1 w-full rounded-md">
                    <PiStickerFill className="text-teal-600" />
                    <span className="text-lg text-slate-300">New Sticker</span>
                  </button>
                </div>
              )}
              <button
                onClick={() => setIsclickDocument((prev) => !prev)}
                ref={buttonRefDocument}
                className={`text-2xl text-slate-300 p-1 ${
                  isClickDocument
                    ? "bg-dark6 rounded-full rotate-45"
                    : "bg-none"
                }`}
              >
                <FaPlus />
              </button>
            </div>
            <div className="flex items-center w-full px-2 rounded-md bg-dark5">
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
                className="text-sm py-2 px-4 w-full outline-none bg-dark5 text-slate-400"
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
            <Groupprofile
              groupId={groupId}
              onClick={() => setActiveNavbar(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Groupchats;
