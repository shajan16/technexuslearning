import React, { useContext, useEffect, useState } from 'react'
import Footer from '../Footer'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import "sweetalert2/src/sweetalert2.scss";
import Swal from 'sweetalert2';
import { UserContext } from '../../Context/Context';

const Procoursedetails = () => {

    let { username, URL } = useContext(UserContext);
    
    let {id}= useParams();

    useEffect(()=>{
        window.scrollTo(0,0)
    },[])

    let navi=useNavigate()

    const handleback = () => {
    navi(-1);
  };

  let [course, setcourse] = useState(null);

  useEffect(() => {
    axios.get(`${URL}/getprocourses/${id}`)
      .then((data)=> setcourse(data.data))
      .catch((err)=>{
        console.log(err.message);
      })
  }, [id]);

  let handleSyllabus=()=>{
    if(username){
        navi(`/syllabus/${course._id}`)
    } else{
        alert("LogIn to View Syllabus")
        navi("/login")
    }
  }

  if(!course) return <p>Loading...</p>

  return (
    <div className='w-full relative'>
    <div className='py-4 px-4 md:px-15 absolute text-3xl md:text-5xl'>
      <i className="fa-solid fa-arrow-left-long cursor-pointer" onClick={handleback}></i>
    </div>
    <div className='mt-8 md:mt-15 px-4 md:px-10 flex flex-col justify-center items-center'>
      <h1 className='text-3xl md:text-8xl font-bold tracking-widest text-center'>
        {course.name.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
      </h1>
      <p className='w-full md:w-[55%] mt-6 md:mt-10 text-center text-base md:text-lg'>{course.caption}</p>
      <div className='w-full px-0 md:px-20 mt-8 md:mt-12'>
        <video
          type="video/mp4"
          src={`${URL}/uploadprocourse/${course.coursevideo}`}
          muted
          loop
          onMouseOver={(e)=>{e.target.play()}}
          onMouseOut={(e)=>{e.target.pause()}}
          className='bg-gray-600 object-cover w-full rounded-2xl md:rounded-4xl h-60 md:h-160'
        ></video>
      </div>
    </div>

    <div className='flex flex-col md:flex-row px-4 md:px-13 mt-10 md:mt-20 gap-8'>
      <div className='w-full md:w-[60%]'>
        <h1 className='text-2xl md:text-5xl font-bold'>About The Course</h1>
        <p className='mt-4 md:mt-8 text-base md:text-lg'>{course.about}</p>
      </div>

      <div className='w-full md:w-[40%] flex justify-end items-center mt-8 md:mt-0'>
        <div className='bg-white shadow-lg shadow-gray-500 rounded-2xl px-4 md:px-5 py-5 md:py-7 w-full md:w-[80%]'>
          <h1 className='text-xl md:text-3xl font-medium'>This Course Include</h1>
          <div className='ml-2 md:ml-6 mt-3 md:mt-5 space-y-2 md:space-y-4 text-gray-500 text-base md:text-lg font-medium'>
            <p><i className="fa-regular fa-clock"></i>  3 Months</p>
            <p><i className="fa-regular fa-newspaper"></i>  14 Lessons</p>
            <p><i className="fa-solid fa-language"></i>  Language:  Tamil, English</p>
            <p><i className="fa-solid fa-chart-simple"></i>  Course Level: Advanced</p>
            <p><i className="fa-solid fa-award"></i>  Certificate Of Completion</p>
          </div>
          <div className='mt-5 md:mt-7 px-2 md:px-8 space-x-3 md:space-x-7'>
            <span className='text-xl md:text-3xl font-medium'>₹{course.price}.00</span>
            <span className='text-gray-500 line-through text-base md:text-lg'>₹{Number(course.price)+101}.00</span>
          </div>
          <div className='mt-1 flex justify-between items-center gap-4'>
            <button
              onClick={()=>handleSyllabus(course._id)}
              className='px-6 md:px-8 py-2 md:py-3 border border-black rounded-full mt-4 md:mt-6 cursor-pointer tracking-wider hover:tracking-widest transition-all duration-300 ease-in-out hover:bg-black hover:text-white'
            >
              Syllabus
            </button>
            <button
              onClick={() => {
                navi("/userchat");
              }}
              target={username ? "_blank" : undefined}
              rel={username ? "noopener noreferrer" : undefined}
              className='px-6 md:px-8 py-2 md:py-3 border border-black rounded-full mt-4 md:mt-6 cursor-pointer tracking-wider hover:tracking-widest transition-all duration-300 ease-in-out hover:bg-black hover:text-white'
            >
              Know More
            </button>
          </div>
        </div>
      </div>
    </div>

    <div className='mt-16 md:mt-30 px-4 md:px-10 mb-20 md:mb-50'>
      <div className='w-full px-5 bg-white h-60 md:h-125 rounded-2xl shadow-lg shadow-gray-400 flex justify-center'>
        <div className='w-full md:w-[62%] mt-8 md:mt-20 flex flex-col items-center'>
          <h1 className='text-2xl md:text-6xl font-medium text-center'>Start Your Learning Journey Today!</h1>
          <p className='mt-3 md:mt-6 text-base md:text-xl font-medium text-center text-gray-500'>
            Discover Expert-Led Courses Designed To Boost Your Skills And Career. Learn At Your Own Pace With Hands-On<span onClick={()=>{Swal.fire("Developed by Shajan!!")}}> Projects </span>
             And Real-World Knowledge.
          </p>
        </div>
      </div>
    </div>

    <Footer/>
  </div>
  )
}

export default Procoursedetails;