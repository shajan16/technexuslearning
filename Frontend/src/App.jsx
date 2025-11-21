import React from "react"
import {BrowserRouter as Roter, Routes, Route} from 'react-router-dom'
import Home from "./Components/Home"
import Firstpage from "./Components/Firstpage"
import PageNot from "./Components/PageNot"
import Enquiry from "./Components/Enquiry"
import Addmentors from "./Admin/Addmentors"
import Addpartners from "./Admin/Addpartners"
import Addstudents from "./Admin/Addstudents"
import Students from "./Components/Students/Students"
import Studentdetails from "./Components/Students/Studentdetails"
import Addprocourses from "./Admin/Addprocourses"
import Procoursedetails from "./Components/Courses/Procoursedetails"
import Procourses from "./Components/Courses/Procourses"
import Signup from "./Components/Authentication/Signup"
import Login from "./Components/Authentication/Login"
import Syllabus from "./Components/Courses/Syllabus"
import Forgotpass from "./Components/Authentication/Forgotpass"
import Restpass from "./Components/Authentication/Restpass"
import Service from "./Components/Service/Service"
import Servicemsg from "./Components/Service/Servicemsg"
import Adminpage from "./Admin/Adminpage"
import Coursedetails from "./Admin/Details/Coursedetails"
import Studentsdetails from "./Admin/Details/Studentsdetails"
import Partnersdetails from "./Admin/Details/Partnersdetails"
import Mentorsdetails from "./Admin/Details/Mentorsdetails"
import Adddemovideo from "./Admin/Adddemovideo"
import Signupdata from "./Admin/Data/Signupdata"
import Enquirydata from "./Admin/Data/Enquirydata"
import UserChat from "./Components/Userchat"
import Adminchat from "./Admin/Adminchat"
import Staff from "./Staffs/Staff"
import Stafflogin from "./Staffs/Stafflogin"
import Addstaffs from "./Admin/Addstaffs"
import Staffsreport from "./Admin/Staffs/Staffsreport"
import Addworkshop from "./Admin/Addworkshop"
import Removewshop from "./Admin/Removewshop"
import Staffsdetails from "./Admin/Staffs/Staffsdetails"
import Adminlogin from "./Components/Adminlogin"
import Workshop from "./Components/Workshop"
import Workshopdata from "./Admin/Data/Workshopdata"

function App() {
  
  return (
    <>
    <Roter>
      <Routes>
        <Route path="/" element={<Firstpage/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/enquiry" element={<Enquiry/>} />
        <Route path="/userchat" element={<UserChat/>} />
        <Route path="/adminlogin" element={<Adminlogin/>} />
        <Route path="/workshop" element={<Workshop/>} />
        {/* Service */}
        <Route path="/service" element={<Service/>} />
        <Route path="/servicemsg" element={<Servicemsg/>} />
        {/* Authentication */}
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} /> 
        <Route path="/forgotpassword" element={<Forgotpass/>} />
        <Route path="/resetpassword" element={<Restpass/>} />
        {/* Procourses */}
        <Route path="/procourses" element={<Procourses/>} />
        <Route path="/procoursedetails/:id" element={<Procoursedetails/>} />
        <Route path="/syllabus/:id" element={<Syllabus/>} />
        {/* Students */}
        <Route path="/students" element={<Students/>} />
        <Route path="/studentdetails/:id" element={<Studentdetails/>} />
        {/* Admin */}
        <Route path="/admin" element={<Adminpage/>} />
        <Route path="/adminchat" element={<Adminchat/>} />
        <Route path="/addmentors" element={<Addmentors/>} />
        <Route path="/addpartners" element={<Addpartners/>} />
        <Route path="/addstudents" element={<Addstudents/>} />
        <Route path="/addprocourses" element={<Addprocourses/>} />
		    <Route path="/adddemovideo" element={<Adddemovideo/>} />
		    <Route path="/addworkshop" element={<Addworkshop/>} />
		    <Route path="/removeworkshop" element={<Removewshop/>} />
		    <Route path="/addstaffs" element={<Addstaffs/>} />
        <Route path="/coursedetails" element={<Coursedetails/>} />
        <Route path="studentsdetails" element={<Studentsdetails/>} />
        <Route path="partnersdetails" element={<Partnersdetails/>} />
        <Route path="mentorsdetails" element={<Mentorsdetails/>} />
        <Route path="staffsdetails" element={<Staffsdetails/>} />
        <Route path="/signupdata" element={<Signupdata/>} />
        <Route path="/enquirydata" element={<Enquirydata/>} />
        <Route path="/workshopdata" element={<Workshopdata/>} />
        <Route path="staffsreport" element={<Staffsreport/>} />
        {/* Staffs */}
        <Route path="/staffs" element={<Staff/>}/>
        <Route path="/stafflogin" element={<Stafflogin/>}/>
        {/* Page-Not-Found */}
        <Route path="*" element={<PageNot/>}/>
      </Routes>
    </Roter>
    </> 
  )
}

export default App
