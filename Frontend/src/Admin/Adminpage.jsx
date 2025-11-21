import React, { useContext, useEffect } from "react";
import Summary from "./Summary";
import { useNavigate } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { useState } from "react";
import { SiImessage } from "react-icons/si";
import axios from "axios";
import { UserContext } from "../Context/Context";


const Adminpage = () => {

  let {URL}=useContext(UserContext);

  let navi = useNavigate();

  let[unreadcount,setunreadcount]=useState(0);
  
  useEffect(()=>{ 
	  window.scrollTo(0,0)
	},[]);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const response = await axios.get(`${URL}/unreadcount/sender`);
        setunreadcount(response.data.unreadCount);
      } catch (error) {
        console.error("Error fetching unread count:", error);
      }
    };

    fetchUnreadCount();
  }, []);

	
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-cyan-400 text-white flex flex-col">

  {/*  Main Container  */}
  <div className="flex flex-1 flex-col md:flex-row">

    {/*  Sidebar  */}
    <aside className="bg-white/10 text-black font-bold w-full md:w-60 gap-5 p-4 py-10 flex flex-col flex-wrap justify-around md:justify-start md:space-y-3 items-center">
      <div className="w-full flex justify-around items-center">
      <IoHome className="text-4xl cursor-pointer" onClick={()=>navi("/home")}/>
      <div className="relative justify-center items-center cursor-pointer">
      <SiImessage className="text-4xl/7 font-extrabold rounded-lg bg-green-600 text-black z-20 cursor-pointer " onClick={()=>navi("/adminchat")}></SiImessage>
      {unreadcount>0? <p className="absolute text-white top-1 left-3 font-bold animate-bounce" onClick={()=>navi("/adminchat")}>{unreadcount}</p> :
          <p className="absolute text-white top-1 left-3 font-bold" onClick={()=>navi("/adminchat")}>0</p>
      }
      </div>
     </div>
      <button className="w-[70%] md:w-full px-5 cursor-pointer py-2 bg-gradient-to-br from-blue-50 to-purple-700 rounded-xl hover:opacity-80" onClick={()=>navi("/coursedetails")}>COURSE DETAILS</button>
      <button className="w-[70%] md:w-full px-5 cursor-pointer py-2 bg-gradient-to-br from-blue-50 to-purple-700 rounded-xl hover:opacity-80" onClick={()=>navi("/studentsdetails")}>STUDENT DETAILS</button>
      <button className="w-[70%] md:w-full px-5 cursor-pointer py-2 bg-gradient-to-br from-blue-50 to-purple-700 rounded-xl hover:opacity-80">CLIENT DETAILS</button>
      <button className="w-[70%] md:w-full px-5 cursor-pointer py-2 bg-gradient-to-br from-blue-50 to-purple-700 rounded-xl hover:opacity-80" onClick={()=>navi("/partnersdetails")}>PARTNERS DETAILS</button>
      <button className="w-[70%] md:w-full px-5 cursor-pointer py-2 bg-gradient-to-br from-blue-50 to-purple-700 rounded-xl hover:opacity-80" onClick={()=>navi("/mentorsdetails")}>MENTORS DETAILS</button>
      <button className="w-[70%] md:w-full px-5 cursor-pointer py-2 bg-gradient-to-br from-blue-50 to-purple-700 rounded-xl hover:opacity-80" onClick={()=>navi("/staffsdetails")}>STAFF DETAILS</button>
    </aside>

    {/*  Dashboard Content  */}
    <main className="flex-1 p-6">
      <h1 className="text-center text-2xl font-bold mb-6">Dashboard Summary</h1>

      {/*  Summary Cards  */}
      <Summary/>

      {/*  Student Section  */}
      <section className="mb-15">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><i className="fa-solid fa-user"></i> STUDENT SECTION</h2>
        <div className="flex flex-wrap gap-10 justify-between text-black text-sm  font-bold">
          <button className="w-fit px-5 cursor-pointer py-2 bg-gradient-to-br from-blue-50 to-purple-700 rounded-xl hover:opacity-80" onClick={()=>navi("/addstudents")}>ADD STUDENT</button>
          <button className="w-fit px-5 cursor-pointer py-2 bg-gradient-to-br from-blue-50 to-purple-700 rounded-xl hover:opacity-80" onClick={()=>navi("/addpartners")}>ADD HIRING PARTNER</button>
          <button className="w-fit px-5 cursor-pointer py-2 bg-gradient-to-br from-blue-50 to-purple-700 rounded-xl hover:opacity-80" onClick={()=>navi("/addmentors")}>ADD MENTORS</button>
          <button className="w-fit px-5 cursor-pointer py-2 bg-gradient-to-br from-blue-50 to-purple-700 rounded-xl hover:opacity-80">CERTIFICATE</button>
          <button className="w-fit px-5 cursor-pointer py-2 bg-gradient-to-br from-blue-50 to-purple-700 rounded-xl hover:opacity-80">SUMMARY</button>
          <button className="w-fit px-5 cursor-pointer py-2 bg-gradient-to-br from-blue-50 to-purple-700 rounded-xl hover:opacity-80" onClick={()=>navi("/signupdata")}>SignUp DATA</button>
        </div>
      </section>

      {/*  Course Section  */}
      <section className="mb-15">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><i className="fa-solid fa-clipboard-list"></i> COURSE SECTION</h2>
        <div className="flex flex-wrap gap-10 justify-between text-black text-sm font-bold">
          <button className="w-fit px-5 cursor-pointer py-2 bg-gradient-to-br from-blue-50 to-purple-700 rounded-xl hover:opacity-80" onClick={()=>navi("/addprocourses")}>ADD COURSE</button>
          <button className="w-fit px-5 cursor-pointer py-2 bg-gradient-to-br from-blue-50 to-purple-700 rounded-xl hover:opacity-80">ADD FREE COURSE</button>
          <button className="w-fit px-5 cursor-pointer py-2 bg-gradient-to-br from-blue-50 to-purple-700 rounded-xl hover:opacity-80" onClick={()=>navi("/addworkshop")}>ADD WORKSHOP</button>
          <button className="w-fit px-5 cursor-pointer py-2 bg-gradient-to-br from-blue-50 to-purple-700 rounded-xl hover:opacity-80" onClick={()=>navi("/removeworkshop")}>REMOVE WORKSHOP</button>
          <button className="w-fit px-5 cursor-pointer py-2 bg-gradient-to-br from-blue-50 to-purple-700 rounded-xl hover:opacity-80" onClick={()=>navi("/adddemovideo")}>VIDEO UPLOAD</button>
          <button className="w-fit px-5 cursor-pointer py-2 bg-gradient-to-br from-blue-50 to-purple-700 rounded-xl hover:opacity-80" onClick={()=>navi("/workshopdata")}>WORKSHOP REGISTIONS Data</button>
        </div>
      </section>

      {/*  Admission Section  */}
      <section className="mb-15">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><i className="fa-solid fa-lightbulb"></i> ADMISSION SECTION</h2>
        <div className="flex  flex-wrap gap-10 justify-between text-black text-sm font-bold">
          <button className="w-fit px-5 cursor-pointer py-2 bg-gradient-to-br from-blue-50 to-purple-700 rounded-xl hover:opacity-80" onClick={()=>navi("/enquirydata")}>ENQUIRY</button>
          <button className="w-fit px-5 cursor-pointer py-2 bg-gradient-to-br from-blue-50 to-purple-700 rounded-xl hover:opacity-80" onClick={()=>navi("/adminchat")}>{unreadcount>0? "New Messages": "Messages"}</button>
        </div>
      </section>

      {/*  Staff Section  */}
      <section className="mb-15">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><i className="fa-solid fa-gears"></i> STAFF SECTION</h2>
        <div className="flex  flex-wrap gap-10 justify-between text-black text-sm font-bold">
          <button className="w-fit px-5 cursor-pointer py-2 bg-gradient-to-br from-blue-50 to-purple-700 rounded-xl hover:opacity-80" onClick={()=>navi("/addstaffs")}>ADD STAFFS</button>
          <button className="w-fit px-5 cursor-pointer py-2 bg-gradient-to-br from-blue-50 to-purple-700 rounded-xl hover:opacity-80">ADD TASK</button>
          <button className="w-fit px-5 cursor-pointer py-2 bg-gradient-to-br from-blue-50 to-purple-700 rounded-xl hover:opacity-80" onClick={()=>navi("/staffsreport")}>REPORT</button>
          <button className="w-fit px-5 cursor-pointer py-2 bg-gradient-to-br from-blue-50 to-purple-700 rounded-xl hover:opacity-80">UPDATES</button>
        </div>
      </section>

    </main>
  </div>
</div>
  );
}

export default Adminpage;