import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../Hook/AxiosSecure";
import { AuthContext } from "../../Provider/AuthProvider";
import './adminHome.css';
import Typewriter from 'typewriter-effect';
import { FaUsers } from "react-icons/fa";
import { FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";
import { FaComputer } from "react-icons/fa6";
import { PiStudentBold } from "react-icons/pi";


const AdminHome = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [users, setUsers] = useState();
    const [student, setStudent] = useState();
    const [teacher, setTeacher] = useState();
    const [result, setResult] = useState();
    const [passStudent, setPassStudent] = useState();


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axiosSecure.get('/users');
                setUsers(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUsers();
    }, [axiosSecure]);


    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const res = await axiosSecure.get('/students');
                setStudent(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchStudent();
    }, [axiosSecure]);

    useEffect(() => {
        const fetchResultPerformance = async () => {
            try {
                const res = await axiosSecure.get('/generalTeacher');
                setTeacher(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchResultPerformance();
    }, [axiosSecure]);


    useEffect(() => {
        const fetchResult = async () => {
            try {
                const res = await axiosSecure.get('results/publish');
                setResult(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchResult();
    }, [axiosSecure]);

    useEffect(() => {
        const fetchPassResult = async () => {
            try {
                const res = await axiosSecure.get('results/publish');
                // Filter passing students
                const passingStudents = res.data.filter(student => student.totalGrade !== 'F');
                setPassStudent(passingStudents);
            } catch (error) {
                console.log(error);
            }
        };
        fetchPassResult();
    }, [axiosSecure]);

    return (
        <div className="px-8">
            <div className=''>
                <div className='typewrite flex justify-center'>
                    {user ? (
                        <Typewriter
                            options={{
                                strings: [
                                    `Hi,Welcome ${user.displayName || 'Hi Welcome Back'}`,
                                    'Welcome Back to Home.......'
                                ],
                                autoStart: true,
                                loop: true
                            }}
                        />
                    ) : null}
                </div>
            </div>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 pb-12 mx-auto justify-center">
                <div>
                    <div className="background w-72 h-32 text-center flex items-center justify-center gap-4 border rounded-lg">
                        <div className="text-4xl text-white">
                            <FaUsers></FaUsers>
                        </div>
                        <div>
                            <h1 className="text-center text-3xl font-bold text-white">{users?.length}</h1>
                            <span className="text-center font-bold text-white">Total User</span>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="bg4 w-72 h-32 text-center flex items-center justify-center gap-4 border rounded-lg">
                        <div className="text-4xl text-white">
                            <FaUserGraduate />
                        </div>
                        <div>
                            <h1 className="text-center text-3xl font-bold text-white">{student?.length}</h1>
                            <span className="text-center font-bold text-white">Total Student</span>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="bg2 w-72 h-32 text-center flex items-center justify-center gap-4 border rounded-lg">
                        <div className="text-4xl text-white">
                            <FaChalkboardTeacher />
                        </div>
                        <div>
                            <h1 className="text-center text-3xl font-bold text-white">{teacher?.length}</h1>
                            <span className="text-center font-bold text-white">Total Teacher</span>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="bg5 w-72 h-32 text-center flex items-center justify-center gap-4 border rounded-lg">
                        <div className="text-4xl text-white">
                            <FaComputer />
                        </div>
                        <div>
                            <h1 className="text-center text-3xl font-bold text-white">{result?.length}</h1>
                            <span className="text-center font-bold text-white">Published Result</span>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="bg6 w-72 h-32 text-center flex items-center justify-center gap-4 border rounded-lg">
                        <div className="text-4xl text-white">
                            <PiStudentBold />
                        </div>
                        <div>
                            <h1 className="text-center text-3xl font-bold text-white">{passStudent?.length}</h1>
                            <span className="text-center font-bold text-white">Passing Student</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
