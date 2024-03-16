import React, { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { FaHome, FaShoppingCart } from 'react-icons/fa';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import "./custom.css"


const CustomDrawer = ({ isAdmin, isTeacher, isOpen, onClose }) => (


    < Drawer
        open={isOpen}
        onClose={onClose}
        direction='left'
        className=' w-64 '
    >
        <ul className="menu bg-[#54085e] h-full text-white overflow-y-auto">
            <div className='text-center'>
                <h1 className='uppercase text-2xl'>Welcome RCGZHS</h1>
                <span className=' uppercase'>DashBoard</span>

                <hr className='my-1' />
            </div>
            <li id='sidebar '>
                {isAdmin && (
                    <>
                        <NavLink to={'/dashboard/home'}>
                            <FaHome /> Admin Home
                        </NavLink>
                        <NavLink to={'/dashboard/users'}>
                            <FaHome /> All User
                        </NavLink>
                        <NavLink to={'/dashboard/stuInfo'}>
                            <FaHome /> Student Info
                        </NavLink>
                        <NavLink to={'/dashboard/studentInfo'}>
                            <FaHome />Add Student Info
                        </NavLink>
                        <NavLink to={'/dashboard/result'}>
                            <FaHome /> Result
                        </NavLink>
                        <NavLink to={'/dashboard/publicResult'}>
                            <FaHome /> Published Result
                        </NavLink>
                        <NavLink to={'/dashboard/showNews'}>
                            <FaHome /> News
                        </NavLink>
                        <NavLink to={'/dashboard/adNews'}>
                            <FaHome /> Upload News
                        </NavLink>

                        <NavLink to={'/dashboard/admit'}>
                            <FaHome /> Admit Card
                        </NavLink>
                        <NavLink to={'/dashboard/seeAdmit'}>
                            <FaHome /> Show Admit
                        </NavLink>
                        <NavLink to={'/dashboard/ssc'}>
                            <FaHome />Ssc Result
                        </NavLink>

                    </>
                )}
                {isTeacher && (
                    <>
                        <NavLink to={'/dashboard/teacherHome'}>
                            <FaHome /> Teacher Home
                        </NavLink>
                        <NavLink to={'/dashboard/addResult'}>
                            <FaShoppingCart /> Add Result
                        </NavLink>
                        <NavLink to={'/dashboard/SeeResult'}>
                            <FaShoppingCart /> Result
                        </NavLink>
                        <NavLink to={'/dashboard/surveyData'}>
                            Passing Student
                        </NavLink>
                    </>
                )}

            </li>

            <div> <hr /> </div>

            <div className='menu'>
                <NavLink to={'/'}>
                    <div className="flex items-center gap-1">
                        <FaHome />
                        <span>Home</span>
                    </div>
                </NavLink>
            </div>
        </ul>
    </Drawer >
);

export default CustomDrawer;