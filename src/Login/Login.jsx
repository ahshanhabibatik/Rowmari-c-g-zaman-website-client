import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { AuthContext } from "../Provider/AuthProvider";
import { sendEmailVerification } from "firebase/auth";
import './login.css'


const Login = () => {
    const { signIn } = useContext(AuthContext);
    const location = useLocation();
    const [registerError, setRegisterError] = useState('');
    const navigate = useNavigate();


    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = form.get('email');
        const password = form.get('password');

        setRegisterError('');

        // Email validation
        if (!email || !password) {
            toast.error('Please enter both email and password!');
            return;
        }

        try {
            // Perform Firebase authentication
            const result = await signIn(email, password);
            if (result.user?.emailVerified) {
                navigate(location?.state ? location.state : '/');
            }
            else {
                alert("verify your email address")
                sendEmailVerification(result.user)
                    .then(() => {
                        alert("Please Check your email and verify your email")
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }


        } catch (error) {
            console.error(error);
            toast.error('Login failed. Please check your email and password.');
        }
    };

    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {

        AOS.init({
            duration: 1000,
            once: true,
            easing: 'ease-out',
        });
    }, []);



    return (
        <div className="background h-[120vh]">

            <hr />
            <ToastContainer position="top-center" autoClose={3000} />
            <div data-aos="fade-up" className=" lg:flex lg:py-11 bg-white bg-opacity-30 lg:w-[70%] w-[80%] border mx-auto mt-4 lg:my-20 rounded-lg  px-8 lg:gap-4 ">
                <div className=" lg:block hidden">
                    <img className="w-96 lg:-mt-5 " src="https://i.ibb.co/0skLXNf/login-account-vector-illustration-laptop-isolated-background-password-sign-concept-993513-273.png" alt="" />
                </div>
                <div className="lg:w-96  ">

                    <div className="">
                        <h1 className="text-2xl  font-bold text-center text-white uppercase mb-5">User Login</h1>
                        <form onSubmit={handleLogin} className=" md:w-96 lg:w-3/4 mx-auto">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-bold mb-4">Email address</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter Email"
                                    className="input input-bordered mb-4" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-bold mb-4">Password</span>
                                </label>
                                <div className=" relative flex  justify-end ">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="password"
                                        className="input w-full input-bordered"
                                        required

                                    />
                                    <span className=" text-2xl mt-3  pr-3">
                                        {showPassword ? (
                                            <FaEyeSlash onClick={togglePasswordVisibility} className="text-gray-400  cursor-pointer" />
                                        ) : (
                                            <FaEye onClick={togglePasswordVisibility} className="text-gray-400    cursor-pointer" />
                                        )}
                                    </span>
                                </div>
                                <label className="label">
                                    <Link to={'/forget'}>
                                        <a href="#" className="label-text-alt text-white font-bold link link-hover hob">Forgot password?</a>
                                    </Link>
                                </label>
                            </div>
                            <div className="form-control mt-4">
                                <button className="border py-2 uppercase font-bold rounded-lg text-white border-white hover:bg-cyan-400">Login</button>
                            </div>
                        </form>

                    </div>

                    <div >
                        <h1 className="border-b-2 mt-6 text-center ">OR</h1>
                    </div>
                    <div>
                        <p className="text-center text-white font-bold mt-5">New to Rcgzhs. Please<Link className="text-blue-600 underline font-bold" to={'/register'}> Register</Link></p>
                    </div>
                </div>

            </div>


        </div>
    );
};

export default Login;
