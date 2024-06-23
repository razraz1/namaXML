import React from "react";
import RThead from "./RThead";
import RTcontent from "./RTcontent";

export default function RTable({ filteredData }) {
   
  return (
    <div dir="rtl" className="p-4 h-full ">
      <div
        dir="ltr"
        className=" bg-white pr-2 p-1 rounded-md h-[80%] overflow-y-auto"
      >
        <div
          className="bg-[#C689C6]"
        >
          {/* ראש הטבלה */}
          <RThead />

          {/* תוכן הטבלה */}
          <RTcontent filteredData={filteredData}  />
        </div>
      </div>
    </div>
  );
}
