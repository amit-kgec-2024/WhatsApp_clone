import React from "react";


const Statuscard = ({ userimg, userday, username, usertime, viewstatus, handelStatus }) => {
  
  return (
    <div className="">
      <button
        onClick={() => handelStatus("status")}
        className="parent w-full flex flex-row justify-center items-start hover:bg-dark3"
      >
        <div className="p-3">
          <div className={`w-10 h-10 border-2  rounded-full overflow-hidden text-center bg-dark5 ${viewstatus === 'true' ? 'border-teal-400' : 'bg-slate-400'}`}>
            <img src={userimg} alt="Bird" />
          </div>
        </div>
        <div className="user-top-border w-full py-3 flex flex-col justify-start items-start">
          <h1 className="font-semibold">{username}</h1>
          <div className="flex flex-row gap-2 text-slate-400">
            <h4 className="text-sm font-thin">{userday} at</h4>
            <h3 className="text-sm">{usertime}</h3>
          </div>
        </div>
      </button>
    </div>
  );
};

export default Statuscard;
