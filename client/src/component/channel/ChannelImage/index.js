import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";

const ChannelImage = ({ onClick, groupId }) => {
  const defauGroupImage = "/defaultgroupimage.png";
  // Group details........GET..........
  const [groupDetails, setGroupDetails] = useState(null);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const response = await fetch(
          `https://whats-app-clone-server-psi.vercel.app/api/show/groups/${groupId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch group details");
        }
        const data = await response.json();
        setGroupDetails(data.data[0]);
        console.log("Group Details--->", data.data[0]);
      } catch (error) {
        console.error("Error fetching group details:", error);
      }
    };

    fetchGroupDetails();
  }, [groupId]);
  return (
    <div className="profile-animation bg-dark6 z-50 bg-opacity-90 w-full h-screen">
      <div className="bg-dark6 opacity-100 px-6 py-3 flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-6">
          <div
            className="w-12 h-12 rounded-full overflow-hidden"
            style={{
              backgroundImage: `url(${
                groupDetails?.groupimage || defauGroupImage
              })`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          ></div>
          <h1 className="text-xl">{groupDetails?.groupname}</h1>
        </div>
        <button onClick={onClick} className="text-lg">
          <RxCross1 />
        </button>
      </div>
      <div className="w-full flex justify-center">
        <img
          src={`${groupDetails?.groupimage || defauGroupImage}`}
          width={500}
          height={500}
          alt="Bird"
        />
      </div>
    </div>
  );
};

export default ChannelImage;
