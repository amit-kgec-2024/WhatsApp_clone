import React from "react";

const SenderChatPanel = ({ message }) => {
  return (
    <div className="chat-panel sender my-4 flex justify-start">
      <div className="message bg-dark3 rounded-bl-lg rounded-r-lg px-2 py-1">
        {message}
      </div>
    </div>
  );
};

export default SenderChatPanel;
