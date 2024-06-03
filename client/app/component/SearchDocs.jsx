"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { parseString } from "xml2js";
import DTable from "./docTable/DTable";

export default function SearchDocs({
  filePath,
  handleInputChange,
  fetchData,
  formatDate,
  setLoading,
  setError,
  error,
}) {
  const [docNumber, setDocNumber] = useState("");
  const [docFilter, setDocFilter] = useState([]);
  const [paths, setPaths] = useState([]);
  const [showPaths, setShowPaths] = useState(false);

  const [changeText, setChangeText] = useState(false);
  const handleChangeText = () => {
    setChangeText(!changeText);
  };

  useEffect(() => {
    // Fetch paths from the backend when the component mounts
    const fetchPaths = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/paths");
        setPaths(response.data);
      } catch (error) {
        console.error("Error fetching paths:", error);
        setError("Failed to fetch paths from the file.");
      }
    };

    fetchPaths();
  }, []);

  const normalizeDocNumber = (str) => str.slice(5, 16);

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

          const e1dawmArray = Array.isArray(fileData.IDOC.E1DRAWM)
            ? fileData.IDOC.E1DRAWM
            : [fileData.IDOC.E1DRAWM];

          const normalizedDocNumber = normalizeDocNumber(docNumber);
          const matchDoc = e1dawmArray.filter((item) =>
            normalizeDocNumber(item.DOKNR).includes(normalizedDocNumber)
          );

          if (matchDoc.length) {
            matchDoc.forEach((item) => {
              const e1drawt = item.E1DRAWT.DKTXT;
              const e1drawfiles = Array.isArray(item.E1DRAWFILES)
                ? item.E1DRAWFILES
                : [item.E1DRAWFILES];

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

  const handlePathClick = (path) => {
    handleInputChange({ target: { value: path } });
    setShowPaths(false);
  };

  return (
    <div className="p-4">
      <div className="relative">
        <input
          type="text"
          value={filePath}
          onChange={handleInputChange}
          onClick={() => setShowPaths(true)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="הכנס נתיב לקובץ מסוים"
        />
        {showPaths && (
          <div
            onClick={() => setShowPaths(false)}
            className="absolute z-20 bg-gradient-to-r from-indigo-600 to-purple-500 text-white border border-gray-300 rounded mt-2 p-2 w-full"
          >
            <button
              className="w-full py-1 hover:bg-red-600 rounded-full"
              onClick={() => setShowPaths(false)}
              onMouseEnter={handleChangeText}
              onMouseLeave={handleChangeText}
            >
              {changeText ? "סגירת אפשרויות" : "לסגור סופית"}
            </button>
            {paths.map((path, index) => (
              <div
                key={index}
                onClick={() => handlePathClick(path)}
                className="p-2 hover:bg-[#2E0249] cursor-pointer"
              >
                {path}
              </div>
            ))}
          </div>
        )}
      </div>

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
          <button className="mt-2 p-2 bg-[#570A57] text-white rounded">
            לדף הבית
          </button>
        </Link>
      </div>

      <div className="h-screen overflow-hidden relative">
        <DTable docFilter={docFilter} />
      </div>
    </div>
  );
}
