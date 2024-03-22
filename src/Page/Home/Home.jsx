import { Link } from "react-router-dom";

import img1 from '../../assets/slider/1637769815_sld1.jpg';
import Banner from "../Banner/Banner";
import '../Home/home.css';
import Message from "../Message/Message";
import Ideal from "../Ideal/Ideal";
import Media from "../Media/Media";
import NavBar from "../../Navber/NavBar";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hook/UseAxiosPublic";
import './home.css'
import HomeScc from "../SscConner/HomeScc";
 
 

const Home = () => {

    const [news, setNews] = useState([]);
    const axiosPublic = useAxiosPublic();


    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axiosPublic.get('/news');
                setNews(response.data);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        fetchNews();

        // Cleanup function not needed here, as this effect doesn't set up any ongoing subscriptions
    }, [axiosPublic]);

    return (
        <div>
            <div className="relative z-10 ">
                <NavBar />
            </div>
            <div>
                <Banner />
            </div>
            <div>
                <div className="flex justify-evenly">
                    <div className=" px-3 mt-3 py-2 bg-white w-full text-center mx-8 rounded-md">
                        <h1 className="text-4xl  font-bold text-center animate-charcter merriweather-regular ">
                            Welcome to Rowmari C.G Zaman Govt. High School
                        </h1>
                    </div>
                </div>
                <div className="px-8 mb-10 lg:flex mt-8 gap-2">
                    <div className="lg:flex lg:w-[66%] lg:justify-around border shadow-lg h-[335px] px-2 rounded-lg">
                        <div className="mt-[6px]">
                            <img className="h-[320px] w-[400px] border rounded-l-lg" src={img1} alt="" />
                        </div>
                        <div className="border rounded-r-lg h-[320px] mt-[6px] px-2  bg-slate-100 lg:block hidden ">
                            <h1 className="lg:w-[350px] text-justify merriweather-regular">

                                Rowmari C. G. Zaman High School is a prominent government institution, known for its vast campus and commitment to quality education. Situated in a spacious area, the school stands as an impressive structure, offering a conducive environment for learning. With a student body of around 500 per class, it accommodates a significant number of young minds, fostering a diverse and vibrant educational community.The school prides itself on its dedicated faculty and ensuring holistic development for all students.
                            </h1>
                            <Link to={''}> <button className="btn btn-outline btn-warning   flex justify-end mx-auto">Load More..</button></Link>
                        </div>
                    </div>
                    <div className="lg:w-[34%] shadow-lg">
                        <div className="border bg-[#FF0000] h-80 rounded-lg">
                            <h1 className="text-white font-bold bg-[#EA2027] py-3 text-center">NOTICE BOARD</h1>
                            <div className="marquee-container">
                                <div className="marquee">
                                    {news.map((item, index) => (
                                        <Link key={index} to={'/news'}>
                                            <h1 className="border px-4 pb-3 pt-3 bg-[#FFC000] font-face ">
                                                {item.head}
                                            </h1>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-[#FFC000] h-14 flex justify-end  ">

                                <Link to={'/news'}>
                                    <button className="text-red-700 mt-6 text-xl mx-2 pb-2 hover:text-violet-500">Load More...</button>
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <Message></Message>
            </div>

            <div>
                <Ideal></Ideal>
            </div>
            <div>
                <HomeScc></HomeScc>
            </div>
            <div>
                <Media></Media>
            </div>
        </div>
    );
};

export default Home;
