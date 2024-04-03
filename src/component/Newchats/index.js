import React from 'react'
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

const Newchats = () => {
  return (
    <div className="w-full bg-white h-screen">
      <div className="bg-slate-600 p-3 pl-6 pt-16 flex flex-row justify-start items-end gap-8">
        <Link to="/" className="text-2xl">
          <FaArrowLeft />
        </Link>
        <div className="text-xl font-bold">New Chats</div>
      </div>
    </div>
  );
}

export default Newchats
