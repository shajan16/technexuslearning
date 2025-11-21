import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/Context';

const Homestudents = () => {

  let {URL}=useContext(UserContext);

    let navi=useNavigate()
    let location=useLocation();
    let students =useRef();

    useEffect(()=>{
        if(location.state?.scrollstudents && students.current){
          students.current.scrollIntoView()
    }
    },[location])

    let [allstudents,setallstudents]=useState([]);

    useEffect(()=>{
      axios.get(`${URL}/getstudents`)
      .then((data)=> setallstudents(data.data))
      .catch((err)=>{
        console.log(err.message);
      })
    },[])

    const handleview = (id) => {
    navi(`/studentdetails/${id}`);
  };

  return (
    <div
      className="flex flex-col justify-center items-center mt-20 mx-2 sm:mx-5 md:mx-10"
      ref={students}
    >
      <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-center">
        Certificate Verification
      </h1>
      <div className="flex flex-col md:flex-row w-full px-10 md:px-0 mt-10 md:mt-20 gap-6 md:gap-0 justify-between ">
        {!allstudents
          ? "Please Upload Students Details"
          : allstudents.slice(0, 3).map((student) => (
              <div
                className="bg-gray-700 w-full md:w-[30%] h-70 relative rounded-2xl shadow-lg shadow-gray-400 overflow-hidden mb-8 md:mb-0"
                key={student._id}
              >
                <img
                  src={`${URL}/uploadstudent/${student.backgroundimg}`}
                  alt=""
                  className="w-full md:h-40 object-cover"
                />
                <div className="w-full bg-white h-30 absolute bottom-0 rounded-2xl">
                  <i
                    className="fa-solid fa-arrow-right-long absolute right-6 md:right-10 bottom-5 md:bottom-3 text-4xl md:text-5xl cursor-pointer"
                    onClick={() => handleview(student._id)}
                  ></i>
                </div>

                <div className="w-[75%] md:w-[70%] bg-white h-38 absolute bottom-0 rounded-2xl px-4 md:px-7 py-10">
                  <img
                    src={`${URL}/uploadstudent/${student.profileimg}`}
                    alt=""
                    className="w-14 h-14 md:w-18 md:h-18 absolute -top-8 md:-top-12 shadow-lg shadow-gray-600 rounded-full bg-white ml-2 md:ml-3"
                  />
                  <h1 className="text-xl md:text-2xl font-medium">
                    {student.name
                      .split(" ")
                      .map(
                        (word) =>
                          word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </h1>
                  <p className="text-sm">
                    {student.role
                      .split(" ")
                      .map(
                        (word) =>
                          word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </p>
                  <div className="flex text-base md:text-xl mt-2 md:mt-3 items-center">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star-half"></i>
                    <h1 className="ml-2 font-sans font-medium">4.5</h1>
                  </div>
                </div>
              </div>
            ))}
      </div>
      <button
        className="mt-8 md:mt-15 text-base md:text-xl tracking-widest text-gray-700 hover:text-black font-medium cursor-pointer"
        onClick={() => {
          navi("/students");
        }}
      >
        Show More Students
        <i className="fa-solid fa-arrow-right ml-2"></i>
      </button>
    </div>

  )
}

export default Homestudents