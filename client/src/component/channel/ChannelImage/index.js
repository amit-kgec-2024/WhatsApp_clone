import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";

const ChannelImage = ({ onClick, channelname, channelimage }) => {
  
  return (
    <div className="profile-animation bg-dark6 z-50 bg-opacity-90 w-full h-screen">
      <div className="bg-dark6 opacity-100 px-6 py-3 flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-6">
          <div
            className="w-12 h-12 rounded-full overflow-hidden"
            style={{
              backgroundImage: `url(${channelimage})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          ></div>
          <h1 className="text-xl">{channelname}</h1>
        </div>
        <button onClick={onClick} className="text-lg">
          <RxCross1 />
        </button>
      </div>
      <div className="w-full flex justify-center">
        <img src={`${channelimage}`} width={500} height={500} alt="Bird" />
      </div>
    </div>
  );
};

export default ChannelImage;
