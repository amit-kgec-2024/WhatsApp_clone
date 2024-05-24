import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  FaAngleRight,
  FaArrowLeft,
  FaArrowRight,
  FaCheck,
} from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import Groupuser from "../../card/Groupuser";
import { IoCameraOutline, IoCheckmarkSharp } from "react-icons/io5";
import getCroppedImg from "../../../utils/cropImage";
import Cropper from "react-easy-crop";
import useClickOutside from "../../../hooks/useClickOutside";

const Newgroup = ({ onClick }) => {
  const [isClick, setIsclick] = useState(false);
  const dropDownRef = useRef(null);
  const buttonRef = useRef(null);
  const handleClick = () => setIsclick((prev) => !prev);

  useClickOutside([dropDownRef, buttonRef], () => {
    setIsclick(false);
  });
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
  const [groupName, setGroupeName] = useState("");
  // ...............................................
  const [imageUrl, setImageUrl] = useState("profiledefaultimage.jpg");
  const [userImage, setUserImage] = useState("");
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      setIsImageSelected(true);
    }
  };

  const handleClose = () => {
    setIsImageSelected(false);
    setImageUrl(null);
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(imageUrl, croppedAreaPixels);
      return croppedImage;
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmitProfileImage = async () => {
    try {
      const croppedImage = await getCroppedImage();

      const formData = new FormData();
      formData.append("file", croppedImage);
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
        setIsImageSelected(false);
      } else {
        throw new Error("Image upload failed");
      }
    } catch (err) {
      console.error("Error uploading profile image", err);
    }
  };
  // ...............Submit Group..................
  const handleSubmitGroup = async () => {
    console.log("image--->", userImage);
    console.log("groupName--->", groupName);
    console.log("userIds--->", userIds);
    try {
      const res = await fetch(
        `https://whats-app-clone-server-psi.vercel.app/api/create/groups/${user.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userIds,
            groupimage: userImage,
            groupname: groupName,
          }),
        }
      );
      if (res.status === 400) {
        alert("Invalid Credential!");
      } else {
        await res.json();
        setShowToggle(false);
      }
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
                  <div
                    className="w-[25px] h-[25px] rounded-full overflow-hidden"
                    style={{
                      backgroundImage: `url(${
                        userDetails[group.userId].userimage || defaultImage
                      })`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  ></div>
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
          <div className="relative w-full justify-center flex p-5">
            <button
              onClick={handleClick}
              ref={buttonRef}
              className="w-24 md:w-44 h-24 md:h-44 rounded-full flex flex-col justify-center items-center"
              style={{
                backgroundImage: `url(${imageUrl || defaultImage})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            >
              <h1 className="flex flex-col justify-center items-center">
                <IoCameraOutline className="text-xl" />
                <span className="uppercase">Add group icon</span>
              </h1>
            </button>
            {isClick && (
              <div
                ref={dropDownRef}
                className="absolute mt-40 ml-40 py-2 w-[20vh] text-start bg-dark3"
              >
                <button className="hover:bg-dark6 py-2 text-sm w-full">
                  Take photo
                </button>
                <button className="hover:bg-dark6 py-2 text-sm w-full">
                  <input
                    type="file"
                    id="fileInput"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                    name="fileInput"
                  />
                  <label htmlFor="fileInput">Upload photo</label>
                </button>
                <button className="hover:bg-dark6 py-2 text-sm w-full">
                  Emoji & sticker
                </button>
              </div>
            )}
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
            onClick={handleSubmitGroup}
            className="p-3 mt-20 text-2xl md:text-4xl bg-whitmix1 rounded-full"
          >
            <IoCheckmarkSharp />
          </button>
          {isImageSelected && (
            <div className="bg-dark6 p-5 absolute w-full h-screen flex items-center justify-center top-0 left-0 bg-opacity-85">
              <div className="w-[30%] bg-dark3">
                <div className="p-2 w-full flex flex-row items-center text-lg gap-4">
                  <button onClick={handleClose}>
                    <RxCross2 />
                  </button>
                  <h1>Drag the image to adjust</h1>
                </div>
                <div className="relative w-full h-64">
                  <Cropper
                    image={imageUrl}
                    crop={crop}
                    zoom={zoom}
                    aspect={4 / 3}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                  />
                </div>
                <div className="w-full flex justify-end">
                  <button
                    onClick={handleSubmitProfileImage}
                    className="p-3 mr-[20%] text-xl bg-whitmix1 rounded-full"
                  >
                    <FaCheck />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Newgroup;
