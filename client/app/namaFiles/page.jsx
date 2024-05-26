"use client";
import axios from "axios";
import { parseString } from "xml2js";
import React, { useEffect, useState } from "react";
import Table from "@/app/component/Table";
export default function NamaFiles() {
  // STATE TO STORE THE XML FILE
  const [files, setFiles] = useState("Loading");

  // STATE TO THE LOADING SITUATION
  const [loading, setLoading] = useState(true);

  // STATE TO STORE SOME PATH
  const [filePath, setFilePath] = useState("C:/Users/dev01User/Desktop/xmlFiles/namaExample2.xml");
  

  // FETCH THE DATA USING AXIOS
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/file?path=${encodeURIComponent(filePath)}`);
      console.log("response", response);

      // STORE THE DATA
      const xmlData = response.data.content;

      // MAKE THE XML TO STRING
      parseString(xmlData, (err, result) => {
        if (err) {
          console.error("Error parsing XML:", err);
          return;
        }
        console.log("result", result);

        // SET TIME FOR 1 SEC TO LOAD
        setTimeout(() => {
          setFiles(result.ZPREQCR_NAMA01);
          setLoading(false);
        }, 1000);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setFilePath(e.target.value);
  };

  // SOME NICE CSS IF LOADING
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="loader mb-4"></div>
        <div className="text-5xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-text">כבר מביאים לך את המידע</div>
        <style>{`
                @keyframes slideBg {
                    from { background-position: 200% 0; }
                    to { background-position: -200% 0; }
                }
                .animate-text {
                    background-size: 200% 100%;
                    animation: slideBg 3s linear infinite;
                }
            `}</style>
      </div>
    );
  }

  if (!files) {
    return <div>Error loading data</div>;
  }

  // THIS IS TO ENTER THE DATA WE NEED IN 'NAMA' FILES
  const idoc = files.IDOC[0];
  const e1preqcr = idoc.E1PREQCR[0];
  const e1bpebancArray = e1preqcr.E1BPEBANC;


  return (
    <div className="h-screen overflow-hidden">
      {/* INPUT TO FILE */}
      <div className="p-4">
        <input
          type="text"
          value={filePath}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="הכנס נתיב לקובץ מסוים"
        />
        <button
          onClick={fetchData}
          className="mt-2 p-2 bg-blue-500 text-white rounded"
        >
          קבל מידע מנתיב זה
        </button>
      </div>

      {/* THE TABLE */}
      <Table e1bpebancArray={e1bpebancArray} />
    </div>
  );
}
