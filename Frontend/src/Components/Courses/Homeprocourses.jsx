import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/Context';


const Homeprocourses = () => {

    let {URL}=useContext(UserContext);

    let navi = useNavigate();
    let location = useLocation();
    let courses = useRef();

    const [allcourses, setallcourses] = useState([]);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (location.state?.scrollcourses && courses.current) {
            courses.current.scrollIntoView();
        }
    }, [location]);

    useEffect(() => {
        axios.get(`${URL}/getprocourses`)
            .then((data) => setallcourses(data.data))
            .catch((err) => {
                console.log(err.message);
            })
    }, [])

    const handleview = (id) => {
        navi(`/procoursedetails/${id}`);
    };

    const coursesToShow = isSmallScreen ? 3 : 6;

    return (
        <div className="mt-20 md:mt-20 px-5 md:px-10">
            <div
                className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide py-5"
                ref={courses}
            >
                <h1>Our Professional Courses</h1>
            </div>

            <div className="flex flex-wrap justify-center px-5 md:px-0 gap-6 md:gap-5">
                {!allcourses ? (
                    <h1>Please Upload Course Details</h1>
                ) : (
                    allcourses.slice(0, coursesToShow).map((course) => (
                        <div
                            className="w-full sm:w-[80%] md:w-[48%] lg:w-[32%] h-72 relative overflow-hidden cursor-pointer rounded-2xl shadow-lg group transition-transform duration-300 transform hover:scale-105 hover:z-10"
                            key={course._id}
                            onClick={() => handleview(course._id)}
                        >
                            <img
                                src={`${URL}/uploadprocourse/${course.courseicon}`}
                                alt=""
                                className="absolute m-5 w-10 h-10 md:w-12 md:h-12 z-10 rounded-full"
                            />
                            <img
                                src={`${URL}/uploadprocourse/${course.courseimg}`}
                                alt=""
                                className="w-full h-full object-cover absolute inset-0 group-hover:opacity-0 transition-opacity duration-500"
                            />
                            <video
                                type="video/mp4"
                                src={`${URL}/uploadprocourse/${course.coursevideo}`}
                                muted
                                loop
                                className="w-full h-full object-fill absolute opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                onMouseOver={(e) => {
                                    e.target.play();
                                }}
                                onMouseOut={(e) => {
                                    e.target.pause();
                                }}
                            ></video>
                            <p className="absolute bottom-2 text-white left-6 text-lg md:text-2xl font-medium tracking-wide z-20">
                                {course.name
                                    .split(" ")
                                    .map(
                                        (word) =>
                                            word.charAt(0).toUpperCase() + word.slice(1)
                                    )
                                    .join(" ")}
                            </p>
                        </div>
                    ))
                )}
            </div>
            <div className="flex justify-center text-base md:text-xl tracking-widest mt-6">
                <button
                    className="text-gray-700 hover:text-black font-medium cursor-pointer"
                    onClick={() => {
                        navi("/procourses");
                    }}
                >
                    Show More Courses
                    <i className="fa-solid fa-arrow-right ml-2"></i>
                </button>
            </div>
        </div>
    )
}

export default Homeprocourses;