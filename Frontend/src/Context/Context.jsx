import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const Provider = ({ children }) => {

  // Server-URL
  const URL="https://technexuslearning-backend.onrender.com";

  const [username, setUsername] = useState(()=> localStorage.getItem("username")|| "");
  const [staffname, setStaffname] = useState(() => localStorage.getItem("staffname") || "");
  const [adminname, setadminname] = useState(() => localStorage.getItem("adminname") || "");
  
  useEffect(() => {
    if (username) {
      localStorage.setItem("username", username);
    } else {
      localStorage.removeItem("username");
    }
  }, [username]);

  useEffect(() => {
    if (staffname) {
      localStorage.setItem("staffname", staffname);
    } else {
      localStorage.removeItem("staffname");
    }
  }, [staffname]);

  useEffect(() => {
    if (adminname) {
      localStorage.setItem("adminname", adminname);
    } else {
      localStorage.removeItem("adminname");
    }
  }, [adminname]);  

  const deleteStaffname = () => {
    setStaffname("");
    localStorage.removeItem("staffname");
  };

  return (
    <UserContext.Provider value={{URL, username, setUsername, staffname, setStaffname, deleteStaffname, adminname, setadminname}}>
      {children}
    </UserContext.Provider>
  );
};
