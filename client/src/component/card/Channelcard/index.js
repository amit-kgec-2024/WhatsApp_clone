import React from "react";

const Channelcard = ({ channelimage, channelname, channelId, handelUserChatsClick }) => {
  
  return (
    <div className="">
      <button
        onClick={() => handelUserChatsClick("channelchats", channelId)}
        className=".user-top-bottom-border w-full hover:bg-dark3"
      >
        <div className="p-3 flex flex-row w-full justify-start gap-4 items-center">
          <div
            className="w-10 h-10 rounded-full overflow-hidden flex items-center bg-dark5"
            style={{
              backgroundImage: `url(${channelimage})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
          </div>
          <h1 className="font-semibold">{channelname}</h1>
        </div>
        <p className="text-sm font-extralight px-3 text-start text-stone-400">
          uuu
        </p>
        <h1 className="text-start px-4 text-sm font-extralight text-stone-400 py-2">
          12:56
        </h1>
      </button>
    </div>
  );
};

export default Channelcard;
