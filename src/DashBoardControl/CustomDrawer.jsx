import React, { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { FaHome, FaShoppingCart } from 'react-icons/fa';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import "./custom.css"

const CustomDrawer = ({ isAdmin, isTeacher, isOpen, onClose }) => (
    <Drawer
        open={isOpen}
        onClose={onClose}
        direction='left'
        className=' w-64 '
    >
        <ul className="menu  bg-[#74189c] h-full text-white ">
            <li id='sidebar '>
                {isAdmin && (
                    <>
                        <NavLink to={'/dashboard'}>
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
                {!isAdmin && !isTeacher && (
                    <>
                        <NavLink to={'/dashboard/userHome'}>
                            <FaHome /> User Home
                        </NavLink>
                        <NavLink to={'/dashboard/cart'}>
                            <FaShoppingCart /> My Result
                        </NavLink>
                    </>
                )}
            </li>

            <div className="divider"></div>

            <NavLink to={'/'}>
                <div className="flex items-center gap-1">
                    <FaHome />
                    <span>Home</span>
                </div>
            </NavLink>
        </ul>
    </Drawer>
);

export default CustomDrawer;