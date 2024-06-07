import Chats from "../users/Chats";
import React, { useEffect, useState } from "react";
import { MdOutlineGroups } from "react-icons/md";
import { IoSyncCircleOutline } from "react-icons/io5";
import { RiChatVoiceFill } from "react-icons/ri";
import { TbSettings } from "react-icons/tb";
import { MdChat } from "react-icons/md";
import Profile from "../users/Profile";
import Communities from "../communite/Communities";
import Status from "../menu/Status";
import Channels from "../channel/Channels";
import Sattings from "../satting/Sattings";
import Users from "../users/Users";
import Help from "../satting/Help";
// import Loaderhome from "../Loaderhome";
import Groupchats from "../groups/Groupchats";
import ChannelChats from "../channel/ChannelChats";
import DefaultChats from "../DefaultChats";

function Home() {
  // profile...............
  const [activeButton, setActiveButton] = useState("chats");
  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };

  const [userId, setUserId] = useState();
  const [groupId, setGroupId] = useState();
  const [channelId, setCgannelId] = useState();
  const [userClickChat, setUserClickChat] = useState("mainses");
  const handelUserChatsClick = (toggleUserChat, id) => {
    setUserClickChat(toggleUserChat);
    if (toggleUserChat === "userchats") {
      setUserId(id);
    } else if (toggleUserChat === "groupchats") {
      setGroupId(id);
    } else {
      setCgannelId(id);
    }

    console.log(id);
  };

  const defaultImage = "/profiledefaultimage.jpg";
  const [imageUrl, setImageUrl] = useState("");

  const [users] = useState(
    () => JSON.parse(localStorage.getItem("users:detail")) || {}
  );
  // const [progress, setProgress] = useState(0);
  // const [percent, setPercent] = useState(0);

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

    //   const interval = setInterval(() => {
    //     setProgress((val) => {
    //       if (val < 100) {
    //         return val + 5;
    //       }
    //       clearInterval(interval);
    //       return val;
    //     });
    //   }, 100);

    //   return () => clearInterval(interval);
    // }, [users.id]);

    // useEffect(() => {
    //   if (progress <= 100) {
    //     setPercent(progress);
    //   }
  }, [users.id]);

  return (
    <div className="">
      <div className="flex flex-row justify-center">
        <div
          className="user-right-border bg-dark6 w-[33%] h-screen text-white"
          style={{
            backgroundColor:
              imageUrl.usertheme === "#000000" ? "#111b21" : "#f4f4f5",
          }}
        >
          <div className="flex flex-row w-full h-screen">
            <div
              style={{
                backgroundColor:
                  imageUrl.usertheme === "#000000" ? "#233138" : "#e2e8f0",
              }}
              className={`w-[11%] bg-dark3 flex flex-col items-center justify-between py-5`}
            >
              <div className="flex flex-col gap-5 text-slate-400 text-2xl">
                <button
                  onClick={() => handleButtonClick("chats")}
                  className={`p-2 ${
                    activeButton === "chats"
                      ? (imageUrl?.usertheme === "#000000" ? "rounded-full bg-dark5" : "rounded-full bg-slate-400 text-black")
                      : "bg-none"
                  }`}
                >
                  <MdChat />
                </button>
                <button
                  onClick={() => handleButtonClick("communities")}
                  className={`p-2 ${
                    activeButton === "communities"
                      ? (imageUrl?.usertheme === "#000000" ? "rounded-full bg-dark5" : "rounded-full bg-slate-400 text-black")
                      : "bg-none"
                  }`}
                >
                  <MdOutlineGroups />
                </button>
                <button
                  onClick={() => handleButtonClick("status")}
                  className={`user-top-bottom-border p-2 ${
                    activeButton === "status"
                      ? (imageUrl?.usertheme === "#000000" ? "rounded-full bg-dark5" : "rounded-full bg-slate-400 text-black")
                      : "bg-none"
                  }`}
                >
                  <IoSyncCircleOutline />
                </button>
                <button
                  onClick={() => handleButtonClick("channels")}
                  className={`p-2 ${
                    activeButton === "channels"
                      ? (imageUrl?.usertheme === "#000000" ? "rounded-full bg-dark5" : "rounded-full bg-slate-400 text-black")
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
                      ? (imageUrl?.usertheme === "#000000" ? "rounded-full bg-dark5" : "rounded-full bg-slate-400 text-black")
                      : "bg-none shadow"
                  }`}
                >
                  BEAT
                </button>
                <button
                  onClick={() => handleButtonClick("sattings")}
                  className={`p-2 ${
                    activeButton === "sattings"
                      ? (imageUrl?.usertheme === "#000000" ? "rounded-full bg-dark5" : "rounded-full bg-slate-400 text-black")
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
                <Users
                  theme={imageUrl?.usertheme}
                  handelUserChatsClick={handelUserChatsClick}
                />
              )}
              {activeButton === "help" && <Help theme={imageUrl?.usertheme} />}
              {activeButton === "profile" && (
                <Profile theme={imageUrl?.usertheme} />
              )}
              {activeButton === "communities" && (
                <Communities
                  theme={imageUrl?.usertheme}
                  handelUserChatsClick={handelUserChatsClick}
                />
              )}
              {activeButton === "status" && (
                <Status theme={imageUrl?.usertheme} />
              )}
              {activeButton === "channels" && (
                <Channels
                  theme={imageUrl?.usertheme}
                  handelUserChatsClick={handelUserChatsClick}
                />
              )}
              {activeButton === "sattings" && (
                <Sattings theme={imageUrl?.usertheme} />
              )}
            </div>
          </div>
        </div>
        <div
          className="bg-dark2 w-[67%] h-screen text-white"
          style={{ backgroundColor: `${imageUrl.usertheme}101` }}
        >
          {userClickChat === "mainses" && <DefaultChats />}
          {userClickChat === "userchats" && (
            <Chats theme={imageUrl?.usertheme} userId={userId} />
          )}
          {userClickChat === "groupchats" && (
            <Groupchats theme={imageUrl?.usertheme} groupId={groupId} />
          )}
          {userClickChat === "channelchats" && (
            <ChannelChats theme={imageUrl?.usertheme} channelId={channelId} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
