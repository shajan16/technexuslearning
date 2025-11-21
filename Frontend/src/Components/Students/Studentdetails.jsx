import React, { useContext, useEffect, useState } from 'react'
import Footer from '../Footer'
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios';
import { UserContext } from '../../Context/Context';
import dimg from '/src/assets/img 19.png'

const Studentdetails = () => {

  let {URL}=useContext(UserContext);

  let {id}= useParams();
  let navi=useNavigate();

  let [student, setstudent] = useState(null);

  useEffect(() => {
    axios.get(`${URL}/getstudents/${id}`)
      .then((data)=> setstudent(data.data))
      .catch((err)=>{
        console.log(err.message);
      })
  }, [id]);

  const handleback = () => {
    navi(-1);
  };

  if(!student) return <p>Loading...</p>

  return (
    <div className='w-full'>
      <div className='px-4 md:px-15 absolute text-3xl md:text-5xl z-10 mt-6 md:mt-10'>
        <i className="fa-solid fa-arrow-left-long cursor-pointer" onClick={handleback}></i>
      </div>
      <div className='bg-gray-500 w-full flex flex-col justify-center items-center relative'>
        <img 
          src={`${URL}/uploadstudent/${student.profileimg}`} 
          alt="" 
          className='w-full h-200 object-fill filter grayscale'
        />
        <div className='absolute text-center space-y-2 md:space-y-3 px-2 md:px-0'>
          <h1 className='text-3xl md:text-6xl font-bold tracking-widest'>
            Hello, I'm <span className='text-cyan-400'>{student.role.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}</span>.
          </h1>
          <p className='text-lg md:text-2xl font-bold text-white tracking-widest'>
            My Name is <span className='text-cyan-400'>{student.name.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}</span>. I Made Amazing Things
          </p>
        </div>
      </div>

      <div className='flex px-4 md:px-10 mt-10 md:mt-30 gap-6 justify-between'>
        <div className='md:w-2/3 space-y-3'>
          <h1 className='text-3xl md:text-5xl font-bold'>About Me</h1>
          <p className='text-base md:text-lg'>{student.about}</p>
        </div>
        <div className='md:w-1/3 flex justify-center'>
          <img src={dimg} alt="" className="w-32 h-32 md:w-58 md:h-78 object-contain" />
        </div>
      </div>

      <div className='mt-20 md:mt-40 mb-40 md:mb-60'>
        <div className='flex justify-center text-3xl md:text-6xl font-bold tracking-widest'>
          <h1>ACADEMIC JOURNEY</h1>
        </div>
        <div className='flex flex-col items-center relative mt-10 md:mt-20'>
          <div className='w-[2px] h-100 md:h-160 bg-black relative'></div>
          <p className='absolute -top-6 md:-top-25 text-6xl md:text-9xl'>.</p>

          <div className='flex absolute top-8 md:top-20 w-[90%] md:w-[80%]'>
            <h1 className='text-lg md:text-3xl font-medium z-20'>JOIING DATE: {student.joindate} </h1>
          </div>

          <img 
            src={dimg}
            alt="" 
            className='absolute top-2 md:top-10 rounded-full w-16 h-16 md:w-25 md:h-25 hover:w-28 hover:h-28 md:hover:w-70 md:hover:h-70 transition-all duration-500 ease-in-out z-10'
          />

          <div className='flex absolute bottom-8 md:bottom-20 w-[90%] md:w-[80%] justify-end'>
            <h1 className='text-lg md:text-3xl font-medium z-20'>END DATE: {student.enddate} </h1>
          </div>
          <img 
            src={dimg}
            alt="" 
            className='absolute bottom-2 md:bottom-10 rounded-full w-16 h-16 md:w-25 md:h-25 hover:w-28 hover:h-28 md:hover:w-70 md:hover:h-70 transition-all duration-500 ease-in-out z-10'
          />
          <div></div>
          <p className='absolute -bottom-2 md:-bottom-5 text-6xl md:text-9xl'>.</p>
        </div>
        <div className='mt-20 md:mt-40 flex justify-center'>
          <hr className='w-[80%] md:w-[50%] border-1'/>
        </div>
      </div>

      <Footer/>
    </div>
  )
}

export default Studentdetails