import React, { useEffect, useState } from 'react';
import { FaHome } from "react-icons/fa";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";

import { getAllFromDB } from "../assets/dbUtils"

function History() {
  const [historyData, setHistoryData] = useState([]);
  useEffect(() => {
    getAllFromDB(data => {
      console.log("All Key-Value Pairs:", data);
      setHistoryData(data);
    });
  }, []);

  return (
    <div className='bg-[#111111] relative w-lvw h-lvh flex flex-col justify-center items-center text-white font-poppins p-20'>
      <a href='/' className='bg-[#fe532f] absolute left-0 top-0 text-white text-2xl rounded-full w-24 h-24 m-10 text-center flex justify-center items-center p-5'><FaHome className='w-full h-full' /></a>
      <div className="w-[45%] bg-orange-50 rounded-2xl shadow-lg p-12 flex flex-col items-center h-[100%]">
        <h2 className="text-[#fe532f] text-3xl font-semibold text-center mb-10">📜 Attempt History</h2>
        <ul className="space-y-5 mb-4 w-full max-h-[100%] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          {historyData.length > 0 ? (
            historyData.map((entry, index) => (
              <>
              <li key={index} className="flex justify-between px-5 py-5 bg-gray-100 rounded-lg shadow-sm">
                <span className="font-semibold text-gray-700 text-2xl">Attempt {entry.id}</span>
                <span className="text-[#fe532f] font-bold text-2xl">{entry.value} pts</span>
              </li>
              
              </>
            ))
          ) : (
            <li className="text-center text-2xl text-gray-500 mb-20">No attempts found.</li>
          )}
        </ul>
        <li className='w-full h-10 mb-10 '><MdKeyboardDoubleArrowDown color='#fe532f' className='w-full h-full' /></li>
        
        <a href='/quiz' className='bg-[#fe532f] text-white text-2xl rounded-full w-[70%] h-16 text-center flex justify-center items-center'>TAKE QUIZ</a>
      </div>
    </div>

  );
}

export default History;
