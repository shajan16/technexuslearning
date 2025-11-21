import React, { useContext, useEffect, useState } from 'react';
import TrackedHours from './Trackhours';
import { UserContext } from '../Context/Context';
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Dashboard = () => {

  let{staffname, deleteStaffname}= useContext(UserContext);

  let navi = useNavigate();

  const [activeTab, setActiveTab] = useState('Week');

  let handlelogout = async ()=>{
    let result = await Swal.fire({
      title: "Are you sure?",
      text: "Do want to LogOut!!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes. Do it!",
      cancelButtonText: "Cancel",
    });
    if (!result.isConfirmed) return;
  
      try {
         deleteStaffname()
          Swal.fire("LogOut successfully!!");
          navi("/home")
      } catch (error) {
          Swal.fire("Failed to LogOut!!");
      }
  }
  

  return (
    <div className="p-6">
      {/* Tabs */}
      <div className="flex gap-6 border-b">
        {['Day', 'Week', 'Month'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-sm font-medium cursor-pointer ${
              activeTab === tab ? 'border-b-4 border-orange-500 text-orange-600' : 'text-gray-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Cards Section */}
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white rounded-xl p-6 shadow relative">
          <h2 className="text-xl font-semibold">Hello {staffname.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}</h2>
          <p className="text-gray-500 mt-1">Here's your dashboard for today.</p>
          <BiLogOut className='absolute right-5 top-5 text-2xl/8 text-red-500 font-bold cursor-pointer' onClick={handlelogout}/>
        </div>

        <div className="bg-white rounded-xl p-6 shadow">
          <h2 className="text-lg font-semibold">Upcoming Holidays and Time Off</h2>
          <p className="text-gray-400 mt-4">No upcoming holidays</p>
        </div>
      </div>

      {/* Tracked Hours Section */}
      <TrackedHours/>
    </div>
  );
};

export default Dashboard;
