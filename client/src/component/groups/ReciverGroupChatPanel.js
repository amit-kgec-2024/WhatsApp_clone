import React, { useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import useClickOutside from "../../hooks/useClickOutside";

const ReciverGroupChatPanel = ({ message, time, chatId }) => {
  const [isClick, setIsclick] = useState(false);
  const dropDownRef = useRef(null);
  const buttonRef = useRef(null);
  const handleClick = () => setIsclick((prev) => !prev);

  useClickOutside([dropDownRef, buttonRef], () => {
    setIsclick(false);
  });
  // DeLETE chats.........................
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
  return (
    <div className="chat-panel receiver my-4 flex justify-end">
      <div className="message bg-whitmix1 rounded-br-lg rounded-l-lg px-2 text-base flex items-center gap-2">
        {message}
        <div
          className="flex flex-col justify-between items-center text-gray-300"
          style={{ fontSize: "10px" }}
        >
          <div className="relative flex justify-between items-end">
            <button
              onClick={handleClick}
              ref={buttonRef}
              className={`text-lg  hover:opacity-100 ${
                isClick ? "opacity-100" : "opacity-0"
              }`}
            >
              <FaAngleDown />
            </button>
            {isClick && (
              <div
                ref={dropDownRef}
                className="absolute z-50 -ml-20 mt-8 bg-dark4 w-32 shadow-2xl text-xs py-2 flex flex-col justify-start items-start rounded-sm"
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
          <h1 className="">{time}</h1>
        </div>
      </div>
    </div>
  );
};

export default ReciverGroupChatPanel;
