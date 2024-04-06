import React from "react";
import { FaArrowLeft, FaChevronRight, FaArrowRight } from "react-icons/fa6";

const Newcommunity = ({ onClick }) => {
  const handleButtonClick = () => {
    window.open("https://faq.whatsapp.com/231869526393268?lang=en", "_blank");
  };
  return (
    <div className="profile-animation w-full bg-dark6 h-screen">
      <div className="bg-dark3 p-4 pl-6 pt-16 flex flex-row justify-start items-center gap-8">
        <button onClick={onClick} className="text-lg">
          <FaArrowLeft />
        </button>
        <h1 className="text-lg font-semibold">New Community</h1>
      </div>
      <div className="w-full">
        <img src="community.png" alt="Bird" />
        <h1 className="w-full py-2 font-bold text-center text-2xl">
          Create a new community
        </h1>
        <p className="text-xs text-slate-400 py-2 px-16 w-full text-center">
          Bring together a neighborhood, school or more. Create topic-based
          groups for members, and easily send them admin announcements.
        </p>
        <div className="flex flex-row justify-center items-center w-full text-sm py-2 text-whitmix1">
          <button onClick={handleButtonClick} className="hover:underline">
            See example communities
          </button>
          <FaChevronRight />
        </div>
        <div className="w-full text-center mt-14">
          <button className="p-3 bg-whitmix1 rounded-full">
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Newcommunity;
