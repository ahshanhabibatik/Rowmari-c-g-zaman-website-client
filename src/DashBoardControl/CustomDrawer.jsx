import React, { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { FaHome, FaShoppingCart } from 'react-icons/fa';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';

const CustomDrawer = ({ isAdmin, isTeacher, isOpen, onClose }) => (
    <Drawer
        open={isOpen}
        onClose={onClose}
        direction='left'
        className='bg-orange-300 w-64'
    >
        <ul className="menu">
            <li>
                {isAdmin && (
                    <>
                        <NavLink to={'/dashboard/home'}>
                            <FaHome /> Admin Home
                        </NavLink>
                        <NavLink to={'/dashboard/users'}>
                            <FaHome /> All User
                        </NavLink>
                        <NavLink to={'/dashboard/surveyorRequest'}>
                            <FaHome /> Student Info
                        </NavLink>
                        <NavLink to={'/dashboard/surveyResponse'}>
                            <FaHome /> Result
                        </NavLink>
                        <NavLink to={'/dashboard/paymentHistory'}>
                            <FaHome /> News
                        </NavLink>
                    </>
                )}
                {isTeacher && (
                    <>
                        <NavLink to={'/dashboard/teacherHome'}>
                            <FaHome /> Teacher Home
                        </NavLink>
                        <NavLink to={'/dashboard/addSurvey'}>
                            <FaShoppingCart /> Add Result
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