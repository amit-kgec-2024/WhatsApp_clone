import React, { useEffect, useState } from "react";
import { FaArrowLeftLong, FaChevronRight } from "react-icons/fa6";
import SmallCard from "./SmallCard";
import { MdSearch } from "react-icons/md";
import ExploreChannel from "./ExploreChannel";
import CardDefault from "./CardDefault";
import LoaderCard from "../card/LoaderCard";

const Findchannel = ({ setIsChannel, handelUserChatsClick, theme }) => {
  const [isExplore, setIsExplore] = useState(false);
  // All Channel show............................
  const [users] = useState(
    () => JSON.parse(localStorage.getItem("users:detail")) || {}
  );
  const [isAllChannel, setIsAllChannel] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://whats-app-clone-server-psi.vercel.app/api/channel/all/${users.id}`
        );
        if (!res.ok) {
          throw new Error("Network response was not ok " + res.statusText);
        }
        const jsonData = await res.json();
        setIsAllChannel(jsonData);
      } catch (error) {
        console.error("Error Fetching Data", error);
      }
    };

    fetchData();
  }, [users.id]);
  return (
    <div className="">
      <div className={`${isExplore ? "hidden" : ""}`}>
        <div className="flex flex-row gap-6 my-4 p-3 justify-start items-center w-full">
          <button
            onClick={() => setIsChannel(false)}
            className="text-xl text-slate-400"
          >
            <FaArrowLeftLong />
          </button>
          <h1 className="">Find channel</h1>
        </div>
        <div style={{ backgroundColor: theme === "#000000" ? "#233138" : "#cbd5e1" }}
         className="flex flex-row px-4 py-1 rounded-md mx-3">
          <button className="text-2xl">
            <MdSearch />
          </button>
          <input
            type="text"
            placeholder="Search"
            className="w-full outline-none px-2"
            style={{ backgroundColor: theme === "#000000" ? "#233138" : "#cbd5e1" }}
          />
        </div>
        {/* find channels........ */}
        <div className="scrollbaruser overflow-y-scroll">
          <div className="w-full px-3 my-5">
            <div className="flex flex-row justify-between items-center my-3">
              <h1>Explore channel</h1>
              <button
                onClick={() => setIsExplore((prev) => !prev)}
                className="flex text-sm items-center gap-1 text-whitmix1 font-bold"
              >
                See all <FaChevronRight />
              </button>
            </div>
            <CardDefault />
          </div>
          {/* Cards................................. */}
          {isAllChannel &&
          isAllChannel.channels &&
          isAllChannel.channels.length > 0 ? (
            <ul>
              {isAllChannel.channels.map((channel) => (
                <SmallCard
                  key={channel._id}
                  channelId={channel._id}
                  channelimage={channel.channelimage}
                  channelname={channel.channelname}
                  handelUserChatsClick={handelUserChatsClick}
                  setIsChannel={setIsChannel}
                  theme={theme}
                />
              ))}
            </ul>
          ) : (
            <LoaderCard
              setIsChannel={setIsChannel}
              handelUserChatsClick={handelUserChatsClick}
              theme={theme}
            />
          )}
        </div>
      </div>
      {isExplore && <ExploreChannel theme={theme} onClick={() => setIsExplore(false)} />}
    </div>
  );
};

export default Findchannel;
