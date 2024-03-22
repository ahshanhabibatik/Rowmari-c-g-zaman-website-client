import { Outlet } from "react-router-dom";

import Footer from "../Page/Footer/Footer";
import Header from "../Shared/Header/Header";




const Root = () => {
    return (
        <div className=" bg-white   mx-auto font-">
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;