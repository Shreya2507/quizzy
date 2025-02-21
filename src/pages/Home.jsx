import React from 'react'
import "../index.css"

function Home() {
    return (
        <div className=' bg-[#111111] w-lvw h-lvh flex flex-col justify-center items-center text-white font-poppins'>
            <div className='relative w-[30%] h-96 flex justify-center items-center'>
                <div className=' bg-radial-[at_25%_25%] from-[#fe532f] to-[#230803] to-75% w-80 h-80 rounded-full'></div>
                <div className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-6xl'>Quizzy</div>
               
            </div>
            <div className='text-6xl'>Quizzes made easy.</div>
            <div className=' mt-10 w-[20%] h-[20%] p-5 flex flex-col gap-5 justify-around items-center'>
                <a href='/quiz' className='bg-[#fe532f] rounded-full w-[100%] h-[100%] flex justify-center items-center text-2xl font-semibold cursor-pointer hover:bg-orange-800 transition-all ease-in-out duration-100'>START</a>
                <a href='/history' className='bg-[#fe532f] rounded-full w-[100%] h-[100%] flex justify-center items-center text-2xl font-semibold cursor-pointer hover:bg-orange-800 transition-all ease-in-out duration-100'>HISTORY</a>
            </div>
        </div>
    )
}

export default Home
