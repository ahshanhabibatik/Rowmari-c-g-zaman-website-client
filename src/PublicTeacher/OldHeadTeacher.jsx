import { useEffect, useState } from "react";
import useAxiosPublic from "../Hook/UseAxiosPublic";
import NavBar from "../Navber/NavBar";
import './head.css'

const OldHeadTeacher = () => {
    const axiosPublic = useAxiosPublic();
    const [oldHeadTeacher, setOldHeadTeacher] = useState([]);

    useEffect(() => {
        const fetchOldHeadTeacher = async () => {
            try {
                const res = await axiosPublic.get('/oldHeadTeacher');
                const sortedData = res.data.sort((a, b) => a.SL - b.SL);  
                setOldHeadTeacher(sortedData);
            } catch (error) {
                console.log(error);
            }
        };
        fetchOldHeadTeacher();
    }, [axiosPublic]);

    return (
        <div className="lg:h-[120vh] bg-[#3a1f5e] pb-6">
            <NavBar />

            <div>
                <h1 className="md:text-3xl text-xl font-bold uppercase text-center mt-3 text-white">Former Head Teacher</h1>
            </div>
            <div className="border lg:w-[1000px] mx-auto px-2 py-2 mt-6 rounded-lg">
                <div className="border rounded-lg px-2 py-2 bg-gray-100">
                    <table className="border lg:w-[965px] md:w-[733px]">
                        <thead>
                            <tr className="bg-[#E9E9E9]">
                                <th className="border text-center md:p-4">SL</th>
                                <th className="border text-center md:p-4">Headmaster Name</th>
                                <th className="border text-center md:p-4">From Date</th>
                                <th className="border text-center  md:p-4">To Date</th>
                                <th className="border text-center  md:p-4">Picture</th>
                            </tr>
                        </thead>
                        <tbody>
                            {oldHeadTeacher.map((headTeacher, index) => (
                                <tr key={headTeacher._id} className={index % 2 === 0 ? "bg-white" : "bg-[#E9E9E9]"}>
                                    <td className="border text-center  md:p-4">{headTeacher.SL}</td>
                                    <td className="border text-center  md:p-4">{headTeacher['Headmaster Name']}</td>
                                    <td className="border text-center  md:p-4">{headTeacher['From Date']}</td>
                                    <td className="border text-center  md:p-4">{headTeacher['To Date']}</td>
                                    <td className="border text-center  md:p-4">
                                        {headTeacher.Picture && (
                                            <img className="h-20 flex mx-auto" src={headTeacher.Picture} alt="Headteacher" style={{ width: '100px' }} />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default OldHeadTeacher;
