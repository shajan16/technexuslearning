import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/Context';

const Stafflogin = () => {

    let navi=useNavigate();

    let[phone,setphone]=useState("");
    let[password,setpassword]=useState("");
    let[error,seterror]=useState("");

    let { setStaffname, URL } =useContext(UserContext);

    let handleSumbit=(e)=>{
      e.preventDefault();

      if(!phone || !password){
        alert("Please Fill All Data!!");
        return;
      }

      if (error.phone !== "") {
        alert(error.phone);
        return;
      }

      let res= axios.post(`${URL}/stafflogin`,{phone,password})
        .then((data)=>{
            alert(data.data.message);
            if(data.data.message==="Login Sucessfully!"){
                navi("/staffs")
                setStaffname(data.data.staff.name);
    }})
        .catch((err)=>{
            console.log(err);
        })       
    }

    let validatePhone=(phone)=>{
      const phoneRegex = /^\d{10}$/;
        if (phoneRegex.test(phone)) {
            seterror((prev)=>({...prev, phone:""})); 
        } else {
            seterror((prev)=>({...prev, phone:"Invalid Phone Number"}));
        }
    }


  return (
      <div className="flex h-screen w-full flex-col justify-center px-6 py-12 lg:px-8 bg-black">
        <div className='py-7 px-15 absolute text-5xl top-5' >
            <i className="fa-solid fa-arrow-left-long text-white cursor-pointer" onClick={()=>{navi(-1)}}></i>
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">STAFF LOGIN</h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">
              Phone Number
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="phone"
                  value={phone}
                  required
                  autoComplete="email"
                  onChange={(e)=>{setphone(e.target.value),validatePhone(e.target.value)}}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  required
                  autoComplete="none"
                  onChange={(e)=>setpassword(e.target.value)}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={handleSumbit}
                className="cursor-pointer flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                LogIn
              </button>
            </div>
          </form>
        </div>
      </div>
  )
}

export default Stafflogin;