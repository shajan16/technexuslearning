import React from 'react'
import Technexusflogo from '../assets/file_00000000f84461f5af83f1f6a809ad13.png'

const Footer = () => {
  return (
    <div className="bg-black w-full mt-20 text-white px-4 md:px-10 py-10 md:py-16">
      <div className="flex flex-col md:flex-row gap-10 md:gap-[8%]">
        <div className="w-full md:w-[45%] ml-0 md:ml-2 flex flex-col items-center ">
          <div className="flex space-y-4 sm:space-y-0 sm:space-x-4 items-center">
            <img
              src={Technexusflogo}
              alt=""
              className="w-24 h-28 md:w-30 md:h-40 bg-white max-w-none"
            />
            <h1 className="text-3xl md:text-5xl font-bold leading-tight text-center sm:text-left">
              T E C H N E X U S <br />
              L E A R N I N G
            </h1>
          </div>
          <p className="mt-6 md:mt-10 text-base md:text-lg tracking-wider font-medium text-center md:text-left">
            We Are An <span className="text-blue-400 font-bold">Online Learning Platform</span> Offering Affordable Tech Courses With <span className="text-blue-400 font-bold">Free Demo Classes</span>, Flexiable Batches, And Even <span className="text-blue-400 font-bold">Part-Time Trainer Roles</span> For Students Who Complete Our Programs.
          </p>
        </div>

        <div className='flex flex-row justify-around lg:gap-20'>
        <div className="m-0 md:m-5">
          <h1 className="text-lg md:text-xl font-medium">Quick Links</h1>
          <div className="mt-6 md:mt-10 space-y-3 md:space-y-5">
            <p>About Us</p>
            <p>Courses</p>
            <p>Contact</p>
            <p>Part-Time Job</p>
          </div>
        </div>

        <div className="m-0 md:m-5">
          <h1 className="text-lg md:text-xl font-medium">Contact</h1>
          <div className="mt-6 md:mt-10 space-y-3 md:space-y-5">
            <p>Technexuslearning@gmail.com</p>
            <p>+91 9385839745, 9787442323</p>
            <p>@Teschnexus_learning</p>
          </div>
        </div>
      </div>
    </div>
      <hr className="text-gray-600 mt-8" />
      <div className="flex justify-center p-3 md:p-5 text-base md:text-lg tracking-wider text-gray-300 mt-5">
        <p>2025 TechNexus Learning. All Rights Reserved.</p>
      </div>
    </div>
  )
}

export default Footer