"use client"

import React, { useState } from 'react'

export default function ShowPath({setShowPaths, showPaths, path, pathClick}) {


    const [changeText, setChangeText] = useState(false);
    const handleChangeText = () => {
      setChangeText(!changeText);
    };

  return (
    <>
  <div className="absolute z-20 bg-gradient-to-r from-purple-500 to-indigo-600 text-white border border-gray-300 rounded mt-2 p-2 w-full">
            <button
              className="w-full py-1 hover:bg-red-600 rounded-full"
              onClick={() => setShowPaths(!showPaths)}
              onMouseEnter={handleChangeText}
              onMouseLeave={handleChangeText}
            >
              {changeText ? "לסגור סופית" : "סגירת אפשרויות"}
            </button>
            {path.map((path, index) => (
              <div
                key={index}
                onClick={() => pathClick(path)}
                className="p-2 hover:bg-[#2E0249] cursor-pointer"
              >
                {path}
              </div>
            ))}
          </div>
    </>
  )
}
