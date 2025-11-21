import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/Context';

const Login = () => {

    let navi=useNavigate();

    let[email,setemail]=useState("");
    let[password,setpassword]=useState("");

    let { setUsername, URL } =useContext(UserContext);

    let handleSumbit=(e)=>{
      e.preventDefault();

      if(!email || !password){
        alert("Please Fill All Data!!");
        return;
      }

      let res= axios.post(`${URL}/login`,{email,password})
        .then((data)=>{
            alert(data.data.message);
            if(data.data.message==="Login Sucessfully!"){
                navi("/home")
                setUsername(data.data.user.name);
    }})
        .catch((err)=>{
            console.log(err);
        })       
    }

  return (
      <div className="flex h-screen w-full flex-col justify-center px-6 py-12 lg:px-8 bg-black">
        <div className='py-7 px-15 absolute text-5xl top-5' >
            <i className="fa-solid fa-arrow-left-long text-white cursor-pointer" onClick={()=>{navi("/home")}}></i>
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">LOGIN</h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
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
                  onChange={(e)=>setemail(e.target.value)}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">
                  Password
                </label>
				<div className="text-sm">
                  <button className="font-semibold text-indigo-400 hover:text-indigo-300 cursor-pointer" onClick={()=>{navi("/forgotpassword")}}>
                    Forgot password?
                  </button>
                </div>
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
          <div>
            <p className="mt-10 text-center text-sm text-gray-100">You don't have an account? <span> </span>
              <button onClick={()=>navi("/signup")} className="cursor-pointer font-semibold leading-6 text-indigo-500 hover:text-indigo-400">
                SignUp 
              </button>
            </p>
          </div>
        </div>
      </div>
  )
}

export default Login;