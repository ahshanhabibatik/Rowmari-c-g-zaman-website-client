import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hook/UseAxiosPublic";
import NavBar from "../../Navber/NavBar";

const ExamAdmitCard = () => {
    const axiosPublic = useAxiosPublic();
    const [studentData, setStudentData] = useState([]);
    const [selectedClass, setSelectedClass] = useState("");
    const [selectedSection, setSelectedSection] = useState("");
    const [selectedRoll, setSelectedRoll] = useState("");
    const [loading, setLoading] = useState(true);
    const [routineData, setRoutineData] = useState([]);
    const [showData, setShowData] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosPublic.get("/students");
                setStudentData(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching student information:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [axiosPublic]);

    const fetchRoutineData = async () => {
        try {
            const response = await axiosPublic.get("/Admit/publish");
            // Filter routine data based on selected class, section, and roll
            const filteredRoutineData = response.data.filter(item => (
                item.class === selectedClass
            ));
            setRoutineData(filteredRoutineData);
            setShowData(true);
        } catch (error) {
            console.error("Error fetching routine information:", error);
            setRoutineData([]);
            setShowData(false);
        }
    };

    const handleViewClick = () => {
        if (selectedClass) {
            fetchRoutineData();
        } else {
            setRoutineData([]);
            setShowData(false);
        }
    };

    const filteredStudents = studentData
        .filter((student) => (
            (!selectedClass || student.class === selectedClass) &&
            (!selectedSection || student.section === selectedSection) &&
            (!selectedRoll || student.roll.toString() === selectedRoll)
        ));

    // Filter subjects for the first table (showing 5 subjects)
    const firstTableSubjects = routineData.slice(0, 5);
    // Filter subjects for the second table (showing the remaining subjects)
    const secondTableSubjects = routineData.slice(5);

    return (
        <div>
            <NavBar />
            <div className="lg:flex mt-4 lg:justify-center justify-center mx-auto mb-6">
                <div className="lg:flex justify-center gap-3">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Select Class</span>
                        </label>
                        <select
                            name="class"
                            className="select select-bordered md:w-48"
                            onChange={(e) => setSelectedClass(e.target.value)}
                        >
                            <option value="">Select Class</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Select Section</span>
                        </label>
                        <select
                            name="section"
                            className="select select-bordered md:w-48"
                            onChange={(e) => setSelectedSection(e.target.value)}
                        >
                            <option value="">Select Section</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Class Roll</span>
                        </label>
                        <input
                            onChange={(e) => setSelectedRoll(e.target.value)}
                            type="number"
                            name="roll"
                            placeholder="Enter Class Roll"
                            className="input input-bordered"
                        />
                    </div>
                    <button className="btn btn-primary mt-4" onClick={handleViewClick}>View</button>
                </div>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : showData ? (
                <div className="w-[750px] mx-auto border">
                    <div className='bg-[#330033] text-white py-5 '>
                        <h1 className='text-center text-2xl font-bold'>Rowmari C.G Zaman High School,Rowmai,Kurigram</h1>
                        <h2 className="text-xl font-bold text-center">Class: {selectedClass}</h2>
                        {routineData.length > 0 && (
                            <h2 className="text-xl font-bold text-center"> {routineData[0].exam}</h2>
                        )}
                        {routineData.length > 0 && (
                            <h2 className="text-xl font-bold text-center">Exam Time: {routineData[0].exam_time} </h2>
                        )}
                        <h1 className="text-xl font-bold text-center">Admit Card</h1>
                    </div>
                    {filteredStudents.length === 0 ? (
                        <p className="text-center">No data available</p>
                    ) : (
                        <table className="mx-auto w-[700px]">

                            <tbody className="mx-auto w-[700px]">
                                {filteredStudents.map((student, index) => (
                                    <tr className="" key={index}>
                                        <tr className="border ">
                                            <th className="border text-center p-2">Roll</th>
                                            <td className="border text-center">{student.roll}</td>
                                            <th className="border text-center">Name</th>
                                            <td className="border text-center">{student.name}</td>
                                            <th className="border text-center">Name</th>
                                            <td className="border text-center">{student.name}</td>
                                        </tr>
                                        <tr className="border ">
                                            <th className="border text-center p-2">Roll</th>
                                            <td className="border text-center">{student.roll}</td>
                                            <th className="border text-center">Name</th>
                                            <td className="border text-center">{student.name}</td>
                                        </tr>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    <div className="flex w-[700px] mx-auto">
                        <div className="mx-auto ">
                            <table className="mx-auto ">
                                <thead>
                                    <tr className="border text-center p-1">
                                        <th className="border text-center p-1">Date</th>
                                        <th className="border text-center p-1">Subject</th>
                                        <th className="border text-center p-1">Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {firstTableSubjects.map((routine, index) => (
                                        <tr key={index}>
                                            <td className="border text-center p-1">{routine.date}</td>
                                            <td className="border text-center p-1">{routine.subject}</td>
                                            <td className="border text-center p-1">{routine.exam_time}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mx-auto  ">
                            <table className="mx-auto ">
                                <thead>
                                    <tr className="border text-center p-1">
                                        <th className="border text-center p-1">Date</th>
                                        <th className="border text-center p-1">Subject</th>
                                        <th className="border text-center p-1">Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {secondTableSubjects.map((routine, index) => (
                                        <tr key={index}>
                                            <td className="border text-center p-1">{routine.date}</td>
                                            <td className="border text-center p-1">{routine.subject}</td>
                                            <td className="border text-center p-1">{routine.exam_time}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-red-500 text-xl text-center">Please select class, section, and roll to view student information.</p>
            )}
        </div>
    );
};

export default ExamAdmitCard;
