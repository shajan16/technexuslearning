import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import Staffnavbar from './Staffnavbar';
import Dashboard from './Dashboard';

function Staff() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Staffnavbar />
        <Dashboard />
      </div>
    </div>
  );
}

export default Staff;