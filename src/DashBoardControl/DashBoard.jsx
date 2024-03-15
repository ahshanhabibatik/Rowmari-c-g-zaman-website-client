
import { Link, Outlet } from 'react-router-dom';
import useAdmin from '../PanelControl/UseAdmin';
import CustomDrawer from './CustomDrawer';
import { useState } from 'react';
import { FaAlignJustify } from "react-icons/fa";
import UseTeacher from '../PanelControl/UseTeacher';
import useUser from '../PanelControl/useUser';


const DashBoard = () => {
    const [isAdmin, isAdminLoading] = useAdmin();
    const [isTeacher, isTeacherLoading] = UseTeacher();
    const [isStudent, isStudentLoading] = useUser();
    const [drawerOpen, setDrawerOpen] = useState(false);


    const toggleDrawer = () => {
        setDrawerOpen((prevState) => !prevState);
    };

    if (isAdminLoading || isTeacherLoading || isStudentLoading) {
        return <span className="loading flex mx-auto justify-center loading-ring w-40"></span>;
    }

    if (!isAdmin && !isTeacher && isStudent) {
        return (
            <div className=''>
                <p className='text-center mb-3 text-red-500'>Data is loaded But no role detected.</p>
                {/* Assuming you have `img` imported or defined */}

                <Link to='/'>
                    <button className='btn mt-5 flex mx-auto justify-center'>Go Back Home</button>
                </Link>
            </div>
        );
    }

    return (
        <div className="flex ">

            <CustomDrawer isAdmin={isAdmin} isTeacher={isTeacher} isStudent={isStudent} isOpen={drawerOpen} onClose={toggleDrawer} />

            <div className="flex-1 ">
                <div>
                    {/* Button to toggle the drawer */}
                    <button className='bg-[#74189c] p-6  w-full text-white text-2xl' onClick={toggleDrawer}><FaAlignJustify /></button>
                </div>
                <Outlet></Outlet>
            </div>
        </div>
    );
};
export default DashBoard;
