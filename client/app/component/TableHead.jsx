import React from "react";

export default function TableHead() {
  const theKeysForNamaData = [
    "מס' דרישה",
    "מס' שורה",
    "קבוצת רכש",
    "שם שורה",
    'מק"ט',
    "קבוצת חומר",
    'מר"ת',
  ];
  return (
    <div className="grid grid-cols-7 text-center gap-2 mx-2 font-bold py-2 top-1 z-10 rounded-lg leading-6 text-white sticky bg-orange-700 md:truncate">
      {theKeysForNamaData.map((data, index) => (
        <div key={index} className="w-full truncate ">
          {data}
        </div>
      ))}
    </div>
  );
}
