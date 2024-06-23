"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReqPage from "../component/ReqPage";
import DocPage from "../component/DocPage";
import Status from "../component/Status";
import useStuckFiles from "../hook/useStuckFiles";

export default function Page() {
  
  // סטייט שיצרנו שמכיל את הקבצים התקועים
  const stuckFiles = useStuckFiles();
  return (
    <>
      <div className="flex flex-col justify-center items-center h-full ">
        <div className=" text-center text-6xl">מערכת ניטור שדרים - נמ"ה</div>
        <div className="flex justify-center w-3/4 h-3/4 bg-white rounded-lg  p-8">
          {/* סטטוס  */}

          <Status stuckFiles={stuckFiles} />

          {/* מצא שדרי דרישות או מסמכים*/}
          <div
            dir="rtl"
            className="flex flex-col  justify-around w-1/2 ml-8 h-full "
          >
            {/* שדרי דרישות */}
            <ReqPage />

            {/* שדרי מסמכים */}
            <DocPage />
          </div>
        </div>
      </div>
    </>
  );
}
