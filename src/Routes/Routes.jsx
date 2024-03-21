
import { createBrowserRouter } from "react-router-dom";


import ErrorPage from "../Components/ErrorPage/ErrorPage";
import Root from "../Layout/Root";
import Home from "../Page/Home/Home";
import Login from "../Login/Login";
import Register from "../Register/Register";
import AboutUs from "../Page/About/AboutUs";
import ReadMessage from "../Page/ReadMessage/ReadMessage";
import ImageGallery from "../Page/ImageGallery/ImageGallery";
import Video from "../Page/Video/Video";
import DashBoard from "../DashBoardControl/Dashboard";
import AdminHome from "../DashBoardControl/AdminRouter/AdminHome";
import AllUsers from "../DashBoardControl/AdminRouter/AllUsers";
import AddStudentInfo from "../AdminPanel/AddStudentInfo";
import StudentInfo from "../AdminPanel/StudentInfo";
import UpdateStudentInfo from "../AdminPanel/UpdateStudentInfo";
import AddResult from "../TeacherPanel/AddResult";
import AdminNews from "../AdminPanel/AdminNews";
import ShowNews from "../AdminPanel/ShowNews";
import UpdateNotice from "../AdminPanel/UpdateNotice";
import UserNotice from "../Page/News/UserNotice";
import ShowResult from "../TeacherPanel/ShowResult";
import ShowAdminResult from "../AdminPanel/ShowAdminResult";
import UserStudentInfo from "../Page/UserStudentInfo";
import TotalStudent from "../Page/TotalStudent";
import PublishedResult from "../AdminPanel/PublishedResult";
import SeenResult from "../Page/SeenResult";
import PageResult from "../Page/PageResult";

import TeacherHome from "../TeacherPanel/TeacherHome";
import CreateAdmitCard from "../AdminPanel/CreateAdmitCard";
import ShowAdmitCard from "../AdminPanel/ShowAdmitCard";
import UpdateAdmitCard from "../AdminPanel/UpdateAdmitCard";
import PublicAdmit from "../AdminPanel/PublicAdmit";

import ExamRoutine from "../Page/StuAdmitCard/ExamRoutine";
import ExamAdmitCard from "../Page/StuAdmitCard/ExamAdmitCard";
import Vision from "../Vision/Vision";
import Mision from "../Vision/Mision";
import Experience from "../Page/Experience/Experience";
import Teacher from "../Page/TeacherPage/Teacher";
import UploadResult from "../AdminPanel/UploadResult";
import ForgetPassword from "../Login/ForgetPassword";
import SScConner from "../Page/SscConner/SScConner";
import PrivateRoute from "./PrivateRoute";
import StudentHome from "../StudentDashboard/StudentHome";
import PublicResult from "../Page/StudentPanel/PublicResult";
import HeadTeacher from "../PublicTeacher/HeadTeacher";





const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>,

            },

            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/about",
                element: <AboutUs></AboutUs>,
            },
            {
                path: "/news",
                element: <UserNotice></UserNotice>,
            },
            {
                path: "/message",
                element: <ReadMessage></ReadMessage>,
            },
            {
                path: "/register",
                element: <Register></Register>,
            },
            {
                path: "/images",
                element: <ImageGallery></ImageGallery>,
            },
            {
                path: "/videos",
                element: <Video></Video>,
            },
            {
                path: "/allStu",
                element: <UserStudentInfo></UserStudentInfo>,
            },
            {
                path: "/total",
                element: <TotalStudent></TotalStudent>,
            },
            {
                path: "/result",
                element: <PrivateRoute><SeenResult></SeenResult></PrivateRoute>,
            },
            {
                path: "/show",
                element: <PageResult></PageResult>,
            },
            {
                path: "/publicResult",
                element: <PublicResult></PublicResult>,
            },
            {
                path: "/stuAdmit",
                element: <ExamRoutine></ExamRoutine>,
            },
            {
                path: "/admit",
                element: <ExamAdmitCard></ExamAdmitCard>,
            },
            {
                path: "/vision",
                element: <Vision></Vision>,
            },
            {
                path: "/mission",
                element: <Mision></Mision>,
            },
            {
                path: "/experience",
                element: <Experience></Experience>,
            },
            {
                path: "/allTeacher",
                element: <Teacher></Teacher>,
            },
            {
                path: "/forget",
                element: <ForgetPassword></ForgetPassword>,
            },
            {
                path: "/ssc",
                element: <SScConner></SScConner>,
            },
            {
                path: "/headTeacher",
                element: <HeadTeacher></HeadTeacher>,
            },

        ]
    },
    {
        path: 'dashBoard',
        element: <DashBoard></DashBoard>,
        children: [
            // Admin dashboard
            {
                path: 'home',
                element: <AdminHome></AdminHome>
            },
            {
                path: 'users',
                element: <AllUsers></AllUsers>
            },
            {
                path: 'studentInfo',
                element: <AddStudentInfo></AddStudentInfo>
            },
            {
                path: 'stuInfo',
                element: <StudentInfo></StudentInfo>
            },
            {
                path: 'stuInfo/update/:id',
                element: <UpdateStudentInfo />,
                loader: ({ params }) => fetch(`http://localhost:5001/students/${params.id}`)
            },
            {
                path: 'showNews',
                element: <ShowNews></ShowNews>
            },
            {
                path: 'adNews',
                element: <AdminNews></AdminNews>
            },
            {
                path: 'showNews/updateNews/:id',
                element: <UpdateNotice></UpdateNotice>,
                loader: ({ params }) => fetch(`http://localhost:5001/news/${params.id}`)
            },
            {
                path: 'result',
                element: <ShowAdminResult></ShowAdminResult>
            },
            {
                path: 'publicResult',
                element: <PublishedResult></PublishedResult>
            },
            {
                path: 'admit',
                element: <CreateAdmitCard></CreateAdmitCard>
            },
            {
                path: 'seeAdmit',
                element: <ShowAdmitCard></ShowAdmitCard>
            },
            {
                path: 'seeAdmit/updateAdmit/:id',
                element: <UpdateAdmitCard></UpdateAdmitCard>,
                loader: ({ params }) => fetch(`http://localhost:5001/admitPost/${params.id}`)
            },
            {
                path: 'publicAdmit',
                element: <PublicAdmit></PublicAdmit>
            },
            {
                path: 'ssc',
                element: <UploadResult></UploadResult>
            },


            // TeacherDashboard
            {
                path: "teacherHome",
                element: <TeacherHome></TeacherHome>
            },
            {
                path: "addResult",
                element: <AddResult></AddResult>
            },
            {
                path: "SeeResult",
                element: <ShowResult></ShowResult>
            },

            // userdashbord  
            {
                path: "userHome",
                element: <StudentHome></StudentHome>
            },

        ]
    }
]);

export default router;