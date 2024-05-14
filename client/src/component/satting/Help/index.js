import React from 'react'
import { IoIosHelpCircle } from 'react-icons/io';
import { MdGroups } from 'react-icons/md';
import { HiOutlineDocumentText } from "react-icons/hi2";
import { FaExclamationCircle } from "react-icons/fa";
import { ImLab } from "react-icons/im";
import Input from '../../Input';


const Help = () => {
  const handleHelpCenterClick = () => {
    window.open("https://faq.whatsapp.com/?cms_platform=web&locale=en_US", "_blank");
  };
  const handleTermsConditionClick = () => {
    window.open("https://www.whatsapp.com/legal/?lg=en", "_blank");
  };
  return (
    <div className="profile-animation w-full bg-dark6 h-screen">
      <h1 className="text-xl font-bold p-5">Help</h1>
      <div className="scrollbaruser overflow-y-scroll h-[85%]">
        <img src="help.png" alt="Bird" />
        <h1 className="text-sm font-light py-5 w-full text-center">
          Version 2.3000.1012671142
        </h1>
        <div className="w-full flex flex-col my-4">
          <button
            onClick={handleHelpCenterClick}
            className="flex flex-row items-center pl-6 hover:bg-dark3 gap-5 text-2xl"
          >
            <IoIosHelpCircle />{" "}
            <span className="user-top-bottom-border py-4 w-full text-start font-semibold text-lg">
              Help Center
            </span>
          </button>
          <button className="flex flex-row items-center pl-6 hover:bg-dark3 gap-5 text-2xl">
            <MdGroups />{" "}
            <span className="user-top-bottom-border py-4 w-full text-start font-semibold text-lg">
              Contact us
            </span>
          </button>
          <button
            onClick={handleTermsConditionClick}
            className="flex flex-row items-center pl-6 hover:bg-dark3 gap-5 text-2xl"
          >
            <HiOutlineDocumentText />{" "}
            <span className="user-top-bottom-border py-4 w-full text-start font-semibold text-lg">
              Terms and Privecy Policy
            </span>
          </button>
          <button className="flex flex-row items-center pl-6 hover:bg-dark3 gap-5 text-2xl">
            <FaExclamationCircle />{" "}
            <span className="user-top-bottom-border py-4 w-full text-start font-semibold text-lg">
              Channels reports
            </span>
          </button>
          <button className="flex flex-row items-center py-3 pl-6 hover:bg-dark3 gap-5 text-2xl">
            <ImLab />
            <div className="text-start">
              <h1 className="text-lg font-semibold">Join the beta</h1>
              <p className="text-xs">
                Get new features before they are released. Report bugs using the
                contact us form above.
              </p>
            </div>
            <Input type="checkbox" className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Help
