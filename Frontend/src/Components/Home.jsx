import { useContext, useEffect, useRef } from 'react'
import Footer from './Footer';
import Navbar from './Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import { Mentors } from './Mentors';
import Partners from './Partners';
import Homestudents from './Students/Homestudents';
import Homeprocourses from './Courses/Homeprocourses';
import "sweetalert2/src/sweetalert2.scss";
import Demovideo from './Demovideo';
import Homemain from './Homemain';
import Staffenter from './Staffenter';
import { UserContext } from '../Context/Context';
import Bestmentor from '../assets/bestmentor.png'
import Rectangle from '../assets/Rectangle 132.png'
import Intern1 from '../assets/Frame 378.png'
import Intern2 from '../assets/Frame 379.png'
import Intern3 from '../assets/Frame 380.png'


const Home = () => {

  let {adminname} = useContext(UserContext);

  let navi= useNavigate();

  let location=useLocation();
  let enquiry =useRef();
  let service =useRef();


  useEffect(() => {
    if (location.state?.scrollservice && service.current) {
      service.current.scrollIntoView();
    }

  }, [location]);


  // Admin-Access
  let handleadmin=()=>{
    if (adminname) {
      navi("/admin")
    }else{
      navi("/adminlogin")
    }
  }


  return (
    <>
      <Navbar/>
    <div className='w-full absolute top-0 bg-blue-50'>

	 {/* Staffs */}
	 <Staffenter/>

      {/* First-View */}
      <Homemain/>

      {/* Service */}
      <div className='w-full flex flex-col lg:flex-row '>
          <div className='lg:w-[70%] m-4 md:m-10 lg:m-14 flex flex-col items-center lg:items-start' ref={service}>
            <p className='bg-orange-200 w-fit py-2 md:py-4 px-2 rounded-4xl tracking-widest mt-6 md:mt-10 text-base lg:text-lg text-center'>* GET <span onClick={handleadmin}>STARTED</span> WITH TECHNEXUS LEARNING *</p>
            <h1 className='text-3xl md:text-6xl lg:text-8xl font-bold mt-6 md:mt-10 mb-4 md:mb-8 text-center lg:text-start '>Find Suitable Courses From The Best Mentors</h1>
            <p className='text-base md:text-lg tracking-widest'>Unlock your potential with Industry-Learning mentors.</p>
            <p className='text-base md:text-lg tracking-widest'>Gain real-world skills through guided learning.</p>
            <button className=' mt-6 md:mt-10 ml-0 md:ml-15 border-2 border-gray-800 hover:border-gray-950 text-black py-2 px-6 md:px-8 text-base md:text-lg rounded-full tracking-wider font-normal cursor-pointer hover:tracking-widest transition-all duration-300 ease-in-out hover:bg-black hover:text-white' onClick={()=>{navi("/service")}}>Services</button>
          </div>
          <div className='w-full lg:w-auto flex justify-center items-center mr-0 md:mr-10 lg:mr-23 mt-10 lg:mt-40'>
            <img src={Bestmentor} alt="" className='max-w-xs md:max-w-md lg:max-w-lg w-full h-auto'/>
          </div>
        </div>

      {/* Hiring-Partners */}
       <Partners/>

      {/* Professional-Courses */}
      <Homeprocourses/>

        {/* Demo-Video */}
        <Demovideo/>

        {/* Professional-Mentors */}
        <Mentors/>

      
        {/* Enquiry */}
        <div className='mt-20 flex flex-col justify-center items-center' ref={enquiry}>
          <h1 className='text-4xl md:text-6xl font-bold text-center'>Enquiry</h1>
          <div className='border-y-1 border-black w-full mt-8 flex flex-col justify-center items-center py-10 space-y-3 bg-gradient-to-br from-blue-50 via-blue-300 to-purple-300' >
            <h1 className='text-2xl md:text-5xl font-medium tracking-wide text-center'>Have Any Doubts? Lets Us Help You!</h1>
            <p className='text-lg md:text-3xl font-normal tracking-wide text-center'>"Fill in Your details and our team will assist you shortly."</p>
            <button className='px-6 md:px-8 py-2 md:py-3 border-1 border-black rounded-full mt-6 cursor-pointer tracking-wider hover:tracking-widest transition-all duration-300 ease-in-out hover:bg-black hover:text-white' onClick={() => { navi("/enquiry") }}>Enquire Now <i className="fa-solid fa-arrow-right"></i></button>
          </div>
        </div>

        {/* Students-Details */}
        <Homestudents/>

        {/* Free-Courses */}
           {/* <div className='mt-40 mx-10 flex flex-col justify-center items-center'>
              <h1 className='text-6xl font-bold'>Free Courses</h1>

              <div className='flex w-full mt-20 flex-wrap justify-center gap-15'>
                
                <div className='w-[40%] bg-gray-100 shadow-lg shadow-gray-400 rounded-2xl px-7 pt-10 pb-5'>
                 <div className='flex relative'>
                  <div className=''>
                    <h1 className='text-6xl text-gray-500'>01</h1>
                    <h2 className='text-3xl font-medium mt-3'>Python</h2>
                    <p className='text-gray-500 text-xs font-medium'>1 Sections | 3 Lessons | 2 Hours 55 Min</p>
                    <div className='border-1 border-black rounded-full px-2 mt-4 flex justify-center text-xs w-[65%]'>Kick Start Your Career</div>
                    <h1 className=''>Learn <span className='font-medium text-2xl'>Python</span> For</h1>
                    <h1>Free &  Download Certificate</h1>
                  </div>

                  <div className='absolute right-0 h-full flex flex-col justify-between items-end'>
                    <img src="/src/assets/images/pythonicon.png" alt="" className='w-30 h-30 rounded-full'/>
                    <button className='border-1 border-black rounded-4xl px-4 py-1 cursor-pointer hover:bg-black hover:text-white transition-all duration-300 ease-in-out'>View Course <i className="fa-solid fa-arrow-right"></i></button>
                  </div>
                 </div> 
                </div>

                <div className='w-[40%] bg-gray-100 shadow-lg shadow-gray-400 rounded-2xl px-7 pt-10 pb-5'>
                 <div className='flex relative'>
                  <div className=''>
                    <h1 className='text-6xl text-gray-500'>02</h1>
                    <h2 className='text-3xl font-medium mt-3'>PHP</h2>
                    <p className='text-gray-500 text-xs font-medium'>1 Sections | 3 Lessons | 2 Hours 55 Min</p>
                    <div className='border-1 border-black rounded-full px-2 mt-4 flex justify-center text-xs w-[65%]'>Kick Start Your Career</div>
                    <h1 className=''>Learn <span className='font-medium text-2xl'>PHP</span> For</h1>
                    <h1>Free &  Download Certificate</h1>
                  </div>

                  <div className='absolute right-0 h-full flex flex-col justify-between items-end'>
                    <img src="/src/assets/images/Ellipse 18-1.png" alt="" className='w-30 h-30 rounded-full'/>
                    <button className='border-1 border-black rounded-4xl px-4 py-1 cursor-pointer hover:bg-black hover:text-white transition-all duration-300 ease-in-out'>View Course <i className="fa-solid fa-arrow-right"></i></button>
                  </div>
                 </div> 
                </div>

                <div className='w-[40%] bg-gray-100 shadow-lg shadow-gray-400 rounded-2xl px-7 pt-10 pb-5'>
                 <div className='flex relative'>
                  <div className=''>
                    <h1 className='text-6xl text-gray-500'>03</h1>
                    <h2 className='text-3xl font-medium mt-3'>UI/UX</h2>
                    <p className='text-gray-500 text-xs font-medium'>1 Sections | 3 Lessons | 2 Hours 55 Min</p>
                    <div className='border-1 border-black rounded-full px-2 mt-4 flex justify-center text-xs w-[65%]'>Kick Start Your Career</div>
                    <h1 className=''>Learn <span className='font-medium text-2xl'>UI/UX</span> For</h1>
                    <h1>Free &  Download Certificate</h1>
                  </div>

                  <div className='absolute right-0 h-full flex flex-col justify-between items-end'>
                    <img src="/src/assets/images/Ellipse 18-2.png" alt="" className='w-30 h-30 rounded-full'/>
                    <button className='border-1 border-black rounded-4xl px-4 py-1 cursor-pointer hover:bg-black hover:text-white transition-all duration-300 ease-in-out'>View Course <i className="fa-solid fa-arrow-right"></i></button>
                  </div>
                 </div> 
                </div>

                <div className='w-[40%] bg-gray-100 shadow-lg shadow-gray-400 rounded-2xl px-7 pt-10 pb-5'>
                 <div className='flex relative'>
                  <div className=''>
                    <h1 className='text-6xl text-gray-500'>04</h1>
                    <h2 className='text-3xl font-medium mt-3'>Cyber Security</h2>
                    <p className='text-gray-500 text-xs font-medium'>1 Sections | 3 Lessons | 2 Hours 55 Min</p>
                    <div className='border-1 border-black rounded-full px-2 mt-4 flex justify-center text-xs w-[65%]'>Kick Start Your Career</div>
                    <h1 className=''>Learn <span className='font-medium text-2xl'>Cyber Security</span> For</h1>
                    <h1>Free &  Download Certificate</h1>
                  </div>

                  <div className='absolute right-0 h-full flex flex-col justify-between items-end'>
                    <img src="/src/assets/images/Ellipse 18.png" alt="" className='w-30 h-30 rounded-full'/>
                    <button className='border-1 border-black rounded-4xl px-4 py-1 cursor-pointer hover:bg-black hover:text-white transition-all duration-300 ease-in-out'>View Course <i className="fa-solid fa-arrow-right"></i></button>
                  </div>
                 </div> 
                </div>

                <div className='w-[40%] bg-gray-100 shadow-lg shadow-gray-400 rounded-2xl px-7 pt-10 pb-5'>
                 <div className='flex relative'>
                  <div className=''>
                    <h1 className='text-6xl text-gray-500'>05</h1>
                    <h2 className='text-3xl font-medium mt-3'>React</h2>
                    <p className='text-gray-500 text-xs font-medium'>1 Sections | 3 Lessons | 2 Hours 55 Min</p>
                    <div className='border-1 border-black rounded-full px-2 mt-4 flex justify-center text-xs w-[65%]'>Kick Start Your Career</div>
                    <h1 className=''>Learn <span className='font-medium text-2xl'>React</span> For</h1>
                    <h1>Free &  Download Certificate</h1>
                  </div>

                  <div className='absolute right-0 h-full flex flex-col justify-between items-end'>
                    <img src="/src/assets/images/Ellipse 18 (1).png" alt="" className='w-30 h-30 rounded-full'/>
                    <button className='border-1 border-black rounded-4xl px-4 py-1 cursor-pointer hover:bg-black hover:text-white transition-all duration-300 ease-in-out'>View Course <i className="fa-solid fa-arrow-right"></i></button>
                  </div>
                 </div> 
                </div>
              </div>
          </div> */}

          {/* Certification */}
          {/* <div className='mt-30 mx-10'>
            <div className='flex flex-col justify-center items-center'>
              <h1 className='text-6xl font-bold'>Certification</h1>
            </div>
             <h1 className='text-4xl font-bold mt-20'>Types Of Certification</h1>
             
             <div className='flex w-full mt-15'>
              <div className='w-1/2 p-10 flex flex-col justify-center'>
              <h1 className='text-2xl font-medium'>What is Lorem ipsum?</h1>
              <h1 className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas quasi voluptatem dolorum quae cupiditate, architecto porro veniam? Fugit minus voluptates quos ab nulla eos, quasi id atque. Incidunt dicta modi laboriosam facilis recusandae eum ea error rem sequi praesentium tenetur perferendis, sint quos illum magnam vero at ullam asperiores ipsam.</h1>
              </div>
              <div className='w-1/2 flex flex-col items-center relative justify-center'>
                <img src="" alt="" className='w-full h-100 bg-gray-600'/>
                <button className='absolute bg-transparent backdrop-blur-xs border-1 border-white shadow-2xl text-white py-10 px-13 text-2xl font-bold tracking-wider rounded-xl cursor-pointer'>Certification</button>
                <h1 className='mt-3 text-3xl font-medium text-gray-700'>Course Completion Certificate</h1>
              </div>
             </div>

             <div className='flex flex-row-reverse w-full mt-15'>
              <div className='w-1/2 p-10 flex flex-col justify-center'>
              <h1 className='text-2xl font-medium'>What is Lorem ipsum?</h1>
              <h1 className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas quasi voluptatem dolorum quae cupiditate, architecto porro veniam? Fugit minus voluptates quos ab nulla eos, quasi id atque. Incidunt dicta modi laboriosam facilis recusandae eum ea error rem sequi praesentium tenetur perferendis, sint quos illum magnam vero at ullam asperiores ipsam.</h1>
              </div>
              <div className='w-1/2 flex flex-col items-center relative justify-center'>
                <img src="" alt="" className='w-full h-100 bg-gray-600'/>
                <button className='absolute bg-transparent backdrop-blur-xs border-1 border-white shadow-2xl text-white py-10 px-13 text-2xl font-bold tracking-wider rounded-xl cursor-pointer'>Certification</button>
                <h1 className='mt-3 text-3xl font-medium text-gray-700'>Free Webinar Certificate</h1>
              </div>
             </div>

             <div className='flex w-full mt-15'>
              <div className='w-1/2 p-10 flex flex-col justify-center'>
              <h1 className='text-2xl font-medium'>What is Lorem ipsum?</h1>
              <h1 className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas quasi voluptatem dolorum quae cupiditate, architecto porro veniam? Fugit minus voluptates quos ab nulla eos, quasi id atque. Incidunt dicta modi laboriosam facilis recusandae eum ea error rem sequi praesentium tenetur perferendis, sint quos illum magnam vero at ullam asperiores ipsam.</h1>
              </div>
              <div className='w-1/2 flex flex-col items-center relative justify-center'>
                <img src="" alt="" className='w-full h-100 bg-gray-600'/>
                <button className='absolute bg-transparent backdrop-blur-xs border-1 border-white shadow-2xl text-white py-10 px-13 text-2xl font-bold tracking-wider rounded-xl cursor-pointer'>Certification</button>
                <h1 className='mt-3 text-3xl font-medium text-gray-700'>Paid Workshop Certificate</h1>
              </div>
             </div>
          </div> */}

          {/* Internship-Program */}
          <div className='mt-16 md:mt-25 px-2 md:px-10 flex flex-col justify-center items-center mb-20 md:mb-50'>
          <h1 className='text-4xl md:text-6xl font-bold text-center'>Internship Programs</h1>
          <div className='flex flex-col md:flex-row w-full gap-6 md:gap-10 mt-10 md:mt-20 items-center'>
            <div className='w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left'>
              <h1 className='text-2xl md:text-4xl tracking-wide font-medium'>Steady Progress, Infinite Opportunities</h1>
              <button className='bg-gray-900 px-4 md:px-5 py-2 md:py-3 text-white rounded-xl mt-3 cursor-pointer hover:bg-black' onClick={()=>navi("/enquiry")}>Apply Now <i className="fa-solid fa-arrow-right"></i></button>
              <p className='text-base md:text-xl mt-7 w-full md:w-[80%]'>Our internships are designed for students and freshers to gain industry exposure, work on real projects, and receive mentorship from experts.</p>
              <div className='flex flex-wrap mt-5 justify-center gap-4 md:gap-6'>
                <div className='bg-white p-4 md:p-7 w-[90%] md:w-[46%] rounded-2xl shadow-sm mb-4'>
                  <img src={Intern1} alt="" className='w-10 md:w-12 h-10 md:h-12 rounded-full' />
                  {/* <h1 className='text-base md:text-lg font-medium mt-2'>Internship Types</h1> */}
                  <p className='mt-3'>Free And Paid Internship Available.</p>
                </div>
                <div className='bg-white p-4 md:p-7 w-[90%] md:w-[46%] rounded-2xl shadow-sm mb-4'>
                  <img src={Intern2} alt="" className='w-10 md:w-12 h-10 md:h-12 rounded-full' />
                  {/* <h1 className='text-base md:text-lg font-medium mt-2'>Internship Types</h1> */}
                  <p className='mt-3'>Duration Options: 5 Months Paid, 3 Months Free, 1 Week, 2 Weeks, Or 1 Month.</p>
                </div>
                <div className='bg-white p-4 md:p-7 w-[90%] md:w-[46%] rounded-2xl shadow-sm mb-4'>
                  <img src={Intern3} alt="" className='w-10 md:w-12 h-10 md:h-12 rounded-full' />
                  {/* <h1 className='text-base md:text-lg font-medium mt-2'>Internship Types</h1> */}
                  <p className='mt-3'>Summer Internships For Collage Students</p>
                </div>
              </div>
            </div>
            <div className='w-full md:w-1/2 mt-8 md:mt-0'>
              <img src={Rectangle} alt="" className='w-full md:block hidden rounded-4xl object-cover' />
            </div>
          </div>
        </div>
            

      <Footer/>
    </div>
    </>
  )
}

export default Home;