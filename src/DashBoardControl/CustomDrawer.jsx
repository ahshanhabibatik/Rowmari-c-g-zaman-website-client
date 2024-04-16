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
        <ul className="bg-white h-full text-black overflow-y-auto">
            <div className='text-center'>
                <h1 className='uppercase text-2xl'>Welcome RCGZHS</h1>
                <span className=' uppercase'>DashBoard</span>

                <hr className='my-1' />
            </div>
            <li id='sidebar'>
                {isAdmin && (
                    <>
                        <NavLink to={'/dashboard/home'}>
                            <div className='flex items-center px-2 gap-1'>
                                <div>
                                    <FaHome />
                                </div>
                                <div>
                                    Home
                                </div>
                            </div>

                        </NavLink>
                        <NavLink to={'/dashboard/users'}>

                            <div className='flex items-center px-2 gap-1'>
                                <div>
                                    <FaHome />
                                </div>
                                <div>
                                    All User
                                </div>
                            </div>

                        </NavLink>
                        <NavLink to={'/dashboard/stuInfo'}>

                            <div className='flex items-center px-2 gap-1'>
                                <div>
                                    <FaHome />

                                </div>
                                <div>
                                    Student Info
                                </div>
                            </div>

                        </NavLink>
                        <NavLink to={'/dashboard/studentInfo'}>

                            <div className='flex items-center px-2 gap-1'>
                                <div>
                                    <FaHome />
                                </div>
                                <div>
                                    Add Student Info
                                </div>
                            </div>

                        </NavLink>
                        <NavLink to={'/dashboard/result'}>

                            <div className='flex items-center px-2 gap-1'>
                                <div>
                                    <FaHome />
                                </div>
                                <div>
                                    Result
                                </div>
                            </div>

                        </NavLink>
                        <NavLink to={'/dashboard/publicResult'}>
                            <div className='flex items-center px-2 gap-1'>
                                <div>
                                    <FaHome />
                                </div>
                                <div>
                                    Published Result
                                </div>
                            </div>
                        </NavLink>

                        <NavLink to={'/dashboard/showNews'}>
                            <div className='flex items-center px-2 gap-1'>
                                <div>
                                    <FaHome />
                                </div>
                                <div>
                                    News
                                </div>
                            </div>

                        </NavLink>
                        <NavLink to={'/dashboard/adNews'}>
                            <div className='flex items-center px-2 gap-1'>
                                <div>
                                    <FaHome />
                                </div>
                                <div>
                                    Upload News
                                </div>
                            </div>

                        </NavLink>

                        <NavLink to={'/dashboard/admit'}>
                            <div className='flex items-center px-2 gap-1'>
                                <div>
                                    <FaHome />
                                </div>
                                <div>
                                    Admit Card
                                </div>
                            </div>
                        </NavLink>
                        <NavLink to={'/dashboard/seeAdmit'}>
                            <div className='flex items-center px-2 gap-1'>
                                <div>
                                    <FaHome />
                                </div>
                                <div>
                                    Show Admit
                                </div>
                            </div>

                        </NavLink>
                        <NavLink to={'/dashboard/ssc'}>
                            <div className='flex items-center px-2 gap-1'>
                                <div>
                                    <FaHome />
                                </div>
                                <div>
                                    Ssc Result
                                </div>
                            </div>

                        </NavLink>
                        <NavLink to={'/dashboard/addEvent'}>
                            <div className='flex items-center px-2 gap-1'>
                                <div>
                                    <FaHome />
                                </div>
                                <div>
                                    Event Management
                                </div>
                            </div>

                        </NavLink>
                        <NavLink to={'/dashboard/showEventAdmin'}>
                            <div className='flex items-center px-2 gap-1'>
                                <div>
                                    <FaHome />
                                </div>
                                <div>
                                    Show Event
                                </div>
                            </div>

                        </NavLink>

                    </>
                )}
                {isTeacher && (
                    <>
                        <NavLink to={'/dashboard/teacherHome'}>
                            <div className='flex items-center px-2 gap-1'>
                                <div>
                                    <FaHome />
                                </div>
                                <div>
                                    Teacher Home
                                </div>
                            </div>

                        </NavLink>
                        <NavLink to={'/dashboard/teacherRegister'}>
                            <div className='flex items-center px-2 gap-1'>
                                <div>
                                    <FaHome />
                                </div>
                                <div>
                                    Teacher Register
                                </div>
                            </div>

                        </NavLink>
                        <NavLink to={'/dashboard/registerInfo'}>
                            <div className='flex items-center px-2 gap-1'>
                                <div>
                                    <FaHome />
                                </div>
                                <div>
                                    View Profile
                                </div>
                            </div>

                        </NavLink>

                        <NavLink to={'/dashboard/addResult'}>
                            <div className='flex items-center px-2 gap-1'>
                                <div>
                                    <FaShoppingCart />
                                </div>
                                <div>
                                    Add Result
                                </div>
                            </div>

                        </NavLink>
                        <NavLink to={'/dashboard/SeeResult'}>

                            <div className='flex items-center px-2 gap-1'>
                                <div>
                                    <FaShoppingCart />
                                </div>
                                <div>
                                    Result
                                </div>
                            </div>

                        </NavLink>
                        <NavLink to={'/dashboard/surveyData'}>
                            <div className='flex items-center px-2 gap-1'>
                                <div>
                                    <FaShoppingCart />
                                </div>
                                <div>
                                    Passing Student
                                </div>
                            </div>

                        </NavLink>
                    </>
                )}

            </li>

            <div> <hr /> </div>

            <div className=''>
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