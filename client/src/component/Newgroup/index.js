import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import userNewData from "../../utils/userNewData";
import Newchatcard from "../card/Newchatcard";

const Newgroup = ({onClick}) => {
  // User Details
  const [user] = useState(
    () => JSON.parse(localStorage.getItem("users:detail")) || {}
  );
  // Users all...................................
  const [userAll, setUserAll] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://whats-app-clone-server-psi.vercel.app/api/users/all/${user.id}`
        );
        const jsonData = await res.json();
        setUserAll(jsonData);
      } catch (error) {
        console.log("Error Fetching Data", error);
      }
    };
    fetchData();
  }, [user.id]);
  return (
    <div className="w-full bg-dark6 h-screen">
      <div className=" p-4 pl-6 flex flex-row justify-start items-center gap-8">
        <button onClick={onClick} className="text-lg">
          <FaArrowLeft />
        </button>
        <div className="text-lg font-semibold">Add group members</div>
      </div>
      <div className="w-full px-9 py-6">
        <input
          type="text"
          placeholder="Search name or number"
          className="user-top-bottom-border text-sm outline-none bg-dark6 w-full"
        />
      </div>
      <div className="scrollbaruser overflow-y-scroll h-[630px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        <div className="mt-3 bg-dark6">
          {userAll &&
            Array.isArray(userAll) &&
            userAll.map((ele, index) => (
              <Newchatcard
                key={index}
                userId={ele._id}
                mobile={ele.mobile}
                username={ele.username}
                userabout={ele.userabout}
                userimage={ele.userimage}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Newgroup;
