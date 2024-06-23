import React from "react";

export default function RThead() {

  // מערך השמות
  const theKeysForNamaData = [
    "מס' דרישה",
    "מס' שורה",
    "קבוצת רכש",
    "שם שורה",
    'מק"ט',
    "קבוצת חומר",
    "תאריך",
    'מר"ת',
    "פתח קובץ",
    "LINK"
  ];

  return (
<div className="grid grid-cols-10  text-center gap-4 mx-1 font-bold py-3 z-10 rounded-lg leading-6 text-white sticky top-0 bg-gradient-to-r from-purple-500 to-indigo-600 shadow-lg md:truncate ">
      {theKeysForNamaData.map((data, index) => (
        <div dir="rtl" key={data} className="w-full truncate ">
          {data}
        </div>
      ))}
    </div>
  );
}
