import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/Context";

const Staffsreport = () => {

  let {URL}=useContext(UserContext);

  let navi= useNavigate();
 
  const getLocalDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getFormattedTodayLabel = () => {
    const today = new Date();
    const options = { month: "short", day: "numeric" };
    return `Today (${today.toLocaleDateString("en-US", options)})`;
  };

  const [staffList, setStaffList] = useState([]);
  const [dailyData, setDailyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(getLocalDate);
  const [selectedMonth, setSelectedMonth] = useState(
    () => (new Date().getMonth() + 1).toString().padStart(2, "0")
  );
  const [selectedYear, setSelectedYear] = useState(() =>
    new Date().getFullYear().toString()
  );
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    fetchStaffs();
  }, []);

  useEffect(() => {
    if (staffList.length > 0) {
      fetchDaily(selectedDate);
      fetchMonthly(selectedYear, selectedMonth);
    }
  }, [staffList]);

  const fetchStaffs = async () => {
    try {
      const res = await axios.get(`${URL}/getstaffs`);
      setStaffList(res.data || []);
    } catch (err) {
      console.error("Error fetching staffs:", err);
      setStaffList([]);
    }
  };

  const fetchDaily = async (date) => {
    if (!date) return;
    setLoading(true);
    try {
      const res = await axios.get(`${URL}/staffsadmin/daily`, { params: { date } });
      setDailyData(res.data.data || []);
    } catch (err) {
      console.error("fetchDaily error:", err);
      setDailyData([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchMonthly = async (year, month) => {
    if (!year || !month) return;
    setLoading(true);
    try {
      const res = await axios.get(`${URL}/staffsadmin/monthly`, { params: { year, month } });
      setMonthlyData(res.data.data || []);
    } catch (err) {
      console.error("fetchMonthly error:", err);
      setMonthlyData([]);
    } finally {
      setLoading(false);
    }
  };

  const formatSeconds = (seconds) => {
    if (!seconds || seconds <= 0) return "0h 0m";
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hrs}h ${mins}m`;
  };

  const formatTime = (isoString) => {
    if (!isoString) return "--";
    const d = new Date(isoString);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
  };

  const getDaily = (userId) =>
    dailyData.find((d) => String(d._id.toUpperCase()) === String(userId.toUpperCase())) || null;

  const getMonthly = (userId) =>
    monthlyData.find((d) => String(d._id.toUpperCase()) === String(userId.toUpperCase())) || null;

  const monthOptions = Array.from({ length: 12 }, (_, i) => {
    const num = (i + 1).toString().padStart(2, "0");
    const label = new Date(2020, i, 1).toLocaleString("default", { month: "short" });
    return { value: num, label: `${label} (${num})` };
  });

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 6 }, (_, i) => (currentYear - i).toString());

  return (
    <>
    <div className='py-2 px-5 absolute text-4xl md:text-5xl top-0 left-0 md:left-5' >
            <i className="fa-solid fa-arrow-left-long cursor-pointer" onClick={()=>{navi(-1)}}></i>
        </div>
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center">
        <h1 className="text-3xl font-bold mb-5">Staff Working Reports</h1>
        </div>

        {/* ✅ Today Label */}
        <p className="text-gray-700 mb-3 font-medium text-lg">
          📅 {getFormattedTodayLabel()}
        </p>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col md:flex-row gap-4 md:items-end">
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Daily Date</label>
            <input
              type="date"
              className="border rounded-md p-2"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                fetchDaily(e.target.value);
              }}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Month</label>
            <select
              className="border rounded-md p-2"
              value={selectedMonth}
              onChange={(e) => {
                setSelectedMonth(e.target.value);
                fetchMonthly(selectedYear, e.target.value);
              }}
            >
              {monthOptions.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Year</label>
            <select
              className="border rounded-md p-2"
              value={selectedYear}
              onChange={(e) => {
                setSelectedYear(e.target.value);
                fetchMonthly(e.target.value, selectedMonth);
              }}
            >
              {yearOptions.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => {
                fetchDaily(selectedDate);
                fetchMonthly(selectedYear, selectedMonth);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="text-left p-3">Staff</th>
                <th className="text-center p-3">Start Work</th>
                <th className="text-center p-3">End Work</th>
                <th className="text-center p-3">Worked Hours</th>
                <th className="text-center p-3">Break Time</th>
                <th className="text-center p-3">Monthly</th>
              </tr>
            </thead>
            <tbody>
              {staffList.length === 0 && (
                <tr>
                  <td colSpan="7" className="p-6 text-center text-gray-500">
                    No staff found.
                  </td>
                </tr>
              )}

              {staffList.map((staff) => {
                const daily = getDaily(staff.name);
                
                const monthly = getMonthly(staff.name);

                return (
                  <tr key={staff._id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{staff.name.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ") || staff.phone}
                      <p className="text-xs">{staff.role.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}</p>
                    </td>
                    <td className="p-3 text-center">
                      {loading ? "..." : daily?.earliestStart ? formatTime(daily.earliestStart) : "--"}
                    </td>
                    <td className={`p-3 text-center ${daily?.ongoingCount > 0 && "text-green-500"}`}>
                      {loading
                        ? "..."
                        : daily?.ongoingCount > 0
                        ? "Working"
                        : daily?.latestEnd
                        ? formatTime(daily.latestEnd)
                        : "--"}
                    </td>
                    
                    <td className="p-3 text-center font-semibold">
                      {loading ? "..." : formatSeconds(daily?.netSeconds)}
                    </td>
                    <td className="p-3 text-center">{loading ? "..." : formatSeconds(daily?.totalBreakSeconds)}</td>
                    <td className="p-3 text-center font-semibold">
                      {loading ? "..." : formatSeconds(monthly?.monthlyNetSeconds)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </>
  );
};

export default Staffsreport;
