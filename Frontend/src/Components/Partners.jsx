import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import axios from 'axios';
import { UserContext } from '../Context/Context';

const Partners = () => {

  let {URL}=useContext(UserContext);

    let [allpartner,setallpartner]=useState([]);

    useEffect(()=>{
      axios.get(`${URL}/getpartners`)
      .then((data)=> setallpartner(data.data))
      .catch((err)=>{
        console.log(err.message);
      })
    },[])


  return (
     <div className="px-4 md:px-10 mt-20 flex flex-col items-center">
        <h1 className="text-3xl md:text-5xl font-bold text-center">Hiring Partners</h1>
      <div className='flex overflow-hidden gap-10 md:gap-20 mt-15 w-full'>
        
  {[...Array(5)].map((_, idx) => (
          <div
            className="flex moving space-x-4 md:space-x-12 gap-4 md:gap-15 min-w-max"
            aria-hidden={idx !== 0}
            key={idx}
          >
            {allpartner && allpartner.length > 0 ? (
              allpartner.map((data) => (
                <div
                  className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-2"
                  key={data._id}
                >
                  <img
                    src={`${URL}/uploadpartner/${data.image}`}
                    alt=""
                    className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover"
                  />
                  <span className="text-base md:text-xl font-medium text-center md:text-left">
                    {data.companyname}
                  </span>
                </div>
              ))
            ) : (
              <h1 className="text-center w-full">Please Upload Partners!!</h1>
            )}
          </div>
        ))}



     </div>
     </div>
  )
}

export default Partners