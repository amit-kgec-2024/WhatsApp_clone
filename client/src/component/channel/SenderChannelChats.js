import React from "react";

const SenderChannelChats = ({ message, timestamp }) => {
  return (
    <div className="chat-panel sender my-4 flex justify-start">
      <div className="message bg-dark3 px-2 py-1 items-center gap-2">
        {message}
        <div
          className="flex flex-col justify-end items-end text-gray-400"
          style={{ fontSize: "10px" }}
        >
          <div className="relative flex justify-around">{timestamp}</div>
        </div>
      </div>
    </div>
  );
};

export default SenderChannelChats;
