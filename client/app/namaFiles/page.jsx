"use client";

import axios from "axios";
import { parseString } from "xml2js";
import React, { useEffect, useState } from "react";
import LoadingMood from "../component/LoadingMood";
import TheError from "../component/TheError";
import SearchRequire from "../component/SearchRequire";
import RTable from "../component/reqTable/RTable";

export default function NamaFiles() {


  // // State to track the loading situation
  // const [loading, setLoading] = useState(false);

  // State to store the file path
  const [filePath, setFilePath] = useState("");

  // // State to track errors
  // const [error, setError] = useState("");

  function formatDate(dateStr) {
    if (!dateStr || dateStr.length !== 8) return dateStr;
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);
    return `${year}/${month}/${day}`;
  }
  

 

  // // Handle input change for the file path
  // const handleInputChange = (e) => {
  //   setFilePath(e.target.value);
  // };

  

  return (
    <div className="h-screen overflow-hidden relative">

      {/* Input for file path */}
        <SearchRequire
        // filePath={filePath}
        // handleInputChange={handleInputChange}
        formatDate={formatDate}
      />
    </div>
  );
}
