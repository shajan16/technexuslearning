import axios from 'axios';
import React, {useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/Context';

const Signup = () => {

  let {URL}=useContext(UserContext);

    let navi=useNavigate();

    let[name,setname]=useState("");
    let[phone,setphone]=useState("");
    let[email,setemail]=useState("");
    let[password,setpassword]=useState("");
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

let handleSignup = async (e) => {
  e.preventDefault();

  if (!name || !phone || !email || !password) {
    alert("Please Fill All Data!!");
    return;
  }

  if (error.email !== "" || error.phone !== "") {
    alert(error.email || error.phone);
    return;
  }

  try {
    let res = await axios.post(`${URL}/signup`, { name, phone, email, password });
    if (res.data.message === "User already exists!") {
      alert("User already exists! Please use a different email.");
      return;
    }
    alert("Account Created!!");
    setname("");
    setphone("");
    setemail("");
    setpassword("");
    navi("/login");
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message === "User already exists!") {
      alert("User already exists! Please use a different email.");
    } else {
      alert("Signup Failed!!");
    }
  }
};

  return (
      <div className="flex h-screen w-full flex-col justify-center px-6 py-12 lg:px-8 bg-black">
        <div className='py-7 px-15 absolute text-5xl top-5' >
            <i className="fa-solid fa-arrow-left-long text-white cursor-pointer" onClick={()=>{navi("/home")}}></i>
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Create Your Account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" onSubmit={handleSignup} method="POST" className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm/6 font-medium text-gray-100">
                User Name
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
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm/6 font-medium text-gray-100">
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
                  onChange={(e)=>{setphone(e.target.value),validatePhone(e.target.value)}}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">
                Email Address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  required
                  autoComplete="email"
                  onChange={(e)=>{setemail(e.target.value),validateEmail(e.target.value)}}
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
                onClick={handleSignup}
                className="cursor-pointer flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Register
              </button>
            </div>
          </form>
          <div>
            <p className="mt-10 text-center text-sm text-gray-100">You have an account? <span> </span>
              <button onClick={()=>navi("/login")} className="cursor-pointer font-semibold leading-6 text-indigo-500 hover:text-indigo-400">
                LogIn 
              </button>
            </p>
          </div>
        </div>
      </div>
  )
}

export default Signup