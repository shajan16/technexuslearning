import axios from 'axios';
import React, {useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/Context';

const Addstaffs = () => {

  let {URL}=useContext(UserContext);

    let navi=useNavigate();

    window.scrollTo(0,0)

    let[name,setname]=useState("");
    let[role,setrole]=useState("");
    let[phone,setphone]=useState("");
    let[password,setpassword]=useState("");
    let[error,seterror]=useState("");


    let validatePhone=(phone)=>{
      const phoneRegex = /^\d{10}$/;
        if (phoneRegex.test(phone)) {
            seterror((prev)=>({...prev, phone:""})); 
        } else {
            seterror((prev)=>({...prev, phone:"Invalid Phone Number"}));
        }
    }

let handleSignup = async (e) => {
  e.preventDefault();

  if (!name || !role || !phone || !password) {
    alert("Please Fill All Data!!");
    return;
  }

  if (error.phone !== "") {
    alert(error.phone);
    return;
  }

  try {
    let res = await axios.post(`${URL}/addstaff`, { name, role, phone, password });
    if (res.data.message === "User already exists!") {
      alert("User already exists! Please use a different Phone number.");
      return;
    }
    alert("Staff Added Successfully!!");
    setname("");
    setrole("")
    setphone("");
    setpassword("");
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message === "User already exists!") {
      alert("User already exists! Please use a different Phone number.");
    } else {
      alert("Signup Failed!!");
    }
  }
};

  return (
       <div className="flex min-h-screen w-full flex-col justify-center px-4 py-8 md:px-8 bg-black">
        <div className='py-4 px-4 md:px-8 absolute top-4 left-4'>
            <i className="fa-solid fa-arrow-left-long text-white text-2xl md:text-5xl cursor-pointer" onClick={()=>{navi("/admin")}}></i>
        </div>
        <div className="mx-auto w-full max-w-sm md:max-w-md lg:max-w-lg">
          <h2 className="mt-10 text-center text-2xl md:text-3xl font-bold tracking-tight text-white">Create Staff Account</h2>
        </div>

        <div className="mt-10 mx-auto w-full max-w-sm md:max-w-md lg:max-w-lg">
          <form action="#" onSubmit={handleSignup} method="POST" className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm md:text-base font-medium text-gray-100">
                Staff Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  required
                  autoComplete="none"
                  onChange={(e)=>setname(e.target.value)}
                  className="block w-full rounded-md bg-white/5 px-3 py-2 text-base text-white outline-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500"
                />
              </div>
            </div>
            <div>
              <label htmlFor="role" className="block text-sm md:text-base font-medium text-gray-100">
                Staff Role
              </label>
              <div className="mt-2">
                <input
                  id="role"
                  name="role"
                  type="text"
                  value={role}
                  required
                  autoComplete="none"
                  onChange={(e)=>setrole(e.target.value)}
                  className="block w-full rounded-md bg-white/5 px-3 py-2 text-base text-white outline-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500"
                />
              </div>
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm md:text-base font-medium text-gray-100">
                Phone
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="number"
                  value={phone}
                  required
                  autoComplete="phone"
                  onChange={(e)=>{setphone(e.target.value);validatePhone(e.target.value)}}
                  className="block w-full rounded-md bg-white/5 px-3 py-2 text-base text-white outline-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500"
                />
                {error.phone && (
                  <span className="text-red-500 text-xs mt-1 block">{error.phone}</span>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm md:text-base font-medium text-gray-100">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  required
                  autoComplete="none"
                  onChange={(e)=>setpassword(e.target.value)}
                  className="block w-full rounded-md bg-white/5 px-3 py-2 text-base text-white outline-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="cursor-pointer flex w-full justify-center rounded-md bg-indigo-500 px-3 py-2 text-base font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Add Staff
              </button>
            </div>
          </form>
        </div>
      </div>
    )
}

export default Addstaffs;