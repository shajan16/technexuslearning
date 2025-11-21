import axios from 'axios';
import React, { use, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../Context/Context';

const Syllabus = () => {

  let {URL}=useContext(UserContext);

  let navi=useNavigate();

  let {id}= useParams();

  useEffect(()=>{
      window.scrollTo(0,0)
  },[])

  let[syllabus,setSyllabus]=useState(null);

  useEffect(() => {
    axios.get(`${URL}/getprocourses/${id}`)
      .then((data)=> setSyllabus(data.data))
      .catch((err)=>{
        console.log(err.message);
      })
  }, [id]);
  
  if(!syllabus) return <p>Loading...</p>

  return (
    <div className='w-screen h-screen px-10 pb-5 flex flex-col justify-center items-center'>
      <div className='py-7 px-15 absolute text-5xl top-0 left-0'>
            <i className="fa-solid fa-arrow-left-long cursor-pointer" onClick={()=>navi(-1)}></i>
        </div>
      <h1 className='text-5xl font-bold my-5'>Syllabus </h1>
      {!syllabus.coursesyllabus? <p className='text-2xl font-semibold'>No Syllabus Uploaded</p>:
      <embed src={`${URL}/uploadprocourse/${syllabus.coursesyllabus}`} className=' w-full h-full rounded-2xl' type="application/pdf" />
      }

    </div>
  )
}

export default Syllabus