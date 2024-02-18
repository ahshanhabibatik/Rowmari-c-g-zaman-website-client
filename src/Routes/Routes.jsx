
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
import TeacherHome from "../DashBoardControl/TeacherRoute/TeacherHome";
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
                element: <SeenResult></SeenResult>,
            },

        ]
    },
    {
        path: 'dashBoard',
        element: <DashBoard></DashBoard>,
        children: [
            // Admin dashboard
            {
                path: '',
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

        ]
    }
]);

export default router;