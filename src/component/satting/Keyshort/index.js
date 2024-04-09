import React from 'react'

const Keyshort = ({onClick}) => {
  return (
    <div className="absolute w-full  bg-dark6 bg-opacity-80 z-50 h-screen flex justify-center items-start p-4">
      <div className="bg-dark3 p-6 w-[60%] rounded-lg">
        <h1 className="text-lg font-semibold">Keyboard shoricuts</h1>
        <div className="scrollbaruser overflow-y-scroll w-full h-96">
          uu
        </div>
        <div className="w-full flex justify-end py-3">
          <button
            onClick={onClick}
            className="text-sm px-6 py-2 rounded-full text-black bg-teal-500 hover:bg-teal-400"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default Keyshort
