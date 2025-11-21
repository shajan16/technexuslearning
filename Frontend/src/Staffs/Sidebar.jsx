import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow-md hidden md:block">
      <div className="p-6 font-bold text-xl">Technexus Learning</div>
      <nav className="mt-4 ">
        <div className='cursor-pointer bg-gray-50 hover:bg-gray-200 '>
        <button className=" block px-6 py-3 font-medium cursor-pointer">📊 Dashboard</button>
       </div>
      </nav>
    </div>
  );
};

export default Sidebar;