import Chats from "../Chats";
import React, { useEffect, useState } from "react";
import { MdOutlineGroups } from "react-icons/md";
import { IoSyncCircleOutline } from "react-icons/io5";
import { RiChatVoiceFill } from "react-icons/ri";
import { TbSettings } from "react-icons/tb";
import { MdChat } from "react-icons/md";
import Profile from "../Profile";
import Communities from "../Communities";
import Status from "../Status";
import Channels from "../Channels";
import Sattings from "../Sattings";
import Users from "../Users";
import Help from "../satting/Help";
import Loaderhome from "../Loaderhome";
import Groupchats from "../groups/Groupchats";

function Home() {
  // profile...............
  const [activeButton, setActiveButton] = useState("chats");
  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };

  const [userId, setUserId] = useState();
  const [groupId, setGroupId] = useState();
  const [userClickChat, setUserClickChat] = useState("mainses");
  const handelUserChatsClick = (toggleUserChat, id) => {
    setUserClickChat(toggleUserChat);
    if (toggleUserChat === "userchats") {
      setUserId(id);
    } else {
      setGroupId(id);
    }

    console.log(id);
  };
  
  const defaultImage = "/profiledefaultimage.jpg";
  const [imageUrl, setImageUrl] = useState("");
  
  const [users] = useState(
    () => JSON.parse(localStorage.getItem("users:detail")) || {}
  );
  const [progress, setProgress] = useState(0);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (!users.id) {
      console.error("User ID is undefined. Cannot fetch user details.");
      return;
    }
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://whats-app-clone-server-psi.vercel.app/api/userdetails/${users.id}`
        );

        if (!res.ok) {
          throw new Error(`Error fetching data: ${res.statusText}`);
        }

        const jsonData = await res.json();
        setImageUrl(jsonData);
        console.log("API response data:", jsonData);
      } catch (error) {
        console.log("Error Fetching Data", error);
      }
    };

    fetchData();

    const interval = setInterval(() => {
      setProgress((val) => {
        if (val < 100) {
          return val + 5;
        }
        clearInterval(interval);
        return val;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [users.id]);

  useEffect(() => {
    if (progress <= 100) {
      setPercent(progress);
    }
  }, [progress]);

  return (
    <div className="">
      {progress === 100 ? (
        <div className="flex flex-row justify-center">
          <div
            className="user-right-border bg-dark6 w-[33%] h-screen text-white"
            style={{ backgroundColor: `${imageUrl.usertheme}111` }}
          >
            <div className="flex flex-row w-full h-screen">
              <div
                style={{ backgroundColor: `${imageUrl.usertheme}7f8` }}
                className={`w-[11%] bg-dark3 flex flex-col items-center justify-between py-5`}
              >
                <div className="flex flex-col gap-5 text-slate-400 text-2xl">
                  <button
                    onClick={() => handleButtonClick("chats")}
                    className={`p-2 ${
                      activeButton === "chats"
                        ? "rounded-full bg-dark5"
                        : "bg-none"
                    }`}
                  >
                    <MdChat />
                  </button>
                  <button
                    onClick={() => handleButtonClick("communities")}
                    className={`p-2 ${
                      activeButton === "communities"
                        ? "rounded-full bg-dark5"
                        : "bg-none"
                    }`}
                  >
                    <MdOutlineGroups />
                  </button>
                  <button
                    onClick={() => handleButtonClick("status")}
                    className={`user-top-bottom-border p-2 ${
                      activeButton === "status"
                        ? "rounded-full bg-dark5"
                        : "bg-none"
                    }`}
                  >
                    <IoSyncCircleOutline />
                  </button>
                  <button
                    onClick={() => handleButtonClick("channels")}
                    className={`p-2 ${
                      activeButton === "channels"
                        ? "rounded-full bg-dark5"
                        : "bg-none"
                    }`}
                  >
                    <RiChatVoiceFill />
                  </button>
                </div>
                <div className="flex flex-col gap-5 text-slate-400 text-2xl">
                  <button
                    onClick={() => handleButtonClick("help")}
                    className={` px-1 py-3 text-xs ${
                      activeButton === "help"
                        ? "rounded-full bg-dark5"
                        : "bg-none shadow"
                    }`}
                  >
                    BEAT
                  </button>
                  <button
                    onClick={() => handleButtonClick("sattings")}
                    className={`p-2 ${
                      activeButton === "sattings"
                        ? "rounded-full bg-dark5"
                        : "bg-none"
                    }`}
                  >
                    <TbSettings />
                  </button>
                  <button
                    onClick={() => handleButtonClick("profile")}
                    className="rounded-full border-2 overflow-hidden bg-slate-500 border-white w-10 h-10"
                    style={{
                      backgroundImage: `url(${
                        imageUrl.userimage || defaultImage
                      })`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  ></button>
                </div>
              </div>
              <div className="w-[89%]">
                {activeButton === "chats" && (
                  <Users handelUserChatsClick={handelUserChatsClick} />
                )}
                {activeButton === "help" && <Help />}
                {activeButton === "profile" && <Profile />}
                {activeButton === "communities" && (
                  <Communities handelUserChatsClick={handelUserChatsClick} />
                )}
                {activeButton === "status" && <Status />}
                {activeButton === "channels" && (
                  <Channels handelUserChatsClick={handelUserChatsClick} />
                )}
                {activeButton === "sattings" && <Sattings />}
              </div>
            </div>
          </div>
          <div
            className="bg-dark2 w-[67%] h-screen text-white"
            style={{ backgroundColor: `${imageUrl.usertheme}101` }}
          >
            {userClickChat === "mainses" && (
              <div
                className="w-full h-screen bg-dark3 flex flex-col items-center justify-center"
                style={{ backgroundColor: `${imageUrl.usertheme}b21` }}
              >
                <div className="w-full flex justify-center">
                  <img src="frontchat.png" alt="Bird" />
                </div>
                <h1 className="text-4xl font-light text-center py-3">
                  Download WhatsApp for Windows
                </h1>
                <h1 className="text-sm text-slate-400 w-full text-center py-3">
                  Make Calls, share your screen and get a faster experience when
                  you download the <br />
                  Windows app.
                </h1>
                <div className="w-full flex justify-center py-3">
                  <button className="px-5 py-2 rounded-full text-black bg-teal-500">
                    Get from Microsoft Store
                  </button>
                </div>
              </div>
            )}
            {userClickChat === "userchats" && <Chats theme={imageUrl?.usertheme} userId={userId} />}
            {userClickChat === "groupchats" && <Groupchats theme={imageUrl?.usertheme} groupId={groupId} />}
          </div>
        </div>
      ) : (
        <Loaderhome percent={percent} />
      )}
    </div>
  );
}

export default Home;
