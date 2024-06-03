"use client";

import axios from "axios";
import { parseString } from "xml2js";
import React, { useEffect, useState } from "react";
import LoadingMood from "../component/LoadingMood";
import TheError from "../component/TheError";
import SearchRequire from "../component/SearchRequire";
import RTable from "../component/reqTable/RTable";

export default function NamaFiles() {

  // State to store the XML file data
  const [files, setFiles] = useState(null);

  // State to track the loading situation
  const [loading, setLoading] = useState(false);

  // State to store the file path
  const [filePath, setFilePath] = useState("");

  // State to track errors
  const [error, setError] = useState("");

  function formatDate(dateStr) {
    if (!dateStr || dateStr.length !== 8) return dateStr;
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);
    return `${year}/${month}/${day}`;
  }
  

  // Fetch the data using axios
  const fetchData = async () => {
    // Remove surrounding quotes if present
    // const sanitizedPath = filePath.trim().replace(/^"(.*)"$/, "$1");
    if (!filePath) {
      setError("חשבת אולי לשים משהו בנתיב חיפוש 😒🤦‍♂️");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `http://localhost:8080/api/file?path=${encodeURIComponent(filePath)}`
      );
      console.log("response", response);

      // Store the data
      const results = response.data.contents; 
      const allFilesData = [];

      results.forEach((xmlData) => {
        parseString(xmlData,  { explicitArray: false }, (err, result) => {
          if (err) {
            setError("Failed to parse some XML files.");
            return;
          }
          const fileData = result.ZPREQCR_NAMA01;
          const credat = fileData.IDOC.EDI_DC40.CREDAT;
          const format = formatDate(credat)
          const e1bpebancArray = fileData.IDOC.E1PREQCR.E1BPEBANC.map(item => ({
            ...item,
            CREDAT: format,
          }));
          allFilesData.push(...e1bpebancArray);
        });
      });

      setFiles(allFilesData.flat());
      setLoading(false);

    } catch (error) {
      console.error("Error fetching data:", error);
      setError("אופס כנראה שהנתיב שלך לא קיים");
      setLoading(false);
    }
  };

  // Handle input change for the file path
  const handleInputChange = (e) => {
    setFilePath(e.target.value);
  };

  

  return (
    <div className="h-screen overflow-hidden relative">

      {/* Input for file path */}
        <SearchRequire
        filePath={filePath}
        handleInputChange={handleInputChange}
        fetchData={fetchData}
        formatDate={formatDate}
        setLoading={setLoading}
        setError={setError}
        error={error}
      />

      

      {/* Render loading state */}
      {loading && <LoadingMood />}

      {/* Render the table if data is available */}
      {!loading && !error && files?.length > 0 && (
        <RTable
          e1bpebancArray={files}
        />
        
      )}

      {/* Render error state if there is an error */}
      {error && <TheError error={error} setError={setError} />}
    </div>
  );
}
