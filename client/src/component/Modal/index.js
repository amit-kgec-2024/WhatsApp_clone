import React from 'react'

const Modal = ({onClick}) => {
  return (
    <div>
      <div className="w-[500px] text-black p-4 rounded-md shadow-2xl bg-white">
        <h1 className="text-lg font-semibold">Open Microsofet Store?</h1>
        <div className="p-2">
          <p className="text-xs py-2">
            https://web.whatsapp.com wants to open this application.
          </p>
          <div className="flex py-2 flex-row items-center gap-2">
            <input type="checkbox" />
            <p className="text-xs">
              Always allow web.whatsapp.com to open links of this type in the
              associated app
            </p>
          </div>
        </div>
        <div className="w-full flex flex-row gap-2 justify-end">
          <button className="rounded-full border border-blue-400 px-4 py-1 text-xs font-semibold my-4 hover:bg-slate-200">
            Open Microsofet Store
          </button>
          <button
            onClick={onClick}
            className="rounded-full border border-black border-double  px-4 py-1 text-sm font-semibold my-4 bg-sky-800 text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal
