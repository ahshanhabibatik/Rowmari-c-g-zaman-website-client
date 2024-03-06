import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useRef } from "react";
import app from "../Firebase/firebase.config";
import { Link } from "react-router-dom";


const ForgetPassword = () => {
    const emailRef = useRef(null);
    const auth = getAuth(app)

    const handleForgetPassword = () => {
        const email = emailRef.current.value;
        if (!email) {
            alert('please Provide an Email')
        }
        else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            alert('please write a valid email')
        }

        // Send a password reset email
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('please check your email')
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <div className="w-96 mx-auto h-[100vh] my-10">
            <div className="form-control">
                <label className="label">
                    <span className="label-text text-gray-600 font-bold ">Please Enter Valid Email address</span>
                </label>
                <input
                    type="email"
                    name="email"
                    ref={emailRef}
                    placeholder="Enter Valid Email"
                    className="input input-bordered" required />
            </div>
            <button onClick={handleForgetPassword} className="btn btn-primary flex justify-center mx-auto mt-6">Submit</button>

            <Link to={'/login'}><button className="btn flex mx-auto mt-6">Go to login</button></Link>
        </div>
    );
};

export default ForgetPassword;