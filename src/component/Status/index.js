import React from 'react'
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

const Status = () => {
  return (
    <div className="w-full bg-dark6 h-screen">
      <div className="bg-dark3 p-3 pl-6 pt-16 flex flex-row justify-start items-end gap-8">
        <Link to="/" className="text-2xl">
          <FaArrowLeft />
        </Link>
        <div className="text-xl font-bold">Status</div>
      </div>
    </div>
  );
}

export default Status
