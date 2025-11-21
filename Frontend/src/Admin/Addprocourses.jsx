import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/Context';

const Addprocourses = () => {

  let {URL}=useContext(UserContext);

  let navi = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

        let [ciimage,setciimage]=useState(null);
        let [cimage,setcimage]=useState(null);
        let [cvideo,setcvideo]=useState(null);
        let [cname,setcname]= useState('');
        let [ccaption,setccaption]=useState('')
        let [cabout,setcabout]=useState('')
        let [cprice,setcprice]=useState('')
        let [cpdf,setcpdf]=useState(null)

        let ciimageref=useRef(null)
        let cimageref=useRef(null)
        let cvideoref=useRef(null)
        let cpdfref=useRef(null)

    let handlename=(e)=>{
      let val=e.target.value
        setcname(val);
    }

    let handlerole=(e)=>{
      let capval = e.target.value
        setccaption(capval)
    }
    let handleabout=(e)=>{
      let aboutval = e.target.value
        setcabout(aboutval)
    }
    let handlejoin=(e)=>{
      let priceval = e.target.value.toUpperCase();
        setcprice(priceval)
    }

    let handleiimage=(e)=>{
        let file=e.target.files[0]
            setciimage(file)
    }
    let handlecimage=(e)=>{
        let file2=e.target.files[0]
            setcimage(file2)
    }
    let handlevideo=(e)=>{
        let file3=e.target.files[0]
            setcvideo(file3)     
    }
    let handlepdf=(e)=>{
        let file4=e.target.files[0]
            setcpdf(file4)     
    }

     let handleupload= async(e)=>{
      e.preventDefault()

        if (!ciimage || cimage==='' || cname==='' || ccaption==='' || cabout==='' || cprice==='' || cvideo==='' || cpdf===''){
            alert("Please Give All Data!!")
            return
        }
        let cdata= new FormData();
        cdata.append("ciimage",ciimage)
        cdata.append("cimage",cimage)
        cdata.append("cvideo",cvideo)
        cdata.append("cname",cname)
        cdata.append("ccaption",ccaption)
        cdata.append("cabout",cabout)
        cdata.append("cprice",cprice)
        cdata.append("cpdf",cpdf)

        try {
           await axios.post(`${URL}/uploadprocourse`,cdata
            );

            alert("Upload Sucessfully!!")
            setciimage(null)
            setcimage(null)
            setcvideo(null)
            setcpdf(null)
            setcname('')
            setccaption('')
            setcabout('')
            setcprice('')
            if(ciimageref.current) ciimageref.current.value="";
            if(cimageref.current) cimageref.current.value="";
            if(cvideoref.current) cvideoref.current.value="";
            if(cpdfref.current) cpdfref.current.value="";
            
        } catch (error) {
            alert("Upload failed!!")
            console.log(error);
        }
    }

  return (
    <div className='bg-blue-50 w-screen flex flex-col justify-center items-center space-y-5'>
  
    <form className="w-[60%] flex flex-col items-center bg-white shadow-lg py-25 shadow-gray-400 rounded-4xl m-10">
     <div className="relative z-0 w-[70%] mb-8 group ">
      <input value={cname} type="text" name="floating_studentname" id="floating_studentname" onChange={handlename} className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-black appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="floating_studentname" className="peer-focus:font-medium absolute text-xl text-black duration-300 transhtmlForm -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"><i className="fa-solid fa-user"></i> Course Name</label>
   </div>
    <div className="relative z-0 w-[70%] mb-8 group ">
      <input value={ccaption} type="text" name="floating_studentrole" id="floating_studentrole" onChange={handlerole} className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-black appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="floating_studentrole" className="peer-focus:font-medium absolute text-xl text-black duration-300 transhtmlForm -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"><i className="fa-solid fa-user-gear"></i> Captions</label>
   </div>
    <div className="relative z-0 w-[70%] mb-8 group ">
      <input value={cabout} type="text" name="floating_about" id="floating_about" onChange={handleabout} className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-black appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="floating_about" className="peer-focus:font-medium absolute text-xl text-black duration-300 transhtmlForm -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"><i className="fa-solid fa-user-pen"></i> About</label>
   </div>
    <div className="relative z-0 w-[70%] mb-8 group ">
      <input value={cprice} type="number" name="floating_join" id="floating_join" onChange={handlejoin} className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-black appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="floating_join" className="peer-focus:font-medium absolute text-xl text-black duration-300 transhtmlForm -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"><i className="fa-solid fa-user-plus"></i> Price</label>
   </div>
   
   <div className="w-[70%] mx-auto">
      <label className="text-base text-slate-900 font-medium mb-3 block">Upload Course Icon</label>
      <input ref={ciimageref} type="file" name='ciimage' accept='image/*' onChange={handleiimage}
        className="w-full text-slate-500 font-medium text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-slate-500 rounded" />
      <p className="text-xs text-slate-500 mt-2">PNG, JPG SVG, WEBP, are Allowed.</p>
    </div>
   <div className="w-[70%] mx-auto mt-7">
      <label className="text-base text-slate-900 font-medium mb-3 block">Upload Course Image</label>
      <input ref={cimageref} type="file" name='cimage' accept='image/*' onChange={handlecimage}
        className="w-full text-slate-500 font-medium text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-slate-500 rounded" />
      <p className="text-xs text-slate-500 mt-2">PNG, JPG SVG, WEBP, are Allowed.</p>
    </div>
   <div className="w-[70%] mx-auto mt-7">
      <label className="text-base text-slate-900 font-medium mb-3 block">Upload Course Video</label>
      <input ref={cvideoref} type="file" name='cvideo' accept='video/*' onChange={handlevideo}
        className="w-full text-slate-500 font-medium text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-slate-500 rounded" />
      <p className="text-xs text-slate-500 mt-2">mp3, mp4, are Allowed.</p>
    </div>
   <div className="w-[70%] mx-auto mt-7">
      <label className="text-base text-slate-900 font-medium mb-3 block">Upload Course Syllabus</label>
      <input ref={cpdfref} type="file" name='pdf' accept='application/pdf' onChange={handlepdf}
        className="w-full text-slate-500 font-medium text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-slate-500 rounded" />
      <p className="text-xs text-slate-500 mt-2">Pdf only Allowed.</p>
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

export default Addprocourses