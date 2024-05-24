import React from 'react'

const SmallCard = () => {
  return (
    <div className="p-2 hover:bg-dark3 flex flex-row items-center user-top-bottom-border">
      <div className="bg-green-400 rounded-full">
        <div className="w-16 h-16"></div>
      </div>
      <div className="flex flex-row justify-between px-3 items-center w-full">
        <div className="flex flex-col justify-start">
          <h1 className="text-base text-slate-300">Fashion Everyday</h1>
          <h2 className="text-sm text-slate-400 font-light">8165k followrs</h2>
        </div>
        <button className="px-4 py-1 text-green-500 rounded-full only_border">
          Follow
        </button>
      </div>
    </div>
  );
}

export default SmallCard
