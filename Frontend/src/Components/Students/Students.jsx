import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/Context';

const Students = () => {

  let {URL}=useContext(UserContext);

  let navi =useNavigate();

    let [allstudents,setallstudents]=useState([]);
    let[searchdata,setsearchdata]=useState("");

    useEffect(()=>{
      window.scrollTo(0,0)

      axios.get(`${URL}/getstudents`)
      .then((data)=> setallstudents(data.data))
      .catch((err)=>{
        console.log(err.message);
      })
    },[])

    const handleback = () => {
    navi('/home', { state: { scrollstudents: true } });
  };

  const handleview = (id) => {
    navi(`/studentdetails/${id}`);
  };
  
  let filterdata= searchdata? allstudents.filter(data=>data.name.toUpperCase().includes(searchdata)) : allstudents

  return (
   <div>
   <div className='px-4 md:px-16 absolute text-3xl md:text-5xl'>
      <i className="fa-solid fa-arrow-left-long cursor-pointer" onClick={handleback}></i>
    </div>
    <div className='flex flex-col justify-center items-center mt-15 mb-50 mx-10'>
          <h1 className='text-3xl md:text-6xl font-bold text-center'>Certificate Verification</h1>

          <form className="w-[55%] mt-8">   
              <label htmlFor="default-search" className="mb-2 text-sm font-medium text-white sr-only ">Search</label>
              <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg className="w-4 h-4 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" >
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                      </svg>
                  </div>
                  <input type="search" id="default-search" onChange={e=>setsearchdata(e.target.value.toUpperCase())} className="block w-full p-2 ps-10 text-lg text-black border border-gray-500 rounded-lg bg-blue-50 focus:ring-blue-500 focus:border-blue-500 placeholder-black" placeholder="Search" required />
              </div>
          </form>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-5 md:px-0 mt-8 md:mt-10 justify-center'>
            {filterdata.length>0?(filterdata.map((student)=>(
            <div className='w-full h-64 md:h-80 relative overflow-hidden cursor-pointer rounded-2xl group' key={student._id}>
              <img src={`${URL}/uploadstudent/${student.backgroundimg}`} alt="" className='w-full'/>
              <div className='w-[100%] bg-white h-30 absolute bottom-0 rounded-2xl'>
                <i className="fa-solid fa-arrow-right-long absolute right-6 md:right-10 bottom-5 md:bottom-3 text-4xl md:text-5xl cursor-pointer" onClick={()=>handleview(student._id)}></i>
              </div>

              <div className='w-[70%] bg-white h-38 absolute bottom-0 rounded-2xl px-7 py-10'>
                <img src={`${URL}/uploadstudent/${student.profileimg}`} alt="" className='w-18 h-18 absolute -top-12 shadow-lg shadow-gray-600 rounded-full bg-white ml-3'/>
                <h1 className='text-2xl font-medium'>{student.name.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}</h1> 
                <p className='text-sm'>{student.role.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}</p>
                <div className='flex text-xl mt-3 items-center'>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star-half"></i>
                  <h1 className='ml-2 font-sans font-medium'>4.5</h1>
                </div>
              </div>
            </div>
            )) ): <h1 className="col-span-full text-center text-xl md:text-2xl">Student Not Found!!</h1> }

          </div>
        </div>
        <Footer/>
  </div>

  )
}

export default Students