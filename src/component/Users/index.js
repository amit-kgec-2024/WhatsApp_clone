import React, { useRef, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineWifi } from "react-icons/md";
import useClickOutside from "../../hooks/useClickOutside";
import Usercard from "../card/Usercard";
import userData from "../../utils/userData";
import { RiInboxArchiveLine } from "react-icons/ri";
import Archived from "../Archived";

const Users = () => {
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
  // Archived.........................
  const [isFilterde, setIsFiltered] = useState(false)
  const [activeButton, setActiveButton] = useState(null);
  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };

  return (
    <div>
      <div className={`${activeButton ? "hidden" : ""}`}>
        <div className="py-2 px-3 flex flex-row w-full gap-3">
          <div className="flex flex-row bg-dark3 py-1 px-3 gap-4 rounded-md w-full justify-start items-center">
            {showSearch ? (
              <button ref={searchRef} onClick={toggleSearch}>
                <IoMdSearch className="text-lg cursor-pointer" />
              </button>
            ) : (
              <button onClick={toggleSearch}>
                <FaArrowLeft className="text-whitmix1 text-lg cursor-pointer" />
              </button>
            )}
            <input
              type="text"
              ref={inputRef}
              placeholder={`Search ${isFilterde ? "unread chats" : ""}`}
              onClick={() => setShowSearch(false)}
              className="bg-dark3 text-sm outline-none px-2 w-full"
            />
          </div>
          <button
            onClick={() => setIsFiltered((prev) => !prev)}
            className={`text-xl p-1 ${
              isFilterde ? "bg-green-500 rounded-full" : "bg-none"
            }`}
          >
            <MdOutlineWifi />
          </button>
        </div>
        <div className="scrollbaruser overflow-y-scroll h-[630px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          <div className={`${isFilterde ? "hidden" : ""}`}>
            <button
              onClick={() => handleButtonClick("archived")}
              className="flex flex-row justify-between items-center w-full p-3"
            >
              <div className="flex flex-row justify-center items-center gap-3">
                <RiInboxArchiveLine className="text-xl text-whitmix1 ml-3" />
                <h1 className="font-semibold text-sm ml-3">Archived</h1>
              </div>
              <p className="text-whitmix1 text-sm">12</p>
            </button>
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
          {isFilterde && (
            <div className="">
              <h1 className="uppercase px-8 py-6 text-green-700">
                Filtered by unread
              </h1>
              {userData.map((ele) => (
                <Usercard
                  key={ele.id}
                  username={ele.username}
                  userchats={ele.userchats}
                  usertime={ele.usertime}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      {activeButton === "archived" && (
        <Archived onClick={() => setActiveButton(false)} />
      )}
    </div>
  );
};

export default Users;
