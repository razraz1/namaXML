"use client";

import React, { useState } from "react";
import PopupXML from "../PopupXml";
import CopiedLink from "../CopiedLink";
import CopyLinkBtn from "../btns/CopyLinkBtn";
import ToSeeXmlBtn from "../btns/ToSeeXmlBtn";

export default function DTcontent({ docFilter }) {
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
  const keysDoc = [
    "DOKNR",
    "DOKAR",
    "DOKTL",
    "DOKVR",
    "DKTXT",
    "FILENAME",
    "DESCRIPTION",
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
    const timeTheFileStuck = 15 * 60 * 1000;
    return new Date() - new Date(creationTime) > timeTheFileStuck;
  };

  console.log(docFilter);
  return (
    <>
      {/* כל הקבצים */}
      {docFilter.map((docFile, index) => {
        const file = docFile.E1DRAWFILES[0] || {};

        return (
          <div key={index} className="border-b border-black py-2">
            <div className="grid grid-cols-10 text-center gap-2 md:truncate">
              {/* ראש הטבלה המידע שמסודר לפי מפתחות */}
              {keysDoc.map((key, i) => (
                <div dir="rtl" key={i} className="w-full truncate">
                  {key === "FILENAME" ? (
                    file.FILENAME
                  ) : key === "DESCRIPTION" ? (
                    file.DESCRIPTION
                  ) : key === "CREDAT" ? (
                    <div>
                      {new Date(docFile.creationTime).toLocaleString()}
                      {/* {theXMLstuck(docFile.creationTime) && (
                        <div className="stuckXML-dot"></div>
                      )} */}
                    </div>
                  ) : (
                    docFile[key] || ""
                  )}
                </div>
              ))}

              {/* פתיחת הקובץ בפופאפ */}
              {docFile.linkToXML && (
                // כפתור לפתיחת הקובץ
                <ToSeeXmlBtn
                  handleViewXml={handleViewXml}
                  linkTo={docFile.linkToXML}
                />
              )}

              {/* פתיחת הקובץ בקישור */}
              {docFile.link && (
                <div>
                  {/* כפתור להעתיק קישור */}
                  <CopyLinkBtn
                    handleCopyLink={handleCopyLink}
                    link={docFile.link}
                    index={index}
                  />

                  {/* סימון שהועתק בהצלחה */}
                  {copySuccess !== null && <CopiedLink />}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* הפופאפ של הקובץ */}
      {selectedXml && (
        <PopupXML selectedXml={selectedXml} handleCloseXml={handleCloseXml} />
      )}
    </>
  );
}
