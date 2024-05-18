import React, { useEffect, useState } from "react";
import { FaAngleRight, FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import Groupuser from "../card/Groupuser";
import { BiLeftArrow } from "react-icons/bi";
import { IoCameraOutline, IoCheckmarkSharp } from "react-icons/io5";

const Newgroup = ({ onClick }) => {
  const [showToggle, setShowToggle] = useState(null);
  const handelToggle = (toggleBox) => {
    setShowToggle(toggleBox);
  };
  const defaultImage = "/profiledefaultimage.jpg";
  const defaultAbout = "Hey there! I am using WhatsApp";
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
  // .......Group create.........................
  const [groups, setGroups] = useState([]);
  const [userIds, setUserIds] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const handelGroup = (_id) => {
    setGroups((prevGroups) => {
      if (!prevGroups.some((group) => group.userId === _id)) {
        return [...prevGroups, { userId: _id }];
      }
      return prevGroups;
    });
    setUserIds((prevUserIds) => {
      if (!prevUserIds.includes(_id)) {
        return [...prevUserIds, _id];
      }
      return prevUserIds;
    });
  };
  const fetchUserDetails = async (_id) => {
    try {
      const response = await fetch(
        `https://whats-app-clone-server-psi.vercel.app/api/userDetails/${_id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user details:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      const newUserDetails = {};
      for (const group of groups) {
        if (!userDetails[group.userId]) {
          const details = await fetchUserDetails(group.userId);
          if (details) {
            newUserDetails[group.userId] = details;
          }
        }
      }
      setUserDetails((prevDetails) => ({ ...prevDetails, ...newUserDetails }));
    };

    fetchDetails();
  }, [groups]);
  // ...........................
  const handleRemoveUser = (userId) => {
    setGroups((prevGroups) =>
      prevGroups.filter((group) => group.userId !== userId)
    );
  };
  // Group profile add..........................
  const [groupName, setGroupeName] = useState();
  const [imageUrl, setImageUrl] = useState("profiledefaultimage.jpg");
  const [userImage, setUserImage] = useState("");
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", document.getElementById("fileInput").files[0]);
    formData.append("upload_preset", "WhatsApp-profile");
    formData.append("cloud_name", "dn2tlzn9b");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dn2tlzn9b/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (res.status === 200) {
      const data = await res.json();
      setUserImage(data.secure_url);
      return data;
    } else {
      throw new Error("Image upload failed");
    }
  };
  // ...............Submit Group..................
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { secure_url } = await uploadImage();
      console.log("Image URL:", secure_url);
      console.log("Image URL:", userImage);
      const res = await fetch(
        `http://localhost:4000/api/create/groups/${user.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userIds, groupimage: secure_url, groupname: groupName }),
        }
      );
      const data = await res.json();
      alert("Success Full")
      console.log("Data--->", data);
    } catch (err) {
      console.log("Error Fetching Data", err);
    }
  };
  return (
    <div className="">
      <div
        className={`w-full bg-dark6 h-screen flex flex-col ${
          showToggle ? "hidden" : ""
        }`}
      >
        <div className=" p-4 pl-6 flex flex-row justify-start items-center gap-8">
          <button onClick={onClick} className="text-lg">
            <FaArrowLeft />
          </button>
          <div className="text-lg font-semibold">Add group members</div>
        </div>
        <div className="flex flex-wrap gap-3 p-2 max-h-40 overflow-y-scroll scrollbaruser">
          {groups.map((group, index) => (
            <biv key={index}>
              {userDetails[group.userId] ? (
                <div className="flex  items-center gap-2 bg-dark4 py-1 px-3 rounded-full">
                  <div className="w-[25px] h-[25px] rounded-full overflow-hidden">
                    <img src={userDetails[group.userId].userimage} alt="Bird" />
                  </div>
                  <h3 className="text-xs">
                    {userDetails[group.userId].username ||
                      userDetails[group.userId].mobile}
                  </h3>
                  <button
                    onClick={() =>
                      handleRemoveUser(userDetails[group.userId]._id)
                    }
                    className="rounded-full bg-dark4 hover:bg-dark5 p-1"
                  >
                    <RxCross2 />
                  </button>
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </biv>
          ))}
        </div>
        <div className="w-full px-9 py-6">
          <input
            type="text"
            placeholder="Search name or number"
            className="user-top-bottom-border text-sm outline-none bg-dark6 w-full"
          />
        </div>

        <div className="scrollbaruser overflow-y-scroll h-[100vh] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          <div className="mt-3 bg-dark6">
            {userAll &&
              Array.isArray(userAll) &&
              userAll
                .filter(
                  (user) => !groups.some((group) => group.userId === user._id)
                )
                .map((ele, index) => (
                  <Groupuser
                    key={index}
                    _id={ele._id}
                    username={ele.username || ele.mobile}
                    userabout={ele.userabout || defaultAbout}
                    userimage={ele.userimage || defaultImage}
                    handelGroup={handelGroup}
                  />
                ))}
          </div>
        </div>
        {groups.length > 0 && (
          <div className="w-full flex justify-center items-center h-[30vh] bg-dark6 ">
            <button
              onClick={() => handelToggle("groupprofileset")}
              className="p-3 rounded-full bg-whitmix1 text-xl md:text-2xl text-white"
            >
              <FaArrowRight />
            </button>
          </div>
        )}
      </div>
      {showToggle === "groupprofileset" && (
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="w-full flex flex-row items-center text-slate-300 p-4 gap-6">
            <button
              onClick={() => setShowToggle(false)}
              className="text-xl md:text-2xl"
            >
              <FaArrowLeft />
            </button>
            <h1 className="text-lg md:text-xl font-bold">New group</h1>
          </div>
          <div className="e-full justify-center flex p-5">
            <button
              className="w-24 md:w-44 h-24 md:h-44 rounded-full flex flex-col justify-center items-center"
              style={{
                backgroundImage: `url(${imageUrl || defaultImage})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            >
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
                name="fileInput"
              />
              <label
                htmlFor="fileInput"
                className="flex flex-col justify-center items-center"
              >
                <IoCameraOutline className="text-xl" />
                <span className="uppercase">Add group icon</span>
              </label>
            </button>
          </div>
          <div className="px-4 md:px-6 py-4 w-full">
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupeName(e.target.value)}
              placeholder="Group subject"
              className="w-full outline-none bg-dark6 border-b-2 p-2 border-b-whitmix1"
            />
          </div>
          <button className="flex flex-row justify-between items-center w-full p-4">
            <div className="flex flex-col items-start">
              Disappearing messages <span className="text-xs">Off</span>
            </div>
            <FaAngleRight />
          </button>
          <button
            onClick={handleSubmit}
            className="p-3 mt-20 text-2xl md:text-4xl bg-whitmix1 rounded-full"
          >
            <IoCheckmarkSharp />
          </button>
        </div>
      )}
    </div>
  );
};

export default Newgroup;
