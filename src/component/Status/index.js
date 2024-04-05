import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import userStatusData from '../../utils/userStatusData'
import Statuscard from "../card/Statuscard";

const Status = ({onClick}) => {
  return (
    <div className="w-full bg-dark6 h-screen">
      <div className="bg-dark3 p-4 pl-6 pt-16 flex flex-row justify-start items-center gap-8">
        <button onClick={onClick} className="text-lg">
          <FaArrowLeft />
        </button>
        <div className="text-lg font-semibold">Status</div>
      </div>
      <div className="flex flex-row justify-start items-center gap-4 px-4 py-6">
        <div className="w-10 h-10 rounded-full border overflow-hidden">
          <img src="logo192.png" alt="Bird" />
        </div>
        <div className="">
          <h1 className="text-xl">My status</h1>
          <h4 className="text-xs">No updates</h4>
        </div>
      </div>
      <div className="scrollbaruser overflow-y-scroll h-[630px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        <h1 className="text-whitmix1 w-full px-10 py-3 uppercase">Recent</h1>
        <div className="mt-3 bg-dark6">
          {userStatusData.map((ele) => (
            <Statuscard
              key={ele.id}
              userimg={ele.userimg}
              username={ele.username}
              userday={ele.userday}
              usertime={ele.usertime}
            />
          ))}
        </div>
        <h1 className="text-whitmix1 w-full px-10 py-3 uppercase">viewed</h1>
        <div className="mt-3 bg-dark6">
          {userStatusData.map((ele) => (
            <Statuscard
              key={ele.id}
              userimg={ele.userimg}
              username={ele.username}
              userday={ele.userday}
              usertime={ele.usertime}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Status;
