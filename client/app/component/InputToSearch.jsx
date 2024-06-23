import React from 'react'

export default function InputToSearch({number, changeNumber}) {
  return (
    <>
 <input
        type="text"
        value={number}
        onChange={(e)=>changeNumber(e.target.value)}
        className="w-full p-2 mt-2 border border-gray-300 rounded"
        placeholder="קוד מסמך לחיפוש"
      />
    </>
  )
}