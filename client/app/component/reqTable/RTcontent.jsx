import React from 'react'

export default function RTcontent({filteredData}) {

    // THE KEYS FOR THE DATA
    const keys = ["PREO_NO", "PREO_ITEM", "PUR_GROUP", "SHORT_TEXT", "MATERIAL", "MAT_GRP","CREDAT"];

  return (
    <>
  
    {filteredData.map((e1bpebanc, index) => (
        <div  key={index} className="border-b  border-black py-2">
          <div className="grid grid-cols-8 text-center gap-2 md:truncate">

          {keys.map((key, i) => (
            <div dir='rtl' key={i} className="w-full truncate">
              {e1bpebanc[key] || ''}
            </div>
          ))}

            <div className="w-full truncate">{e1bpebanc.Z1PREQY.MARAT}</div>
           
            {/* <div className="w-full truncate">{e1bpebanc.CREDAT}</div> */}
          </div>
        </div>
      ))}
      </>
  )
}
