import React, { useEffect, useRef, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { RiChatNewFill } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa";
import { RiInboxArchiveLine } from "react-icons/ri";
import useClickOutside from "../../hooks/useClickOutside";
import Usercard from "../card/Usercard";
// import Groupscard from "../card/Groupscard";
import Newchats from "../users/Newchats";
import Modal from "../menu/Modal";
import Newgroup from "../groups/Newgroup";
import Archived from "../menu/Archived";
import Starredmessage from "../menu/Starredmessage";
import Groups from "../groups/Groups";
import LoaderCard from "../card/LoaderCard";
import Authorization from "../Authorization";

const Users = ({ handelUserChatsClick, theme}) => {
  const [showSearch, setShowSearch] = useState(true);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  useClickOutside([searchRef, inputRef], () => {
    // console.log("check hook");
    setShowSearch(true);
  });

  const toggleSearch = () => {
    // console.log("check toggle");
    setShowSearch((prev) => !prev);
  };
  // Modal.........................
  const [isModal, setIsModal] = useState(false);
  const [isChats, setIsChats] = useState(null);
  const handelChatsClick = (toggleChat) => {
    setIsChats(toggleChat);
  };
  // Three dot................
  const [isClick, setIsclick] = useState(false);
  const dropDownRef = useRef(null);
  const buttonRef = useRef(null);

  useClickOutside([dropDownRef, buttonRef], () => {
    setIsclick(false);
  });
  // user.................
  const [activeUser, setActiveUser] = useState("all");
  const handelUserClick = (togglrUser) => {
    setActiveUser(togglrUser);
  };
  // User Details
  const [users] = useState(
    () => JSON.parse(localStorage.getItem("users:detail")) || {}
  );
  // LOG Out................
  const [isLogout, setIsLogout] = useState(false);
  const logOut = () => {
    window.localStorage.removeItem("users:token");
    window.localStorage.removeItem("users:detail");
    setIsLogout(true);
  };
  // chats users api call get...........................
  const defaultImage = "/profiledefaultimage.jpg";
  const [userDetails, setUserDetails] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://whats-app-clone-server-psi.vercel.app/api/get/chats/${users.id}`
        );
        const jsonData = await res.json();
        setUserDetails(jsonData);
      } catch (error) {
        console.log("Error Fetching Data", error);
      }
    };
    fetchData();
  }, [users.id]);

  if (isLogout) {
    return (
      <div className="absolute w-full left-0 text-black">
        <Authorization />
      </div>
    );
  }
  return (
    <div style={{ color: theme === "#000000" ? "#ffffff" : "#000000" }}>
      <div className={`w-full ${isChats ? "hidden" : ""}`}>
        <div className="flex flex-row justify-between items-center p-5">
          <h1 className="font-bold text-xl">Chats</h1>
          <div className="flex items-center text-xl gap-5">
            <button
              onClick={() => handelChatsClick("newchats")}
              className={`p-1 ${isChats ? "rounded-full bg-dark5" : "bg-none"}`}
            >
              <RiChatNewFill />
            </button>
            <div className="relative">
              <button
                onClick={() => setIsclick((prev) => !prev)}
                ref={buttonRef}
                className={`p-1 ${
                  isClick ? (theme === "#000000" ? "rounded-full bg-dark5" : "rounded-full bg-slate-200") : "bg-none"
                }`}
              >
                <BsThreeDotsVertical />
              </button>
              {isClick && (
                <div
                  ref={dropDownRef}
                  style={{ backgroundColor: theme === "#000000" ? "#233138" : "#cbd5e1" }}
                  className="absolute z-50 text-xs flex flex-col justify-start items-start py-2 bg-dark4 shadow-md w-52 right-0 mt-1 rounded-sm"
                >
                  <button
                    onClick={() => handelChatsClick("newgroup")}
                    className={`py-3 px-6 w-full text-start ${theme === "#000000" ? "hover:bg-dark3" : "hover:bg-slate-200"}`}
                  >
                    New Group
                  </button>
                  <button
                    onClick={() => handelChatsClick("starrdemessage")}
                    className={`py-3 px-6 w-full text-start ${theme === "#000000" ? "hover:bg-dark3" : "hover:bg-slate-200"}`}
                  >
                    Starred messages
                  </button>
                  <button 
                  className={`py-3 px-6 w-full text-start ${theme === "#000000" ? "hover:bg-dark3" : "hover:bg-slate-200"}`}>
                    Select chats
                  </button>
                  <button
                    onClick={() => logOut()}
                    className={`py-3 px-6 w-full text-start ${theme === "#000000" ? "hover:bg-dark3" : "hover:bg-slate-200"}`}
                  >
                    Log out
                  </button>
                  <li className="user-top-border list-none w-full my-1" />
                  <button
                    onClick={() => setIsModal((prev) => !prev)}
                    className={`py-3 px-6 w-full ${theme === "#000000" ? "hover:bg-dark3" : "hover:bg-slate-200"}`}
                  >
                    Get WhatsApp for Windows
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="px-4 py-1">
          <div 
           style={{ backgroundColor: theme === "#000000" ? "#233138" : "#cbd5e1" }}
           className="flex flex-row py-2 px-3 gap-4 rounded-md w-full justify-start items-center">
            {showSearch ? (
              <button ref={searchRef} onClick={toggleSearch}>
                <IoMdSearch className="text-lg cursor-pointer" />
              </button>
            ) : (
              <button onClick={toggleSearch}>
                <FaArrowLeft className="text-whitmix1 text-lg cursor-pointer" />
              </button>
            )}
            <input
              type="text"
              ref={inputRef}
              placeholder={`Search`}
              onClick={() => setShowSearch(false)}
              className="text-sm outline-none px-2 w-full"
              style={{ backgroundColor: theme === "#000000" ? "#233138" : "#cbd5e1" }}
            />
          </div>
        </div>
        <div className="p-2 flex flex-row items-center gap-2 lg:gap-4 px-6">
          <button
            onClick={() => handelUserClick("all")}
            className={`px-3 py-1 rounded-full text-xs lg:text-base font-ligh ${
              activeUser === "all"
                ? "bg-teal-400 bg-opacity-10 text-teal-400"
                : (theme === "#000000" ? "bg-dark3 text-slate-400" : "bg-slate-200 text-black")
            }`}
          >
            All
          </button>
          <button
            onClick={() => handelUserClick("unread")}
            className={`px-3 py-1 rounded-full text-xs lg:text-base font-ligh ${
              activeUser === "unread"
                ? "bg-teal-400 bg-opacity-10 text-teal-400"
                : (theme === "#000000" ? "bg-dark3 text-slate-400" : "bg-slate-200 text-black")
            }`}
          >
            Unread
          </button>
          <button
            onClick={() => handelUserClick("groups")}
            className={`px-3 py-1 rounded-full text-xs lg:text-base font-ligh ${
              activeUser === "groups"
                ? "bg-teal-400 bg-opacity-10 text-teal-400"
                : (theme === "#000000" ? "bg-dark3 text-slate-400" : "bg-slate-200 text-black")
            }`}
          >
            Groups
          </button>
        </div>

        <div className="scrollbaruser overflow-y-scroll max-h-[76vh]">
          {activeUser === "all" && (
            <div>
              <div className="py-2">
                <button
                  onClick={() => handelChatsClick("archived")}
                  className={`flex flex-row justify-between items-center py-2 px-5 w-full ${
                    isChats ? "rounded-full bg-dark5" : "bg-none"
                  }`}
                >
                  <div className="flex flex-row items-center text-lg gap-4">
                    <RiInboxArchiveLine className="text-whitmix1" />
                    <p>Archived</p>
                  </div>
                  <h1 className="text-whitmix1">18</h1>
                </button>
              </div>
              {userDetails.length > 0 ? (
                userDetails.map((element, index) => (
                  <Usercard
                    key={index}
                    username={
                      element.userDetails?.username ||
                      element.userDetails?.mobile
                    }
                    userimage={element.userDetails?.userimage || defaultImage}
                    userId={element.userDetails?._id}
                    lastmessage={element.lastMessage?.message}
                    timestamp={element.lastMessage?.time}
                    handelUserChatsClick={handelUserChatsClick}
                    theme={theme}
                  />
                ))
              ) : (
                <LoaderCard theme={theme}/>
              )}
            </div>
          )}
          {activeUser === "unread" && (
            <div>
              {/* {userData.concat(userGroupData).map((exle) => (
                <React.Fragment key={exle.id}>
                  {exle.userchats
                    ? exle.readmsg === "true" && (
                        <Usercard
                          username={exle.username}
                          userchats={exle.userchats}
                          readmsg={exle.readmsg}
                          handelUserChatsClick={handelUserChatsClick}
                          usertime={exle.usertime}
                        />
                      )
                    : exle.unreadmsg === "true" && (
                        <Groupscard
                          groupname={exle.groupname}
                          groupchats={exle.groupchats}
                          unreadmsg={exle.unreadmsg}
                          handelUserChatsClick={handelUserChatsClick}
                          grouptime={exle.grouptime}
                        />
                      )}
                </React.Fragment>
              ))} */}
              Comming Soon....
              <LoaderCard theme={theme}/>
            </div>
          )}
          {activeUser === "groups" && (
            <Groups theme={theme} handelUserChatsClick={handelUserChatsClick} />
          )}
        </div>
      </div>
      {isChats === "newchats" && (
        <Newchats
        theme={theme}
          handelUserChatsClick={handelUserChatsClick}
          onClick={() => setIsChats(false)}
        />
      )}
      {isChats === "archived" && (
        <Archived
          handelUserChatsClick={handelUserChatsClick}
          onClick={() => setIsChats(false)}
        />
      )}
      {isChats === "newgroup" && (
        <Newgroup
          handelUserChatsClick={handelUserChatsClick}
          onClick={() => setIsChats(false)}
        />
      )}
      {isChats === "starrdemessage" && (
        <Starredmessage onClick={() => setIsChats(false)} />
      )}
      {isModal && (
        <div className="absolute top-1 right-80">
          <Modal onClick={() => setIsModal(false)} />
        </div>
      )}
    </div>
  );
};

export default Users;
