import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../Hook/AxiosSecure";
import { AuthContext } from "../../Provider/AuthProvider";
import './adminHome.css';
import Typewriter from 'typewriter-effect';
import { FaUsers } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa";

const AdminHome = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [users, setUsers] = useState();
    const [student, setStudent] = useState();

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
            <div className="flex gap-4">
                <div>
                    <div className="background w-48 h-20 text-center flex items-center justify-center gap-4 border rounded-lg">
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
                    <div className="bg w-48 h-20 text-center flex items-center justify-center gap-4 border rounded-lg">
                        <div className="text-4xl text-white">
                            <FaUserGraduate />
                        </div>
                        <div>
                            <h1 className="text-center text-3xl font-bold text-white">{student?.length}</h1>
                            <span className="text-center font-bold text-white">Total Student</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
