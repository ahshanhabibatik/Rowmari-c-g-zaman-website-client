import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAxiosPublic from "../../Hook/UseAxiosPublic";
import NavBar from "../../Navber/NavBar";
import "./stuAdmitCard.css";
import { FaDownload } from 'react-icons/fa';
import html2pdf from 'html2pdf.js';

const ExamRoutine = () => {
    const axiosPublic = useAxiosPublic();
    const [selectedClass, setSelectedClass] = useState(null);
    const [students, setStudents] = useState([]);
    const [examInfo, setExamInfo] = useState(null); // State to hold exam information

    useEffect(() => {
        if (selectedClass !== null) {
            // Fetch student data for the selected class
            axiosPublic.get(`/Admit/publish?classNumber=${selectedClass}`)
                .then(response => {
                    if (response.data.length === 0) {
                        toast.error('Routine is not published for the selected class');
                    }
                    setStudents(response.data);

                    // Extract exam info from the first student's data (assuming all students have the same exam info)
                    if (response.data.length > 0) {
                        const { exam, shift, date, dayOfWeek, exam_time } = response.data[0];
                        setExamInfo({ exam, shift, date, dayOfWeek, exam_time });
                    }
                })
                .catch(error => {
                    console.error('Error fetching routine data:', error);
                    toast.error('Error fetching routine data');
                });
        }
    }, [selectedClass, axiosPublic]);

    const handleDownloadPDF = () => {
        const element = document.getElementById("routineSheet");
        if (element) {
            html2pdf().from(element).set({ padding: [0, 0, 0, 3] }).save("exam_routine.pdf");
        } else {
            toast.error('Could not find routine content to download');
        }
    };


    // Filter students based on the selected class
    const filteredStudents = students.filter(student => student.class === selectedClass);

    return (
        <div className="">
            <NavBar></NavBar>

            <div className="flex justify-center">
                <div className="flex items-center gap-5 mt-4">
                    <p className='font-bold'>Select Class:</p>
                    <select
                        name="class"
                        className="select select-bordered"
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
            </div>

            {selectedClass && (
                <div id="routineSheet" className='border w-[730px] mx-auto mt-6 noto-sans'>
                    <div className='bg-[#330033] text-white py-5'>
                        <h1 className='text-center text-2xl font-bold'>Rowmari C.G Zaman High School,Rowmai,Kurigram</h1>
                        <h2 className="text-xl font-bold text-center">Class {selectedClass}  </h2>
                        {examInfo && (
                            <>
                                <h2 className="text-xl font-bold text-center"> {examInfo.exam} Routine</h2>
                            </>
                        )}
                    </div>

                    <div className="text-center mt-3">
                        <table className="border-collapse border mx-auto">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border">Shift</th>
                                    <th className="px-4 py-2 border">Subject</th>
                                    <th className="px-4 py-2 border">Date</th>
                                    <th className="px-4 py-2 border">Day of Week</th>
                                    <th className="px-4 py-2 border">Exam Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStudents.map(student => (
                                    <tr key={student._id}>
                                        <td className="border p-2">{student.shift}</td>
                                        <td className="border p-2">{student.subject}</td>
                                        <td className="border p-2">{student.date}</td>
                                        <td className="border p-2">{student.dayOfWeek}</td>
                                        <td className="border p-2">{student.exam_time}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="border mt-4 h-20 mx-auto bg-[#EEEEEE] rounded-lg">
                            <p className="border h-3 rounded-lg bg-[#330033]">
                                <span className="flex justify-center mt-7">©2011-2024 RCGZHS, All rights reserved.</span>
                            </p>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer />

            <button className='flex justify-center mx-auto mt-5 btn' onClick={handleDownloadPDF}><FaDownload /></button>
        </div>
    );
};

export default ExamRoutine;
