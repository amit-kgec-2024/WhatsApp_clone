import React from "react";

const ReceiverChatPanel = ({ message }) => {
  return (
    <div className="chat-panel receiver my-2 flex justify-end">
      <div className="message bg-green-700 rounded-br-lg rounded-l-lg px-2 py-1">{message}</div>
    </div>
  );
};

export default ReceiverChatPanel;
