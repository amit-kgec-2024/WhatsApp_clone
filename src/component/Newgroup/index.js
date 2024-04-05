import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import userNewData from "../../utils/userNewData";
import Newchatcard from "../card/Newchatcard";

const Newgroup = () => {
  return (
    <div className="w-full bg-dark6 h-screen">
      <div className="bg-dark3 p-4 pl-6 pt-16 flex flex-row justify-start items-center gap-8">
        <Link to="/" className="text-lg">
          <FaArrowLeft />
        </Link>
        <div className="text-lg font-semibold">Add group members</div>
      </div>
      <div className="w-full px-9 py-6">
        <input
          type="text"
          placeholder="Search name or number"
          className="user-top-bottom-border outline-none bg-dark6 w-full"
        />
      </div>
      <div className="scrollbaruser overflow-y-scroll h-[630px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        <div className="mt-3 bg-dark6">
          {userNewData.map((ele) => (
            <Newchatcard
              key={ele.id}
              userimg={ele.userimg}
              username={ele.username}
              userabout={ele.userabout}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Newgroup;
