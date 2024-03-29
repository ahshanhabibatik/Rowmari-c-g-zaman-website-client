import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import imgUser from '../../assets/imgGalary/user.png';
import logo from '../../assets/cgzaman logo (1).png';
import { AuthContext } from '../../Provider/AuthProvider';
import './Header.css';

const Header = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isNameVisible, setIsNameVisible] = useState(false);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleSignOut = () => {
        logOut()
            .then()
            .catch();
    };

    const toggleNameVisibility = () => {
        setIsNameVisible(!isNameVisible);
    };

    return (
        <div className={`header bg-[#2C134D] px-8 py-6 lg:flex justify-between items-center ${isNameVisible ? 'show-name' : ''}`}>
            <div className='lg:flex hidden'>
                <div>
                    <img src={logo} className='h-24 pl-6' alt="" />
                </div>
                <div>
                    <h1 className='text-white lg:text-2xl font-bold'>রৌমারী সি.জি জামান
                        সরকারি উচ্চ বিদ্যালয়, রৌমারী </h1>
                    <p className='lg:border-b-2 border-dashed  '></p>
                    <h1 className='text-white lg:text-2xl font-bold'>Rowmari C.G Zaman Govt. High School,Rowmari</h1>
                    <h1 className='text-white lg:text-2x font-bold px-40'>SINCE:1949,EIIN:132043</h1>
                </div>
            </div>

            <div className="lg:flex items-center hidden">
                <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar"
                    onClick={toggleNameVisibility}
                >
                    <div className="w-10 rounded-full">
                        <img src={user ? (user?.photoURL || imgUser) : imgUser} alt="User" />
                    </div>
                    {isNameVisible && (
                        <p className="text-white w-10">{user?.displayName}</p>
                    )}
                </label>
                <div>
                    {user ? (
                        <button onClick={handleSignOut} className="text-xl rounded-md text-red-800 bg-white font-bold px-2 py-2  ">
                            Log Out
                        </button>
                    ) : (
                        <Link to={'/login'}>
                            <button className="text-xl rounded-md text-red-800 px-2 py-2 bg-white font-bold ">
                                Login
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
