import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FaAngleRight } from "react-icons/fa6";
import { IoStar, IoNotificationsSharp, IoTimer } from "react-icons/io5";
import { IoMdLock } from "react-icons/io";
import { MdOutlineBlock, MdDelete } from "react-icons/md";
import { BiSolidDislike } from "react-icons/bi";
import Starredmessage from "../menu/Starredmessage";
import Medialink from "../contactinfo/Medialink";
import Disappearing from "../contactinfo/Disappearing";
import Userpimage from "../contactinfo/Userpimage";
import Encryption from "../contactinfo/Encryption";

const Userprofile = ({ onClick, userId, theme }) => {
  const [activeButton, setActiveButton] = useState(null);
  const [isProfilePicture, setProfilePicture] = useState(false);

  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };

  // User Details........................
  const defaultAbout = "Hey there! I am using WhatsApp";
  const defaultName = "WhatsApp 0";
  const defaultImage = "/profiledefaultimage.jpg";
  const [userDetailShow, setUserDetails] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://whats-app-clone-server-psi.vercel.app/api/userdetails/${userId}`
        );
        const jsonData = await res.json();
        setUserDetails(jsonData);
      } catch (error) {
        console.log("Error Fetching Data", error);
      }
    };
    fetchData();
  }, [userId]);

  return (
    <div
      className={`user-left-border w-full h-screen ${
        theme === "#000000" ? "bg-dark2" : "bg-slate-200"
      }`}
    >
      <div className={`${activeButton ? "hidden" : ""}`}>
        <div
          className={`flex flex-row gap-10 h-14 justify-start items-center ${
            theme === "#000000" ? "bg-dark3" : "bg-slate-200"
          }`}
        >
          <button onClick={onClick} className="ml-8">
            <RxCross2 />
          </button>
          <h1>Contact info</h1>
        </div>
        <div className="scrollbaruser overflow-y-scroll h-screen">
          <div
            className={`w-full flex p-6 flex-col justify-center items-center ${
              theme === "#000000" ? "bg-dark1" : "bg-slate-100"
            }`}
          >
            <button
              onClick={() => setProfilePicture((prev) => !prev)}
              className="w-48 h-48 rounded-full overflow-hidden"
              style={{
                backgroundImage: `url(${
                  userDetailShow.userimage || defaultImage
                })`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            ></button>
            {isProfilePicture && (
              <div className="absolute w-full h-screen left-0 top-0">
                <Userpimage
                  userId={userId}
                  onClick={() => setProfilePicture(false)}
                  theme={theme}
                />
              </div>
            )}
            <h1 className="font-semibold text-2xl mt-3">
              {userDetailShow.username || defaultName}
            </h1>
            <h2 className="font-light">{userDetailShow.mobile}</h2>
          </div>
          <div
            className={`${
              theme === "#000000" ? "bg-dark1" : "bg-slate-100"
            } mt-2 py-6 px-8`}
          >
            <h1 className="font-light mb-2">About</h1>
            <p>{userDetailShow.userabout || defaultAbout}</p>
          </div>
          <div
            className={`w-full py-4 ${
              theme === "#000000" ? "bg-dark1" : "bg-slate-100"
            } mt-4 px-8`}
          >
            <button
              onClick={() => handleButtonClick("medialinks")}
              className="flex flex-row w-full text-sm text-slate-300 justify-between items-center mt-2 py-4 px-8"
            >
              <h1 className="font-light">Media, links and docs</h1>
              <h1 className="flex flex-row items-center gap-1 font-light">
                16
                <FaAngleRight />
              </h1>
            </button>
            <div className="w-full h-[130px]"></div>
          </div>
          <div
            className={`w-full py-4 ${
              theme === "#000000" ? "bg-dark1" : "bg-slate-100"
            } mt-4 px-8`}
          >
            <button
              onClick={() => handleButtonClick("starredmessages")}
              className="flex flex-row justify-between items-center py-4 w-full"
            >
              <div className="flex flex-row items-center gap-5">
                <IoStar />
                <h1>Starred messages</h1>
              </div>
              <FaAngleRight />
            </button>
            <button className="flex flex-row justify-between items-center py-4 w-full">
              <div className="flex flex-row items-center gap-5">
                <IoNotificationsSharp />
                <h1>Mute notifications</h1>
              </div>
              <FaAngleRight />
            </button>
            <button
              onClick={() => handleButtonClick("disappearingmessages")}
              className="flex flex-row justify-between items-center py-4 w-full"
            >
              <div className="flex flex-row items-center gap-5">
                <IoTimer />
                <h1 className="flex flex-col items-start">
                  Disappearing messages{" "}
                  <span className="text-xs font-light">Off</span>
                </h1>
              </div>
              <FaAngleRight />
            </button>
            <button
              onClick={() => handleButtonClick("encryption")}
              className="py-4 w-full"
            >
              <div className="flex flex-row items-center gap-5">
                <IoMdLock />
                <h1 className="flex flex-col items-start">
                  Encryption{" "}
                  <span className="text-xs font-light">
                    Messages are End-to-end encrypted. Click to verify.
                  </span>
                </h1>
              </div>
            </button>
          </div>
          <div
            className={`w-full py-4 bg-dark1 mb-16 ${
              theme === "#000000" ? "bg-dark1" : "bg-slate-100"
            }`}
          >
            <button
              className={`flex flex-row items-center py-4 gap-6 text-xl font-light px-10 text-red-700 w-full  ${
                theme === "#000000" ? "hover:bg-dark3" : "hover:bg-slate-200"
              }`}
            >
              <MdOutlineBlock />
              <h1>Block {userDetailShow.username || userDetailShow.mobile}</h1>
            </button>
            <button
              className={`flex flex-row items-center py-4 gap-6 text-xl font-light px-10 text-red-700 w-full  ${
                theme === "#000000" ? "hover:bg-dark3" : "hover:bg-slate-200"
              }`}
            >
              <BiSolidDislike />
              <h1>Report {userDetailShow.username || userDetailShow.mobile}</h1>
            </button>
            <h1 className="text-sm font-light py-2 text-slate-400">
              Delete chat
            </h1>
            <button
              className={`flex flex-row items-center py-4 gap-6 text-xl font-light px-10 text-red-700 w-full  ${
                theme === "#000000" ? "hover:bg-dark3" : "hover:bg-slate-200"
              }`}
            >
              <MdDelete />
              <h1>Delete chat</h1>
            </button>
          </div>
        </div>
      </div>
      {activeButton === "starredmessages" && (
        <Starredmessage onClick={() => setActiveButton(false)} />
      )}
      {activeButton === "medialinks" && (
        <Medialink theme={theme} onClick={() => setActiveButton(false)} />
      )}
      {activeButton === "disappearingmessages" && (
        <Disappearing onClick={() => setActiveButton(false)} />
      )}
      {activeButton === "encryption" && (
        <Encryption userId={userId} onClick={() => setActiveButton(false)} />
      )}
    </div>
  );
};

export default Userprofile;
