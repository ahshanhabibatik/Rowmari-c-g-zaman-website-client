import { Outlet } from "react-router-dom";

import Footer from "../Page/Footer/Footer";
import Header from "../Shared/Header/Header";




const Root = () => {
    return (
        <div className="mx-auto font-poppins ">
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;