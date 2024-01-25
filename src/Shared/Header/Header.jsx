import { Link } from 'react-router-dom';
import imgUser from '../../assets/imgGalary/user.png';
import logo from '../../assets/cgzaman logo (1).png';
import { AuthContext } from '../../Provider/AuthProvider';
import { useContext, useState } from 'react';

const Header = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isNameVisible, setIsNameVisible] = useState(false);

    const handleSignOut = () => {
        logOut()
            .then()
            .catch()
    };

    const toggleNameVisibility = () => {
        setIsNameVisible(!isNameVisible);
    };

    return (
        <div className='bg-[#330033] px-8 py-6  flex justify-between items-center '>
            <div className='  flex '>
                <div>
                    <img src={logo} className='h-24 pl-6' alt="" />
                </div>
                <div>
                    <h1 className='text-white text-2xl font-bold'>রৌমারী সি.জি জামান
                        সরকারি উচ্চ বিদ্যালয়, রৌমারী </h1>
                    <p className='border-b-2 border-dashed  '></p>
                    <h1 className='text-white text-2xl font-bold'>Rowmari C.G Zaman Govt. High School,Rowmari</h1>
                    <h1 className='text-white text-2x font-bold px-40'>SINCE:1949,EIIN:132043</h1>
                </div>
            </div>

            <div className="flex items-center">
                <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar"
                    onClick={toggleNameVisibility}
                >
                    <div className="w-10 rounded-full">
                        <img src={user ? (user.photoURL || imgUser) : imgUser} alt="User" />
                    </div>
                    {isNameVisible && (
                        <p className="text-white w-10">{user.displayName}</p>
                    )}
                </label>
                {user ? (
                    <Link to={"/login"}>
                        <button onClick={handleSignOut} className="text-xl rounded-md text-red-800 bg-white font-bold px-2 py-2  ">
                            Log Out
                        </button>
                    </Link>
                ) : (
                    <Link to={'/login'}>
                        <button className="text-xl rounded-md text-red-800 px-2 py-2 bg-white font-bold ">
                            Login
                        </button>
                    </Link>
                )}
            </div>

        </div>
    );
};

export default Header;
