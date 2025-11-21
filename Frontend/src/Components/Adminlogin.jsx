import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { UserContext } from "../Context/Context";

// Responsive Admin Login Design (UI only, no logic)
// Tailwind CSS required

export default function Adminlogin() {

    let {setadminname} = useContext(UserContext);

    let navi= useNavigate();

    let[password,setpassword]=useState("");

    let handlesubmit=()=>{
        if (password==='Kershiya1223') {
            setadminname("Shajan")
            navi("/admin")
        }else{
            Swal.fire({
            title: "Incorrect Password!!",
            icon: "error"
          });
          setpassword("")
        }
    }


  return (
    <>
    <div className='py-7 px-15 absolute text-5xl top-5' >
            <i className="fa-solid fa-arrow-left-long text-white cursor-pointer" onClick={()=>{navi(-1)}}></i>
        </div>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Login</h1>
          <p className="text-slate-400 text-sm mt-1">Access the secure dashboard</p>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-slate-700/60">

          <div className="relative mb-6">
            <input
              type="text"
              value={password}
              onChange={(e)=>setpassword(e.target.value)}
              placeholder="Enter Password:"
              className="w-full py-3 pl-12 pr-4 text-white bg-slate-700/60 rounded-lg placeholder-slate-400 border border-transparent focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4" />
                <rect x={3} y={11} width={18} height={10} rx={2} ry={2} strokeWidth={1.5} />
              </svg>
            </div>
          </div>

          <button onClick={handlesubmit} className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 transition-all shadow-md">
            ENTER
          </button>
        </div>
      </div>
    </div>
    </>
  );
}