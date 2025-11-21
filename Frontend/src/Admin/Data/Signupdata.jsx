import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/Context';

const Signupdata = () => {

  let {URL}=useContext(UserContext);

    let navi=useNavigate();
    let[users,setUsers]=useState([]);

    useEffect(()=>{
        axios.get(`${URL}/getusers`)
        .then((data)=>setUsers(data.data))
        .catch((err)=>{ 
            console.log(err.message);
        })

        window.scrollTo(0,0)
    },[])
    

  return (
    <div>
        <div className='px-4 md:px-10 py-5 absolute text-3xl md:text-5xl'>
      <i className="fa-solid fa-arrow-left-long cursor-pointer" onClick={()=>navi(-1)}></i>
    </div>
    <div className="p-6 py-15 bg-blue-50 min-h-screen mx-auto">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        <h2 className="text-2xl font-semibold text-gray-800 px-6 py-4 border-b">
          SignUp Details
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
              <tr>
                <th className="py-3 px-6 text-left">S.No</th>
                <th className="py-3 px-6 text-left">Username</th>
                <th className="py-3 px-6 text-left">Phone</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Password</th>
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
                    <td className="py-3 px-6">{user.phone}</td>
                    <td className="py-3 px-6">{user.email}</td>
                    <td className="py-3 px-6">{user.password}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-6 text-gray-500 italic"
                  >
                    No users found
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

export default Signupdata