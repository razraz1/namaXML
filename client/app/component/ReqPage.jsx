import Link from 'next/link'
import React from 'react'

export default function ReqPage() {
  return (
    <div className="h-[40%]">
    <Link href="./namaFiles">
      <button className="bg-blue-600 truncate text-white text-center  text-4xl w-full h-full p-5 mb-4 rounded-lg  hover:bg-blue-700 transition duration-300">
        מצא שדרי דרישות
      </button>
    </Link>
  </div>
  )
}
