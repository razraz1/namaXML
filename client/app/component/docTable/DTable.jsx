import React from "react";
import DThead from "./DThead";
import DTcontent from "./DTcontent";

export default function DTable({ docFilter }) {
  return (
    <div dir="rtl" className="p-4 h-full ">
      <div
        dir="ltr"
        className=" bg-white pr-2 p-1 rounded-md h-[80%] overflow-y-auto"
      >
        <div className="bg-[#C689C6]">
          {/* ראש הטבלה */}
          <DThead />

          {/* תוכן הטבלה */}
          <DTcontent docFilter={docFilter} />
        </div>
      </div>
    </div>
  );
}
