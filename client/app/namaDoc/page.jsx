"use client"

import React, { useState } from 'react'
import LoadingMood from '../component/LoadingMood';
import TheError from '../component/TheError';
import axios from 'axios';
import SearchDocs from '../component/SearchDocs';
import { parseString } from 'xml2js';
import DTable from '../component/docTable/DTable';

export default function namaDoc() {
      // State to store the XML file data

  const [docFiles, setDocFiles] = useState(null);

  // State to track the loading situation
  const [loading, setLoading] = useState(false);

  // State to store the file path
  const [docPath, setDocPath] = useState(
    "C:\\Users\\dev01User\\Desktop\\docFiles"
  );

  // State to track errors
  const [error, setError] = useState("");

  function formatDate(dateStr) {
    if (!dateStr || dateStr.length !== 8) return dateStr;
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);
    return `${year}/${month}/${day}`;
  }

  const fetchDocs = async () => {
    if (!docPath) {
      setError("חשבת אולי לשים משהו בנתיב חיפוש 😒🤦‍♂️");
      return;
    }
    setLoading(true);
    setError("");
  
    try {
      const response = await axios.get(
        `http://localhost:8080/api/file?path=${encodeURIComponent(docPath)}`
      );
      console.log("response", response);
  
      // Store the data
      const results = response.data.contents; 
      const allFilesData = [];
  
      results.forEach((xmlData) => {
        parseString(xmlData, { explicitArray: false }, (err, result) => {
          if (err) {
            setError("Failed to parse some XML files.");
            return;
          }
          
          const fileData = result.DOCMAS05;
          const credat = fileData.IDOC.EDI_DC40.CREDAT;
          const format = formatDate(credat);
          const e1drawt = fileData.IDOC.E1DRAWM.E1DRAWT.DKTXT;
          
          
          const e1drawfiles = Array.isArray(fileData.IDOC.E1DRAWM.E1DRAWFILES) ? 
            fileData.IDOC.E1DRAWM.E1DRAWFILES : 
            [fileData.IDOC.E1DRAWM.E1DRAWFILES];
  
          const e1bpebancArray = [{
            ...fileData.IDOC.E1DRAWM,
            DKTXT: e1drawt,
            E1DRAWFILES: e1drawfiles,
            CREDAT: format,
          }];
  
          allFilesData.push(...e1bpebancArray);
        });
      });
  
      setDocFiles(allFilesData.flat());
      setLoading(false);
  
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("אופס כנראה שהנתיב שלך לא קיים");
      setLoading(false);
    }
  };
  
  // Handle input change for the file path
  const handleInputChange = (e) => {
    setDocPath(e.target.value);
  };


  return (
    <div className="h-screen overflow-hidden relative">

      {/* Input for file path */}
        <SearchDocs
        filePath={docPath}
        handleInputChange={handleInputChange}
        fetchData={fetchDocs}
        formatDate={formatDate}
        setLoading={setLoading}
        setError={setError}
        error={error}
      />

      

      {/* Render loading state */}
      {loading && <LoadingMood />}

      {/* Render the table if data is available */}
      {!loading && !error && docFiles?.length > 0 && (
        
        <DTable
          docFiles={docFiles}
        />
        
      )}

      {/* Render error state if there is an error */}
      {error && <TheError error={error} setError={setError} />}
    </div>
  )
}
