import React from "react";

export default function ToSeeXmlBtn({handleViewXml, linkTo}) {
  return (
    <>
      <button
        dir="rtl"
        onClick={() => handleViewXml(linkTo)}
        className="bg-purple-700 text-white hover:bg-purple-950 w-full rounded-full truncate "
      >
        פתח קובץ
      </button>
    </>
  );
}
