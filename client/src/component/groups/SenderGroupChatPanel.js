import React, { useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import useClickOutside from "../../hooks/useClickOutside";

const SenderGroupChatPanel = ({ message, time, chatId, senderDetails }) => {
  const [isClick, setIsclick] = useState(false);
  const dropDownRef = useRef(null);
  const buttonRef = useRef(null);
  const handleClick = () => setIsclick((prev) => !prev);

  useClickOutside([dropDownRef, buttonRef], () => {
    setIsclick(false);
  });
  const defaultImage = "/profiledefaultimage.jpg";

//   DeLETE chats.........................
    const handleDeleteChat = async (e) => {
      e.preventDefault();
      try {
        const res = await fetch(
          `https://whats-app-clone-server-psi.vercel.app/api/delete/group/chats/${chatId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: chatId,
            }),
          }
        );

        if (res.status === 400) {
          alert("Invalid Credential!");
        } else {
          await res.json();
          setIsclick(false);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error occurred while Delete Chat.");
      }
    };
  const usernameColors = [
    "text-blue-500",
    "text-green-500",
    "text-red-500",
    "text-yellow-500",
    "text-purple-500",
    "text-orange-500",
    "text-pink-500",
    "text-teal-500",
    "text-indigo-500",
    "text-gray-500",
    "text-lime-500",
    "text-amber-500",
    "text-cyan-500",
    "text-fuchsia-500",
    "text-rose-500",
  ];

  const userIndex = senderDetails.username
    ? senderDetails.username.length % usernameColors.length
    : senderDetails.mobile.length % usernameColors.length;

  const textColorClass = usernameColors[userIndex];
  return (
    <div className="chat-panel sender my-4 flex justify-start gap-1 text-white">
      <div
        className="w-7 h-7 rounded-full"
        style={{
          backgroundImage: `url(${senderDetails.userimage || defaultImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></div>
      <div className="message bg-dark3 rounded-bl-lg rounded-r-lg px-2 pb-2">
        <div className="flex flex-row justify-between items-center w-full text-base">
          <div className={`text-sm ${textColorClass}`}>
            {senderDetails.username || senderDetails.mobile}
          </div>
          <div className="relative flex justify-around">
            <button
              onClick={handleClick}
              ref={buttonRef}
              className={`text-lg text-slate-400  hover:opacity-100 ${
                isClick ? "opacity-100" : "opacity-0"
              }`}
            >
              <FaAngleDown />
            </button>
            {isClick && (
              <div
                ref={dropDownRef}
                className="absolute z-50 -mr-40 mt-2 bg-dark4 w-32 shadow-2xl text-xs py-2 flex flex-col justify-start items-start rounded-sm"
              >
                <button className="hover:bg-dark6 w-full text-start px-5 py-3">
                  Reply
                </button>
                <button className="hover:bg-dark6 w-full text-start px-5 py-3">
                  React
                </button>
                <button className="hover:bg-dark6 w-full text-start px-5 py-3">
                  Forward
                </button>
                <button className="hover:bg-dark6 w-full text-start px-5 py-3">
                  Pin
                </button>
                <button className="hover:bg-dark6 w-full text-start px-5 py-3">
                  Star
                </button>
                <button
                    onClick={(e) => handleDeleteChat(e)}
                  className="hover:bg-dark6 w-full text-start px-5 py-3"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-row w-full justify-between items-end gap-2">
          <h1 className="text-xs md:text-sm">{message}</h1>
          <div
            className="text-slate-400 inline-block"
            style={{ fontSize: "10px" }}
          >
            {time}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SenderGroupChatPanel;
