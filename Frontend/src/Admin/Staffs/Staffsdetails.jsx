import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { UserContext } from '../../Context/Context';

const Staffsdetails = () => {

  let {URL}=useContext(UserContext);

    let navi=useNavigate();
    let[users,setUsers]=useState([]);
    let [load,setload]=useState(false);

    useEffect(()=>{
        axios.get(`${URL}/getstaffs`)
        .then((data)=>setUsers(data.data))
        .catch((err)=>{ 
            console.log(err.message);
        })

        window.scrollTo(0,0)
    },[load])

    let handledelete= async (id)=>{
      let result = await Swal.fire({
      title: "Are you sure?",
      text: "This Staff will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });
    if (!result.isConfirmed) return;
  
      try {
          await axios.delete(`${URL}/deletestaff/${id}`);
          Swal.fire("Staff deleted successfully!!");
          setload(true)
      } catch (error) {
          Swal.fire("Failed to delete this Staff!!");
      }
    }

  return (
    <div>
        <div className='px-4 md:px-10 py-5 absolute text-3xl md:text-5xl'>
      <i className="fa-solid fa-arrow-left-long cursor-pointer" onClick={()=>navi(-1)}></i>
    </div>
    <div className="p-6 py-15 bg-blue-50 min-h-screen mx-auto">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        <h2 className="text-2xl font-semibold text-gray-800 px-6 py-4 border-b">
          Staffs Details
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
              <tr>
                <th className="py-3 px-6 text-left">S.No</th>
                <th className="py-3 px-6 text-left">name</th>
                <th className="py-3 px-6 text-left">role</th>
                <th className="py-3 px-6 text-left">Phone</th>
                <th className="py-3 px-6 text-left">password</th>
                <th className="py-3 px-6 text-left">delete</th>
              </tr>
            </thead>

            <tbody className="text-gray-600 text-sm divide-y divide-gray-200">
              {users && users.length > 0 ? (
                users.map((user, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition duration-200"
                  >
                    <td className="py-3 px-6">{index+1}.</td>
                    <td className="py-3 px-6">{user.name}</td>
                    <td className="py-3 px-6">{user.role}</td>
                    <td className="py-3 px-6">{user.phone}</td>
                    <td className="py-3 px-6">{user.password}</td>
                     <td className="py-3 px-6">
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md cursor-pointer"
                          onClick={() => handledelete(user.name)}
                        >
                          Delete
                        </button>
                      </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-6 text-gray-500 italic"
                  >
                    No Staffs found!!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Staffsdetails;