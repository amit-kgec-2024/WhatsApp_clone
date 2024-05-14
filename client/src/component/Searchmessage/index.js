import React from "react";
import { RxCross1 } from "react-icons/rx";
import { FaRegCalendar } from "react-icons/fa6";
import { IoMdSearch } from "react-icons/io";

const Searchmessage = ({ onClick }) => {
  return (
    <div className="user-left-border w-full h-screen bg-dark2">
      <div className="flex flex-row gap-10 h-14 justify-start items-center bg-dark3">
        <button onClick={onClick} className="ml-8">
          <RxCross1 />
        </button>
        <h1>Search messages</h1>
      </div>
      <div className="flex w-full flex-row justify-start items-center p-2 gap-3">
        <button>
          <FaRegCalendar />
        </button>
        <div className="w-full flex flex-row gap-3 bg-dark3 px-3 py-1 rounded-lg">
          <button>
            <IoMdSearch />
          </button>
          <input type="text" placeholder="Search" className="outline-none px-2 text-sm bg-dark3 w-full" />
        </div>
      </div>
      <p className="text-xs text-slate-400 w-full text-center mt-28">Search for messages width Amit Mandal.</p>
    </div>
  );
};

export default Searchmessage;