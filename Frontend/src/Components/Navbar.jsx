import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Technexuslogo from '../assets/technexus LOGO.png'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  let navi = useNavigate();

  return (
    <nav className='w-[90%] mx-auto mt-10 bg-white/20 backdrop-blur-md border-1 border-white/30 text-black items-center rounded-sm relative z-10'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center'>
          <img src={Technexuslogo} alt="" className='h-13'/>
          <h2 className='font-stretch-50% tracking-[0.3em] text-xl ml-3'>TECHNEXUS LEARNING</h2>
        </div>

        <button
          className="md:hidden p-2 focus:outline-none cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        <div className='hidden md:flex justify-between'>
          <div className='px-8 py-3.5 border-l-1 border-gray-200 font-medium relative group cursor-pointer' onClick={()=>navi("/home")}> HOME
            <span className='absolute left-0 bottom-0 w-full h-0 transition-all duration-300 ease-in-out bg-white/20 backdrop-blur-md group-hover:h-full'></span>
          </div>
          <div className='px-8 py-3.5 border-l-1 border-gray-200 font-medium relative group cursor-pointer' onClick={()=>navi("/service#about")}> ABOUT US
            <span className='absolute left-0 bottom-0 w-full h-0 transition-all duration-300 ease-in-out bg-white/20 backdrop-blur-md group-hover:h-full'></span>
          </div>
          <div className='px-8 py-3.5 border-l-1 border-gray-200 font-medium relative group cursor-pointer' onClick={()=>navi("/procourses#nav")}> COURSES
            <span className='absolute left-0 bottom-0 w-full h-0 transition-all duration-300 ease-in-out bg-white/20 backdrop-blur-md group-hover:h-full'></span>
          </div>
          <div className='px-8 py-3.5 border-l-1 border-gray-200 font-medium relative group cursor-pointer' onClick={()=>navi("/enquiry")}> CONTACT US
            <span className='absolute left-0 bottom-0 w-full h-0 transition-all duration-300 ease-in-out bg-white/20 backdrop-blur-md group-hover:h-full'></span>
          </div>
        </div>
      </div>
      
      {menuOpen && (
        <div className="md:hidden flex flex-col bg-white/20 backdrop-blur-md rounded-b-sm">
          <div className='px-8 py-3.5 border-t border-gray-200 font-medium relative group cursor-pointer' onClick={()=>{setMenuOpen(false); navi("/home")}}> HOME
            <span className='absolute left-0 bottom-0 w-full h-0 transition-all duration-300 ease-in-out bg-white/20 backdrop-blur-md group-hover:h-full'></span>
          </div>
          <div className='px-8 py-3.5 border-t border-gray-200 font-medium relative group cursor-pointer' onClick={()=>{setMenuOpen(false); navi("/service#about")}}> ABOUT US
            <span className='absolute left-0 bottom-0 w-full h-0 transition-all duration-300 ease-in-out bg-white/20 backdrop-blur-md group-hover:h-full'></span>
          </div>
          <div className='px-8 py-3.5 border-t border-gray-200 font-medium relative group cursor-pointer' onClick={()=>{setMenuOpen(false); navi("/procourses#nav")}}> COURSES
            <span className='absolute left-0 bottom-0 w-full h-0 transition-all duration-300 ease-in-out bg-white/20 backdrop-blur-md group-hover:h-full'></span>
          </div>
          <div className='px-8 py-3.5 border-t border-gray-200 font-medium relative group cursor-pointer' onClick={()=>{setMenuOpen(false); navi("/enquiry")}}> CONTACT US
            <span className='absolute left-0 bottom-0 w-full h-0 transition-all duration-300 ease-in-out bg-white/20 backdrop-blur-md group-hover:h-full'></span>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar