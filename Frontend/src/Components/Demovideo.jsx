import axios from 'axios';
import React, { useContext } from 'react'
import Swal from 'sweetalert2';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { UserContext } from '../Context/Context';
import Demoimg from '../assets/Ellipse 16.png'

const Demovideo = () => {

  let {URL}=useContext(UserContext);

  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  let[video,setvideo]=useState([]);

  let demovideo=video.map((item)=>item.video);

  useEffect(()=>{
    axios.get(`${URL}/getdemovideo`)
      .then((data)=> setvideo(data.data))
      .catch((err)=>{
        console.log(err.message);
      })
  },[])
  
  const togglePlay = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className='mt-10 grid justify-center px-5'>
              <div className='flex w-full flex-col items-center bg-gradient-to-b from-blue-50 to-blue-200 p-5 md:p-10 rounded-xl'>
                <h1 className='m-5 text-3xl md:text-5xl font-medium tracking-wider text-center'>Watch Our Demo Video</h1>
                <div className="relative w-full mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
                  <video
                    ref={videoRef}
                    src={`${URL}/uploaddemovideo/${demovideo}`}
                    type="video/mp4"
                    className="object-cover w-screen h-74 md:h-[600px] bg-black"
                    controls={isPlaying}
                    onClick={togglePlay}
                  />

                  {/* Play button overlay */}
                  {!isPlaying && (
                    <button
                      onClick={togglePlay}
                      className="absolute inset-0 flex items-center justify-center group"
                    >
                      <div className="bg-black/60 group-hover:bg-black/40 rounded-full p-6 sm:p-10 transition duration-300 cursor-pointer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-10 sm:w-16 text-white drop-shadow-md"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </button>
                  )}
                  <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/70 to-transparent pointer-events-none cursor-pointer"></div>
                </div>

                <div className='mt-10 flex flex-col items-center w-full md:w-[75%]'>
                  <h1 className='text-2xl md:text-4xl font-medium tracking-wider text-center'>Trusted By The 100+ Happy Students And Online</h1>
                  <h1 className='text-2xl md:text-4xl font-medium tracking-wider text-center'>Users Sins 2025</h1>
                  <p className='mt-3 text-base md:text-xl tracking-wider text-center'><span onClick={() => { Swal.fire("Developed by Shajan!!") }}>Unlock</span> your potential with Industry-Learning mentors.</p>
                  <p className='text-base md:text-xl tracking-wider text-center'>Gain real-world skills through guided learning.</p>
                  <div className='flex bg-white items-center space-x-3 px-4 md:px-8 py-1 rounded-xl mt-8 text-base md:text-xl tracking-wider '>
                    <img src={Demoimg} alt="" className='h-10 w-10 rounded-full' />
                    <p>"All courses are help people to achieve their goals"</p>
                  </div>
                </div>
              </div>
            </div>
  )
}

export default Demovideo;