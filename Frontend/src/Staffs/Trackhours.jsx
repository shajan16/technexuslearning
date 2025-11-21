import React, { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { UserContext } from "../Context/Context";

const secondsToHHMM = (s) => {
  const secs = Math.max(0, Math.round(Number(s) || 0));
  const hrs = Math.floor(secs / 3600);
  const mins = Math.floor((secs % 3600) / 60);
  return `${String(hrs).padStart(2,'0')}:${String(mins).padStart(2,'0')}`;
};

const hhmmToDisplayWithUnits = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number);
  return `${h}h ${m}m`;
};

const TrackedHours = () => {

    let {staffname, URL}=useContext(UserContext);
    const userId = staffname;

    const API = `${URL}/api/session`;

  const [today, setToday] = useState({
    workedHHMM: "00:00",
    breakHHMM: "00:00",
    netHHMM: "00:00",
    netSeconds: 0,
  });
  const [weekly, setWeekly] = useState([]); 
  const[monthly,setMonthly]=useState({
    workedHHMM: "00:00",
    breakHHMM: "00:00",
    netHHMM: "00:00",
    netSeconds: 0,
  })
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchAll();
    const interval = setInterval(fetchAll, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);

  const fetchAll = async () => {
  try {
    const [todayRes, weeklyRes, monthlyRes] = await Promise.all([
      axios.get(`${API}/today/${userId}`),
      axios.get(`${API}/weekly/${userId}`),
      axios.get(`${API}/monthly/${userId}`)
    ]);

    if (todayRes.data && todayRes.data.success) {
      setToday(todayRes.data.today);
    }
    if (weeklyRes.data && weeklyRes.data.success) {
      setWeekly(weeklyRes.data.weekly);
    }
    if (monthlyRes.data && monthlyRes.data.success) {
      setMonthly(monthlyRes.data.monthly); 
    }
  } catch (err) {
    console.error("Error fetching tracked hours:", err);
  }
};
  

  // For bar chart scaling
  const maxNetHours = useMemo(() => {
    const maxSeconds = Math.max(...weekly.map(w => w.netSeconds), 3600); 
    return Math.max(1, Math.ceil(maxSeconds / 3600)); 
  }, [weekly]);

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">
      <h2 className="text-lg font-semibold">Tracked Hours</h2>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
          <div>
            <div className="text-xs text-gray-500">Monthly Worked Hours</div>
            <div className="font-semibold">{hhmmToDisplayWithUnits(monthly.netHHMM)}</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block" />
          <div>
            <div className="text-xs text-gray-500">Breaks</div>
            <div className="font-semibold">{hhmmToDisplayWithUnits(today.breakHHMM)}</div>
          </div>
        </div>
      </div>

      {/* Bar chart */}
      <div className="mt-6">
        <div className="h-48 flex items-end gap-3 md:gap-6 border-t pt-6">
          {weekly.map((d, i) => {
            const hourFraction = (d.netSeconds / 3600) / maxNetHours; // 0..1
            const pct = Math.round(hourFraction * 100);
            return (
              <div key={i} className="flex flex-col items-center justify-end w-full h-full">
                <div className="mb-2 text-xs text-gray-600">{hhmmToDisplayWithUnits(d.netHHMM)}</div>
                <div
                  className={`w-6 md:w-8 rounded-t transition-all duration-700`}
                  style={{
                    height: `${pct}%`,
                    backgroundColor: "rgb(16 185 129)"
                  }}
                  title={`${d.day}: ${d.netHHMM}`}
                />
                <span className="text-xs font-medium text-gray-600 mt-2">{d.day}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-3 text-xs text-gray-400">
          Weekly worked hours 
        </div>
      </div>
    </div>
  );
};

export default TrackedHours;
