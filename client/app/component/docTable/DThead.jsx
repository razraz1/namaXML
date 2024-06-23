import React from 'react'

export default function DThead() {

  // מערך השמות
      const theDocKey= [
    "מזהה מסמך",
    "סוג מסמך", 
    "חלק מסמך",
    "גרסת מסמך",
    'שם המסמך',
    "שם הקובץ",
    'תיאור הקובץ',
    "תאריך",
    "פתח קובץ",
    "LINK"
  ];
  return (
    <div className="grid grid-cols-10  text-center gap-4 mx-1 font-bold py-3 z-10 rounded-lg leading-6 text-white sticky top-0 bg-gradient-to-r from-purple-500 to-indigo-600 shadow-lg md:truncate ">
          {theDocKey.map((data, index) => (
            <div dir="rtl" key={data} className="w-full truncate ">
              {data}
            </div>
          ))}
        </div>
      );
  
}
