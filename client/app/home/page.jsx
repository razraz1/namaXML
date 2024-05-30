"use client";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex justify-center items-center w-full h-screen ">
      <div className="flex justify-center w-3/4 h-3/4 bg-white rounded-lg  p-8">
        {/* Left section */}
        <div className="w-1/2 flex justify-center items-center">
          <div className="bg-gray-800 text-white w-full h-full p-4 rounded-lg  text-center">
            <h2 className="text-2xl font-bold mb-4">סטטוס ממשק</h2>
          </div>
        </div>

        {/* Right section */}
        <div className="flex flex-col justify-around w-1/2 ml-8">
          <Link href="./namaFiles">
            <button className="bg-blue-600 text-white w-full p-5 mb-4 rounded-lg  hover:bg-blue-700 transition duration-300">
              מצא שדרי דרישות
            </button>
          </Link>
          <Link href="./namaDoc">
          <button className="bg-green-600 text-white w-full p-5 rounded-lg  hover:bg-green-700 transition duration-300">
            מצא שדרי מסמכים
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

