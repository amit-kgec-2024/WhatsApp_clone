import React from "react";
import userData from "../../utils/userData";
import Usercard from "../card/Archivedcard";

const Archived = ({ handelUserChatsClick }) => {
  return (
    <div className="w-full bg-dark6 h-screen">
      <h1 className="text-xl font-bold p-5 ">Archived</h1>
      <div className="scrollbaruser overflow-y-scroll h-[630px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        <p className="text-xs p-3 ">
          These chats stay archived when new messages are received. To change
          this experience, go to <span className="font-bold">Settings </span>
          {">"} <span className="font-bold">Chats</span> on your phone.
        </p>
        <div className="">
          {userData.map((ele) => (
            <Usercard
              key={ele.id}
              username={ele.username}
              userchats={ele.userchats}
              handelUserChatsClick={handelUserChatsClick}
              usertime={ele.usertime}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Archived;
