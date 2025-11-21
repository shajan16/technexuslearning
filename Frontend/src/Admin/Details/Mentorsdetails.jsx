import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { RiDeleteBinFill } from "react-icons/ri";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/Context';

const Mentorsdetails = () => {

  let {URL}=useContext(UserContext);

    let navi = useNavigate();

  let [allimage, setallimage] = useState([]);
  let [searchdata,setsearchdata]=useState("");

  useEffect(() => {
    axios
      .get(`${URL}/getimages`)
      .then((data) => setallimage(data.data))
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  let filterdata= searchdata? allimage.filter(data=>data.mentorname.toUpperCase().includes(searchdata)) : allimage

  // Delete Mentor
  let handledelete= async (id)=>{
      let result = await Swal.fire({
      title: "Are you sure?",
      text: "This Mentor will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });
    if (!result.isConfirmed) return;
  
      try {
          await axios.delete(`${URL}/deletementor/${id}`);
          let updatedmentor= allimage.filter(mentor=>mentor._id !== id)
          setallimage(updatedmentor)
          Swal.fire("Partner deleted successfully!!");
      } catch (error) {
          Swal.fire("Failed to delete Partner!!");
      }
    }

  return (
    <div>
      <div className='px-4 md:px-16 absolute text-3xl md:text-5xl'>
      <i className="fa-solid fa-arrow-left-long cursor-pointer" onClick={()=>navi(-1)}></i>
    </div>
    <div className="p-4 md:p-10 mt-10">
      <div className="w-2/3 text-3xl md:text-5xl font-bold flex flex-col items-center justify-center mx-auto">
        <h1>Mentors</h1>
        <form className="w-[55%] mt-8">   
              <label htmlFor="default-search" className="mb-2 text-sm text-white sr-only ">Search</label>
              <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg className="w-4 h-4 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" >
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                      </svg>
                  </div>
                  <input type="search" id="default-search" onChange={e=>setsearchdata(e.target.value.toUpperCase())} className="block w-full p-2 ps-10 text-lg text-black border border-gray-500 rounded-lg bg-blue-50 focus:ring-blue-500 focus:border-blue-500 placeholder-black" placeholder="Search" required />
              </div>
          </form>
      </div>

      <div className='flex px-5 justify-center space-x-12'>
          <div className="flex flex-wrap gap-y-15 justify-between mt-10 md:mt-15" >
            {!filterdata || filterdata.length === 0 ? (
              <h1 className="text-base font-medium md:text-lg">
                Mentors Not Found!!
              </h1>
            ) : (
              filterdata.map((data) => (
                <div
                  className="flex flex-col items-center min-w-[160px] md:min-w-[200px]"
                  key={data._id}
                >
                  <img
                    src={`${URL}/uploadimage/${data.path}`}
                    alt="Mentor"
                    className="w-28 h-28 md:w-40 md:h-40 object-cover shadow-md"
                  />
                  <p className="tracking-widest font-bold pt-3 w-full flex justify-center text-sm md:text-base">
                    {data.mentorname}
                  </p>
                  <p className="font-light text-xs md:text-sm tracking-widest w-full flex justify-center text-center">
                    {data.mentorrole}
                  </p>
                  <RiDeleteBinFill onClick={()=>handledelete(data._id)} className='text-3xl text-red-500 cursor-pointer'/>
                </div>
              ))
            )}
          </div>
      </div>
    </div>
    </div>
  );
};

export default Mentorsdetails;