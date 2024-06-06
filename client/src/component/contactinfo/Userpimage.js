import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";

const Userpimage = ({ onClick, userId }) => {
  // User Details........................
  const defaultImage = "/profiledefaultimage.jpg";
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
    <div className="profile-animation bg-dark6 z-50 bg-opacity-90 w-full h-screen">
      <div className="bg-dark6 opacity-100 px-6 py-3 flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-6">
          <div
            className="w-12 h-12 rounded-full overflow-hidden"
            style={{
              backgroundImage: `url(${userDetails.userimage || defaultImage})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
          </div>
          <h1 className="text-xl">
            {userDetails.username || userDetails.mobile}
          </h1>
        </div>
        <button onClick={onClick} className="text-lg">
          <RxCross1 />
        </button>
      </div>
      <div className="w-full flex justify-center">
        <img
          src={`${userDetails.userimage || defaultImage}`}
          width={500}
          height={500}
          alt="Bird"
        />
      </div>
    </div>
  );
};

export default Userpimage;
