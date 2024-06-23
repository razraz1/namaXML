"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function useStuckFiles() {
    const [stuckFiles, setStuckFiles] = useState([]);

    useEffect(() => {
      async function fetchStuckFiles() {
        try {
          const response = await axios.get(
            "http://localhost:8080/api/checkStuckFiles"
          );
          const data = response.data;
          setStuckFiles(data.stuckFiles || []);
        } catch (error) {
          console.error("Error fetching stuck files:", error);
        }
      }
  
      // ראשוני
      fetchStuckFiles();
  
      // סריקה כל 10 דקות
      const scanInterval = 2 * 60 * 1000;
      const intervalId = setInterval(fetchStuckFiles, scanInterval);
  
      // מנקה את הפונקצייה שלא תפעל
      return () => clearInterval(intervalId);
    }, []);

  return stuckFiles
}
