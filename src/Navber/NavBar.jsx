import { NavLink } from "react-router-dom";
import useAdmin from "../PanelControl/UseAdmin";
import UseTeacher from "../PanelControl/UseTEacher";
import { useState } from "react";

const NavBar = () => {
    const [isAdmin] = useAdmin();
    const [isTeacher] = UseTeacher();
    const [activeMenu, setActiveMenu] = useState(null);

    const handleMenuClick = (menu) => {
        if (activeMenu !== menu) {
            setActiveMenu(menu);
        }
    };

    const navOptions = (
        <>
            <li><NavLink exact to={'/'} activeClassName="active" onClick={() => handleMenuClick('home')} style={activeMenu === 'home' ? { borderBottom: '2px solid red' } : null}>Home</NavLink></li>

            <li><NavLink to={'/about'} activeClassName="active" onClick={() => handleMenuClick('about')} style={activeMenu === 'about' ? { borderBottom: '2px solid red' } : null}>About Us</NavLink></li>

            <li><NavLink to={'/teacherInfo'} activeClassName="active" onClick={() => handleMenuClick('teacher')} style={activeMenu === 'teacher' ? { borderBottom: '2px solid red' } : null}>Teacher Information</NavLink></li>

            <li className="dropdown">
                <label tabIndex={0} className="">Student</label>
                <ul className="menu dropdown-content mt-3 z-[1] p-2 shadow bg-[#330033] rounded-box w-32">
                    <li><NavLink to={'/allStu'} activeClassName="active" onClick={() => handleMenuClick('allStudents')} style={activeMenu === 'allStudents' ? { borderBottom: '2px solid red' } : null}>All Students</NavLink></li>


                    <li><NavLink to={'/total'} activeClassName="active" onClick={() => handleMenuClick('totalStudents')} style={activeMenu === 'totalStudents' ? { borderBottom: '2px solid red' } : null}>Total Student</NavLink></li>
                </ul>
            </li>

            <li><NavLink to={'/result'} activeClassName="active" onClick={() => handleMenuClick('result')} style={activeMenu === 'result' ? { borderBottom: '2px solid red' } : null}>Result</NavLink></li>


            {(isAdmin || isTeacher) && (
                <li><NavLink to={'/dashBoard'} activeClassName="active" onClick={() => handleMenuClick('dashboard')} style={activeMenu === 'dashboard' ? { borderBottom: '2px solid red' } : null}>DashBoard</NavLink></li>
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
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-[#330033] rounded-box w-52">
                                {navOptions}
                            </ul>
                        </div>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1 text-xl">
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
