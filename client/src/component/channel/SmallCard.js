import React, { useState } from 'react'

const SmallCard = ({ channelId, channelimage, channelname, setIsChannel, handelUserChatsClick, theme }) => {
  const [users] = useState(
    () => JSON.parse(localStorage.getItem("users:detail")) || {}
  );
  const submitAddMember = async () => {
    try {
      const res = await fetch(
        `https://whats-app-clone-server-psi.vercel.app/api/channel/addmember/${channelId}`,
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
        setIsChannel(false)
      }
    } catch (error) {
      console.log("Error", error);
    }
  };
  return (
    <div className={`p-2 ${theme === "#000000" ? "hover:bg-dark3" : "hover:bg-slate-200"} flex flex-row items-center user-top-bottom-border`}>
      <div className="flex items-center">
        <div
          className="w-16 h-16 rounded-full"
          style={{
            backgroundImage: `url(${channelimage})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        ></div>
      </div>
      <div className="flex flex-row justify-between px-3 items-center w-full">
        <div className="flex flex-col justify-start">
          <h1 className="text-base text-slate-300">{channelname}</h1>
          <h2 className="text-sm text-slate-400 font-light">8165k followrs</h2>
        </div>
        <button
          onClick={submitAddMember}
          className="px-4 py-1 text-green-500 shadow rounded-full only_border"
        >
          Follow
        </button>
      </div>
    </div>
  );
};

export default SmallCard
