import React from 'react'
import { useNavigate } from 'react-router-dom'
import Technexus from '../assets/learning.png'
import IT from '../assets/It services.png'


function Firstpage() {

    let navi = useNavigate()

    return (
        <>
            <div className="bg-black min-h-screen w-full relative">
                <div className="flex flex-col justify-center items-center text-white min-h-screen w-full absolute">
                    <h1 className="text-4xl md:text-7xl lg:text-9xl font-medium mt-10 md:mt-20 text-center">TECHNEXUS</h1>
                    <h1 className="text-4xl md:text-7xl lg:text-9xl font-medium text-center">LEARNING</h1>
                    <p className="text-lg md:text-2xl lg:text-4xl font-medium tracking-widest mt-4 md:mt-5 text-center px-2">BUILDING DIGITAL DEFENDERS & DEVELOPERS</p>
                </div>

                <div className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-8 md:gap-15 pt-10 md:pt-15 overflow-hidden relative z-10">
                    <div className="flex py-10 md:py-15 flex-col w-11/12 md:w-[40%] h-[60%] md:h-[70%] bg-white rounded-xl items-center justify-center animate-sideleft gap-6 md:gap-10 mb-6 md:mb-0">
                        <img src={Technexus} alt="" className="w-40 md:w-80" />
                        <button
                            className="py-2 md:py-3 px-4 md:px-6 border border-black rounded-full cursor-pointer hover:tracking-wider transition-all duration-400 ease-in-out hover:bg-black hover:text-white"
                            onClick={() => { navi("/home") }}
                        >
                            Explore Technexus Learning
                        </button>
                    </div>
                    <div className="flex py-10 md:py-15 flex-col w-11/12 md:w-[40%] h-[60%] md:h-[70%] bg-white rounded-xl items-center justify-center animate-sideright gap-6 md:gap-10">
                        <img src={IT} alt="" className="w-40 md:w-80" />
                        <button
                            className="py-2 md:py-3 px-4 md:px-6 border border-black rounded-full cursor-pointer hover:tracking-wider transition-all duration-400 ease-in-out hover:bg-black hover:text-white"
                            onClick={() => { navi("/service") }}
                        >
                            Explore IT Services
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Firstpage