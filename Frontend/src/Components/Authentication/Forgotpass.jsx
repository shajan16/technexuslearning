import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/Context';

const Forgotpass = () => {

  let {URL}=useContext(UserContext);

    let navi=useNavigate();
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


    let handleSumbit= async(e)=>{
      e.preventDefault();

      if(!email){
        alert("Please Fill All Data!!");
        return;
      }
      if (error.email !== "") {
         alert(error.email); 
         return;
     }

     try {
      let res = await axios.post(`${URL}/sendotp`, { email });
    
      localStorage.setItem("resetEmail", email);
      navi("/resetpassword");
      alert(res.data.message);

    } catch (error) {
      alert(error.response?.data?.message ||"Error sending OTP");
      
    }

    }

  return (
     <div className="flex h-screen w-full flex-col justify-center px-6 py-12 lg:px-8 bg-black">
        <div className='py-7 px-15 absolute text-5xl top-5' >
            <i className="fa-solid fa-arrow-left-long text-white cursor-pointer" onClick={()=>{navi("/login")}}></i>
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Forgot Password</h2>
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
                  onChange={(e)=>{setemail(e.target.value), validateEmail(e.target.value)}}
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
                Send OTP
              </button>
            </div>
          </form>
        </div>
      </div>
  )
}

export default Forgotpass;