import React, { useEffect, useState } from "react";
import Groupscard from "../card/Groupscard";
import LoaderCard from "../card/LoaderCard";

const Groups = ({ handelUserChatsClick, theme }) => {
  const defauGroupImage = "/defaultgroupimage.png";
  // User Details
  const [users] = useState(
    () => JSON.parse(localStorage.getItem("users:detail")) || {}
  );
  //   Group get data..........................
  const [groupDetails, setGroupDetails] = useState();
  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const response = await fetch(
          `https://whats-app-clone-server-psi.vercel.app/api/show/groups/${users.id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch group details");
        }
        const data = await response.json();
        setGroupDetails(data.data);
      } catch (error) {
        console.error("Error fetching group details:", error);
      }
    };

    fetchGroupDetails();
  }, [users.id]);
  return (
    <div>
      <div className="">
        {groupDetails && groupDetails.length > 0
          ? groupDetails.map((ele) => (
              <Groupscard
                key={ele._id}
                groupId={ele._id}
                groupname={ele.groupname}
                groupimage={ele.groupimage || defauGroupImage}
                handelUserChatsClick={handelUserChatsClick}
                theme={theme}
              />
            ))
          : <LoaderCard theme={theme}/>}
      </div>
    </div>
  );
};

export default Groups;
