import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react'
import Table from './reqTable/RTable';
import { parseString } from 'xml2js';
import DTable from './docTable/DTable';

export default function SearchDocs({filePath,handleInputChange, formatDate, setLoading, setError, error}) {

    const [docNumber, setDocNumber] = useState("");
  const [docFilter, setDocFilter] = useState([]);

  const handleSearchDoc = async () => {
    if (!filePath) {
      setError("הנתיב כנראה לא נכון");
      return;
    }
    if (!docNumber) {
      setError(" כנראה שהמספר מסמך לא חוקי או לא קיים🤷‍♂️");
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
  
          const fileData = result.DOCMAS05;
          const credat = fileData.IDOC.EDI_DC40.CREDAT;
          const format = formatDate(credat);
  
          // Ensure E1DRAWM is an array
          const e1dawmArray = Array.isArray(fileData.IDOC.E1DRAWM) ? 
            fileData.IDOC.E1DRAWM : 
            [fileData.IDOC.E1DRAWM];
  
          // Filter E1DRAWM array based on DOKNR
          const matchDoc = e1dawmArray.filter(item => item.DOKNR === docNumber);
  
          if (matchDoc.length) {
            matchDoc.forEach(item => {
              const e1drawt = item.E1DRAWT.DKTXT;
              const e1drawfiles = Array.isArray(item.E1DRAWFILES) ? 
                item.E1DRAWFILES : 
                [item.E1DRAWFILES];
  
              const match = {
                ...item,
                DKTXT: e1drawt,
                E1DRAWFILES: e1drawfiles,
                CREDAT: format,
              };
              filteredResults.push(match);
            });
          }
        });
      });
  
      if (filteredResults.length === 0) {
        setError("🤷‍♂️לא נמצאו תוצאות עבור מספר הדרישה שהוזן");
      } else {
        setDocFilter(filteredResults);
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
      value={docNumber}
      onChange={(e) => setDocNumber(e.target.value)}
      className="w-full p-2 mt-2 border border-gray-300 rounded"
      placeholder="קוד מסמך לחיפוש"
    />

    <div className="flex justify-between">
    <button
      onClick={handleSearchDoc}
      className="mt-2 p-2 bg-[#570A57] text-white rounded"
    >
    קבל מידע על מסמך זה
    </button>

    <Link href="./home">
        <button className="mt-2 p-2 bg-[#570A57] text-white rounded">לדף הבית</button>
    </Link>

    </div>

    <div className="h-screen overflow-hidden relative">
    <DTable
      docFilter={docFilter}

    /></div>
  </div>
  )
}
