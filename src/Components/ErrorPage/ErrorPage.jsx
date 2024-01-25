import { Link } from "react-router-dom";
// import img from '../../assets/error.jpg'


const ErrorPage = () => {
    return (
        <div className=" mx-auto text-center  ">
            {/* <img className="flex justify-center mx-auto w-96" src={img} alt="" /> */}
            <h1 className="text-3xl text-center">Oops!!!</h1>
            <Link className="btn" to={'/'}>Go back Home</Link>
        </div>
    );
};

export default ErrorPage;