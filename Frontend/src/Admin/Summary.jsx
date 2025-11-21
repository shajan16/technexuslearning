import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../Context/Context';

const Summary = () => {

  let {URL}=useContext(UserContext);

  let[courses,setcourses]=useState("0");
  let[students,setstudents]=useState("0");
  let[staffs,setstaffs]=useState("0");

  useEffect(()=>{
    // Total-Courses
    axios.get(`${URL}/getprocourses`)
    .then((res)=>{
      setcourses(res.data.length)
    })
    .catch((err)=>{
      console.log(err)
    })

    // Total-Students
    axios.get(`${URL}/getstudents`)
    .then((res)=>{
      setstudents(res.data.length)
    })
    .catch((err)=>{
      console.log(err)
    })

    //  Total-Staff
    axios.get(`${URL}/getstaffs`)
    .then((res)=>{
      setstaffs(res.data.length)
    })
    .catch((err)=>{
      console.log(err)
    })
    
  },[])

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-15">
        <div className="bg-gradient-to-br from-blue-600 to-purple-500 p-4 rounded-xl text-center">
          <i className="fa-solid fa-user-group text-2xl mb-2"></i>
          <p>Total Clients</p>
          <h2 className="text-2xl font-bold">0</h2>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-xl text-center">
          <i className="fa-solid fa-graduation-cap text-2xl mb-2"></i>
          <p>Total Students</p>
          <h2 className="text-2xl font-bold">{students}</h2>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-cyan-500 p-4 rounded-xl text-center">
          <i className="fa-solid fa-users text-2xl mb-2"></i>
          <p>Total Staffs</p>
          <h2 className="text-2xl font-bold">{staffs}</h2>
        </div>
        <div className="bg-gradient-to-br from-orange-400 to-yellow-500 p-4 rounded-xl text-center">
          <i className="fa-solid fa-book text-2xl mb-2"></i>
          <p>Total Courses</p>
          <h2 className="text-2xl font-bold">{courses}</h2>
        </div>
      </div>
  )
}

export default Summary;