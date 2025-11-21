import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../Context/Context';

const Enquiry = () => {

  let {URL}=useContext(UserContext);

    let navi= useNavigate();

    let[name,setname]=useState("");
    let[qualification,setqualification]=useState("");
    let[role,setrole]=useState("");
    let[number,setnumber]=useState("");
    let[email,setemail]=useState("");
    let[error,seterror]=useState("");
    
        let validateEmail=(email)=>{
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (emailRegex.test(email)) {
            seterror((prev)=>({...prev, email:""}));
          } else {
            seterror((prev)=>({...prev, email:"Invalid Email Address"}));
          }
        }
    
        let validatePhone=(phone)=>{
          const phoneRegex = /^\d{10}$/;
            if (phoneRegex.test(phone)) {
                seterror((prev)=>({...prev, phone:""})); 
            } else {
               seterror((prev)=>({...prev, phone:"Invalid Phone Number"}));
            }
        } 
    
    let handleSubmit=async (e)=>{
        e.preventDefault();

        if(name==="" || qualification==="" || role===""){
          alert("Please give all data!!")
          return
        }

        if(error.email!=="" || error.phone!==""){
            alert(error.email || error.phone);
            return;
        }
        try {
          let res=await axios.post(`${URL}/enquiry`,{name,qualification,role,number,email})
          if (res.data.message === "User already exists!") {
          alert("User already exists! Please use a different email.");
          return;
        }
        alert("Enquiry Submitted!!");
        setname("");
        setqualification("");
        setnumber("");
        setemail("");
        setrole("");
        navi(-1);
      }  catch (error) {
      if (error.response && error.response.data && error.response.data.message === "User already exists!") {
      alert("User already exists! Please use a different email.");
    } else {
      alert("Enquire Failed!!");
      console.log(error);
      
    }
  }
  }

  return (
    <div className='bg-blue-50 h-screen flex justify-center items-center'>
<form className="w-[50%]">
  <div className="relative z-0 w-full mb-8 group">
      <input type="text" value={name} onChange={(e)=>setname(e.target.value)} autoComplete='none' name="floating_username" id="floating_username" className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-black appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="floating_username" className="peer-focus:font-medium absolute text-xl text-black duration-300 transhtmlForm -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"><i className="fa-solid fa-user"></i> Full Name</label>
  </div>
  <div className="relative z-0 w-full mb-8 group">
      <input type="text" value={qualification} onChange={(e)=>setqualification(e.target.value)} autoComplete='none' name="floating_qualification" id="floating_qualification" className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-black appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="floating_qualification" className="peer-focus:font-medium absolute text-xl text-black duration-300 transhtmlForm -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"><i className="fa-solid fa-graduation-cap"></i> Qualification</label>
  </div>
  <div className="relative z-0 w-full mb-8 group">
      <select
          name="service"
          value={role}
          onChange={(e)=>setrole(e.target.value)}
          className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-black appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        >
          <option value="">For?</option>
          <option value="Course">Course</option>
          <option value="Internship">Internship</option>
        </select>
  </div>
  <div className="relative z-0 w-full mb-8 group">
      <input type="number" value={number} onChange={(e)=>{setnumber(e.target.value), validatePhone(e.target.value)}} autoComplete='none' name="floating_number" id="floating_number" className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-black appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="floating_number" className="peer-focus:font-medium absolute text-xl text-black duration-300 transhtmlForm -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"><i className="fa-solid fa-phone"></i> Your Number</label>
  </div>
  <div className="relative z-0 w-full mb-8 group">
      <input type="email" value={email} onChange={(e)=>{setemail(e.target.value), validateEmail(e.target.value)}} autoComplete='none' name="repeat_email" id="floating_email" className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-black appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-xl text-black duration-300 transhtmlForm -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"><i className="fa-regular fa-envelope"></i> Email Id</label>
  </div>
  <div className='flex justify-center mt-10'>
  <button type="submit" onClick={handleSubmit} className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-full tracking-widest text-lg  w-full sm:w-auto px-8 py-2.5 text-center cursor-pointer" >Submit</button>
  </div>
</form>
<div className=' absolute right-[16%] top-[14%]'>
    <i className="fa-solid fa-xmark text-3xl font-bold cursor-pointer text-gray-700 hover:text-black" onClick={()=>navi(-1)}></i>
</div>
</div>

  )
}

export default Enquiry