import { Link } from "react-router-dom";
import '../Ideal/Ideal.css';
 


const Ideal = () => {



    return (
        <div className="px-8 mb-6">
            <h1 className="text-3xl font-bold mt-4 mb-6 text-center">Why are we ideal?</h1>

            <div className="grid grid-cols-4 gap-6  ">
                <div className="border rounded-lg bg-[#F1F3F5] px-2 py-3 gap-4 space-y-2" >
                    <h1 className="text-2xl font-bold">Our Experience</h1>
                    <p>Upcoming </p>
                    <Link>Learn More..</Link>
                </div>
                <div className="border rounded-lg bg-[#F1F3F5] px-2 py-3 space-y-2">
                    <h1 className="text-2xl font-bold">Experience Teacher</h1>
                    <h1>Upcoming</h1>
                    <Link>Learn More..</Link>
                </div>
                <div className="border rounded-lg bg-[#F1F3F5] px-2 py-3 space-y-2">
                    <h1 className="text-2xl font-bold">Smart Classroom</h1>
                    <h1>Upcoming</h1>
                    <Link>Learn More..</Link>
                </div>
                <div className="border rounded-lg bg-[#F1F3F5] px-2 py-3 space-y-2">
                    <h1 className="text-2xl font-bold">AWARD</h1>
                    <h1>Upcoming</h1>
                    <Link>Click More..</Link>
                </div>
            </div>

            <div className="ideal-container mt-8"  >
                <div className=" ">

                    <div className=" ">
                        <h1 className="text-center  mt-5 text-4xl font-bold text-white">For You</h1>
                        <p className=" flex mx-auto mt-4 justify-center border-b-2  w-20 border-red-600"></p>

                        <div className="flex justify-center gap-4   ">
                            <div>
                                <Link className="bg-red-500 hover:bg-yellow-400 rounded-sm px-10 py-4"><button className="mt-16  text-white  ">Featured News</button></Link>
                            </div>
                            <div>
                                <Link className="bg-red-500 hover:bg-yellow-400    rounded-sm px-10  py-4"><button className="mt-16   text-white">Upcoming Event</button></Link>
                            </div>
                            <div>
                                <Link className="bg-red-500 hover:bg-yellow-400   rounded-sm px-10 py-4"><button className="mt-16 text-white ">Donations</button></Link>
                            </div>
                            <div>
                                <Link className="bg-red-500 hover:bg-yellow-400   rounded-sm px-10 py-4"><button className="mt-16 text-white ">Calendar</button></Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Ideal;