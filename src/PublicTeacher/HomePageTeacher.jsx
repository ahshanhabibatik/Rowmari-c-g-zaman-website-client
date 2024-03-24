import { useEffect, useState } from "react";
import useAxiosPublic from "../Hook/UseAxiosPublic";
import NavBar from "../Navber/NavBar";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const HomePageTeacher = () => {
    const axiosPublic = useAxiosPublic();
    const [homePageTeacher, setHomePageTeacher] = useState([]);

    useEffect(() => {
        const fetchOldHeadTeacher = async () => {
            try {
                const res = await axiosPublic.get('/homePageTeacher');
                const sortedData = res.data.sort((a, b) => a.SL - b.SL);
                setHomePageTeacher(sortedData);
            } catch (error) {
                console.log(error);
            }
        };
        fetchOldHeadTeacher();
    }, [axiosPublic]);

    return (
        <div>
            <NavBar></NavBar>
            <div className="bg-[#3a1f5e] text-white py-7 px-2 overflow-x-auto">
                <h1 className=" text-center py-4 md:text-3xl text-xl font-bold uppercase text-white mb-2">All Teacher Information</h1>
                <table className="lg:w-[900px] md:w-[650px] w-full mx-auto ">
                    <thead>
                        <tr>
                            <th className="border text-center p-1 md:py-3 py-3">SL</th>
                            <th className="border text-center p-1  md:py-0 py-3">Teacher Name</th>
                            <th className="border text-center p-1  md:py-0 py-3">Designation</th>
                            <th className="border text-center p-1  md:py-0 py-3">Picture</th>
                            <th className="border text-center p-1  md:py-0 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {homePageTeacher.map((teacher, index) => (
                            <tr className="border text-center p-1  md:py-0 py-3" key={teacher._id}>
                                <td>{index + 1}</td>
                                <td className="border text-center p-1  md:py-1 py-3">{teacher.name}</td>
                                <td className="border text-center p-1  md:py-1 py-3">{teacher.Designation}</td>
                                <td className="border text-center p-1  md:py-1 py-3"><img src={teacher.Picture} className="md:w-20 w-10 h-10 border rounded-full md:h-20 flex justify-center mx-auto" alt="" /></td>
                                <td className="border text-center p-1  md:py-1 py-3">
                                    <Link to={`/individualTeacher/${teacher?._id}`}>

                                        <button className="border px-1 py-1 flex items-center gap-1 mx-auto rounded-lg hover:bg-gray-400">
                                            <div>
                                                <FaEye></FaEye>
                                            </div>
                                            <div>
                                                View
                                            </div>
                                        </button>

                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HomePageTeacher;
