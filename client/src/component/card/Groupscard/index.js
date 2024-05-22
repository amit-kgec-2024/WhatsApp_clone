import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import useClickOutside from "../../../hooks/useClickOutside";

const Groupscard = ({
  groupname,
  groupId,
  groupimage,
  handelUserChatsClick,
}) => {
  const [isClick, setIsclick] = useState(false);
  const dropDownRef = useRef(null);
  const buttonRef = useRef(null);
  const handleClick = () => setIsclick((prev) => !prev);

  useClickOutside([dropDownRef, buttonRef], () => {
    setIsclick(false);
  });

  // User Details
  const [users] = useState(
    () => JSON.parse(localStorage.getItem("users:detail")) || {}
  );
  const [lastMessage, setLastMessage] = useState(null);

  useEffect(() => {
    const fetchLastMessage = async () => {
      try {
        const response = await fetch(
          `https://whats-app-clone-server-psi.vercel.app/api/group/card/chat/data/${groupId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setLastMessage(data.lastMessage);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchLastMessage();
  }, [groupId]);
  return (
    <div className="">
      <button
        onClick={() => handelUserChatsClick("groupchats", groupId)}
        className="parent w-full flex flex-row justify-center items-start gap-2 hover:bg-dark3"
      >
        <div className="p-3">
          <div
            className="w-12 h-12 border rounded-full overflow-hidden text-center bg-dark5"
            style={{
              backgroundImage: `url(${groupimage})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          ></div>
        </div>
        <div className="user-top-border w-full py-3 flex flex-row justify-between items-center">
          <div className="flex flex-col items-start">
            <h1 className="font-light">{groupname}</h1>
            <div className="text-xs text-slate-400 font-thin">
                <div className="text-sm">
                  {lastMessage?.sender === users.id
                    ? "You"
                    : lastMessage?.senderDetails?.username ||
                      lastMessage?.senderDetails?.mobile}
                  {lastMessage && ":"} {lastMessage?.message}
                </div>
            </div>
          </div>
          <div className="pr-4 float-right">
            <h3 className="text-xs text-slate-400">{lastMessage?.timestamp}</h3>
            <div className="relative flex justify-around">
              {/* {unreadmsg === "true" ? (
                <h1 className="text-xs bg-teal-500 rounded-full text-black w-6 h-6  p-1">
                  15
                </h1>
              ) : (
                ""
              )} */}
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
                    Exit Group
                  </button>
                  <button className="hover:bg-dark6 w-full text-start px-5 py-3">
                    Pin chat
                  </button>
                  <button className="hover:bg-dark6 w-full text-start px-5 py-3">
                    Mark as Read
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

export default Groupscard;
