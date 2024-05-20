import React from "react";

const Groupuser = ({
  username,
  userimage,
  userabout,
  _id,
  handelGroup,
}) => {
  return (
    <div className="">
      <button
        onClick={() => handelGroup(_id)}
        className="parent w-full flex flex-row justify-center items-start gap-2 hover:bg-dark3"
      >
        <div className="p-3">
          <div
            className="w-12 h-12 border rounded-full overflow-hidden text-center bg-dark5"
            style={{
              backgroundImage: `url(${userimage})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          ></div>
        </div>
        <div className="user-top-border flex flex-row justify-between items-center w-full">
          <div className="py-3 flex flex-row justify-between items-center">
            <div className="flex flex-col items-start">
              <h1 className="font-light">{username}</h1>
              <h4 className="text-xs text-slate-400 font-thin">
                <div>{userabout}</div>
              </h4>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};

export default Groupuser;
