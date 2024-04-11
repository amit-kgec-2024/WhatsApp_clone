import React, { useState } from 'react'
import { FaArrowLeft, FaAngleRight } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa";
import Input from '../../Input';


const Privecy = ({onClick}) => {
  const [activePrivecy, setActivePrivecy] = useState(null)
  const handelPrivecyClick =(togglePrivecy)=>{
    setActivePrivecy(togglePrivecy);
  }
  const handleButtonClick = () => {
    window.open("https://faq.whatsapp.com/673193694148537?lang=en", "_blank");
  };
  const handleApplockClick = () => {
    window.open("https://faq.whatsapp.com/1726618467788240/?cms_platform=web&lang=en", "_blank");
  };
  return (
    <div className="profile-animation w-full bg-dark1 h-screen">
      <div className={`${activePrivecy ? "hidden" : ""}`}>
        <div className="bg-dark6 p-4 pl-6 flex flex-row items-center gap-8">
          <button onClick={onClick} className="text-lg">
            <FaArrowLeft />
          </button>
          <h1 className="text-lg font-semibold">Privecy</h1>
        </div>
        <div className="scrollbaruser w-full overflow-y-scroll h-[700px]">
          <div className="bg-dark6 px-6 w-full">
            <h1 className="text-sm text-teal-400 py-4">
              Who can see my personal info
            </h1>
            <button
              onClick={() => handelPrivecyClick("lastseen")}
              className="user-top-bottom-border flex flex-row w-full py-4 justify-between items-center"
            >
              <div className="text-start">
                <h1>Last seen and online</h1>
                <h2 className="text-sm font-light text-slate-400">
                  Nobody, Everyone
                </h2>
              </div>
              <FaAngleRight />
            </button>
            <button
              onClick={() => handelPrivecyClick("profilephoto")}
              className="user-top-bottom-border flex flex-row w-full py-4 justify-between items-center"
            >
              <div className="text-start">
                <h1>Profile photo</h1>
                <h2 className="text-sm font-light text-slate-400">
                  My contacts
                </h2>
              </div>
              <FaAngleRight />
            </button>
            <button
              onClick={() => handelPrivecyClick("about")}
              className="user-top-bottom-border flex flex-row w-full py-4 justify-between items-center"
            >
              <div className="text-start">
                <h1>About</h1>
                <h2 className="text-sm font-light text-slate-400">Everyone</h2>
              </div>
              <FaAngleRight />
            </button>
            <button className="flex flex-row w-full py-4 justify-between items-center">
              <div className="text-start">
                <h1>Read receipts</h1>
                <h2 className="text-sm font-light text-slate-400">
                  If turned off you won't send or receive read receipts. Read
                  receipts are always sent for group chats.
                </h2>
              </div>
              <Input type="checkbox" className="w-5 h-5" />
            </button>
          </div>
          <div className="bg-dark6 px-6 w-full my-2">
            <h1 className="text-sm text-teal-400 py-4">
              Who can see my personal info
            </h1>
            <button
              onClick={() => handelPrivecyClick("defaulttimer")}
              className="flex flex-row w-full py-4 justify-between items-center"
            >
              <div className="text-start">
                <h1>Default messages timer</h1>
                <h2 className="text-sm font-light text-slate-400">Off</h2>
              </div>
              <FaAngleRight />
            </button>
          </div>
          <div className="bg-dark6 px-6 mb-3 w-full">
            <button
              onClick={() => handelPrivecyClick("groups")}
              className="user-top-bottom-border flex flex-row w-full py-4 justify-between items-center"
            >
              <div className="text-start">
                <h1>Groups</h1>
                <h2 className="text-sm font-light text-slate-400">Everyone</h2>
              </div>
              <FaAngleRight />
            </button>
            <button
              onClick={() => handelPrivecyClick("blockedcontacts")}
              className="user-top-bottom-border flex flex-row w-full py-4 justify-between items-center"
            >
              <div className="text-start">
                <h1>Blocked contacts</h1>
                <h2 className="text-sm font-light text-slate-400">None</h2>
              </div>
              <FaAngleRight />
            </button>
            <button
              onClick={() => handelPrivecyClick("applock")}
              className="user-top-bottom-border flex flex-row w-full py-4 justify-between items-center"
            >
              <div className="text-start">
                <h1>App lock</h1>
                <h2 className="text-sm font-light text-slate-400">
                  Require password to unlock WhatsApp
                </h2>
              </div>
              <FaAngleRight />
            </button>
          </div>
        </div>
      </div>
      <div className="bg-dark6 w-full h-screen">
        {activePrivecy === "lastseen" && (
          <div className="">
            <div className="p-4 pl-6 flex flex-row items-center gap-8">
              <button
                onClick={() => setActivePrivecy(false)}
                className="text-lg"
              >
                <FaArrowLeft />
              </button>
              <h1 className="text-lg font-semibold">Last seen and online</h1>
            </div>
            <div className="p-5">
              <h2 className="text-sm font-light text-teal-500 py-4">
                Who can see my last seen
              </h2>
              <form className="user-top-bottom-border flex flex-col w-full p-3 justify-center items-start">
                <Input
                  type="radio"
                  name="lastseens"
                  label="Everyone"
                  className="w-4 h-4"
                />
                <Input
                  type="radio"
                  name="lastseens"
                  label="My contacts"
                  className="w-4 h-4"
                />
                <Input
                  type="radio"
                  name="lastseens"
                  label="My contacts except..."
                  className="w-4 h-4"
                />
                <Input
                  type="radio"
                  name="lastseens"
                  label="Nobody"
                  className="w-4 h-4"
                />
              </form>
              <h2 className="text-sm font-light text-teal-500 py-4">
                Who can see when I'm seen
              </h2>
              <form className="user-top-bottom-border flex flex-col w-full p-3 justify-center items-start">
                <Input
                  type="radio"
                  name="lastseens"
                  label="Everyone"
                  className="w-4 h-4"
                />
                <Input
                  type="radio"
                  name="lastseens"
                  label="Same as last seen"
                  className="w-4 h-4"
                />
              </form>
              <p className="text-sm py-3 font-light">
                If you don't share your last seen and online, you won't be able
                to see other people's last seen and online.
              </p>
            </div>
          </div>
        )}
        {activePrivecy === "profilephoto" && (
          <div className="">
            <div className=" p-4 pl-6 flex flex-row items-center gap-8">
              <button
                onClick={() => setActivePrivecy(false)}
                className="text-lg"
              >
                <FaArrowLeft />
              </button>
              <h1 className="text-lg font-semibold">Profile photo</h1>
            </div>
            <div className="p-5">
              <h2 className="text-sm font-light text-teal-500 py-4">
                Who can see my Profile photo
              </h2>
              <form className="flex flex-col w-full p-3 justify-center items-start">
                <Input
                  type="radio"
                  name="profilephotojklo"
                  label="Everyone"
                  className="w-4 h-4"
                />
                <Input
                  type="radio"
                  name="profilephotojklo"
                  label="My contacts"
                  className="w-4 h-4"
                />
                <Input
                  type="radio"
                  name="profilephotojklo"
                  label="My contacts except..."
                  className="w-4 h-4"
                />
                <Input
                  type="radio"
                  name="profilephotojklo"
                  label="Nobody"
                  className="w-4 h-4"
                />
              </form>
            </div>
          </div>
        )}
        {activePrivecy === "about" && (
          <div className="">
            <div className=" p-4 pl-6 flex flex-row items-center gap-8">
              <button
                onClick={() => setActivePrivecy(false)}
                className="text-lg"
              >
                <FaArrowLeft />
              </button>
              <h1 className="text-lg font-semibold">About</h1>
            </div>
            <div className="p-5">
              <h2 className="text-sm font-light text-teal-500 py-4">
                Who can see my About
              </h2>
              <form className="flex flex-col w-full p-3 justify-center items-start">
                <Input
                  type="radio"
                  name="aboutdft"
                  label="Everyone"
                  className="w-4 h-4"
                />
                <Input
                  type="radio"
                  name="aboutdft"
                  label="My contacts"
                  className="w-4 h-4"
                />
                <Input
                  type="radio"
                  name="aboutdft"
                  label="My contacts except..."
                  className="w-4 h-4"
                />
                <Input
                  type="radio"
                  name="aboutdft"
                  label="Nobody"
                  className="w-4 h-4"
                />
              </form>
            </div>
          </div>
        )}
        {activePrivecy === "defaulttimer" && (
          <div className="">
            <div className=" p-4 pl-6 flex flex-row items-center gap-8">
              <button
                onClick={() => setActivePrivecy(false)}
                className="text-lg"
              >
                <FaArrowLeft />
              </button>
              <h1 className="text-lg font-semibold">Default message timer</h1>
            </div>
            <div className="p-5">
              <h2 className="text-sm font-light text-teal-500 py-4">
                Start new chats with disappearing messages
              </h2>
              <form className="flex flex-col w-full p-3 justify-center items-start">
                <Input
                  type="radio"
                  name="defaulttimerhed"
                  label="24 hours"
                  className="w-4 h-4"
                />
                <Input
                  type="radio"
                  name="defaulttimerhed"
                  label="7 days"
                  className="w-4 h-4"
                />
                <Input
                  type="radio"
                  name="defaulttimerhed"
                  label="90 days"
                  className="w-4 h-4"
                />
                <Input
                  type="radio"
                  name="defaulttimerhed"
                  label="Off"
                  className="w-4 h-4"
                />
              </form>
              <p className="text-sm py-3 font-light">
                When turned on, all new individual chats will start with
                disappearing messages set to the duration you select. This
                setting will not affect your existing chats
              </p>
              <button
                onClick={handleButtonClick}
                className="py-4 text-sm text-teal-400 hover:underline"
              >
                Learn more
              </button>
            </div>
          </div>
        )}
        {activePrivecy === "groups" && (
          <div className="">
            <div className="p-4 pl-6 flex flex-row items-center gap-8">
              <button
                onClick={() => setActivePrivecy(false)}
                className="text-lg"
              >
                <FaArrowLeft />
              </button>
              <h1 className="text-lg font-semibold">Groups</h1>
            </div>
            <div className="p-5">
              <h2 className="text-sm font-light text-teal-500 py-4">
                Who can add me to groups
              </h2>
              <form className="flex flex-col w-full p-3 justify-center items-start">
                <Input
                  type="radio"
                  name="groupseh"
                  label="Everyone"
                  className="w-4 h-4"
                />
                <Input
                  type="radio"
                  name="groupseh"
                  label="My contacts"
                  className="w-4 h-4"
                />
                <Input
                  type="radio"
                  name="groupseh"
                  label="My contacts except..."
                  className="w-4 h-4"
                />
              </form>
              <p className="text-sm py-3 font-light">
                Admins who can't add you to a group will have the option of
                inviting you privately instead.
              </p>
              <p className="text-sm py-3 font-light">
                This setting does not apply to community announcement groups. If
                you're added to a community, you'll always be added to a
                community announcement group.
              </p>
            </div>
          </div>
        )}
        {activePrivecy === "blockedcontacts" && (
          <div className="">
            <div className="p-4 pl-6 flex flex-row items-center gap-8">
              <button
                onClick={() => setActivePrivecy(false)}
                className="text-lg"
              >
                <FaArrowLeft />
              </button>
              <h1 className="text-lg font-semibold">Blocked contacts</h1>
            </div>
            <div className="">
              <button className="user-top-bottom-border hover:bg-dark3 w-full flex flex-row gap-4 items-center text-lg py-6 px-6 disabled:">
                <FaUserPlus />
                <h1>Add block contacts</h1>
              </button>
            </div>
          </div>
        )}
        {activePrivecy === "applock" && (
          <div className="mb-3">
            <div className="p-4 pl-6 flex flex-row items-center gap-8">
              <button
                onClick={() => setActivePrivecy(false)}
                className="text-lg"
              >
                <FaArrowLeft />
              </button>
              <h1 className="text-lg font-semibold">App lock</h1>
            </div>
            <div className="p-5">
              <h2 className="text-sm font-light text-teal-500 py-4">
                Use App lock for privecy
              </h2>
              <p className="text-sm py-3 font-light">
                When enabled, you'll need to enter your password to unlock
                WhatsApp Web. Notifications will not appear when your app is
                locked. App lock will be turned off when you log out.{" "}
                <button
                  onClick={handleApplockClick}
                  className="text-teal-400 hover:underline"
                >
                  Learn more
                </button>
              </p>
              <button className="w-full flex flex-row gap-4 justify-between items-center text-xl py-8 disabled:">
                <h1>App lock</h1>
                <Input type="checkbox" className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Privecy
