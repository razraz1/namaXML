import React from 'react'

export default function TableContent({e1bpebancArray}) {

    // THE KEYS FOR THE DATA
    const keys = ["PREO_NO", "PREO_ITEM", "PUR_GROUP", "SHORT_TEXT", "MATERIAL", "MAT_GRP",];

  return (
    <>
    {e1bpebancArray.map((e1bpebanc, index) => (
        <div key={index} className="border-b border-black py-2">
          <div className="grid grid-cols-7 text-center gap-2 md:truncate">

          {keys.map((key, i) => (
            <div key={i} className="w-full truncate">
              {key in e1bpebanc ? e1bpebanc[key] : ''}
            </div>
          ))}

            <div className="w-full truncate">{e1bpebanc.Z1PREQY[0].MARAT[0]}</div>
          </div>
        </div>
      ))}
      </>
  )
}
