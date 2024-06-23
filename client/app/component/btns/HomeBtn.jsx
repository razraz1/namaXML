import { Home } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function HomeBtn() {
  return (
    <>
    <Link href="./home">
          <button className="mt-2 p-2 mr-4 bg-[#570A57] text-white rounded transform transition-transform duration-300 hover:scale-110 ">
            <Home />
          </button>
        </Link>
    </>
  )
}
