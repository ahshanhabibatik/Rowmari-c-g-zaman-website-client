import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import useAdmin from '../PanelControl/UseAdmin';
import UseTeacher from '../PanelControl/UseTEacher';
import './navber.css';

const NavBar = () => {
    const [isAdmin] = useAdmin();
    const [isTeacher] = UseTeacher();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navOptions = (
        <>
            <li className="md:hidden">
                <button className="text-white" onClick={toggleMenu}>Menu</button>
            </li>

            <li>
                <NavLink to={'/'}>Home</NavLink>
            </li>

            <li className="dropdown">
                <button className="dropbtn">About Us</button>
                <ul className={`dropdown-content lg:w-28 ${isMenuOpen ? 'block' : 'hidden md:block'}`}>
                    <li className='hover:bg-teal-400 border'><NavLink to={'/about'}>Vision</NavLink></li>
                    <li className='hover:bg-teal-400 border '><NavLink to={'/total'}>Mission</NavLink></li>
                </ul>
            </li>

            <li>
                <NavLink to={'/teacherInfo'} >Teacher Information</NavLink>
            </li>

            <li className="dropdown">
                <button className="dropbtn">Student</button>
                <ul className={`dropdown-content   lg:w-[180px] ${isMenuOpen ? 'block' : 'hidden md:block'}`}>
                    <li className=' hover:bg-teal-400 border' ><NavLink to={'/allStu'}>All Students</NavLink></li>
                    <li className='hover:bg-teal-400 border '><NavLink to={'/total'}>Class Summary</NavLink></li>
                    <li className=' hover:bg-teal-400 border'><NavLink to={'/stuAdmit'}>Exam Routine</NavLink></li>
                    <li className='hover:bg-teal-400 border '><NavLink to={'/admit'}>Admit Card</NavLink></li>
                </ul>
            </li>

            <li>
                <NavLink to={'/result'} >Result</NavLink>
            </li>

            {(isAdmin || isTeacher) && (
                <li>
                    <NavLink to={'/dashBoard'} >DashBoard</NavLink>
                </li>
            )}
        </>
    );

    return (
        <div>
            <hr />
            <div className="bg-[#330033] ">
                <div className="navbar max-w-screen-xl text-white">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </label>
                            <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-[#330033] rounded-box w-52">
                                {navOptions}
                            </ul>
                        </div>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul id="sidebar" className="flex gap-5 menu-horizontal px-1 text-xl">
                            {navOptions}
                        </ul>
                    </div>
                    <div className="navbar-end"></div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
