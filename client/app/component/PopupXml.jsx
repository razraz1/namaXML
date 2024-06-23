import React from 'react'

export default function PopupXML({selectedXml, handleCloseXml}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#000000] bg-opacity-30 backdrop-blur-sm z-50">
    <div className="bg-orange-200 font-bold  py-2 px-2 h-[70%] w-[50%] rounded-xl text-left overflow-x-hidden">
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold w-full py-2 text-center sticky top-0 mb-7"
        onClick={handleCloseXml}
      >
        סגור קובץ
      </button>
      <pre className=''>{selectedXml}</pre>
    </div>
  </div>
  )
}
