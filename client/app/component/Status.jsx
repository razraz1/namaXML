import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Status({ stuckFiles }) {

  // בדיקה על שרתי נמה
  const [nama1, setNama1] = useState("");
  const [nama2, setNama2] = useState("");

  useEffect(() => {
    // Function to check nama1 endpoint status
    const checkNama1 = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/nama1");
        if (response.status === 200) {
          setNama1("נמה 1 תקין");
        }
      } catch (error) {
        console.error("Error checking nama1:", error);
      }
    };

    // Initial check of nama1
    checkNama1();
  }, []);

  useEffect(() => {
    // Function to check nama2 endpoint status
    const checkNama2 = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/nama2");
        if (response.status === 200) {
          setNama2("נמה 2 תקין");
        }
      } catch (error) {
        console.error("Error checking nama2:", error);
      }
    };

    // Initial check of nama2
    checkNama2();
  }, []);

  console.log(stuckFiles, "stuckFiles");

  return (
    <div className="w-1/2 flex justify-center items-center">
      <div className="bg-gray-800 text-white w-full h-full p-4 rounded-lg  text-center">
        <h2 dir="rtl" className="text-4xl font-bold mb-4 truncate">
          סטטוס ממשק
        </h2>

        <div dir="rtl" className="text-3xl truncate">
          {nama1 ? <div>{nama1}</div> : <div>נמה 1 לא תקין</div>}
          {nama2 ? <div>{nama2}</div> : <div>נמה 2 לא תקין</div>}
        </div>

        <div
          dir="rtl"
          className="flex justify-center items-center text-center "
        >
          <div className="mx-1 text-3xl"> ישנם</div>
          {/* מראה כמה שדרים תקועים יש */}
          {stuckFiles && (
            <div className="text-red-600 text-3xl">{stuckFiles.length}</div>
          )}
          <div className="truncate text-3xl">שדרים מעוכבים בתיקיית הקליטה</div>
        </div>

          {/* אם יש שדרים תקועים לחץ כדי לעבור לדף הטבלה */}
        {stuckFiles.length > 0 && <Link href={"./stuck"}>(לחץ לפרטים)</Link>}
      </div>
    </div>
  );
}
