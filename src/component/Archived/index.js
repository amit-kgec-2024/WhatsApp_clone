import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import userData from "../../utils/userData";
import Usercard from "../card/Archivedcard";

const Archived = () => {
  return (
    <div className="w-full bg-dark6 h-screen">
      <div className="bg-dark3 p-4 pl-6 pt-16 flex flex-row justify-start items-center gap-8">
        <Link to="/" className="text-lg">
          <FaArrowLeft />
        </Link>
        <h1 className="text-lg font-semibold">Archived</h1>
      </div>
      <div className="scrollbaruser overflow-y-scroll h-[630px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        <p className="text-sm p-4 bg-dark5">
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
              usertime={ele.usertime}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Archived;
