
import { createBrowserRouter } from "react-router-dom";




import ErrorPage from "../Components/ErrorPage/ErrorPage";
import Root from "../Layout/Root";
import Home from "../Page/Home/Home";
import Login from "../Login/Login";
import Register from "../Register/Register";
import AboutUs from "../Page/About/AboutUs";
import News from "../Page/News/News";
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
                element: <News></News>,
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

            // TeacherDashboard
            {
                path: "teacherHome",
                element: <TeacherHome></TeacherHome>
            },
            {
                path: "addResult",
                element: <AddResult></AddResult>
            },

        ]
    }
]);

export default router;