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
            <div className="relative z-10">
                <NavBar />
            </div>
            <div>
                <Banner />
            </div>
            <div>
                <div className="flex justify-evenly">
                    <h1 className="text-4xl mt-3 font-bold text-center animate-charcter">
                        Welcome to Rowmari C.G Zaman Govt. High School
                    </h1>
                </div>
                <div className="px-8 mb-10 lg:flex mt-8">
                    <div className="lg:flex lg:w-[66%] lg:justify-around">
                        <div>
                            <img className="h-60 w-[400px]" src={img1} alt="" />
                        </div>
                        <div>
                            <h1 className="lg:w-[350px] text-justify mr-2">
                                Rowmari C. G. Zaman High School is a prominent government institution, known for its vast campus and commitment to quality education. Situated in a spacious area, the school stands as an impressive structure, offering a conducive environment for learning. With a student body of around 500 per class, it accommodates a significant number of young minds, fostering a diverse and vibrant educational community.
                            </h1>
                            <Link to={''}> <button className="btn btn-outline btn-warning mt-4">Load More..</button></Link>
                        </div>
                    </div>
                    <div className="lg:w-[34%]">
                        <div className="border bg-[#FF0000] h-80">
                            <h1 className="text-white font-bold bg-[#EA2027] py-3 text-center">NOTICE BOARD</h1>
                            <div className="marquee-container">
                                <div className="marquee">
                                    {news.map((item, index) => (
                                        <Link key={index} to={'/news'}>
                                            <h1 className="border px-4 pb-3 pt-3 bg-[#FFC000] font-face">
                                                {item.head}
                                            </h1>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-[#FFC000] h-14 flex justify-end  ">

                                <Link to={'/news'}>
                                    <button className="text-red-700 mt-6 text-xl">Load More...</button>
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
                <Media></Media>
            </div>
        </div>
    );
};

export default Home;
