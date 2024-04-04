import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

const Profile = () => {
  return (
    <div className="w-full bg-dark6 h-screen">
      <div className="bg-dark3 p-3 pl-6 pt-16 flex flex-row justify-start items-end gap-8">
        <Link to="/" className="text-2xl">
          <FaArrowLeft />
        </Link>
        <div className="text-xl font-semibold">Profile</div>
      </div>
      <div className="flex flex-col p-4">
        <div className="w-full justify-center items-center flex py-8">
          <div className="border-4 rounded-full w-40 h-40 bg-slate-400">
            <img src="/logo192.png" alt="Bird" />
          </div>
        </div>
        <h2 className="my-4 text-whitmix1">Your name</h2>
      </div>
    </div>
  );
};

export default Profile;
