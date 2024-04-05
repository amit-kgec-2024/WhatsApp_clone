import React from "react";

const Channelcard = ({ userimg, username, usertexts, usertime }) => {
  return (
    <div className="">
      <button className=".user-top-bottom-border w-full hover:bg-dark3">
        <div className="p-3 flex flex-row w-full justify-start gap-4 items-center">
          <div className="w-10 h-10 rounded-full overflow-hidden text-center bg-dark5">
            <img src={userimg} alt="Bird" />
          </div>
          <h1 className="font-semibold">{username}</h1>
        </div>
        <p className="text-sm font-extralight px-3 text-start text-stone-400">{usertexts}</p>
        <h1 className="text-start px-4 text-sm font-extralight text-stone-400 py-2">{usertime}</h1>
      </button>
    </div>
  );
};

export default Channelcard;
