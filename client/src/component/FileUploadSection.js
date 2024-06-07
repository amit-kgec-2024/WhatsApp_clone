import React from "react";
import { FaUserLarge } from "react-icons/fa6";
import { IoMdCamera } from "react-icons/io";
import { MdPhotoLibrary } from "react-icons/md";
import { HiDocumentText, HiBars3BottomLeft } from "react-icons/hi2";
import { PiStickerFill } from "react-icons/pi";

const FileUploadSection = ({ theme }) => {
  return (
    <div
      className={`absolute -mt-[300px] ${
        theme === "#000000" ? "bg-dark3" : "bg-slate-100"
      } px-2 py-3 rounded-xl w-52 shadow-2xl`}
    >
      <button
        className={`flex flex-row items-center gap-3 text-xl ${
          theme === "#000000" ? "hover:bg-dark6" : "hover:bg-slate-50"
        } py-2 px-1 w-full rounded-md`}
      >
        <HiDocumentText className="text-violet-600" />
        <span className="text-lg text-slate-300">Document</span>
      </button>
      <button
        className={`flex flex-row items-center gap-3 text-xl ${
          theme === "#000000" ? "hover:bg-dark6" : "hover:bg-slate-50"
        } py-2 px-1 w-full rounded-md`}
      >
        <MdPhotoLibrary className="text-blue-600" />
        <span className="text-lg text-slate-300">Photos & videos</span>
      </button>
      <button
        className={`flex flex-row items-center gap-3 text-xl ${
          theme === "#000000" ? "hover:bg-dark6" : "hover:bg-slate-50"
        } py-2 px-1 w-full rounded-md`}
      >
        <IoMdCamera className="text-pink-600" />
        <span className="text-lg text-slate-300">Camera</span>
      </button>
      <button
        className={`flex flex-row items-center gap-3 text-xl ${
          theme === "#000000" ? "hover:bg-dark6" : "hover:bg-slate-50"
        } py-2 px-1 w-full rounded-md`}
      >
        <FaUserLarge className="text-cyan-600" />
        <span className="text-lg text-slate-300">Contact</span>
      </button>
      <button
        className={`flex flex-row items-center gap-3 text-xl ${
          theme === "#000000" ? "hover:bg-dark6" : "hover:bg-slate-50"
        } py-2 px-1 w-full rounded-md`}
      >
        <HiBars3BottomLeft className="text-yellow-600" />
        <span className="text-lg text-slate-300">Poll</span>
      </button>
      <button
        className={`flex flex-row items-center gap-3 text-xl ${
          theme === "#000000" ? "hover:bg-dark6" : "hover:bg-slate-50"
        } py-2 px-1 w-full rounded-md`}
      >
        <PiStickerFill className="text-teal-600" />
        <span className="text-lg text-slate-300">New Sticker</span>
      </button>
    </div>
  );
};

export default FileUploadSection;
