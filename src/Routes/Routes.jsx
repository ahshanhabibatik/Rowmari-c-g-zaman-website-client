
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

            // TeacherDashboard
            {
                path: "teacherHome",
                element: <TeacherHome></TeacherHome>
            }

        ]
    }
]);

export default router;