import Link from 'next/link'
import React from 'react'

export default function DocPage() {
  return (
    <div className="h-[40%]">
    <Link href="./namaDoc">
      <button className="bg-green-600 truncate text-white text-center text-4xl h-full w-full p-5 rounded-lg  hover:bg-green-700 transition duration-300">
        מצא שדרי מסמכים
      </button>
    </Link>
  </div>
  )
}
