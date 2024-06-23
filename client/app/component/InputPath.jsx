import React from "react";

export default function InputPath({filePath, handleInputChange, fetchPaths, setShowPaths, showPaths}) {
  return (
    <>
      <input
        type="text"
        value={filePath}
        onChange={handleInputChange}
        onClick={() => {
          fetchPaths(), setShowPaths(!showPaths);
        }}
        className="w-full p-2 border border-gray-300 rounded"
        placeholder="הכנס נתיב לקובץ מסוים"
      />
    </>
  );
}
