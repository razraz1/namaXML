"use client";
import React, { useState } from "react";
import axios from "axios";
import { parseString } from "xml2js";
import RTable from "./reqTable/RTable";
import LoadingMood from "./LoadingMood";
import HomeBtn from "./btns/HomeBtn";
import SearchBtn from "./btns/SearchBtn";
import InputPath from "./InputPath";
import InputToSearch from "./InputToSearch";
import ShowPath from "./ShowPath";
import TheError from "./TheError";

export default function SearchRequire({ formatDate }) {
  // מכיל את מספר הדרישה לחיפוש
  const [preoNo, setPreo] = useState("0086679964");

  // מכיל את הנתיבים
  const [filePath, setFilePath] = useState("");

  // מכיל את הדרישות עם אותו מספר שחיפשתי
  const [filteredData, setFilteredData] = useState([]);

  // מכיל את הנתיבים לתיקיות כדי לחפש בהם
  const [reqPaths, setReqPaths] = useState([]);

  // מראה את הנתיבים בלחיצה על האינפוט
  const [showReqPaths, setShowReqPaths] = useState(false);

  // אם יש טעינה
  const [loading, setLoading] = useState(false);

  // אם יש שגיאה
  const [error, setError] = useState("");

  // אם יש שינו באינפוט
  const handleInputChange = (e) => {
    setFilePath(e.target.value);
  };

  // להביא את הנתיבים לתיקיות
  const fetchPaths = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/paths");
      setReqPaths(response.data);
    } catch (error) {
      console.error("Error fetching paths:", error);
      setError("Failed to fetch paths from the file.");
    }
  };

  // לגרום לחפש מספר דרישה גם אם הוא מלא או רק מה שהמשתמשים רואים
  const removeLeadingZeros = (str) => str.replace(/^00?/, "");

  // עושה את החיפוש
  const handleSearch = async () => {
    // אם הנתיב שגוי
    if (!filePath) {
      setError("הנתיב כנראה לא נכון");
      return;
    }
    // אם המספר דרישה שגוי
    if (!preoNo) {
      setError("כנראה שהמספר דרישה לא חוקי או לא קיים🤷‍♂️");
      return;
    }
    setLoading(true);
    setError("");

    // להביא את הקישור לקובץ ולהביא אותו כסטרינג
    try {
      const [fileResponse, linksResponse] = await Promise.all([
        // קריאת הקובץ
        axios.get(
          `http://localhost:8080/api/file?path=${encodeURIComponent(filePath)}`
        ),
        // מביא את הנתיב
        axios.get(`http://localhost:8080/api/filePaths?path=${filePath}`),
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
          const fileData = result.ZPREQCR_NAMA01;
          const credat = fileData.IDOC.EDI_DC40.CREDAT;
          const format = formatDate(credat);

          // אם המידע כמערך הוא קורא אותו ואם לא אז הוא הופך אותו למערך כדי לקרוא
          let e1bpebanc = fileData.IDOC.E1PREQCR.E1BPEBANC;
          e1bpebanc = Array.isArray(e1bpebanc) ? e1bpebanc : [e1bpebanc];

          // חותך את מה שחיפשתי ומפלטר מהתיקייה רק את מה שאותו דבר
          const normalizedPreoNo = removeLeadingZeros(preoNo);
          const matchedData = e1bpebanc.filter(
            (item) => removeLeadingZeros(item.PREO_NO) === normalizedPreoNo
          );

          // אם יש משהו
          if (matchedData.length) {
            // מכיל את כל המידע שרצינו מהקובץ
            const matchedWithCredat = matchedData.map((item) => ({
              ...item,
              CREDAT: format,
              link: links[index],
              linkToXML: results[index],
              creationTime: creationTimes[index],
            }));
            filteredResults.push(...matchedWithCredat);
          }
        });
      });

      // מראה טעינה לטבלה
      setTimeout(() => {
        if (filteredResults.length === 0) {
          setError("🤷‍♂️לא נמצאו תוצאות עבור מספר הדרישה שהוזן");
        } else {
          setFilteredData(filteredResults);
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
    setShowReqPaths(!showReqPaths);
  };

  return (
    <div className="p-4">
      <div className="relative">
        {/* אינפוט לנתיבים */}
        <InputPath
          filePath={filePath}
          handleInputChange={handleInputChange}
          fetchPaths={fetchPaths}
          setShowPaths={setShowReqPaths}
          showPaths={showReqPaths}
        />

        {/* מראה נתיבים לתיקיות בלחיצה */}
        {showReqPaths && (
          <ShowPath
            setShowPaths={setShowReqPaths}
            showPaths={showReqPaths}
            path={reqPaths}
            pathClick={handlePathClick}
          />
        )}
      </div>

      {/* אינפוט לחפש דרישה */}
      <InputToSearch number={preoNo} changeNumber={setPreo} />

      <div className="flex justify-between">
        {/* כפתור חיפוש */}
        <SearchBtn search={handleSearch} />

        {/*כפתור לדף הבית  */}
        <HomeBtn />
      </div>
      <div className="h-screen overflow-hidden relative">
        {/* מראה טעינה לטבלה */}
        {loading && <LoadingMood />}

        {/* מראה אם יש שגיאה ומהי */}
        {error && <TheError error={error} setError={setError} />}

        {/* אם אין שגיאה ונגמר הטעינה אז מראה את הטבלה */}
        {!loading && !error && <RTable filteredData={filteredData} />}
      </div>
    </div>
  );
}
