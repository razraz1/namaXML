"use client"
import React, { useState } from "react";
import Table from "./reqTable/RTable";
import axios from "axios";
import { parseString } from "xml2js";
import Link from "next/link";
import RTable from "./reqTable/RTable";

export default function SearchRequire({ filePath, handleInputChange, formatDate, setLoading, setError }) {

  const [preoNo, setPreo] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = async () => {
    if (!filePath) {
      setError("הנתיב כנראה לא נכון");
      return;
    }
    if (!preoNo) {
      setError(" כנראה שהמספר דרישה לא חוקי או לא קיים🤷‍♂️");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `http://localhost:8080/api/file?path=${encodeURIComponent(filePath)}`
      );

      const results = response.data.contents;
      const filteredResults = [];

      results.forEach((xmlData) => {
        parseString(xmlData, { explicitArray: false }, (err, result) => {
          if (err) {
            setError("Failed to parse some XML files.");
            return;
          }
  
          const fileData = result.ZPREQCR_NAMA01;
          const credat = fileData.IDOC.EDI_DC40.CREDAT
          const format = formatDate(credat)
          const matchedData = fileData.IDOC.E1PREQCR.E1BPEBANC.filter(item => item.PREO_NO === preoNo);
          if (matchedData.length) {
            const matchedWithCredat = matchedData.map(item => ({
              ...item,
              CREDAT: format,
            }));
            filteredResults.push(...matchedWithCredat);
          }
        });
      });

      if (filteredResults.length === 0) {
        setError("🤷‍♂️לא נמצאו תוצאות עבור מספר הדרישה שהוזן");
      } else {
        setFilteredData(filteredResults);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("הנתיב כנראה לא חוקי");
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={filePath}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded"
        placeholder="הכנס נתיב לקובץ מסוים"
      />
      <input
        type="text"
        value={preoNo}
        onChange={(e) => setPreo(e.target.value)}
        className="w-full p-2 mt-2 border border-gray-300 rounded"
        placeholder="קוד דרישה לחיפוש"
      />
      <div className="flex justify-between">
      <button
        onClick={handleSearch}
        className="mt-2 p-2 bg-[#570A57] text-white rounded"
      >
        קבל מידע על מספר דרישה זו
      </button>
      <Link href="./home"><button className="mt-2 p-2 bg-[#570A57] text-white rounded">לדף הבית</button></Link>
      </div>
      <div className="h-screen overflow-hidden relative">
      <RTable
        filteredData={filteredData}

      /></div>
    </div>
  );
}
