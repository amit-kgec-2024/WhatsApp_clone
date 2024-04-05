import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import userData from "../../utils/userData";
import Usercard from "../card/Usercard";
import { MdGroups } from "react-icons/md";

const Communities = ({onClick}) => {
  return (
    <div className="w-full bg-dark1 h-screen">
      <div className="bg-dark3 p-4 pl-6 pt-16 flex flex-row justify-start items-center gap-8">
        <button onClick={onClick} className="text-lg">
          <FaArrowLeft />
        </button>
        <div className="text-lg font-semibold">Communities</div>
      </div>
      <div className="scrollbaruser overflow-y-scroll h-[630px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        <button className="w-full flex flex-row items-center gap-3 p-3 bg-dark6 hover:bg-dark3">
          <MdGroups className="bg-whitmix1 text-5xl p-2 rounded-lg" />{" "}
          <p className="font-semibold">New community</p>
        </button>
        <div className="mt-3 bg-dark6">
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

export default Communities;
