import React from 'react'

export default function TheError({error, setError}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
    <div className="bg-black bg-opacity-75 text-center text-white p-4 rounded-lg shadow-lg w-[20%]">
      <div className="text-red-500 text-lg font-bold">{error}</div>
      <button
        onClick={() => setError("")}
        className="mt-4 bg-red-500 text-white py-1 px-3 rounded"
      >
        סגור
      </button>
    </div>
  </div>
  )
}
