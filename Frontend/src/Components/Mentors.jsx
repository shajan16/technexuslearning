import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../Context/Context';

export const Mentors = () => {

  let {URL}=useContext(UserContext);

  let [allimage, setallimage] = useState([]);

  useEffect(() => {
    axios
      .get(`${URL}/getimages`)
      .then((data) => setallimage(data.data))
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="p-4 md:p-10 mt-10">
      <div className="w-2/3 text-3xl md:text-5xl font-bold">
        <h1>Our Experience & Professional Mentors</h1>
      </div>

      <div className='flex overflow-hidden space-x-12'>
        {[...Array(3)].map((_, idx) => (
          <div
            className="flex moving flex-nowrap gap-x-6 md:gap-x-12 mt-6 md:mt-10"
            aria-hidden={idx > 0 ? 'true' : undefined}
            key={idx}
          >
            {!allimage || allimage.length === 0 ? (
              <h1 className="text-base md:text-lg">
                Please Upload Mentors Details!!
              </h1>
            ) : (
              allimage.map((data) => (
                <div
                  className="flex flex-col items-center min-w-[160px] md:min-w-[200px]"
                  key={data._id}
                >
                  <img
                    src={`${URL}/uploadimage/${data.path}`}
                    alt="Mentor"
                    className="w-28 h-28 md:w-40 md:h-40 object-cover shadow-md"
                  />
                  <p className="tracking-widest font-bold pt-3 w-full flex justify-center text-sm md:text-base">
                    {data.mentorname}
                  </p>
                  <p className="font-light text-xs md:text-sm tracking-widest w-full flex justify-center text-center">
                    {data.mentorrole}
                  </p>
                </div>
              ))
            )}
          </div>
        ))}
      </div>
    </div>
  );
};