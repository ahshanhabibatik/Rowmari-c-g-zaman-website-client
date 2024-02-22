import React from "react";
import { Link, useLocation } from "react-router-dom";
import NavBar from "../Navber/NavBar";
import logo from '../../src/assets/slider/cgzaman logo (1).png';
import html2pdf from "html2pdf.js";
import './result.css'

// Function to map English subject names to Bengali names and include subject numbers
const mapSubjectToBengali = (subject, subjectNumber) => {
    const subjectMap = {
        "bangla": "বাংলা",
        "english": "English",
        "math": "গণিত",
        "history": "ইতিহাস ও সামাজিক বিজ্ঞান",
        "health": "স্বাস্থ্য সুরক্ষা",
        "life": "জীবন ও জীবিকা",
        "art": "শিল্প ও সংস্কৃতি",
        "science": "বিজ্ঞান",
        "digital": "ডিজিটাল প্রযুক্তি",
        "ইসলাম": "ইসলাম শিক্ষা"
    };
    const subjectName = subjectMap[subject] || subject;
    const subjectNum = subjectNumber[subject] || '';
    return { name: subjectName, number: subjectNum };
};

const PageResult = () => {
    const location = useLocation();
    const selectedResults = location.state.selectedResults;

    if (!selectedResults || selectedResults.length === 0) {
        return <div>No results found</div>;
    }

    const studentData = selectedResults[0];

    const downloadResultSheet = () => {
        const element = document.getElementById("resultSheet");
        html2pdf().from(element).save("result_sheet.pdf");
    };

    return (
        <div>
            <NavBar />
            <div>
                <div id="resultSheet" className="border w-[700px]  mx-auto rounded-lg mt-10">
                    <div className="border mt-3 w-[680px] mx-auto rounded-lg flex bg-[#330033]">
                        <div>
                            <img className="w-28 bg-[#EEEEEE]" src={logo} alt="" />
                        </div>
                        <div className="flex justify-center mx-auto">
                            <div>
                                <p className="text-white text-2xl font-bold text-center  mt-5">Rowmari C.G. Zaman High School,Rowmari</p>
                                <p className="text-2xl font-bold text-white text-center">Result Sheet</p>
                            </div>
                        </div>
                    </div>
                    <h1 className="text-center font-bold text-2xl my-3">Result Sheet</h1>
                    <table className="mx-auto w-[640px] align-middle bg-slate-50">
                        <tbody>
                            <tr className="border ">
                                <th className="border text-center p-2">Roll</th>
                                <td className="border text-center">{studentData.roll}</td>
                                <th className="border text-center">Name</th>
                                <td className="border text-center">{studentData.name}</td>
                            </tr>
                            <tr>
                                <th className="border text-center p-2">Class</th>
                                <td className="border text-center">{studentData.class}</td>
                                <th className="border text-center">Father's Name</th>
                                <td className="border text-center">{studentData.fName}</td>
                            </tr>
                            <tr>
                                <th className="border text-center p-2">Date of Birth</th>
                                <td className="border text-center">{studentData.dateOfBirth}</td>
                                <th className="border text-center">Mother's Name</th>
                                <td className="border text-center">{studentData.mName}</td>
                            </tr>
                            <tr>
                                <th className="border text-center p-2">Total Grade</th>
                                <td className="border  font-bold text-center">{studentData.totalGrade}</td>
                                <th className="border text-center p-2">GPA</th>
                                <td className="border  font-bold text-center">{studentData.averageGradePoint}</td>
                            </tr>

                            <tr>
                                <th className="border text-center p-2">Total Number</th>
                                <td className="border  font-bold text-center">{studentData.totalMarks}</td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Grade Sheet Table */}
                    <h2 className="text-center my-3 font-bold text-2xl">Grade Sheet:</h2>
                    <div className="flex justify-center ">
                        <table className="mt-4 mb-4 mx-auto w-[640px] align-middle bg-slate-50" style={{ tableLayout: "fixed" }}>
                            <thead>
                                <tr>
                                    <th className="border text-center p-2" style={{ width: "10%" }}>Sl</th>
                                    <th className="border text-center p-2" style={{ width: "30%" }}>Subject</th>
                                    <th className="border text-center p-2" style={{ width: "20%" }}>Subject Number</th>
                                    <th className="border text-center p-2" style={{ width: "20%" }}>Grade Letter</th>
                                    <th className="border text-center p-2" style={{ width: "20%" }}>Grade Points</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentData.subjectGradeLetters && Object.keys(studentData.subjectGradeLetters).map((subject, index) => (
                                    <tr key={index}>
                                        <td className="border text-center p-2">{index + 1}</td>
                                        <td className="border text-center ">{mapSubjectToBengali(subject, studentData).name}</td>
                                        <td className="border text-center">{mapSubjectToBengali(subject, studentData).number}</td>
                                        <td className="border text-center">{studentData.subjectGradeLetters[subject]}</td>
                                        <td className="border text-center">{studentData.subjectGradePoints[subject]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <Link to='/result'><button className="text-center flex   mx-auto text-red-600 mt-2">Search Again</button></Link>
                    </div>

                    <div className="border mt-4 h-20 w-[680px] mx-auto bg-[#EEEEEE] rounded-lg">
                        <p className="border w-[680px] h-3 rounded-lg bg-[#330033]">
                            <span className="flex justify-center mt-7">©2011-2024 RCGZHS, All rights reserved.</span>
                        </p>
                    </div>

                </div>

                <button onClick={downloadResultSheet} className="btn btn-secondary flex  mt-3 mx-auto">Download Result</button>
            </div>
        </div>
    );
};

export default PageResult;

