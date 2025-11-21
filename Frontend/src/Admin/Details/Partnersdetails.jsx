import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import axios from 'axios';
import { RiDeleteBinFill } from "react-icons/ri";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/Context';

const Partnersdetails = () => {

  let {URL}=useContext(UserContext);

    let navi =useNavigate();

    let [allpartner,setallpartner]=useState([]);

    useEffect(()=>{
      axios.get(`${URL}/getpartners`)
      .then((data)=> setallpartner(data.data))
      .catch((err)=>{
        console.log(err.message);
      })
    },[])

    // Delete Partner
    let handledelete= async (id)=>{
    let result = await Swal.fire({
    title: "Are you sure?",
    text: "This Partner will be permanently deleted!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  });
  if (!result.isConfirmed) return;

    try {
        await axios.delete(`${URL}/deletepartner/${id}`);
        let updatedpartner= allpartner.filter(partner=>partner._id !== id)
        setallpartner(updatedpartner)
        Swal.fire("Partner deleted successfully!!");
    } catch (error) {
        Swal.fire("Failed to delete Partner!!");
    }
  }


  return (
    <div>
    <div className='px-4 md:px-16 absolute text-3xl md:text-5xl'>
      <i className="fa-solid fa-arrow-left-long cursor-pointer" onClick={()=>navi(-1)}></i>
    </div>
     <div className="px-4 md:px-10 mt-20 flex flex-col items-center">
        <h1 className="text-3xl md:text-5xl font-bold text-center">Hiring Partners</h1>
      <div className='flex flex-wrap items-center justify-around gap-15 md:gap-20 mt-20 w-full'>

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
                  <RiDeleteBinFill onClick={()=>handledelete(data._id)} className='text-3xl text-red-500 cursor-pointer'/>
                </div>
              ))
            ) : (
              <h1 className="text-center w-full">Please Upload Partners!!</h1>
            )}
          </div>
         </div>
     </div>
  )
}

export default Partnersdetails;