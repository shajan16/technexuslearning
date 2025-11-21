import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const WhatsAppForm = () => {

    let navi=useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    service: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const sendToWhatsApp = () => {
    const phoneNumber = "919787442323";
    const text = `Hello, My name is ${formData.name}.
I’m Interested in your ${formData.service} service and would like to discuss the details further.
Project details: ${formData.description}.
Please let me know a convenient time to talk or how we can proceed.
Thank you!`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <div>
        <div className='px-4 md:px-16 py-5 md:py-10 absolute text-3xl md:text-5xl'>
       <i className="fa-solid fa-arrow-left-long cursor-pointer text-white" onClick={()=>navi(-1)}></i>
      </div>
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-md p-6 rounded-2xl bg-zinc-900 shadow-[0_0_20px_4px_rgba(147,51,234,0.4)]">
        <h2 className="text-2xl font-bold text-center mb-6 text-neon">
          Enquire Now
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 mb-4 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <select
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="w-full p-3 mb-4 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select a service</option>
          <option value="Web Development">Web Development</option>
          <option value="Mobile App Development">Mobile App Development</option>
          <option value="Software Development">Software Development</option>
          <option value="Cybersecurity">Cybersecurity</option>
          <option value="Cloud Solutions">Cloud Solutions</option>
          <option value="Digital Marketing">Digital Marketing</option>
          <option value="Mulitimedia Editing">Mulitimedia Editing</option>
        </select>

        <textarea
          name="description"
          placeholder="Project Details.."
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="w-full p-3 mb-6 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
        ></textarea>

        <button
          onClick={sendToWhatsApp}
          disabled={!formData.name || !formData.service || !formData.description}
          className="w-full py-3 text-lg font-semibold text-gray-900  bg-gradient-to-br from-purple-600 to-blue-500 hover:shadow-[0_0_20px_5px_rgba(147,51,234,0.4)] rounded-lg cursor-pointer transition-all disabled:opacity-40"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
  );
};

export default WhatsAppForm;    
