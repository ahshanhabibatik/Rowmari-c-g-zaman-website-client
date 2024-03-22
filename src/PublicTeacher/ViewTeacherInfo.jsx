import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../Hook/AxiosSecure";
import { AuthContext } from "../Provider/AuthProvider";

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
        <div>
            {teacher ? (
                <div>
                    <h1>Teacher Information</h1>
                    <table className="border-collapse border border-gray-400">
                        <tbody>
                            <tr>
                                <td className="border border-gray-400 p-2 font-bold">Name</td>
                                <td className="border border-gray-400 p-2">{teacher.name}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-400 p-2 font-bold">Designation</td>
                                <td className="border border-gray-400 p-2">{teacher.Designation}</td>
                            </tr>
                            {/* Add other fields similarly */}
                            <tr>
                                <td className="border border-gray-400 p-2 font-bold">Picture</td>
                                <td className="border border-gray-400 p-2"><img src={teacher.Picture} alt="Teacher" className="w-32 h-auto" /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No teacher information found for the logged-in user.</p>
            )}
        </div>
    );
};

export default ViewTeacherInfo;
