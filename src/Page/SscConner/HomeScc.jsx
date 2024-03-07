import React, { useEffect } from "react";
import useAxiosPublic from "../../Hook/UseAxiosPublic";
import { CiViewTimeline } from "react-icons/ci";
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';

const HomeScc = () => {
    const axiosPublic = useAxiosPublic();

    const [sscData, setSscData] = React.useState([]);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true
        });
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosPublic.get("/sscResult");
                setSscData(response.data);
            } catch (error) {
                console.error("Error fetching SSC result:", error);
            }
        };

        fetchData();
    }, [axiosPublic]);

    return (
        <div className="mx-8 border-2 rounded-lg mb-5" data-aos="fade-up">
            <div className="bg-slate-600 px-8 py-6 text-center border rounded-t-lg">
                <h1 className="text-white text-3xl font-bold">SSC CORNER</h1>
            </div>
            <div className="px-2 py-1">
                {sscData.slice(0, 6).map((result, index) => (
                    <div key={index} className={`mb-2 border p-2 rounded-lg ${index % 2 === 0 ? 'bg-slate-300' : 'bg-gray-300'}`} data-aos="fade-up">
                        <div className="flex items-center gap-2">
                            <span className="mt-[2px]">
                                <CiViewTimeline />
                            </span>
                            <a href={result.link} target="_blank" rel="noopener noreferrer">
                                {result.description}
                            </a>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center pb-2" data-aos="fade-up">
                <Link to={'/ssc'}> <button className="btn btn-outline w-40 ">See more</button></Link>
            </div>
        </div>
    );
};

export default HomeScc;
