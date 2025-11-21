import React, { useContext } from 'react'
import { BsPersonFillGear } from "react-icons/bs";
import { UserContext } from '../Context/Context';
import { useNavigate } from 'react-router-dom';

const Staffenter = () => {

    let navi=useNavigate()

    let{staffname}= useContext(UserContext);

   let handleclick=()=>{
    if (!staffname) {
        navi("/stafflogin")
    }else{
        navi("/staffs")
    }
   }


  return (
    <div onClick={handleclick} className='bg-orange-500 px-4 py-2 pr-15 fixed -right-27 opacity-50 hover:opacity-100 bottom-15 z-50 flex gap-3 rounded-full items-center text-white cursor-pointer transition-all duration-300 ease-out hover:-right-10'>
       <BsPersonFillGear className='text-2xl'/>
       <span>STAFF</span>
    </div>
  )
}

export default Staffenter;