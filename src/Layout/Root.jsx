import { Outlet } from "react-router-dom";
import Header from "../Shared/Header/Header";
 
import Footer from "../Page/Footer/Footer";




const Root = () => {
    return (
        <div className=" bg-white   mx-auto font-poppins">
            <Header></Header>

            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;