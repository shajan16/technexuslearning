import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import axios from 'axios';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/Context';

const Removewshop = () => {

  let {URL}=useContext(UserContext);

    let navi =useNavigate();

    let [workshop,setworkshop]=useState([]);

    useEffect(()=>{
      axios.get(`${URL}/getworkshop`)
      .then((data)=> setworkshop(data.data))
      .catch((err)=>{
        console.log(err.message);
      })
    },[])

    // Delete Workshop
    let handledelete= async (id)=>{
    let result = await Swal.fire({
    title: "Are you sure?",
    text: "This Workshop will be permanently deleted!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  });
  if (!result.isConfirmed) return;

    try {
        await axios.delete(`${URL}/deleteworkshop/${id}`);
        let updatedpartner= workshop.filter(work=>work._id !== id)
        setworkshop(updatedpartner)
        Swal.fire("Workshop deleted successfully!!");
    } catch (error) {
        Swal.fire("Failed to delete Workshop!!");
        console.log(error);
    }
  }  

  return (
    <div>
    <div className='px-4 md:px-16 absolute text-3xl md:text-5xl'>
      <i className="fa-solid fa-arrow-left-long cursor-pointer" onClick={()=>navi(-1)}></i>
    </div>
     <div className="px-4 md:px-10 mt-20 flex flex-col items-center">
        <h1 className="text-3xl md:text-5xl font-bold text-center">Workshop</h1>
      <div className='flex flex-wrap items-center justify-around gap-15 md:gap-20 mt-20 w-full'>

            {workshop && workshop.length > 0 ? (
              workshop.map((data) => (
                <div
                  className="flex flex-col justify-center items-center space-y-2 md:space-y-0 md:space-x-2"
                  key={data._id}
                >
                <button onClick={()=>handledelete(data._id)} className='text-xl text-white bg-red-500 px-3 mb-5 rounded-xl py-2 cursor-pointer'>Remove</button>
                  <img
                    src={`${URL}/uploadpartner/${data.image}`}
                    alt=""
                    className="w-60 h-80"
                  />
                </div>
              ))
            ) : (
              <h1 className="text-center w-full">Workshop Not Uploaded!!</h1>
            )}
          </div>
         </div>
     </div>
  )
}

export default Removewshop;