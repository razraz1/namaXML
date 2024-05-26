import React from "react";
import TableHead from "./TableHead";
import TableContent from "./TableContent";

export default function Table({ e1bpebancArray }) {
  return (
    <div dir="rtl" className="p-4 h-full ">
      <div
        dir="ltr"
        className=" bg-white pr-2 p-1 rounded-md h-[85%] overflow-y-auto"
      >
        <div
          className="bg-slate-400"
        >
            
          <TableHead />

          <TableContent e1bpebancArray={e1bpebancArray} />
        </div>
      </div>
    </div>
  );
}
