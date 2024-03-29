import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../Hook/AxiosSecure";
import { AuthContext } from "../Provider/AuthProvider";
import { Link } from "react-router-dom";

const ViewTeacherInfo = () => {
    const axiosSecure = useAxiosSecure();
    const [teacher, setTeacher] = useState(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchTeacher = async () => {
            try {
                const res = await axiosSecure.get('/generalTeacher');
                const matchingTeacher = res.data.find(t => t.Email === user?.email);
                if (matchingTeacher) {
                    setTeacher(matchingTeacher);
                }
            } catch (error) {
                console.log(error);
            }
        };
        if (user && user.email) {
            fetchTeacher();
        }
    }, [axiosSecure, user]);

    return (
        <div className="my-6">
            {teacher ? (
                <div>
                    <div>
                        <h1 className="text-2xl text-center my-4 uppercase font-bold">Teacher Information</h1>

                        <table className="border border-gray-400 mx-auto lg:w-[880px] md:w-[600px] w-full">
                            <tbody>
                                <tr className="bg-slate-200">
                                    <td></td>
                                    <td colSpan={4} className=" p-2 lg:px-40 md:px-20 px-16">
                                        <img src={teacher.Picture} alt="Teacher" className="w-40 h-40 rounded-full" />
                                    </td>
                                </tr>
                                <tr className="bg-[#E9E9E9]">
                                    <td className="border border-gray-400 p-2 font-bold">Name</td>
                                    <td className="border border-gray-400 p-2">{teacher.name}</td>
                                    <td className="border border-gray-400 p-2 font-bold">Designation</td>
                                    <td className="border border-gray-400 p-2">{teacher.Designation}</td>
                                </tr>

                                <tr>
                                    <td className="border border-gray-400 p-2 font-bold">Father Name</td>
                                    <td className="border border-gray-400 p-2">{teacher.Father}</td>
                                    <td className="border border-gray-400 p-2 font-bold">Mother Name</td>
                                    <td className="border border-gray-400 p-2">{teacher.Mother}</td>
                                </tr>
                                <tr className="bg-[#E9E9E9]">
                                    <td className="border border-gray-400 p-2 font-bold">Spouse Name</td>
                                    <td className="border border-gray-400 p-2">{teacher.Spouse}</td>
                                    <td className="border border-gray-400 p-2 font-bold">Date of Barth</td>
                                    <td className="border border-gray-400 p-2">{teacher.Birth}</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-400 p-2 font-bold">Gadget No</td>
                                    <td className="border border-gray-400 p-2">{teacher.Gadget}</td>
                                    <td className="border border-gray-400 p-2 font-bold">Religion</td>
                                    <td className="border border-gray-400 p-2">{teacher.Religion}</td>
                                </tr>
                                <tr className="bg-[#E9E9E9]">
                                    <td className="border border-gray-400 p-2 font-bold">Blood Group</td>
                                    <td className="border border-gray-400 p-2">{teacher.bloodGroup}</td>
                                    <td className="border border-gray-400 p-2 font-bold">Gender</td>
                                    <td className="border border-gray-400 p-2">{teacher.gender}</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-400 p-2 font-bold">Marital Status</td>
                                    <td className="border border-gray-400 p-2">{teacher.Marital}</td>
                                    <td className="border border-gray-400 p-2 font-bold">Shift</td>
                                    <td className="border border-gray-400 p-2">{teacher.Shift}</td>
                                </tr>
                                <tr className="bg-[#E9E9E9]">
                                    <td className="border border-gray-400 p-2 font-bold">Qualification</td>
                                    <td className="border border-gray-400 p-2">{teacher.Qualification}</td>
                                    <td className="border border-gray-400 p-2 font-bold">Teaching</td>
                                    <td className="border border-gray-400 p-2">{teacher.Teaching}</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-400 p-2 font-bold">First Join Date</td>
                                    <td className="border border-gray-400 p-2">{teacher.Join}</td>
                                    <td className="border border-gray-400 p-2 font-bold">Present Address</td>
                                    <td className="border border-gray-400 p-2">{teacher.Present}</td>
                                </tr>
                                <tr className="bg-[#E9E9E9]">
                                    <td className="border border-gray-400 p-2 font-bold">Permanent Address</td>
                                    <td className="border border-gray-400 p-2">{teacher.Permanent}</td>
                                    <td className="border border-gray-400 p-2 font-bold">Phone Number</td>
                                    <td className="border border-gray-400 p-2">{teacher.number}</td>
                                </tr>

                            </tbody>
                        </table>

                    </div>
                    <button className="btn btn-outline my-6 flex mx-auto">
                        <Link to={`updateInfo/${teacher?._id}`}>
                            Update Information
                        </Link>
                    </button>
                </div>
            ) : (
                <p>No teacher information found for the logged-in user.</p>
            )}
        </div>
    );
};

export default ViewTeacherInfo;
