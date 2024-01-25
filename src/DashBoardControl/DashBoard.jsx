
import { Link, NavLink, Outlet } from 'react-router-dom';
import useAdmin from '../PanelControl/UseAdmin';
import UseTeacher from '../PanelControl/UseTEacher';
import CustomDrawer from './CustomDrawer';
import { useState } from 'react';

const DashBoard = () => {
    const [isAdmin, isAdminLoading] = useAdmin();
    const [isTeacher, isTeacherLoading] = UseTeacher();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setDrawerOpen((prevState) => !prevState);
    };

    if (isAdminLoading || isTeacherLoading) {
        return <span className="loading flex mx-auto justify-center loading-ring w-40"></span>;
    }

    if (!isAdmin && !isTeacher) {
        return (
            <div className='mt-20'>
                <p className='text-center mb-3 text-red-500'>Data is loaded But no role detected.</p>
                {/* Assuming you have `img` imported or defined */}
                <img className='flex mx-auto' src={img} alt="" />
                <Link to='/'>
                    <button className='btn mt-5 flex mx-auto justify-center'>Go Back Home</button>
                </Link>
            </div>
        );
    }

    return (
        <div className="flex">
            <CustomDrawer isAdmin={isAdmin} isTeacher={isTeacher} isOpen={drawerOpen} onClose={toggleDrawer} />

            <div className="flex-1 p-10">
                <div>
                    {/* Button to toggle the drawer */}
                    <button onClick={toggleDrawer}>Open DashBoard</button>
                </div>
                <Outlet></Outlet>
            </div>
        </div>
    );
};
export default DashBoard;
