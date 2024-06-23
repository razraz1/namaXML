
import React from 'react'

export default function SearchBtn({search}) {
  return (
    <>
        <div
          onClick={search}
          className={`mt-2 p-2 bg-[#570A57] cursor-pointer text-white rounded`}
        >

          קבל מידע על מסמך זה

        </div>
    </>
  )
}
