import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/Context';

const Restpass = () => {

  let {URL}=useContext(UserContext);

    let navi=useNavigate();
    let[otp,setotp]=useState("");
    let[newpassword,setnewpassword]=useState("");

    let email = localStorage.getItem("resetEmail");

    let handleReset= async(e)=>{
      e.preventDefault();

      if(!otp || !newpassword){
        alert("Please Fill All Data!!");
        return;
      }

      try {
      const res = await axios.post(`${URL}/resetpassword`, {
        email,
        otp,
        newpassword,
      });
      alert(res.data.message);
      setotp("");
      setnewpassword("");
      navi("/login");

      if (res.data.message === "Password reset successful!") {
        localStorage.removeItem("resetEmail");
      }

    } catch (error) {
      alert(error.response?.data?.message || "Error resetting password");
      console.log(error);
    }

    }

  return (
    <div className="flex h-screen w-full flex-col justify-center px-6 py-12 lg:px-8 bg-black">
        <div className='py-7 px-15 absolute text-5xl top-5' >
            <i className="fa-solid fa-arrow-left-long text-white cursor-pointer" onClick={()=>{navi("/forgotpassword")}}></i>
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Reset Your Password</h2>
          <p className="mt-2 text-center text-xs font-medium tracking-tight text-white">Your OTP send to <span className='text-indigo-500'>{email}</span></p>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">
                Enter OTP
              </label>
              <div className="mt-2">
                <input
                  id="otp"
                  name="otp"
                  type="number"
                  value={otp}
                  required
                  autoComplete="none"
                  onChange={(e)=>setotp(e.target.value)}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">
                  New Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="newpassword"
                  name="newpassword"
                  type="password"
                  value={newpassword}
                  required
                  autoComplete="none"
                  onChange={(e)=>setnewpassword(e.target.value)}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={handleReset}
                className="cursor-pointer flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
  )
}

export default Restpass;