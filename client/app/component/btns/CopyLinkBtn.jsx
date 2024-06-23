import React from "react";

export default function CopyLinkBtn({handleCopyLink, link, index}) {
  return (
    <>
      <button
        dir="rtl"
        onClick={() => handleCopyLink(link, index)}
        className="bg-purple-700 text-white hover:bg-purple-950 rounded-full  w-[95%] truncate "
      >
        העתק קישור
      </button>
    </>
  );
}
