import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
// import Usercard from "../card/Archivedcard";

const Archived = ({ onClick, handelUserChatsClick }) => {
  return (
    <div className="w-full h-screen">
      <div className="flex flex-row gap-4">
        <button onClick={onClick} className="text-xl px-3">
          <FaArrowLeft />
        </button>
        <h1 className="text-xl font-bold p-5 ">Archived</h1>
      </div>
      <div className="scrollbaruser overflow-y-scroll h-[630px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        <p className="text-xs p-3 ">
          These chats stay archived when new messages are received. To change
          this experience, go to <span className="font-bold">Settings </span>
          {">"} <span className="font-bold">Chats</span> on your phone.
        </p>
        <div className="">
          {/* {userData.map((ele) => (
            <Usercard
              key={ele.id}
              username={ele.username}
              userchats={ele.userchats}
              handelUserChatsClick={handelUserChatsClick}
              usertime={ele.usertime}
            />
          ))} */}
          Comming Soon...........
        </div>
      </div>
    </div>
  );
};

export default Archived;
