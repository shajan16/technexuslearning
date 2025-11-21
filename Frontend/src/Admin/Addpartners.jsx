import React, { useContext, useEffect } from 'react'
import { useState, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/Context';

const Addpartners = () => {

  let {URL}=useContext(UserContext);

  let navi = useNavigate();

  useEffect(()=>{ 
      window.scrollTo(0,0)
    },[]);

    let [cimage,setcimage]=useState(null);
    let [pname,setpname]= useState('');

    let cimageref=useRef(null);

    let handlename=(e)=>{
      let val=e.target.value.toUpperCase();
      if (val) {
        setpname(val);
      }
    }

    let handleimage=(e)=>{
        let file=e.target.files[0]
        if (file) {
            setcimage(file)
        }
    }

    let handleupload= async(e)=>{

      e.preventDefault();

        if (!cimage || pname==='') {
            alert("Please Give All Data!!")
            return
        }
        
        let pdata= new FormData();
        pdata.append("cimage",cimage)
        pdata.append("pname",pname)

        try {
            let res= await axios.post(`${URL}/uploadpartner`,pdata,
                {headers:{"Content-Type":"multipart/form-data"}}
            )
            alert("Upload Sucessfully!!")
            setpname('')
            if(cimageref.current) cimageref.current.value='';

        } catch (error) {
            alert("Upload failed!!")
        }
    }


  return (
  <div className='bg-blue-50 w-screen flex flex-col justify-center items-center space-y-5'>
  
    <form className="w-[50%] flex flex-col items-center bg-white shadow-lg py-25 shadow-gray-400 rounded-4xl mt-10">
     <div className="relative z-0 w-[60%] mb-8 group ">
      <input value={pname} type="text" name="floating_mentorname" id="floating_mentorname" onChange={handlename} className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-black appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="floating_mentorname" className="peer-focus:font-medium absolute text-xl text-black duration-300 transhtmlForm -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"><i className="fa-solid fa-user"></i> Company Name</label>
   </div>
   
   <div className="w-[60%] mx-auto">
      <label className="text-base text-slate-900 font-medium mb-3 block">Upload Image</label>
      <input ref={cimageref} type="file" accept='image/*' onChange={handleimage}
        className="w-full text-slate-500 font-medium text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-slate-500 rounded" />
      <p className="text-xs text-slate-500 mt-2">PNG, JPG SVG, WEBP, are Allowed.</p>
    </div>

   <div className='flex justify-center mt-10'>
  <button type="submit" onClick={handleupload} className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-full tracking-widest text-lg  w-full sm:w-auto px-8 py-2.5 text-center cursor-pointer" >Upload</button>
  </div>

</form>
<div className=' absolute right-[16%] top-[7%]'>
    <i className="fa-solid fa-xmark text-3xl font-bold cursor-pointer text-gray-700 hover:text-black" onClick={()=>navi(-1)}></i>
</div>
</div>

  )
}

export default Addpartners;