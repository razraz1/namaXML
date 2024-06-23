"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { parseString } from "xml2js";
import DTable from "./docTable/DTable";
import LoadingMood from "./LoadingMood";
import HomeBtn from "./btns/HomeBtn";
import SearchBtn from "./btns/SearchBtn";
import InputPath from "./InputPath";
import InputToSearch from "./InputToSearch";
import ShowPath from "./ShowPath";
import TheError from "./TheError";

export default function SearchDocs({ formatDate }) {

  // מכיל את מספר המסמך לחיפוש
  const [docNumber, setDocNumber] = useState("");

  // מכיל את הנתיבים
  const [docPath, setDocPath] = useState("");

  // מכיל את המסמכים עם אותו מספר שחיפשתי
  const [docFilter, setDocFilter] = useState([]);

  // מכיל את הנתיבים לתיקיות כדי לחפש בהם
  const [paths, setPaths] = useState([]);

  // מראה את הנתיבים בלחיצה על האינפוט
  const [showPaths, setShowPaths] = useState(false);

  // אם יש טעינה
  const [loading, setLoading] = useState(false);

  // אם יש שגיאה
  const [error, setError] = useState("");

  // אם יש שינו באינפוט
  const handleInputChange = (e) => {
    setDocPath(e.target.value);
  };

  // להביא את הנתיבים לתיקיות
  const fetchPaths = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/paths");
      console.log(response, "yjhfkjfhj");
      setPaths(response.data);
    } catch (error) {
      console.error("Error fetching paths:", error);
      setError("Failed to fetch paths from the file.");
    }
  };

  // לגרום לחפש מספר מסמך גם אם הוא מלא או רק מה שהמשתמשים רואים
  const normalizeDocNumber = (str) => {
    const coreDocNumber = str.length > 11 ? str.substring(5, 16) : str;
    return coreDocNumber.replace(/^0+/, ""); // Remove leading zeros
  };

  // עושה את החיפוש
  const handleSearchDoc = async () => {
    // אם הנתיב שגוי
    if (!docPath) {
      setError("הנתיב כנראה לא נכון");
      return;
    }
    // אם המספר מסמך שגוי
    if (!docNumber) {
      setError(" כנראה שהמספר מסמך לא חוקי או לא קיים🤷‍♂️");
      return;
    }
    setLoading(true);
    setError("");

    // להביא את הקישור לקובץ ולהביא אותו כסטרינג
    try {
      const [fileResponse, linksResponse] = await Promise.all([
        // קריאת הקובץ
        axios.get(
          `http://localhost:8080/api/file?path=${encodeURIComponent(docPath)}`
        ),
        // מביא את הנתיב
        axios.get(`http://localhost:8080/api/filePaths?path=${docPath}`),
      ]);

      // תוצאה, הלינק, וזמן יצירת המסמך
      const results = fileResponse.data.contents;
      const links = linksResponse.data;
      const creationTimes = fileResponse.data.creationTimes;

      // מכיל את מה שדומה למה שחיפשתי
      const filteredResults = [];

      // עושה סטרינג מהקובץ כדי לקרוא אותו
      results.forEach((xmlData, index) => {
        parseString(xmlData, { explicitArray: false }, (err, result) => {
          if (err) {
            setError("Failed to parse some XML files.");
            return;
          }

          // המידע שבקובץ
          const fileData = result.DOCMAS05;
          const credat = fileData.IDOC.EDI_DC40.CREDAT;
          const format = formatDate(credat);

          // אם המידע כמערך הוא קורא אותו ואם לא אז הוא הופך אותו למערך כדי לקרוא
          const e1dawmArray = Array.isArray(fileData.IDOC.E1DRAWM)
            ? fileData.IDOC.E1DRAWM
            : [fileData.IDOC.E1DRAWM];

          // חותך את מה שחיפשתי ומפלטר מהתיקייה רק את מה שאותו דבר
          const normalizedDocNumber = normalizeDocNumber(docNumber);
          const matchDoc = e1dawmArray.filter(
            (item) => normalizeDocNumber(item.DOKNR) === normalizedDocNumber
          );

          // אם יש משהו
          if (matchDoc.length) {
            matchDoc.forEach((item) => {
              // אם המידע כמערך הוא קורא אותו ואם לא אז הוא הופך אותו למערך כדי לקרוא
              const e1drawt = item.E1DRAWT.DKTXT;
              const e1drawfiles = Array.isArray(item.E1DRAWFILES)
                ? item.E1DRAWFILES
                : [item.E1DRAWFILES];

              // מכיל את כל המידע שרצינו מהקובץ
              const match = {
                ...item,
                DKTXT: e1drawt,
                E1DRAWFILES: e1drawfiles,
                CREDAT: format,
                link: links[index],
                linkToXML: results[index],
                creationTime: creationTimes[index],
              };
              filteredResults.push(match);
            });
          }
        });
      });

      // מראה טעינה לטבלה
      setTimeout(() => {
        if (filteredResults.length === 0) {
          setError("🤷‍♂️לא נמצאו תוצאות עבור מספר המסמך שהוזן");
        } else {
          setDocFilter(filteredResults);
        }
        setLoading(false);
      }, 200);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("הנתיב כנראה לא חוקי");
      setLoading(false);
    }
  };

  // לחיצה על האינפוט של הנתיבים
  const handlePathClick = (path) => {
    handleInputChange({ target: { value: path } });
    setShowPaths(!showPaths);
    console.log(docPath, "ujtf");
  };

  return (
    <div className="p-4">
      <div className="relative">
        {/* אינפוט לנתיבים */}
        <InputPath
          filePath={docPath}
          handleInputChange={handleInputChange}
          fetchPaths={fetchPaths}
          setShowPaths={setShowPaths}
          showPaths={showPaths}
        />

        {/* מראה נתיבים לתיקיות בלחיצה */}
        {showPaths && (
          <ShowPath
            setShowPaths={setShowPaths}
            showPaths={showPaths}
            path={paths}
            pathClick={handlePathClick}
          />
        )}
      </div>

      {/* אינפוט לחפש מסמך */}
      <InputToSearch number={docNumber} changeNumber={setDocNumber} />

      <div className="flex justify-between">
        {/* כפתור חיפוש */}
        <SearchBtn search={handleSearchDoc} />

        {/*כפתור לדף הבית  */}
        <HomeBtn />
      </div>

      <div className="h-screen overflow-hidden relative">
        {/* מראה טעינה לטבלה */}
        {loading && <LoadingMood />}

        {/* מראה אם יש שגיאה ומהי */}
        {error && <TheError error={error} setError={setError} />}

        {/* אם אין שגיאה ונגמר הטעינה אז מראה את הטבלה */}
        {!loading && !error && <DTable docFilter={docFilter} />}
      </div>
    </div>
  );
}
