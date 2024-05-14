import React, { useState } from "react";
import { FaArrowLeft, FaAngleRight } from "react-icons/fa6";
import { VscDebugRestart } from "react-icons/vsc";
import Input from "../../Input";
import Theme from "../../Theme"

const Chatsatting = ({ onClick }) => {
  const [activeChats, setActiveChats] = useState(null);
  const handelChatsButtonClick = (toggleChats)=> {
    setActiveChats(toggleChats);
  }
  const [activeTheme, setActiveTheme] = useState(null)
  const handeThemeClick = (toggleTheme)=> {
    setActiveTheme(toggleTheme)
  }
   
  // theme colors..............................
  // const [selectedColor, setSelectedColor] = useState();
  // const [savedColor, setSavedColor] = useState();
  // const [showColorSelection, setShowColorSelection] = useState(true);

  // const handleColorChange = (event) => {
  //   setSelectedColor(event.target.value);
  //   console.log('color->', selectedColor)
  // };
  //  const handleSaveColor = () => {
  //    setSavedColor(selectedColor);
  //    setActiveTheme(false);
  //  };
  // const buttonStyle = {
  //   backgroundColor: selectedColor,
  //   color: "#ffffff",
  // };
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
                  System default
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
        {activeTheme === "theme" && (
          <div className="absolute w-full h-screen left-0 top-0 bg-dark1 z-50 opacity-80 flex justify-center items-center">
            <div className="bg-dark3 p-6 w-[30%]">
              <h1 className="text-lg font-light">Theme</h1>
              {/* <form action="">
                <Input
                  type="radio"
                  name="color"
                  value="#ff0000"
                  checked={selectedColor === "#ff0000"}
                  onChange={handleColorChange}
                  label="Light"
                  className="w-5 h-5"
                />
                <Input
                  type="radio"
                  name="color"
                  value="#00ff00"
                  checked={selectedColor === "#00ff00"}
                  onChange={handleColorChange}
                  label="Dark"
                  className="w-5 h-5"
                />
                <Input
                  type="radio"
                  name="color"
                  value="#0000ff"
                  checked={selectedColor === "#0000ff"}
                  onChange={handleColorChange}
                  label="System default"
                  className="w-5 h-5"
                />
              </form> */}
              {/* <div className="flex flex-row w-full justify-end items-center pt-4 gap-4">
                <button
                  onClick={() => setActiveTheme(false)}
                  className="text-lg px-4 rounded-full bg-dark3 shadow-2xl border hover:text-teal-600"
                >
                  Cancel
                </button>
                <button
                  style={buttonStyle}
                  onClick={handleSaveColor}
                  // onClick={() => setActiveTheme(false)}
                  className="text-lg px-4 rounded-full text-black bg-teal-600 hover:bg-teal-500"
                >
                  OK
                </button>
              </div> */}
              <Theme/>
            </div>
          </div>
        )}
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
