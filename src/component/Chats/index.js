import React, { useRef, useState } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import { IoVideocam } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";
import { IoMdSearch } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import Searchmessage from "../Searchmessage";
import Modal from "../Modal";

const Chats = () => {
  const [isSearch, setIsSearch] = useState(false);
  const [isModal, setIsModal] = useState(false);
  // Three dot................
  const [isClick, setIsclick] = useState(false);
  const dropDownRef = useRef(null);
  const buttonRef = useRef(null);
  useClickOutside([dropDownRef, buttonRef], () => {
    setIsclick(false);
  });

  const [isClickMenu, setIsclickMenu] = useState(false);
  const dropDownRefMenu = useRef(null);
  const buttonRefMenu = useRef(null);
  useClickOutside([dropDownRefMenu, buttonRefMenu], () => {
    setIsclickMenu(false);
  });
  
  return (
    <div className=" w-full h-full">
      <div className="flex flex-row">
        <div className="w-full bg-dark3 py-2 px-4 h-14 flex flex-row justify-between items-center">
          <div className="flex flex-row gap-3 w-full">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img src="amitimg.png" alt="Bird" />
            </div>
            <h2 className="flex flex-col">
              Amit Mandal <span className="text-xs font-light">Online</span>
            </h2>
          </div>
          <div className="flex flex-row gap-6 pr-2">
            <div className="relative">
              <button
                onClick={() => setIsclick((prev) => !prev)}
                ref={buttonRef}
                className={`flex flex-row justify-center items-center text-xl p-1 text-slate-600 gap-1 ${
                  isClick ? "rounded-full bg-dark5" : "bg-none"
                }`}
              >
                <IoVideocam />
                <FaAngleDown />
              </button>
              {isClick && (
                <div
                  ref={dropDownRef}
                  className="absolute right-5 mt-2 bg-dark5 w-[450px] rounded-lg gap-5 p-3 flex flex-row"
                >
                  <p className="flex flex-col py-3">
                    Make calls with the Windows app{" "}
                    <span className="text-xs">
                      Download WhatsApp for windown to start making calls.
                    </span>
                  </p>
                  <button
                    onClick={() => setIsModal((prev) => !prev)}
                    className="bg-green-600 text-xs font-semibold text-black px-4 my-4 rounded-full"
                  >
                    Get the app
                  </button>
                </div>
              )}
              {isModal && (
                <div className="absolute -top-7 right-80">
                  <Modal onClick={()=> setIsModal(false)}/>
                </div>
              )}
            </div>
            <button
              onClick={() => setIsSearch((prev) => !prev)}
              className={`text-xl p-1`}
            >
              <IoMdSearch />
            </button>
            <div className="relative">
              <button
                onClick={() => setIsclickMenu((prev) => !prev)}
                ref={buttonRefMenu}
                className={`text-xl p-1 ${
                  isClickMenu ? "rounded-full bg-dark5" : "bg-none"
                }`}
              >
                <BsThreeDotsVertical />
              </button>
              {isClickMenu && (
                <div
                  ref={dropDownRefMenu}
                  className="absolute right-5 mt-2 bg-dark4 w-48 py-2 text-sm flex flex-col"
                >
                  <button className="py-2 px-6 hover:bg-dark6 w-full text-start">
                    New Group
                  </button>
                  <button className="py-2 px-6 hover:bg-dark6 w-full text-start">
                    New Community
                  </button>
                  <button className="py-2 px-6 hover:bg-dark6 w-full text-start">
                    Starred messages
                  </button>
                  <button className="py-2 px-6 hover:bg-dark6 w-full text-start">
                    Select chats
                  </button>
                  <button className="py-2 px-6 hover:bg-dark6 w-full text-start">
                    Settings
                  </button>
                  <button className="py-2 px-6 hover:bg-dark6 w-full text-start">
                    New Community
                  </button>
                  <button className="py-2 px-6 hover:bg-dark6 w-full text-start">
                    Starred messages
                  </button>
                  <button className="py-2 px-6 hover:bg-dark6 w-full text-start">
                    Select chats
                  </button>
                  <button className="py-2 px-6 hover:bg-dark6 w-full text-start">
                    Settings
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {isSearch && (
          <div>
            <Searchmessage onClick={() => setIsSearch(false)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Chats;
