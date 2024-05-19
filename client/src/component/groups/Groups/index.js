import React, { useEffect, useState } from 'react'
import Groupscard from '../../card/Groupscard';

const Groups = ({ handelUserChatsClick }) => {
  // User Details
  const [users] = useState(
    () => JSON.parse(localStorage.getItem("users:detail")) || {}
  );
//   Group get data..........................
const defaultImage = "/profiledefaultimage.jpg";
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
        {groupDetails && groupDetails.length > 0 ? (
          groupDetails.map((ele) => (
            <Groupscard
              key={ele._id}
              groupId={ele._id}
              groupname={ele.groupname}
              groupimage={ele.groupimage || defaultImage}
              handelUserChatsClick={handelUserChatsClick}
            />
          ))
        ) : (
          <p>No groups found</p>
        )}
      </div>
    </div>
  );
};

export default Groups
