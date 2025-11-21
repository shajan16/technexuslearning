import React, { useContext, useEffect } from 'react'
import { useState, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../Context/Context'

const Addstudents = () => {

  let {URL}=useContext(UserContext);

  let navi = useNavigate();

  useEffect(()=>{ 
      window.scrollTo(0,0)
    },[]);

    let [simage,setsimage]=useState(null);
    let [sbimage,setsbimage]=useState(null);
    let [sname,setsname]= useState('');
    let [srole,setsrole]=useState('')
    let [sabout,setsabout]=useState('')
    let [sjoin,setsjoin]=useState('')
    let [send,setsend]=useState('')

    let simageref=useRef(null)
    let sbimageref=useRef(null)

    let handlename=(e)=>{
      let val=e.target.value
        setsname(val);
    }

    let handlerole=(e)=>{
      let roleval = e.target.value
        setsrole(roleval)
    }
    let handleabout=(e)=>{
      let aboutval = e.target.value
        setsabout(aboutval)
    }
    let handlejoin=(e)=>{
      let joinval = e.target.value.toUpperCase();
        setsjoin(joinval)
    }
    let handleend=(e)=>{
      let endval = e.target.value.toUpperCase();
        setsend(endval)
    }

    let handleimage=(e)=>{
        let file=e.target.files[0]
            setsimage(file)
    }
    let handlebimage=(e)=>{
        let file2=e.target.files[0]
            setsbimage(file2)
    }

    let handleupload= async(e)=>{
      e.preventDefault()

        if (!simage || sname==='' || srole==='' || sabout==='' || sjoin==='' || send==='' || sbimage==='') {
            alert("Please Give All Data!!")
            return
        }
        
        let sdata= new FormData();
        sdata.append("simage",simage)
        sdata.append("sbimage",sbimage)
        sdata.append("sname",sname)
        sdata.append("srole",srole)
        sdata.append("sabout",sabout)
        sdata.append("sjoin",sjoin)
        sdata.append("send",send)

        try {
            let res= await axios.post(`${URL}/uploadstudent`,sdata,
                {headers:{"Content-Type":"multipart/form-data"}}
            )
            alert("Upload Sucessfully!!")
            setsimage(null)
            setsbimage(null)
            setsname('')
            setsrole('')
            setsabout('')
            setsjoin('')
            setsend('')
            if(simageref.current) simageref.current.value="";
            if(sbimageref.current) sbimageref.current.value="";
            
            
        } catch (error) {
            alert("Upload failed!!")
        }
    }


  return (
  <div className='bg-blue-50 w-screen flex flex-col justify-center items-center space-y-5'>
  
    <form className="w-[60%] flex flex-col items-center bg-white shadow-lg py-25 shadow-gray-400 rounded-4xl m-10">
     <div className="relative z-0 w-[70%] mb-8 group ">
      <input value={sname} type="text" name="floating_studentname" id="floating_studentname" onChange={handlename} className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-black appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="floating_studentname" className="peer-focus:font-medium absolute text-xl text-black duration-300 transhtmlForm -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"><i className="fa-solid fa-user"></i> Student Name</label>
   </div>
    <div className="relative z-0 w-[70%] mb-8 group ">
      <input value={srole} type="text" name="floating_studentrole" id="floating_studentrole" onChange={handlerole} className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-black appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="floating_studentrole" className="peer-focus:font-medium absolute text-xl text-black duration-300 transhtmlForm -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"><i className="fa-solid fa-user-gear"></i> Student Role</label>
   </div>
    <div className="relative z-0 w-[70%] mb-8 group ">
      <input value={sabout} type="text" name="floating_about" id="floating_about" onChange={handleabout} className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-black appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="floating_about" className="peer-focus:font-medium absolute text-xl text-black duration-300 transhtmlForm -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"><i className="fa-solid fa-user-pen"></i> About</label>
   </div>
    <div className="relative z-0 w-[70%] mb-8 group ">
      <input value={sjoin} type="text" name="floating_join" id="floating_join" onChange={handlejoin} className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-black appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="floating_join" className="peer-focus:font-medium absolute text-xl text-black duration-300 transhtmlForm -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"><i className="fa-solid fa-user-plus"></i> Joining Date</label>
   </div>
    <div className="relative z-0 w-[70%] mb-8 group ">
      <input value={send} type="text" name="floating_end" id="floating_end" onChange={handleend} className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-black appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="floating_end" className="peer-focus:font-medium absolute text-xl text-black duration-300 transhtmlForm -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"><i className="fa-solid fa-user-minus"></i> End Date</label>
   </div>
   
   <div className="w-[70%] mx-auto">
      <label className="text-base text-slate-900 font-medium mb-3 block">Upload Profile Image</label>
      <input ref={simageref} type="file" accept='image/*' onChange={handleimage}
        className="w-full text-slate-500 font-medium text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-slate-500 rounded" />
      <p className="text-xs text-slate-500 mt-2">PNG, JPG SVG, WEBP, are Allowed.</p>
    </div>
   <div className="w-[70%] mx-auto mt-7">
      <label className="text-base text-slate-900 font-medium mb-3 block">Upload Background Image</label>
      <input ref={sbimageref} type="file" accept='image/*' onChange={handlebimage}
        className="w-full text-slate-500 font-medium text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-slate-500 rounded" />
      <p className="text-xs text-slate-500 mt-2">PNG, JPG SVG, WEBP, are Allowed.</p>
    </div>

   <div className='flex justify-center mt-10'>
  <button type="submit" onClick={handleupload} className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-full tracking-widest text-lg  w-full sm:w-auto px-8 py-2.5 text-center cursor-pointer" >Upload</button>
  </div>

</form>
<div className=' absolute right-[14%] top-[7%]'>
    <i className="fa-solid fa-xmark text-3xl font-bold cursor-pointer text-gray-700 hover:text-black" onClick={()=>navi(-1)}></i>
</div>
</div>

  )
}

export default Addstudents