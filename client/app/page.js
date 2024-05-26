"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'

function page() {

  const [data, setData] = useState("Loading");

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/home`);
      const res = response.data;
      setData(res);
      console.log(res,"ghd");
    } catch (error) {
      console.error("error fetching data: ", error);
    }
  };
  useEffect(()=>{
    fetchData()
  }, [])
  return (
    <div className='h-full'>
{data.message}
{data.ppl}
    </div>
  )
}

export default page