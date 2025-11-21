import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../Footer';
import mainimg from '/src/assets/IT_ser-removebg-preview.png'
import aboutimg from '/src/assets/about.png'
import serviceimg from '/src/assets/service.png'
import careerimg from '/src/assets/career.png'
import serimg from '/src/assets/service-img.png'
import applyimg from '/src/assets/serwhat-img.png'
import round from '/src/assets/White_and_Yellow_Cute_Illustration_Fried_Chicken_Circle_Logo-removebg-preview.png'
import aimg from '/src/assets/IT_ab-removebg-preview.png'
import space from '/src/assets/bgg.png'
import lady from '/src/assets/IT_pag-removebg-preview.png'

const Service = () => {

  useEffect(()=>{
        window.scrollTo(0,0)
    },[])

  let navi=useNavigate();
  let location=useLocation();
  let aboutref= useRef(null);   
  let serviceref= useRef(null);   
  let careerref = useRef(null);

  const handlescroll = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  const divRef = useRef(null);
  const [inView, setInView] = useState(false);  

  useEffect(()=>{
    if(location.hash==="#about"){
      aboutref.current.scrollIntoView({behavior:"smooth"})
    }
  },[location])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.7 }
    );

    if (divRef.current) {
      observer.observe(divRef.current);
    }

    return () => {
      if (divRef.current) {
        observer.unobserve(divRef.current);
      }
    };
  }, []);

  // What-we-do
  const [activeIndex, setActiveIndex] = useState(null);
  const refs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const middle = window.innerHeight / 2;
      let closestIndex = null;
      let closestDistance = Infinity;

      refs.current.forEach((el, index) => {
        if (el) {
          const rect = el.getBoundingClientRect();
          const elCenter = rect.top + rect.height / 2;
          const distance = Math.abs(middle - elCenter);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        }
      });

      setActiveIndex(closestIndex);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className='w-full h-full bg-black text-white'>
      <div className='py-4 px-4 sm:py-7 sm:px-7 absolute text-3xl sm:text-5xl z-20'>
        <i className="fa-solid fa-arrow-left-long cursor-pointer" onClick={()=>navi(-1)}></i>
      </div>

      <div className='flex flex-col lg:flex-row pr-0 lg:pr-10'>
        <div className='lg:w-1/2'>
          <img src={mainimg} alt="" className='w-[50%] sm:w-[85%] max-w-xs sm:max-w-md lg:max-w-full'/>
        </div>
        <div className='w-full lg:w-1/2 p-4 sm:p-10'>
          <h1 className='text-center text-base sm:text-xl tracking-widest mt-6 sm:mt-10 text-gray-400'>
            "Why search for outdated IT companies? <span className='text-white font-bold'>Start</span> with us - where websites & apps are built for <span className='text-white font-bold'>today's trend</span> and tomorrow's growth."
          </h1>
          <div className='mt-10 flex flex-col items-end space-y-4 sm:space-y-6 absolute right-10 sm:right-30 top-[2%] sm:top-55'>

            <div className='flex items-center font-bold text-base sm:text-lg cursor-pointer' onClick={()=>handlescroll(aboutref)}>
              <img src={aboutimg} alt="" className='w-16 h-16 sm:w-22 sm:h-20 mr-1' />
              <h1 className='text-center ml-2'>ABOUT US</h1>
            </div>

            <div className='flex items-center font-bold text-base sm:text-lg cursor-pointer space-x-2 sm:space-x-3 mr-4' onClick={()=>handlescroll(serviceref)}>
              <img src={serviceimg} alt="" className='w-16 h-16 sm:w-22 sm:h-20' />
              <h1>SERVICE</h1>
            </div>

            <div className='flex items-center font-bold text-base sm:text-lg cursor-pointer space-x-2 sm:space-x-4 mr-4' onClick={()=>handlescroll(careerref)}>
              <img src={careerimg} alt="" className='w-16 h-16 sm:w-21 sm:h-22' />
              <h1>CAREER</h1>
            </div>

          </div>
        </div>
      </div>

      {/* service */}
      <div className='pt-10 sm:pt-30 px-2 sm:px-15 overflow-hidden' ref={serviceref}>
        <div className='transition-transform duration-1500 ease-in-out flex flex-col lg:flex-row justify-between items-center' ref={divRef}>
          <div className="flex flex-col items-center w-full lg:w-1/2">
            <div className="flex flex-col items-center">
              <p className='text-center font-semibold text-xl sm:text-2xl leading-tight transition-transform duration-1000 ease-in-out'>
                design <br />
                is <br />
                thinking <br />
                made <br />
                visual.
              </p>
              <hr className='w-16 sm:w-20 border-1 border-white'/>
            </div>

            <div className="flex flex-row items-center sm:items-start sm:space-x-12">
              <p className={`text-lg sm:text-xl max-w-[200px] leading-snug text-white mt-40 sm:mt-60 text-center transition-transform duration-1000 ease-in-out ${inView ? "translate-x-0 opacity-100"  : "-translate-x-150 opacity-10"}`}>
                Designing the trends <br />
                developing the future.
              </p>

              <div className="w-[2px] bg-white h-60 sm:h-80"></div>

              <p className={`text-lg sm:text-xl max-w-[200px] leading-snug text-white -mt-20 sm:mt-10 text-center transition-transform duration-1000 ease-in-out ${inView ? "translate-x-0 opacity-100"  : "-translate-x-150 opacity-10"}`}>
                We build your dream <br />
                digital landmark
              </p>
            </div>

            <p className='font-bold text-2xl sm:text-3xl tracking-wider mt-6 sm:mt-10'>SERVICE</p> 
          </div>

          <div className='w-full lg:w-[50%] transition-opacity duration-1500 ease-in-out simg flex justify-center mt-8 lg:mt-0'>
            <img src={serimg} alt="" className='w-3/4 sm:w-full max-w-xs sm:max-w-md lg:max-w-full'/>
          </div>
        </div>
      </div>

      <div className='flex flex-col lg:flex-row mt-10 sm:mt-30'>
        <div className='w-full lg:w-1/2 flex flex-col items-center'>
          <img src={applyimg} alt="" className='hidden sm:block w-full'/>
          <h1 className='text-lg sm:text-2xl tracking-wider w-[90%] sm:w-[80%] text-center mt-6 sm:mt-30'>“READY TO TRANSFORM? BECOME OUR CLIENT TODAY.”</h1>
          <button onClick={()=>navi("/servicemsg")} className="relative mt-6 sm:mt-10 inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 cursor-pointer">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-100 rounded-md group-hover:bg-transparent">
              Enquire Now
            </span>
          </button>
        </div>

        <div className="relative py-10 sm:py-20 flex flex-col items-end w-full lg:w-1/2">
          <div className='relative w-full flex flex-col items-center'>
            <img
              src={round}
              alt=""
              className="w-40 h-40 sm:w-80 sm:h-80 mx-auto imgrotate"
            />
            <h2 className="w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center text-lg sm:text-2xl md:text-3xl font-light text-center bg-clip-text text-transparent bg-gradient-to-br from-purple-600 to-blue-500 z-10">
              We build your dream digital landmark
            </h2>
          </div>

          <div className="relative w-full max-w-4xl mt-10">
            <div className="absolute -top-20 sm:-top-40 -bottom-5 sm:-bottom-10 left-1/2  transform -translate-x-1/2 w-[2px] bg-white"></div>
            <div className="grid grid-cols-2 text-center text-base sm:text-lg">
              <div className="flex justify-end pr-2 sm:pr-10">
                <span
                  ref={(el) => (refs.current[0] = el)}
                  className={`transition-colors duration-300 ${
                    activeIndex === 0 ? "bg-clip-text text-transparent bg-gradient-to-br from-purple-600 to-blue-500" : "text-white"
                  }`}
                >
                  WEB <br /> DEVELOPMENT
                </span>
              </div>

              <div className="flex justify-start pl-2 sm:pl-10 mt-25">
                <span
                  ref={(el) => (refs.current[1] = el)}
                  className={`transition-colors duration-300 ${
                    activeIndex === 1 ? "bg-clip-text text-transparent bg-gradient-to-br from-purple-600 to-blue-500" : "text-white"
                  }`}
                >
                  MOBILE APP <br /> DEVELOPMENT
                </span>
              </div>

              <div className="flex justify-end pr-2 sm:pr-10 mt-10">
                <span
                  ref={(el) => (refs.current[2] = el)}
                  className={`transition-colors duration-300 ${
                    activeIndex === 2 ? "bg-clip-text text-transparent bg-gradient-to-br from-purple-600 to-blue-500" : "text-white"
                  }`}
                >
                  SOFTWARE <br /> DEVELOPMENT
                </span>
              </div>

              <div className="flex justify-start pl-2 sm:pl-10 mt-35">
                <span
                  ref={(el) => (refs.current[3] = el)}
                  className={`transition-colors duration-300 ${
                    activeIndex === 3 ? "bg-clip-text text-transparent bg-gradient-to-br from-purple-600 to-blue-500" : "text-white"
                  }`}
                >
                  CYBERSECURITY
                </span>
              </div>

              <div className="flex justify-end pr-2 sm:pr-10 mt-15">
                <span
                  ref={(el) => (refs.current[4] = el)}
                  className={`transition-colors duration-300 ${
                    activeIndex === 4 ? "bg-clip-text text-transparent bg-gradient-to-br from-purple-600 to-blue-500" : "text-white"
                  }`}
                >
                  CLOUD <br /> SOLUTIONS
                </span>
              </div>

              <div className="flex justify-start pl-2 sm:pl-10 mt-33">
                <span
                  ref={(el) => (refs.current[5] = el)}
                  className={`transition-colors duration-300 ${
                    activeIndex === 5 ? "bg-clip-text text-transparent bg-gradient-to-br from-purple-600 to-blue-500" : "text-white"
                  }`}
                >
                  DIGITAL <br /> MARKETING
                </span>
              </div>

              <div className="flex justify-end pr-2 sm:pr-10 mt-12">
                <span
                  ref={(el) => (refs.current[6] = el)}
                  className={`transition-colors duration-300 ${
                    activeIndex === 6 ? "bg-clip-text text-transparent bg-gradient-to-br from-purple-600 to-blue-500" : "text-white"
                  }`}
                >
                  MULTIMEDIA <br /> EDITING
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About */}
      <div className='w-full mt-10 px-2 sm:px-10 py-10 sm:py-20 flex flex-col items-center justify-center mb-10 sm:mb-20' ref={aboutref}>
        <div className='w-full sm:w-[90%] flex flex-col items-center text-center'>
          <h1 className='text-3xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-600 to-blue-500'>WE ARE</h1>
          <p className='mt-6 sm:mt-10 text-lg sm:text-2xl font-medium tracking-widest'>
            "WE ARE A NEXT-GEN IT COMPANY SPECIALIZING IN WEBSITES, MOBILE APPS, MULTIMEDIA, AND CYBERSECURITY. OUR MISSION IS TO DELIVER SECURE, CREATIVE, AND FUTURE-READY DIGITAL SOLUTIONS FOR EVERY BRAND."
          </p>
          <div className='w-full relative h-[400px] sm:h-[700px] flex justify-center mt-6 sm:mt-0'>
            <div className='absolute font-normal md:font-bold left-4 sm:left-36 top-6 sm:top-20 text-xs sm:text-base'>MODERN WEBSITE <br />DESIGN</div>
            <div className='absolute font-normal md:font-bold left-0 top-20 sm:top-50 text-xs sm:text-base'>ADVANCED CYBERSECURITY <br />SERVICES</div>
            <div className='absolute font-normal md:font-bold left-6 sm:left-20 top-36 sm:top-90 text-xs sm:text-base'>CLOUD SERVICE <br />SOLUTIONS</div>
            <div className='absolute font-normal md:font-bold left-4 sm:left-36 top-56 sm:top-130 text-xs sm:text-base'>E-COMMERCE <br />DEVELOPMENT</div>
            <div className='absolute font-normal md:font-bold right-4 sm:right-36 top-6 sm:top-20 text-xs sm:text-base'>SMART MOBILE <br />APPS</div>
            <div className='absolute font-normal md:font-bold right-0 top-20 sm:top-50 text-xs sm:text-base'>CREATIVE MULTIMEDIA <br />SOLUTIONS</div>
            <div className='absolute font-normal md:font-bold right-6 sm:right-20 top-36 sm:top-90 text-xs sm:text-base'>COMPLETE IT <br />SOLUTIONS</div>
            <div className='absolute font-normal md:font-bold right-4 sm:right-36 top-56 sm:top-130 text-xs sm:text-base'>FUTURE-READY BRAND <br />GROWTH</div>
            <img src={aimg} alt="" className='absolute w-1/2 sm:w-auto'/>
          </div>
        </div>
      </div>

      <div className='relative w-full h-[400px] sm:h-[700px]'>
        <img src={space} alt="" className='absolute w-[250px] sm:w-lg -top-30 sm:-top-50 opacity-30'/>
        <h1 className='absolute text-center w-[90%] sm:w-[64%] right-0 text-xs sm:text-lg font-normal sm:font-bold text-gray-500'>
          TECHNEXUS LEARNING IS RECOGNIZED AS THE BEST IT SOLUTION COMPANY IN TAMIL NADU AND ONE OF THE TOP IT SOLUTIONS IN INDIA. WE PROVIDE COMPLETE DIGITAL SERVICES INCLUDING MODERN WEBSITE DESIGN, MOBILE APP DEVELOPMENT, CREATIVE MULTIMEDIA SOLUTIONS, ADVANCED
          CYBERSECURITY SERVICES, CLOUD SOLUTIONS, AND E-COMMERCE
          DEVELOPMENT. ALONGSIDE IT SERVICES, WE ALSO DELIVER HIGH-QUALITY
          TRAINING PROGRAMS IN PYTHON, JAVA, FULL STACK DEVELOPMENT, DIGITALMARKETING, ROBOTICS, AND CYBERSECURITY — HELPING STUDENTS AND
          PROFESSIONALS BUILD STRONG CAREERS. WITH EXPERT TRAINERS AVAILABLEIN TAMIL, ENGLISH, MALAYALAM, AND HINDI, TECHNEXUS LEARNING ENSURESACCESSIBILITY FOR LEARNERS ACROSS DIFFERENT REGIONS. TRUSTED BY
          CLIENTS AND STUDENTS ALIKE, WE BLEND CREATIVITY, TECHNOLOGY, AND
          SECURITY TO OFFER FUTURE-READY DIGITAL GROWTH FOR BRANDS AND INDIVIDUALS WORLDWIDE. <br /> <span className='hidden md:block'>TECHNEXUS LEARNING IS RECOGNIZED AS THE BEST IT SOLUTION COMPANY IN TAMIL NADU AND ONE OF THE TOP IT SOLUTIONS IN INDIA. WE PROVIDE COMPLETE DIGITAL SERVICES INCLUDING MODERN WEBSITE DESIGN, MOBILE APP DEVELOPMENT, CREATIVE MULTIMEDIA SOLUTIONS, ADVANCED
          CYBERSECURITY SERVICES, CLOUD SOLUTIONS, AND E-COMMERCE
          DEVELOPMENT. ALONGSIDE IT SERVICES, WE ALSO DELIVER HIGH-QUALITY
          TRAINING PROGRAMS IN PYTHON, JAVA, FULL STACK DEVELOPMENT, DIGITALMARKETING, ROBOTICS, AND CYBERSECURITY — HELPING STUDENTS AND
          PROFESSIONALS BUILD STRONG CAREERS. WITH EXPERT TRAINERS AVAILABLEIN TAMIL, ENGLISH, MALAYALAM, AND HINDI, TECHNEXUS LEARNING ENSURESACCESSIBILITY FOR LEARNERS ACROSS DIFFERENT REGIONS. TRUSTED BY
          CLIENTS AND STUDENTS ALIKE, WE BLEND CREATIVITY, TECHNOLOGY, AND
          SECURITY TO OFFER FUTURE-READY DIGITAL GROWTH FOR BRANDS AND INDIVIDUALS WORLDWIDE.</span>
        </h1>
        <img src={lady} alt="" className='absolute top-2 sm:top-7 right-0 w-1/2 sm:w-lg'/>
      </div>

      <div className='w-full'>
        <Footer/>
      </div>  
    </div>
  )
}

export default Service