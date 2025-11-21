import axios from 'axios';
import  { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/Context';
import Banner from '../assets/1761545016669.jpg'
import MSG from '../assets/Frame 325.png'


const Homemain = () => {

    let { username, URL } = useContext(UserContext);

     let navi= useNavigate();

    let[userchatcount,setuserchatcount]=useState();
    let[workshop,setworkshop]=useState([]);
	
	let wimage = workshop.map((image)=>{return image.image}).toString()

  let chatbox=async()=>{
    try {
      await axios.put(`${URL}/usermarkasread/${username}`);
      setuserchatcount(0);
    } catch (err) {
      console.log("Error marking messages as read:", err);
    }
  }

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const response = await axios.get(`${URL}/unreadcount/${username}`);
        setuserchatcount(response.data.userunreadcount);
       
      } catch (error) {
        console.error("Error fetching unread count:", error);
      }
    };

    fetchUnreadCount();
  }, []);

   useEffect(()=>{
      axios.get(`${URL}/getworkshop`)
      .then((data)=> setworkshop(data.data))
      .catch((err)=>{
        console.log(err.message);
      })
    },[])


  return (
    <div className="flex flex-col-reverse lg:flex-row h-fit w-full">

       <div className="bg-gradient-to-br from-cyan-300 to-cyan-900 text-black w-full lg:w-1/2 grid justify-center items-center lg:pb-30">
         <div className="flex flex-col items-center mb-10 pt-10 lg:pt-0">
           <h1 className="text-5xl md:text-6xl lg:text-8xl font-medium text-center">TECHNEXUS</h1>
           <h1 className="text-5xl md:text-6xl lg:text-8xl font-medium text-center">LEARNING</h1>
           <p className="text-sm md:text-base lg:text-xl font-medium tracking-widest text-center mt-2">BUILDING DIGITAL DEFENDERS & DEVELOPERS</p>
           <div className="flex flex-col sm:flex-row gap-2 md:gap-10 md:mt-10 mt-5 w-full justify-center">
             <button
               className="mt-4 sm:mt-0 cursor-pointer hover:font-medium hover:scale-110 transition-all duration-300 ease-in-out text-base sm:text-lg bg-white/10 backdrop-blur-md border-2 border-white/30 hover:border-white px-6 sm:px-10 py-2 text-black rounded-4xl"
               onClick={() => { navi("/signup") }}
             >
               SignUp
             </button>
             <button
               className="mt-4 sm:mt-0 cursor-pointer hover:font-medium hover:scale-110 transition-all duration-300 ease-in-out text-base sm:text-lg bg-white/10 backdrop-blur-md border-2 border-white/30 hover:border-white px-6 sm:px-10 py-2 text-black rounded-4xl"
               onClick={() => { navi("/login") }}
             >
               LogIn
             </button>
           </div>
         </div>
       </div>
     
       <div className="relative w-full lg:w-1/2 flex justify-center items-center">
       {workshop.length>0 ? <div>
        <img 
           src={`${URL}/uploadworkshop/${wimage}`}
           alt="" 
           className='w-screen h-[1000px]'
        /> 
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' onClick={()=>navi("/workshop")}>
        <div className='flex justify-center px-8 py-3.5 border-2 rounded-full text-black transition-all duration-300 ease-in-out hover:text-white z-10 font-medium relative group cursor-pointer font-sans  backdrop-blur-md bg-white/5 border-white/30
                        shadow-[0_4px_30px_rgba(0,0,0,0.1)] 
                        hover:bg-white/10 hover:shadow-[0_6px_40px_rgba(0,0,0,0.2)]'> REGISTER
            <span className='absolute rounded-full bottom-0 w-[70%] h-0 transition-all duration-300 ease-in-out -z-10 bg-black backdrop-blur-md group-hover:h-full group-hover:w-full'></span>
        </div>
        </div>
       </div>
	   :
         <img
           src={Banner}
           alt=""
           className="w-full h-[1000px] object-cover"
         />
         }
         <div className='absolute cursor-pointer right-[10%] bottom-[10%]'>
         <img src={MSG} alt=""  onClick={()=>{navi("/userchat"),chatbox()}} className="size-25 md:size-35  hover:border-3 hover:bg-gradient-to-b from-blue-900 via-cyan-700 to-blue-500 transition-all duration-200 ease-linear rounded-full border-white"/>
         {userchatcount>0 && <span className="absolute top-2 right-5  bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg border-2 border-white animate-pulse">
           {userchatcount}
         </span>}
         </div>
       </div>
     </div>
  )
}

export default Homemain;