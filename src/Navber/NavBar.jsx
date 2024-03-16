import React, { useContext, useEffect, useState } from 'react';
import './navber.css';
import { NavLink } from 'react-router-dom';
import useAdmin from '../PanelControl/UseAdmin';
import UseTeacher from '../PanelControl/UseTeacher';
import { AuthContext } from '../Provider/AuthProvider';
import useAxiosSecure from '../Hook/AxiosSecure';


const NavBar = () => {
    const [isResponsive, setIsResponsive] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
    const [isDropdownOpen3, setIsDropdownOpen3] = useState(false);
    const [isDropdownOpen4, setIsDropdownOpen4] = useState(false);
    const [isAdmin] = useAdmin();
    const [isTeacher] = UseTeacher();
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [isStudent, setIsStudent] = useState(false);

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const response = await axiosSecure.get(`/users/role/${user.email}`);
                const { student } = response.data;
                setIsStudent(student);
            } catch (error) {
                console.error('Error fetching user role:', error);
            }
        };

        if (user) {
            fetchUserRole();
        }
    }, [user, axiosSecure]);


    const toggleResponsive = () => {
        setIsResponsive(!isResponsive);
    }

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }
    const toggleDropdown2 = () => {
        setIsDropdownOpen2(!isDropdownOpen2);
    }
    const toggleDropdown3 = () => {
        setIsDropdownOpen3(!isDropdownOpen3);
    }
    const toggleDropdown4 = () => {
        setIsDropdownOpen4(!isDropdownOpen4);
    }

    return (
        <div className='roboto-regular '>
            <hr className='' />
            <div className={isResponsive ? "topnav responsive" : "topnav"}
                id="myTopnav">

                <div className='md:flex md:mx-auto md:justify-center'>

                    {/* home navbar */}

                    <NavLink to={'/'}>Home</NavLink>

                    {/* About us */}
                    <div className="dropdown1">
                        <button className="dropbtn md:block hidden" onClick={toggleDropdown}>About Us
                            <i className="fa fa-caret-down"></i>
                        </button>
                        <div className={isDropdownOpen ? "dropdown-content show" : "dropdown-content"}>

                            <NavLink to={'/vision'}>Vision</NavLink>
                            <NavLink to={'/mission'}>Mission</NavLink>

                        </div>
                    </div>
                    {/* teacher*/}
                    <div className="dropdown1">
                        <button className="dropbtn md:block hidden" onClick={toggleDropdown2}>Teacher
                            <i className="fa fa-caret-down"></i>
                        </button>
                        <div className={isDropdownOpen2 ? "dropdown-content show" : "dropdown-content"}>

                            <NavLink to={'/allStu'}>Former Headteachers</NavLink>
                            <NavLink to={'/total'}>Head Teacher</NavLink>
                            <NavLink to={'/allTeacher'}>All Teacher</NavLink>

                        </div>
                    </div>
                    {/* student */}
                    <div className="dropdown1">
                        <button className="dropbtn md:block hidden" onClick={toggleDropdown3}>Student
                            <i className="fa fa-caret-down"></i>
                        </button>
                        <div className={isDropdownOpen3 ? "dropdown-content show" : "dropdown-content"}>

                            <NavLink to={'/allStu'}>All Students</NavLink>
                            <NavLink to={'/total'}>Class Summary</NavLink>
                            <NavLink to={'/stuAdmit'}>Exam Routine</NavLink>
                            <NavLink to={'/admit'}>Admit Card</NavLink>
                        </div>
                    </div>
                    {/* result navbar */}
                    <NavLink to={'/result'} >Result</NavLink>

                    {/* Administration */}
                    <div className="dropdown1">
                        <button className="dropbtn md:block hidden" onClick={toggleDropdown4}>Administration
                            <i className="fa fa-caret-down"></i>
                        </button>
                        <div className={isDropdownOpen4 ? "dropdown-content show" : "dropdown-content"}>
                            <NavLink to={'/ssc'}>Ssc Result</NavLink>
                            <NavLink to={'/total'}>Head Teacher</NavLink>
                            <NavLink to={'/allTeacher'}>All </NavLink>

                        </div>
                    </div>

                    {/* dashbord */}
                    {(isAdmin || isTeacher) && (
                        <NavLink to={'/dashBoard'} >DashBoard</NavLink>
                    )}


                    {(isStudent) && (
                        <div className="dropdown1">
                            <button className="dropbtn md:block hidden" onClick={toggleDropdown3}>Student DashBoard
                                <i className="fa fa-caret-down"></i>
                            </button>
                            <div className={isDropdownOpen3 ? "dropdown-content show" : "dropdown-content"}>

                                <NavLink to={'/result'} >Result</NavLink>
                                <NavLink to={'/admit'}>Admit Card</NavLink>
                            </div>
                        </div>
                    )}



                    <a href="#" className="icon" onClick={toggleResponsive}>&#9776;</a>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
