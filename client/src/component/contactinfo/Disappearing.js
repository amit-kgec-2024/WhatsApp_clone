import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Input from "../Input";

const Disappearing = ({ onClick }) => {
  const handleButtonClick = () => {
    window.open("https://faq.whatsapp.com/673193694148537?lang=en", "_blank");
  };
  const [activeDisappearing, setActiveDisappearing] = useState(null);
  const handelDisappearingClick = (disappearingButton) => {
    setActiveDisappearing(disappearingButton);
  };
  return (
    <div className="profile-animation w-full bg-dark6 h-screen">
      <div className={`${activeDisappearing ? "hidden" : ""}`}>
        <div className="bg-dark3 p-4 pl-6 flex flex-row items-center gap-5">
          <button onClick={onClick} className="text-lg">
            <FaArrowLeft />
          </button>
          <h1>Disappearing messages</h1>
        </div>
        <div className="">
          <img src="disappearingimg.png" alt="Bird" />
        </div>
        <h1 className="text-sm px-8 py-3 font-light text-teal-400 w-full">
          Make messages in this chat disappear
        </h1>
        <p className="text-sm text-slate-400 px-8 py-2">
          For more privacy and storage, all new messages will disappear from
          this chat for everyone after the selected duration, except when kept.
          Anyone in the chat can change this setting.{" "}
          <Link
            onClick={handleButtonClick}
            className="text-teal-400 hover:underline"
          >
            Learn more
          </Link>
        </p>
        <form className="w-full px-8">
          <Input
            type="radio"
            name="duration"
            label="24 Hours"
            className="w-5 h-5"
          />
          <Input
            type="radio"
            name="duration"
            label="7 days"
            className="w-5 h-5"
          />
          <Input
            type="radio"
            name="duration"
            label="90 days"
            className="w-5 h-5"
          />
          <Input type="radio" name="duration" label="Off" className="w-5 h-5" />
        </form>
        <h1 className="w-full text-sm text-center py-8">
          Update your{" "}
          <button
            onClick={() => handelDisappearingClick("disappearing")}
            className="text-teal-400"
          >
            default messages timer
          </button>{" "}
          in Settings
        </h1>
      </div>
      {activeDisappearing === "disappearing" && (
        <div className="">
          <div className="bg-dark3 p-4 pl-6 pt-14 flex flex-row items-center gap-5">
            <button
              onClick={() => setActiveDisappearing(false)}
              className="text-lg"
            >
              <FaArrowLeft />
            </button>
            <h1 className="font-bold text-xl">Default message timer</h1>
          </div>
          <h1 className="text-sm px-8 py-8 font-light text-teal-400 w-full">
            Start now chats with disappearing messages
          </h1>
          <form className="w-full px-8">
            <Input
              type="radio"
              name="duration"
              label="24 Hours"
              className="w-5 h-5"
            />
            <Input
              type="radio"
              name="duration"
              label="7 days"
              className="w-5 h-5"
            />
            <Input
              type="radio"
              name="duration"
              label="90 days"
              className="w-5 h-5"
            />
            <Input
              type="radio"
              name="duration"
              label="Off"
              className="w-5 h-5"
            />
          </form>
          <p className="text-sm text-slate-400 px-8 py-4">
            When turned on, all new individual chats will start with
            disappearing messages set to the duration you select. This setting
            will not affect your existing chats.
          </p>
          <Link
            onClick={handleButtonClick}
            className="text-sm px-8 py-2 font-light text-teal-400 hover:underline"
          >
            Learn more
          </Link>
        </div>
      )}
    </div>
  );
};

export default Disappearing;
