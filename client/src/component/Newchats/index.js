import React, { useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import userNewData from "../../utils/userNewData";
import Newchatcard from "../card/Newchatcard";
import { MdGroups } from "react-icons/md";
import { FaUserGroup } from "react-icons/fa6";
import { IoMdSearch } from "react-icons/io";
import useClickOutside from "../../hooks/useClickOutside";
import Newgroup from "../Newgroup";
import Newcommunity from "../Newcommunity";

const Newchats = ({onClick}) => {
  const [showSearch, setShowSearch] = useState(true);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  useClickOutside([searchRef, inputRef], () => {
    // console.log("check hook");
    setShowSearch(true);
  });

  const toggleSearch = () => {
    // console.log("check toggle");
    setShowSearch((prev) => !prev);
  };
  // New Groups.............
  const [activeButton, setActiveButton] = useState(null);
  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };

  
  return (
    <div className="w-full bg-dark6 h-screen">
      <div className={`${activeButton ? "hidden" : ""}`}>
        <div className="p-4 pl-6 flex flex-row justify-start items-center gap-8">
          <button onClick={onClick} className="text-lg">
            <FaArrowLeft />
          </button>
          <div className="text-lg font-semibold">New Chats</div>
        </div>
        <div className="flex flex-row bg-dark3 my-2 mx-2 py-1 px-3 gap-4 rounded-md justify-start items-center">
          {showSearch ? (
            <button ref={searchRef} onClick={toggleSearch}>
              <IoMdSearch className="text-xl cursor-pointer" />
            </button>
          ) : (
            <button onClick={toggleSearch}>
              <FaArrowLeft className="text-whitmix1 text-xl cursor-pointer" />
            </button>
          )}
          <input
            type="text"
            ref={inputRef}
            placeholder="Search"
            onClick={() => setShowSearch(false)}
            className="bg-dark3 outline-none px-2 w-full"
          />
        </div>
        <div className="scrollbaruser overflow-y-scroll h-[630px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          <button
            onClick={() => handleButtonClick("newgroup")}
            className="flex flex-row justify-start items-center gap-4 px-4 w-full hover:bg-dark3"
          >
            <div className="rounded-full text-2xl bg-whitmix1 p-3">
              <FaUserGroup />
            </div>
            <h1 className="user-top-bottom-border w-full py-6 flex-col text-start">
              New group
            </h1>
          </button>

          <button
            onClick={() => handleButtonClick("newcommunity")}
            className="flex flex-row justify-start items-center gap-4 px-4 w-full hover:bg-dark3"
          >
            <div className="rounded-full text-2xl bg-whitmix1 p-3">
              <MdGroups />
            </div>
            <h1 className="user-top-bottom-border w-full py-6 flex-col text-start">
              New community
            </h1>
          </button>
          <h1 className="text-whitmix1 w-full px-10 py-6 uppercase">
            contacts on whatsapp
          </h1>
          <div className="">
            {userNewData.map((ele) => (
              <Newchatcard
                key={ele.id}
                username={ele.username}
                userabout={ele.userabout}
              />
            ))}
          </div>
        </div>
      </div>
      {activeButton === "newgroup" && (
        <Newgroup onClick={() => setActiveButton(false)} />
      )}
      {activeButton === "newcommunity" && (
        <Newcommunity onClick={() => setActiveButton(false)} />
      )}
    </div>
  );
};

export default Newchats;