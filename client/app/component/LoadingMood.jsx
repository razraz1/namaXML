import React from 'react'

export default function LoadingMood() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
    <div className="loader mb-4"></div>
    <div className="text-5xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-text">כבר מביאים לך את המידע</div>
    <style>{`
            @keyframes slideBg {
                from { background-position: 200% 0; }
                to { background-position: -200% 0; }
            }
            .animate-text {
                background-size: 200% 100%;
                animation: slideBg 3s linear infinite;
            }
        `}</style>
  </div>
  )
}
