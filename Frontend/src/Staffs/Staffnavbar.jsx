import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { IoPlay } from "react-icons/io5";
import { FaStop } from "react-icons/fa6";
import { MdFreeBreakfast } from "react-icons/md";
import Swal from 'sweetalert2';
import { UserContext } from '../Context/Context';
import { RiHomeSmileFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

 

const Staffnavbar = () => {
  
  let {staffname, URL}=useContext(UserContext);

  let navi = useNavigate();

  const API = `${URL}/api/session`;

  const userId = staffname;

  const [isRunning, setIsRunning] = useState(false); 
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [workSeconds, setWorkSeconds] = useState(0); 
  const [breakSeconds, setBreakSeconds] = useState(0); 
  const [sessionStart, setSessionStart] = useState(null);
  const [totalTodayHours, setTotalTodayHours] = useState(0);
  const [lastStoppedWorkSeconds, setLastStoppedWorkSeconds] = useState(0);
  const [lastStoppedBreakSeconds, setLastStoppedBreakSeconds] = useState(0);
  const tickRef = useRef(null);
  const breakTickRef = useRef(null);

  
  useEffect(() => {
  const loadToday = async () => {
    try {
      const res = await axios.get(`${API}/today/${userId}`);
      
      if (res.data.success && res.data.today) {
        const s = res.data.today;
        
        setSessionStart(s.startTime ? new Date(s.startTime) : null);
        setBreakSeconds(s.totalBreakSeconds || 0);
        setTotalTodayHours(Number(((s.netSeconds || 0) / 3600).toFixed(2)));

        if (s.startTime && !s.endTime) {
          
          setIsRunning(true);
          setIsOnBreak(!!s.currentBreakStart);
          syncLocalCounters(s);
          startLocalTicks(!!s.currentBreakStart);
        } else if (s.lastStoppedWorkSeconds || s.lastStoppedBreakSeconds) {
          
          setLastStoppedWorkSeconds(s.lastStoppedWorkSeconds || 0);
          setLastStoppedBreakSeconds(s.lastStoppedBreakSeconds || 0);
          setWorkSeconds(s.lastStoppedWorkSeconds || 0);
          setBreakSeconds(s.lastStoppedBreakSeconds || 0);
        } else {
          fetchTodayTotal();
        }
      } else {
        fetchTodayTotal();
      }
    } catch (err) {
      console.error('Error loading today session:', err);
    }
  };

  loadToday();
  return cleanupTicks;
}, []);


  function cleanupTicks() {

    try {
    if (tickRef.current) {
      clearInterval(tickRef.current);
      tickRef.current = null;
    }
    if (breakTickRef.current) {
      clearInterval(breakTickRef.current);
      breakTickRef.current = null;
    }
  } catch (e) {
    console.warn('cleanupTicks error', e);
  }
  }

 
  function syncLocalCounters(s) {
    const now = new Date();
    const start = s.startTime ? new Date(s.startTime) : null;
    if (!start) return;
   
    const spanSeconds = Math.round((now.getTime() - start.getTime()) / 1000);
    const totalBreak = s.totalBreakSeconds || 0;
    
    let curBreak = 0;
    if (s.currentBreakStart) {
      curBreak = Math.round((now.getTime() - new Date(s.currentBreakStart).getTime()) / 1000);
    }
    setBreakSeconds(totalBreak + curBreak);
    
    const net = Math.max(0, spanSeconds - (totalBreak + curBreak));
    setWorkSeconds(net);
  }

  
  function startLocalTicks(startInBreak = false) {
    cleanupTicks();
  
    if (tickRef.current) clearInterval(tickRef.current);
    if (breakTickRef.current) clearInterval(breakTickRef.current);

    if (!startInBreak) {
      tickRef.current = setInterval(() => {
        setWorkSeconds(w => w + 1);
      }, 1000);
    } else {
      breakTickRef.current = setInterval(() => {
        setBreakSeconds(b => b + 1);
      }, 1000);
    }
  }

  // start session
  const handleStart = async () => {
    try {
      const res = await axios.post(`${API}/start`, { userId });
      if (res.data.success) {
        const s = res.data.session;
        setSessionStart(new Date(s.startTime));
        setIsRunning(true);
        setIsOnBreak(false);

      if (lastStoppedWorkSeconds > 0 || lastStoppedBreakSeconds > 0) {
        setWorkSeconds(lastStoppedWorkSeconds);
        setBreakSeconds(lastStoppedBreakSeconds);
      } else {
        syncLocalCounters(s);
      }
      startLocalTicks(false);
    }
  } catch (err) {
    console.error('Start error', err);
    alert('Failed to start session');
  }
};

  // pause -> start break
  const handlePause = async () => {
    try {
      const res = await axios.post(`${API}/pause`, { userId });
      if (res.data.success) {
        setIsOnBreak(true);
        
        if (tickRef.current) clearInterval(tickRef.current);
        breakTickRef.current = setInterval(() => setBreakSeconds(b => b + 1), 1000);
      }
    } catch (err) {
      console.error('Pause error', err);
      alert('Failed to pause');
    }
  };

  // resume -> end break
  const handleResume = async () => {
    try {
      const res = await axios.post(`${API}/resume`, { userId });
      if (res.data.success) {
       
        const s = res.data.session;
        setBreakSeconds(s.totalBreakSeconds || 0);
        setIsOnBreak(false);
 
        if (breakTickRef.current) clearInterval(breakTickRef.current);
        tickRef.current = setInterval(() => setWorkSeconds(w => w + 1), 1000);
      }
    } catch (err) {
      console.error('Resume error', err);
      alert('Failed to resume');
    }
  };



function cleanupTicks() {
  try {
    if (tickRef.current) {
      clearInterval(tickRef.current);
      tickRef.current = null;
    }
    if (breakTickRef.current) {
      clearInterval(breakTickRef.current);
      breakTickRef.current = null;
    }
  } catch (e) {
    console.warn('cleanupTicks error', e);
  }
}

const handleStop = () => {
  Swal.fire({
    title: 'Are you sure?',
    text: "Do you want to stop your today's work?",
    icon: 'warning',
    showCancelButton: true,
    cancelButtonText: 'Cancel',
    confirmButtonText: 'Yes, Stop it',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
  }).then(async (result) => {
    if (result.isConfirmed) {
      
      cleanupTicks();

       setIsRunning(false);
       setIsOnBreak(false);

      setLastStoppedWorkSeconds(workSeconds);
      setLastStoppedBreakSeconds(breakSeconds);

       setWorkSeconds(0);
       setBreakSeconds(0);
       setSessionStart(null);

   
      try {
        const res = await axios.post(`${API}/stop`, { userId });

        if (res.data.success) {
          const computed = res.data.computed;
          setTotalTodayHours(
            Number((computed.netSeconds / 3600).toFixed(2))
          );
         
          Swal.fire('Stopped!', 'We appreciate your consistency!', 'success');
        } else {
          Swal.fire('Error', 'Failed to stop. Please try again.', 'error');
        }
      } catch (err) {
        console.error('Stop error', err);
        Swal.fire('Error', 'Server connection failed.', 'error');
      }
    }
  });
};


  // fetch today's total hours
  const fetchTodayTotal = async () => {
    try {
      const res = await axios.get(`${API}/today-total/${userId}`);
      if (res.data.success) {
        setTotalTodayHours(res.data.totalHours || 0);
      }
    } catch (err) {
      console.error('Fetch total error', err);
    }
  };

  // format seconds to HH:MM:SS
  const formatTime = (secs) => {
    const hrs = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${String(hrs).padStart(2,'0')}:${String(mins).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  };
  

  return (
    <div className="flex justify-between items-center bg-white px-6 py-4 shadow-sm">
      <RiHomeSmileFill className='text-3xl cursor-pointer' onClick={()=>navi("/home")}/>
      <h1 className="text-lg font-semibold">Dashboard</h1>

      <div className="text-right mr-4">
        <span className="block font-medium text-gray-600">{formatTime(workSeconds)}</span>
        {/* <span className="text-sm text-gray-500">
          Total Today: <b>{totalTodayHours} hrs</b>
        </span> */}
        <div className="text-xs text-gray-400 mt-1">
          Break: {formatTime(breakSeconds)}
        </div>
      </div>

      <div className="flex items-center gap-4">
       
        {!isRunning  && (
          <button
            onClick={handleStart}
            className="w-8 h-8 rounded-full bg-green-400 hover:bg-green-500 shadow-md transition"
            title="Start Timer"
          > <IoPlay className='text-white text-lg font-bold relative left-2'/> </button>
        )}


        {isRunning && !isOnBreak && (
          <>
            <button
              className="w-8 h-8 rounded-full bg-yellow-400 shadow-md"
              title="Timer Running"
              onClick={handlePause}
            > <MdFreeBreakfast className='text-white font-bold relative left-2'/> </button>
            <button
              onClick={handleStop}
              className="w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 shadow-md transition"
              title="Stop & Save Time"
            > <FaStop className='text-white font-bold relative left-2'/> </button>
          </>
        )}

        {/* On Break state: yellow indicator + resume + stop */}
        {isRunning && isOnBreak && (
          <>
            <button
              className="w-8 h-8 rounded-full bg-green-400 hover:bg-green-500 shadow-md transition"
              title="On Break (Click to Resume)"
              onClick={handleResume}
            > <IoPlay className='text-white text-lg font-bold relative left-2'/> </button>
            <button
              onClick={handleStop}
              className="w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 shadow-md transition"
              title="Stop & Save Time"
            > <FaStop className='text-white font-bold relative left-2'/> </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Staffnavbar;
