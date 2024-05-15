import React from "react";

const Newchatcard = ({ username, userabout, userimage, mobile }) => { 
  const defaultImage = "/profiledefaultimage.jpg";
  const defaultAbout = "Hey there! I am using WhatsApp";

  return (
    <div className="">
      <button className="parent overflow-hidden w-full flex flex-row justify-center items-start hover:bg-dark3">
        <div className="p-3">
          <div
            className="w-12 h-12 border rounded-full overflow-hidden text-center bg-dark5"
            style={{
              backgroundImage: `url(${userimage || defaultImage})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          ></div>
        </div>
        <div className="user-top-border w-full py-3 flex flex-row justify-between items-center">
          <div className="flex flex-col items-start">
            <h1 className="font-semibold">{username || mobile}</h1>
            <h4 className="text-xs mt-1 font-thin">{userabout || defaultAbout}</h4>
          </div>
        </div>
      </button>
    </div>
  );
};

export default Newchatcard;
