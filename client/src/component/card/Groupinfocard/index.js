import { FaChevronDown } from "react-icons/fa6";
import React, { useRef, useState } from "react";
import useClickOutside from "../../../hooks/useClickOutside";
const Groupinfocard = ({
  groupId,
  username,
  userimage,
  userabout,
  adminDetails,
  userId,
  adminid,
}) => {
  const defaultAbout = "Hey there! I am using WhatsApp";
  const defaultImage = "/profiledefaultimage.jpg";
  const [isClick, setIsclick] = useState(false);
  const dropDownRef = useRef(null);
  const buttonRef = useRef(null);
  const handleClick = () => setIsclick((prev) => !prev);

  useClickOutside([dropDownRef, buttonRef], () => {
    setIsclick(false);
  });
  // Remove users......................
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://whats-app-clone-server-psi.vercel.app/api/remove/groups/users/${groupId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userIds: [userId] }),
        }
      );
      const data = await response.json();
      if (data.success) {
        console.log("Users removed successfully");
        setIsclick(false);
      } else {
        console.log(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error fetching group details:", error);
    }
  };
 
  
  return (
    <div className="">
      <button className="parent w-full flex flex-row justify-center items-start gap-2 hover:bg-dark3">
        <div className="p-3">
          <div
            className="w-12 h-12 border rounded-full overflow-hidden text-center bg-dark5"
            style={{
              backgroundImage: `url(${userimage || defaultImage})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          ></div>
        </div>
        <div className="user-top-border flex flex-row justify-between items-center w-full">
          <div className="py-3 flex flex-row justify-between items-center">
            <div className="flex flex-col items-start">
              <h1 className="font-light">{username}</h1>
              <h4 className="text-xs text-slate-400 font-thin">
                <div>{userabout || defaultAbout}</div>
              </h4>
            </div>
          </div>
          {adminDetails ? (
            <h1 className="text-[10px] px-1 rounded-sm text-slate-400 mr-[5%] bg-dark5">
              Group Admin
            </h1>
          ) : (
            <div className="">
              <button
                onClick={handleClick}
                ref={buttonRef}
                className={`text-slate-400 opacity-0 hover:opacity-100 hover:mr-12`}
              >
                <FaChevronDown />
              </button>
              {isClick && (
                <div
                  ref={dropDownRef}
                  className="absolute z-50 mr-6 right-0 bg-dark4 w-44 shadow-2xl text-xs py-2 flex flex-col justify-start items-start rounded-sm"
                >
                  <button className="hover:bg-dark6 w-full text-start px-5 py-3">
                    Make group admin
                  </button>
                  <button
                    onClick={(e) => handleSubmit(e)}
                    className="hover:bg-dark6 w-full text-start px-5 py-3"
                  >
                    Remove
                  </button>
                  <button className="hover:bg-dark6 w-full text-start px-5 py-3">
                    Verify security code
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </button>
    </div>
  );
};

export default Groupinfocard;
