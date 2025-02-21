import React, { useEffect, useRef, useState } from 'react'
import "../index.css"
import data from "../assets/data"
import "../styles/QuizStyle.css"

function QuizScreen() {
  let [index, setIndex] = useState(0);
  let [questionSet, setQuestionSet] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);

  let [result, setResult] = useState(false);
  const [timer, setTimer] = useState(30);

  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);


  let optionArray = [Option1, Option2, Option3, Option4];

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
      setTimeout(showNext, 3000);
    }
  }

  function showNext() {
    if (lock) {
      if (index === data.length - 1) {
        setResult(true);
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

  useEffect(() => {
    setQuestionSet(data[index]);
  }, [index]);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setLock(true);  // Lock the question when time runs out
      optionArray[questionSet.ans - 1].current.classList.add("correct"); // Highlight correct answer
      setTimeout(showNext, 100); // Move to the next question after 2 seconds
    }
  }, [timer]);


  return (
    <div className='bg-[#111111] w-lvw h-lvh p-20 flex flex-col justify-center items-center text-black font-poppins'>
      <a href='/' className='bg-[#fe532f] absolute left-0 top-0 text-white text-2xl rounded-full w-28 h-28 m-10 text-center flex justify-center items-center'>HOME</a>
      <div className='bg-orange-50 rounded-2xl w-[40%] p-10 h-full flex flex-col justify-start items-center'>

         {/* Timer Display */}
         <div className='text-3xl p-5 w-full text-center border-black border-b-[1px] flex justify-between'>
          <span>{index + 1} of {data.length}</span>
          <span className={`text-${timer <= 3 ? "red-500" : "black"}`}>⏳ {timer}s</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-300 rounded-full h-3 mt-3">
          <div 
            className="bg-[#fe532f] h-3 rounded-full transition-all" 
            style={{ width: `${(timer / 30) * 100}%` }} 
          ></div>
        </div>


        {result ?
          <>
            <div className='text-3xl w-full m-10 text-center'>You scored {score} out of {data.length}</div>
            <a href='/quiz' className='bg-[#fe532f] text-white text-2xl rounded-full w-[70%] h-16 mb-10 text-center flex justify-center items-center'>TRY AGAIN</a>
            <button className='bg-[#fe532f] text-white text-2xl rounded-full w-[70%] h-16'>ATTEMPT HISTORY</button>
          </>
          :
          <>
            {/* <div className=' text-3xl p-5 w-full text-center border-black border-b-[1px]'>{index + 1} of {data.length}</div> */}

            <div className='text-3xl w-full mt-10'>{index + 1}. {questionSet.question}</div>
            <ul className='w-full flex flex-col justify-between gap-5 items-center mt-10 mb-30'>
              <li onClick={(e) => { check(e, 1) }} ref={Option1} className='w-full border-[1px] border-black py-7 px-5 rounded-2xl text-2xl cursor-pointer'>{questionSet.option1}</li>
              <li onClick={(e) => { check(e, 2) }} ref={Option2} className='w-full border-[1px] border-black py-7 px-5 rounded-2xl text-2xl cursor-pointer'>{questionSet.option2}</li>
              <li onClick={(e) => { check(e, 3) }} ref={Option3} className='w-full border-[1px] border-black py-7 px-5 rounded-2xl text-2xl cursor-pointer'>{questionSet.option3}</li>
              <li onClick={(e) => { check(e, 4) }} ref={Option4} className='w-full border-[1px] border-black py-7 px-5 rounded-2xl text-2xl cursor-pointer'>{questionSet.option4}</li>
            </ul>

            <button
              onClick={showNext}
              className={`${!lock ? 'bg-gray-400' : 'bg-[#fe532f]'} text-white text-2xl rounded-full w-[70%] h-16 transition-all duration-100 ease-in`}
            >
              NEXT
            </button>

          </>}


      </div>
    </div>
  )
}

export default QuizScreen
