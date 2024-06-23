"use client";

import React, { useState } from "react";
import PopupXML from "../PopupXml";
import CopiedLink from "../CopiedLink";
import CopyLinkBtn from "../btns/CopyLinkBtn";
import ToSeeXmlBtn from "../btns/ToSeeXmlBtn";

export default function RTcontent({ filteredData }) {
  // מכיל את הקובץ בפופאפ
  const [selectedXml, setSelectedXml] = useState(null);

  // מראה שקישור הועתק בהצלחה
  const [copySuccess, setCopySuccess] = useState(null);

  // מראה התראה כשהלינק הועתק בהצלחה
  const handleCopyLink = async (link, index) => {
    try {
      await navigator.clipboard.writeText(link);
      setCopySuccess(index);
      setTimeout(() => setCopySuccess(null), 1000); // Reset the notification after 1 seconds
    } catch (err) {
      console.error("Failed to copy!", err);
      setCopySuccess(null);
    }
  };

  // מערך למידע שיסודר לפיו
  const keys = [
    "PREO_NO",
    "PREO_ITEM",
    "PUR_GROUP",
    "SHORT_TEXT",
    "MATERIAL",
    "MAT_GRP",
    "CREDAT",
  ];

  // מראה את הקובץ בפופאפ
  const handleViewXml = (xml) => {
    setSelectedXml(xml);
  };

  // סוגר את הפופאפ
  const handleCloseXml = () => {
    setSelectedXml(null);
  };

  const theXMLstuck = (creationTime) => {
    const timeTheFileStuck = 30 * 60 * 1000;
    return new Date() - new Date(creationTime) > timeTheFileStuck;
  };

  console.log(filteredData,"filter");

  return (
    <>
      {/* כל הקבצים */}
      {filteredData.map((e1bpebanc, index) => (
        <div key={index} className="border-b  border-black py-2">
          {/* ראש הטבלה המידע שמסודר לפי מפתחות */}
          <div className="grid grid-cols-10 text-center gap-2 md:truncate">
            {keys.map((key, i) => (
              <div dir="rtl" key={i} className="w-full truncate">
                {key === "CREDAT" ? (
                  <div className="truncate">
                    {new Date(e1bpebanc.creationTime).toLocaleString()}
                    {/* {theXMLstuck(e1bpebanc.creationTime) &&(

                  <div className="stuckXML-dot"></div>
                  )} */}
                  </div>
                ) : (
                  e1bpebanc[key] || ""
                )}
              </div>
            ))}
            <div dir="rtl" className="w-full truncate">
              {e1bpebanc.Z1PREQY.MARAT}
            </div>

            {/* פתיחת הקובץ בפופאפ */}
            {e1bpebanc.linkToXML && (
              // כפתור לפתיחת הקובץ
              <ToSeeXmlBtn
                handleViewXml={handleViewXml}
                linkTo={e1bpebanc.linkToXML}
              />
            )}

            {/* פתיחת הקובץ בקישור */}
            {e1bpebanc.link && (
              <div>
                {/* כפתור להעתיק קישור */}
                <CopyLinkBtn
                  handleCopyLink={handleCopyLink}
                  link={e1bpebanc.link}
                  index={index}
                />

                {/* סימון שהועתק בהצלחה */}
                {copySuccess !== null && <CopiedLink />}
              </div>
            )}
          </div>
        </div>
      ))}

      {/* הפופאפ של הקובץ */}
      {selectedXml && (
        <PopupXML selectedXml={selectedXml} handleCloseXml={handleCloseXml} />
      )}
    </>
  );
}
