import { NavLink } from "react-router-dom";
import useAdmin from "../PanelControl/UseAdmin";
import UseTeacher from "../PanelControl/UseTEacher";

const NavBar = () => {
    const [isAdmin] = useAdmin();
    const [isTeacher] = UseTeacher();

    const navOptions = (
        <>
            <li><NavLink exact to={'/'} activeClassName="active">Home</NavLink></li>
            <li><NavLink to={'/about'} activeClassName="active">About Us</NavLink></li>
            <li><NavLink to={'/teacherInfo'} activeClassName="active">Teacher Information</NavLink></li>
            <li><NavLink to={'/studentInfo'} activeClassName="active">Student Information</NavLink></li>
            <li><NavLink to={'/result'} activeClassName="active">Result</NavLink></li>
            {(isAdmin || isTeacher) && (
                <li><NavLink to={'/dashBoard'} activeClassName="active">DashBoard</NavLink></li>
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
