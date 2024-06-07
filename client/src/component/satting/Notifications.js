import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import Input from "../Input";

const Notifications = ({ onClick }) => {
  return (
    <div className="profile-animation w-full h-screen">
      <div className=" p-4 pl-6 flex flex-row items-center gap-8">
        <button onClick={onClick} className="text-lg">
          <FaArrowLeft />
        </button>
        <h1 className="text-lg font-semibold">Notifications</h1>
      </div>
      <div className="p-6 w-full">
        <h1 className="text-sm text-teal-600 mb-8">Messages</h1>
        <form action="">
          <div className="user-top-bottom-border flex flex-row justify-between items-center py-3">
            <h1>
              Message notifications{" "}
              <p className="text-sm">Show notifications for new messages</p>
            </h1>
            <Input type="checkbox" className="w-5 h-5" />
          </div>
          <div className="flex flex-row justify-between items-center py-3">
            <h1>Show previews</h1>
            <Input type="checkbox" className="w-5 h-5" />
          </div>
          <div className="flex flex-row justify-between items-center py-3">
            <h1>Show reaction notifications</h1>
            <Input type="checkbox" className="w-5 h-5" />
          </div>
          <div className="flex flex-row justify-between items-center py-3">
            <h1>
              Background sync{" "}
              <p className="text-sm">
                Get faster performance by syncing messages in the background.
              </p>
            </h1>
            <Input type="checkbox" className="w-5 h-5" />
          </div>
          <div className="flex flex-row justify-between items-center py-3">
            <h1>
              Sounds{" "}
              <p className="text-sm">Play sounds for incoming messages</p>
            </h1>
            <Input type="checkbox" className="w-5 h-5" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Notifications;
