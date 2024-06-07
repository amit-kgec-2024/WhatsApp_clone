import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { FaRegCalendar } from "react-icons/fa6";
import { IoMdSearch } from "react-icons/io";

const Searchmessage = ({ onClick, userId, theme }) => {
  const [userDetails, setUserDetails] = useState("");
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
    <div className="user-left-border w-full h-screen">
      <div className={`flex flex-row gap-10 h-14 justify-start items-center ${theme === "#000000" ? "bg-dark3" : "bg-slate-200"}`}>
        <button onClick={onClick} className="ml-8">
          <RxCross1 />
        </button>
        <h1>Search messages</h1>
      </div>
      <div className="flex w-full flex-row justify-start items-center p-2 gap-3">
        <button>
          <FaRegCalendar />
        </button>
        <div className={`w-full flex flex-row gap-3 ${theme === "#000000" ? "bg-dark3" : "bg-slate-200"} px-3 py-1 rounded-lg`}>
          <button>
            <IoMdSearch />
          </button>
          <input
            type="text"
            placeholder="Search"
            className={`outline-none px-2 text-sm ${theme === "#000000" ? "bg-dark3" : "bg-slate-200"} w-full`}
          />
        </div>
      </div>
      <p className="text-xs text-slate-400 w-full text-center mt-28">
        Search for messages width {userDetails.username || userDetails.mobile}.
      </p>
    </div>
  );
};

export default Searchmessage;
