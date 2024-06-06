import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaAngleRight } from "react-icons/fa6";
import { VscDebugRestart } from "react-icons/vsc";
import Input from "../Input";
import Theme from "./Theme";

const Chatsatting = ({ onClick }) => {
  const [activeChats, setActiveChats] = useState(null);
  const handelChatsButtonClick = (toggleChats) => {
    setActiveChats(toggleChats);
  };
  const [activeTheme, setActiveTheme] = useState(null);
  const handeThemeClick = (toggleTheme) => {
    setActiveTheme(toggleTheme);
  };
  // User Details
  const [users] = useState(
    () => JSON.parse(localStorage.getItem("users:detail")) || {}
  );
  //   GET..........................................
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://whats-app-clone-server-psi.vercel.app/api/userdetails/${users.id}`
        );
        const jsonData = await res.json();
        setUserData(jsonData);
      } catch (error) {
        console.log("Error Fetching Data", error);
      }
    };
    fetchData();
  }, [users.id]);

  return (
    <div className="profile-animation w-full bg-dark1 h-screen">
      <div className={`${activeChats ? "hidden" : ""}`}>
        <div className="bg-dark6 p-4 pl-6 flex flex-row items-center gap-8">
          <button onClick={onClick} className="text-lg">
            <FaArrowLeft />
          </button>
          <h1 className="text-lg font-semibold">Chats</h1>
        </div>
        <div className="h-[85%]">
          <div className="bg-dark6 px-6 w-full">
            <h1 className="text-sm text-teal-400 py-4">Display</h1>
            <button
              onClick={() => handeThemeClick("theme")}
              className="user-top-bottom-border flex flex-row w-full py-4 justify-between items-center"
            >
              <div className="text-start">
                <h1>Theme</h1>
                <h2 className="text-sm font-light text-slate-400">
                  {userData.userthemelabel}
                </h2>
              </div>
              <FaAngleRight />
            </button>
            <button
              onClick={() => handelChatsButtonClick("wallpaper")}
              className="flex flex-row w-full py-4 justify-between items-center"
            >
              <h1>Wallpaper</h1>
              <FaAngleRight />
            </button>
          </div>
          <div className="bg-dark6 px-6 w-full my-2">
            <h1 className="text-sm text-teal-400 py-4">Chat settings</h1>
            <button
              onClick={() => handelChatsButtonClick("media")}
              className="user-top-bottom-border flex flex-row w-full py-4 justify-between items-center"
            >
              <h1>Media auto-download</h1>
              <FaAngleRight />
            </button>
            <button className="flex flex-row w-full py-4 justify-between items-center">
              <div className="text-start">
                <h1>Spell check</h1>
                <h2 className="text-sm font-light text-slate-400">
                  Check spelling while typing.
                </h2>
              </div>
              <Input type="checkbox" className="w-5 h-5" />
            </button>
            <button className="flex flex-row w-full py-4 justify-between items-center">
              <div className="text-start">
                <h1>Replace text with emoji</h1>
                <h2 className="text-sm font-light text-slate-400">
                  Emoji with replace specific text as you type.
                </h2>
              </div>
              <Input type="checkbox" className="w-5 h-5" />
            </button>
            <button className="flex flex-row w-full py-4 justify-between items-center">
              <div className="text-start">
                <h1>Enter is send</h1>
                <h2 className="text-sm font-light text-slate-400">
                  Enter key will send you messages.
                </h2>
              </div>
              <Input type="checkbox" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      <div className="bg-dark6 h-screen">
        {activeTheme === "theme" && <Theme setActiveTheme={setActiveTheme} />}
        {activeChats === "wallpaper" && (
          <div className="">
            <div className=" p-4 pl-6 flex flex-row items-center gap-8">
              <button onClick={() => setActiveChats(false)} className="text-lg">
                <FaArrowLeft />
              </button>
              <h1 className="text-lg font-semibold">Set chat wallpaper</h1>
            </div>
            <div className="scrollbaruser overflow-y-scroll flex flex-col h-[500px] w-full justify-start items-center">
              <Input
                type="checkbox"
                label="Add WhatsApp doodles"
                className="w-4 h-4"
              />
            </div>
          </div>
        )}
        {activeChats === "media" && (
          <div className="">
            <div className="p-4 pl-6 flex flex-row items-center gap-8">
              <button onClick={() => setActiveChats(false)} className="text-lg">
                <FaArrowLeft />
              </button>
              <h1 className="text-lg font-semibold">Media auto-download</h1>
            </div>
            <div className="p-5">
              <form className="user-top-bottom-border flex flex-col w-full p-3 justify-center items-start">
                <Input type="checkbox" label="Photos" className="w-4 h-4" />
                <Input type="checkbox" label="Audio" className="w-4 h-4" />
                <Input type="checkbox" label="Videos" className="w-4 h-4" />
                <Input type="checkbox" label="Documents" className="w-4 h-4" />
              </form>
              <p className="text-sm py-3 font-light">
                Voice messages are alwayes automatically downloaded for the best
                communication experience.
              </p>
              <button className="flex flex-row gap-4 items-center text-xl py-6 disabled:">
                <VscDebugRestart />
                <h1>Reset auto-download settings</h1>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatsatting;
