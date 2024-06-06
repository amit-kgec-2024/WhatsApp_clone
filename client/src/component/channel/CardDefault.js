import React, { useEffect, useState } from "react";
import LoaderCard from "../card/LoaderCard";

const CardDefault = ({ setIsChannel, handelUserChatsClick }) => {
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

  const submitAddMember = async () => {
    try {
      const res = await fetch(
        `https://whats-app-clone-server-psi.vercel.app/api/channel/addmember/${isAllChannel._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ channelmembers: users.id }),
        }
      );
      if (res.status === 400) {
      } else {
        await res.json();
        handelUserChatsClick("channelchats");
        setIsChannel(false);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };
  return (
    <div className="relative flex items-center overflow-x-scroll scrollbaruser">
      {isAllChannel &&
      isAllChannel.channels &&
      isAllChannel.channels.length > 0 ? (
        <ul className="flex gap-3">
          {isAllChannel.channels.map((ele, index) => (
            <div
              key={index}
              className="only_border w-[120px] h-[180px] px-5 rounded-md shadow-xl bg-dark6 flex flex-col justify-around items-center"
            >
              <div
                className="w-20 h-20 bg-slate-400 rounded-full"
                style={{
                  backgroundImage: `url(${ele.channelimage})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              ></div>
              <h1 className="font-light text-xs">{ele.channelname}</h1>
              <button
                onClick={submitAddMember}
                className="font-light text-green-300"
              >
                Follow
              </button>
            </div>
          ))}
        </ul>
      ) : (
        <LoaderCard />
      )}
    </div>
  );
};

export default CardDefault;
