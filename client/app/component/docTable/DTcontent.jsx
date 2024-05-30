import React from "react";

export default function DTcontent({ docFilter }) {
  const keysDoc = ["DOKNR", "DOKAR", "DOKTL", "DOKVR", "DKTXT", "FILENAME", "DESCRIPTION", "CREDAT"];
  console.log(docFilter);

  return (
    <>
      {docFilter.map((docFile, index) => {
        const file = docFile.E1DRAWFILES[0] || {};  

        return (
          <div key={index} className="border-b border-black py-2">
            <div className="grid grid-cols-8 text-center gap-2 md:truncate">
              {keysDoc.map((key, i) => (
                <div dir="rtl" key={i} className="w-full truncate">
                  {key === "FILENAME" ? file.FILENAME : key === "DESCRIPTION" ? file.DESCRIPTION : docFile[key] || ""}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}
