import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Footer from '../Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/Context';

const Procourses = () => {

  let {URL}=useContext(UserContext);

  let navi =useNavigate();
  let location=useLocation();

    let [allcourses,setallcourses]=useState([]);
    let[searchdata,setsearchdata]=useState("");

    useEffect(()=>{
      window.scrollTo(0,0)

      axios.get(`${URL}/getprocourses`)
      .then((data)=> setallcourses(data.data))
      .catch((err)=>{
        console.log(err.message);
      })
    },[])

    const handleback = () => {
        if(location.hash==="#nav"){
          navi(-1)
        }else{
          navi('/home', { state: { scrollcourses: true } });
        }
  };

  const handleview = (id) => {
    navi(`/procoursedetails/${id}`);
  };
  
  let filterdata= searchdata? allcourses.filter(data=>data.name.toUpperCase().includes(searchdata)) : allcourses

  return (
   <div>
     <div className='px-4 md:px-16 absolute text-3xl md:text-5xl'>
      <i className="fa-solid fa-arrow-left-long cursor-pointer" onClick={handleback}></i>
    </div>
    <div className='flex flex-col justify-center items-center mt-8 md:mt-16 mb-24 md:mb-48 mx-2 md:mx-10'>
      <h1 className='text-3xl md:text-6xl font-bold text-center'>Professional Courses</h1>

      <form className="w-full max-w-xl mt-6 md:mt-8 px-20 md:px-0">   
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-white sr-only ">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" >
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            onChange={e=>setsearchdata(e.target.value.toUpperCase())}
            className="block w-full p-2 ps-10 text-base md:text-lg text-black border border-gray-500 rounded-lg bg-blue-50 focus:ring-blue-500 focus:border-blue-500 placeholder-black"
            placeholder="Search"
            required
          />
        </div>
      </form>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-20 md:px-0 mt-8 md:mt-10 justify-center'>
        {filterdata.length>0 ? (
          filterdata.map((course)=>(
            <div
              className='w-full h-64 md:h-80 relative overflow-hidden cursor-pointer rounded-2xl shadow-lg group transition-transform duration-300 transform hover:scale-105 hover:z-10'
              key={course._id}
              onClick={()=>handleview(course._id)}
            >
              <img src={`${URL}/uploadprocourse/${course.courseicon}`} alt="" className='absolute m-3 md:m-5 w-10 h-10 md:w-12 md:h-12 z-10 rounded-full'/>
              <img src={`${URL}/uploadprocourse/${course.courseimg}`} alt="" className='w-full h-full object-cover absolute inset-0 group-hover:opacity-0 transition-opacity duration-500'/>
              <video
                type="video/mp4"
                src={`${URL}/uploadprocourse/${course.coursevideo}`}
                muted
                loop
                className='w-full h-full object-fill absolute opacity-0 group-hover:opacity-100 transition-opacity duration-500'
                onMouseOver={(e)=>{e.target.play()}}
                onMouseOut={(e)=>{e.target.pause()}}
              ></video>
              <p className='absolute bottom-2 text-white left-4 md:left-6 text-lg md:text-2xl font-medium tracking-wide z-20'>
                {course.name.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
              </p>
            </div>
          ))
        ) : (
          <h1 className="col-span-full text-center text-xl md:text-2xl">Course Not Found!!</h1>
        )}
      </div>
    </div>
        <Footer/>
  </div>

  )
}

export default Procourses;