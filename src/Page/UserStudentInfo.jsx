import { useEffect, useState } from "react";
import useAxiosPublic from "../Hook/UseAxiosPublic";
import NavBar from "../Navber/NavBar";

const UserStudentInfo = () => {
    const axiosPublic = useAxiosPublic();
    const [studentData, setStudentData] = useState([]);
    const [selectedClass, setSelectedClass] = useState("");
    const [selectedSection, setSelectedSection] = useState("");
    const [selectedShift, setSelectedShift] = useState("");
    const [loading, setLoading] = useState(true);

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

    const getOrdinalNumber = (number) => {
        const words = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
        return words[number - 1] || number.toString();
    };

    const filteredStudents = studentData
        .filter((student) => (
            (!selectedClass || student.class === selectedClass) &&
            (!selectedSection || student.section === selectedSection) &&
            (!selectedShift || student.shift === selectedShift)
        ))
        .sort((a, b) => a.roll - b.roll); // Sort rolls numerically

    return (
        <div>
            <NavBar></NavBar>
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
                            <span className="label-text">Select Shift</span>
                        </label>
                        <select
                            name="shift"
                            className="select select-bordered md:w-48"
                            onChange={(e) => setSelectedShift(e.target.value)}
                        >
                            <option value="">Select Shift</option>
                            <option value="Morning">Morning</option>
                            <option value="Day">Day</option>
                        </select>
                    </div>
                </div>
            </div>

            {loading ? (
                <p><span className="loading loading-dots loading-lg  flex mx-auto text-green-500"></span></p>
            ) : (
                selectedClass && selectedSection && selectedShift ? (
                    filteredStudents.length === 0 ? (
                        <p>No data available</p>
                    ) : (
                        <table className="mx-auto w-[700px]">
                            <thead>
                                <tr className="border text-center p-1">
                                    <th className="border text-center p-1">SL.</th>
                                    <th className="border text-center p-1">Student Name</th>
                                    <th className="border text-center p-1">Class</th>
                                    <th className="border text-center p-1">Roll</th>
                                    <th className="border text-center p-1">Shift</th>
                                    <th className="border text-center p-1">Section</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStudents.map((student, index) => (
                                    <tr key={index}>
                                        <td className="border text-center p-1">{getOrdinalNumber(index + 1)}</td>
                                        <td className="border text-center p-1">{student.name}</td>
                                        <td className="border text-center p-1">{student.class}</td>
                                        <td className="border text-center p-1">{student.roll}</td>
                                        <td className="border text-center p-1">{student.shift}</td>
                                        <td className="border text-center p-1">{student.section}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr className="border text-center p-1">
                                    <td colSpan="6" className="text-center font-bold">Total Students: {filteredStudents.length}</td>
                                </tr>
                            </tfoot>
                        </table>
                    )
                ) : (
                    <p className="text-red-500 text-xl text-center">Please select class, section, and shift to view student information.</p>
                )
            )}
        </div>
    );
};

export default UserStudentInfo;
