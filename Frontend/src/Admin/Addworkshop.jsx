import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/Context';

const Addworkshop = () => {

  let {URL}=useContext(UserContext);

    let navi = useNavigate();
    
    let wimageref=useRef(null);

    let [wimage,setwimage]=useState(null);
    let[work,setwork]=useState([]);

    useEffect(()=>{
    axios.get(`${URL}/getworkshop`)
      .then((data)=> setwork(data.data))
      .catch((err)=>{
        console.log(err.message);
      })
  },[])

    let handleimage=(e)=>{
        let file=e.target.files[0]
        if (file) {
            setwimage(file)
        }
    }

    let handleupload= async(e)=>{
        e.preventDefault();

        if (work.length>0) {
            alert("Remove the Old Workshop to Upload New!!")
            navi("/removeworkshop")
            return;
        }

        if (!wimage) {
            alert("Please Give All Data!!")
            return
        }
        
        let widata= new FormData();
        widata.append("workshop",wimage)

        try {
            let res= await axios.post(`${URL}/uploadworkshop`,widata,
                {headers:{"Content-Type":"multipart/form-data"}}
            )
            alert("Upload Sucessfully!!")
            navi('/admin')
            if(wimageref.current) wimageref.current.value='';
        } catch (error) {
            alert("Upload failed!!")
            console.log(error);
        }
    }   

  return (
      <div className='bg-blue-50 w-full flex flex-col mx-auto justify-center items-center space-y-5 min-h-screen'>
  
    <form className="w-[50%] flex flex-col items-center bg-white shadow-lg py-25 shadow-gray-400 rounded-4xl mt-10">
   
   <div className="w-[60%] mx-auto">
      <label className="text-base text-slate-900 font-medium mb-3 block">Upload Workshop</label>
      <input ref={wimageref} type="file" accept='image/*' onChange={handleimage}
        className="w-full text-slate-500 font-medium text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-slate-500 rounded" />
      <p className="text-xs text-slate-500 mt-2">jpg, png are Allowed.</p>
    </div>

   <div className='flex justify-center mt-10'>
  <button type="submit" onClick={handleupload} className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-full tracking-widest text-lg  w-full sm:w-auto px-8 py-2.5 text-center cursor-pointer" >Upload</button>
  </div>

</form>
<div className=' absolute right-[16%] top-[10%]'>
    <i className="fa-solid fa-xmark text-3xl font-bold cursor-pointer text-gray-700 hover:text-black" onClick={()=>navi(-1)}></i>
</div>
</div>
  )
}

export default Addworkshop;