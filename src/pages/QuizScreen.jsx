import React, { useEffect, useRef, useState } from 'react'
import "../index.css"
import data from "../assets/data"
import "../styles/QuizStyle.css"
import { FaHome } from "react-icons/fa";
import {saveToDB, getAllFromDB } from "../assets/dbUtils"


function QuizScreen() {
  let [index, setIndex] = useState(0);
  const [questionSet, setQuestionSet] = useState(data[index]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [attempt, setAttempt] = useState(1);
  const [leaderboard, setLeaderboard] = useState([]);
  const [result, setResult] = useState(false);
  const timer = useRef(null);
  const progressBar = useRef(null);

  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);
  let optionArray = [Option1, Option2, Option3, Option4];


  useEffect(() => {
    getAllFromDB((data) => {
      const nextAttempt = data.length + 1; // Continue from last attempt
      setAttempt(nextAttempt);
    });

  }, []);

  useEffect(() => {
    getAllFromDB((data) => {
      const sortedData = data.sort((a, b) => b.value - a.value).slice(0, 3); // Get top 3 scores
      setLeaderboard(sortedData);
    });

  }, [result]);

  useEffect(() => {
    if (progressBar.current) {
      progressBar.current.classList.remove("active");
      void progressBar.current.offsetWidth; 
      progressBar.current.classList.add("active");
    }
  
    if (timer.current) {
      clearTimeout(timer.current);
    }
  
    timer.current = setTimeout(() => {
      optionArray[questionSet.ans - 1].current.classList.add("correct");
      setLock(true);
      showNext();
    }, 5 * 1000);
  
    return () => clearTimeout(timer.current);
  }, [index]);


  function check(e, ans) {
    if (!lock) {
      if (questionSet.ans === ans) {
        e.target.classList.add("correct");
        setScore(prev => prev + 1);
      } else {
        e.target.classList.add("wrong");
        optionArray[questionSet.ans - 1].current.classList.add("correct");
      }
      setLock(true);
    }
  }

  function showNext() {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    if (lock) {
      if (index === data.length - 1) {
        setResult(true);
        saveToDB(attempt, score);
        setAttempt(prev => prev + 1);
        return 0;
      }

      setIndex(++index);
      setQuestionSet(data[index]);
      setLock(false);

      optionArray.forEach(option => {
        if (option.current) {
          option.current.classList.remove("correct", "wrong");
        }
      });
      
    }
  }

  function retry() {
    clearTimeout(timer.current);

    setIndex(0);
    setQuestionSet(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);

  }




  return (
    <div className='bg-[#111111] w-lvw h-lvh p-10  flex flex-col justify-center items-center text-black font-poppins'>
      <a href='/' className='bg-[#fe532f] absolute left-0 top-0 text-white text-lg rounded-full w-24 h-24 m-10 text-center flex justify-center items-center p-5'><FaHome className='w-full h-full' /></a>
      <div className='bg-orange-50 rounded-lg w-[40%] p-10 h-full flex flex-col justify-start items-center'>

        {result ?
          <>
            <div className="text-3xl w-full m-10 text-center">
              🎉 You scored <strong className="text-[#fe532f]">{score}</strong> out of <strong>{data.length}</strong>
            </div>

            {/* Leaderboard Section */}
            <div className="w-full max-w-lg bg-white p-6 rounded-xl shadow-lg mb-12">
              <h2 className="text-[#fe532f] text-2xl font-semibold text-center mb-5">🏆 Leaderboard</h2>
              <ul className="space-y-5">
                {leaderboard.length > 0 ? (
                  leaderboard.map((entry, index) => (
                    <li key={index} className="flex justify-between px-4 py-4 bg-gray-100 rounded-lg">
                      <span className="font-semibold text-lg">Attempt {entry.id}</span>
                      <span className="text-[#fe532f] text-lg font-bold">{entry.value} pts</span>
                    </li>
                  ))
                ) : (
                  <li className="text-center text-gray-500">No scores yet.</li>
                )}
              </ul>
            </div>


            <button
              onClick={retry}
              className="bg-[#fe532f] text-white text-lg rounded-full w-[70%] h-16 mb-5 flex justify-center items-center shadow-lg hover:bg-[#e04529] transition-all"
            >
              TRY AGAIN
            </button>

            <a
              href="/history"
              className="bg-[#fe532f] text-white text-lg rounded-full w-[70%] h-16 flex justify-center items-center shadow-lg hover:bg-[#e04529] transition-all"
            >
              ATTEMPT HISTORY
            </a>
          </>
          :
          <>

            <div className='text-2xl mb-5 w-full text-center'>
              {index + 1} of {data.length}
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-300 rounded-full h-3">
              <div ref={progressBar}
                className=" h-3 w-full rounded-full transition-all"
              ></div>
            </div>

            <div className='text-2xl w-full mt-10'>{index + 1}. {questionSet.question}</div>
            <ul className='w-full flex flex-col justify-between gap-5 items-center mt-10 mb-10'>
              {["option1", "option2", "option3", "option4"].map((option, idx) => (
                <li
                  key={idx}
                  onClick={(e) => check(e, idx + 1)}
                  ref={optionArray[idx]}
                  className='w-full border-[1px] border-black py-7 px-5 rounded-lg text-lg cursor-pointer'
                >
                  {questionSet[option]}
                </li>
              ))}
            </ul>

            <button
              onClick={showNext}
              className={`${!lock ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#fe532f] cursor-pointer'} text-white text-2xl rounded-full w-[70%] h-16 transition-all duration-100 ease-in`}
            >
              NEXT
            </button>

          </>}
      </div>
    </div>
  )
}

export default QuizScreen
