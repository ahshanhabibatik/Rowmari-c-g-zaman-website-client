import React, { useEffect, useState } from "react";
import useAxiosSecure from "../Hook/AxiosSecure";
import NavBar from "../Navber/NavBar";
import logo from '../../src/assets/slider/cgzaman logo (1).png';
import Swal from 'sweetalert2';

const SeenResult = () => {
    const axiosSecure = useAxiosSecure();
    const [results, setResults] = useState([]);
    const [selectedResult, setSelectedResult] = useState(null);
    const [searchClass, setSearchClass] = useState("");
    const [searchRoll, setSearchRoll] = useState("");
    const [searchSection, setSearchSection] = useState("");
    const [searchMessage, setSearchMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchClicked, setSearchClicked] = useState(false);
    const [resultsFetched, setResultsFetched] = useState(false); // Flag to track whether results have been fetched

    useEffect(() => {
        const fetchResults = async () => {
            setLoading(true);
            try {
                const response = await axiosSecure.get("/results/publish");
                if (response.data.length === 0) {
                    // Show SweetAlert notification when results are not published
                    Swal.fire({
                        icon: 'error',
                        title: 'Results Not Published',
                        text: 'The results are not published yet!',
                    });
                } else {
                    setResults(response.data);
                }
                setResultsFetched(true);  
            } catch (error) {
                console.error("Error fetching results:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [axiosSecure]);

    useEffect(() => {
        if (searchClass && searchSection && searchRoll && searchClicked && resultsFetched) {
            const student = results.find(result =>
                result.class === searchClass &&
                result.section === searchSection &&
                result.roll === searchRoll
            );
            setSelectedResult(student);
        }
    }, [searchClass, searchSection, searchRoll, results, searchClicked, resultsFetched]);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchClicked(true);

        if (searchClass && searchSection && searchRoll) {
            const filteredResults = results.filter(result =>
                result.class === searchClass &&
                result.roll === searchRoll &&
                result.section === searchSection
            );
            if (filteredResults.length === 0) {
                setSearchMessage("Student not found");
                setSelectedResult(null);
                // Show SweetAlert notification when student is not found
                Swal.fire({
                    icon: 'error',
                    title: 'Student Not Found',
                    text: 'No student found with the given criteria!',
                });
            } else {
                setResults(filteredResults);
                setSearchMessage("");
                setSelectedResult(filteredResults[0]);
            }
        } else {
            setSearchMessage("Please fill in all search criteria");
            setSelectedResult(null);
            // Show SweetAlert notification for incomplete search criteria
            Swal.fire({
                icon: 'warning',
                title: 'Incomplete Search Criteria',
                text: 'Please fill in all search criteria!',
            });
        }
    };

    return (
        <div>
            <NavBar />
            <div>
                <div className="border w-[700px] h-[600px] mx-auto rounded-lg mt-10">
                    <div className="border mt-3 w-[680px] mx-auto rounded-lg flex bg-[#330033]">
                        <div>
                            <img className="w-28 bg-[#EEEEEE]" src={logo} alt="" />
                        </div>
                        <div className="flex justify-center mx-auto">
                            <div>
                                <p className="text-white text-2xl font-bold text-center  mt-5">Rowmari C.G. Zaman High School,Rowmari</p>
                                <p className="text-2xl font-bold text-white text-center">Result Board</p>
                            </div>
                        </div>
                    </div>

                    <div className="border h-80 w-[450px] mx-auto mt-8">
                        <form onSubmit={handleSearch}>
                            <div className="mt-3 flex mx-auto justify-center items-center">
                                <label>
                                    <span className="label-text font-bold">Select Class <span className="ml-1 mr-2">:</span></span>
                                </label>
                                <select name="class" value={searchClass} onChange={(e) => setSearchClass(e.target.value)} className="select select-bordered w-[300px]">
                                    <option value="">Select Class</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>
                            </div>

                            <div className="mt-3 flex mx-auto justify-center items-center">
                                <label>
                                    <span className="label-text font-bold">Class Roll <span className="ml-4 mr-3">:</span></span>
                                </label>
                                <input type="number" name="roll" value={searchRoll} onChange={(e) => setSearchRoll(e.target.value)} placeholder="Enter Class Roll" className="input input-bordered  w-[300px]" />
                            </div>

                            <div className="mt-3 flex mx-auto justify-center items-center">
                                <label>
                                    <span className="label-text font-bold">Section <span className="ml-4 mr-3">:</span></span>
                                </label>
                                <select name="section" value={searchSection} onChange={(e) => setSearchSection(e.target.value)} className="select select-bordered  w-[300px]">
                                    <option value="">Select Section</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                </select>
                            </div>

                            <div className="flex gap-2 mt-3 justify-end px-8">
                                <button type="reset" className="btn btn-secondary">Reset</button>
                                <button type="submit" className="btn btn-neutral">Search</button>
                            </div>
                        </form>
                    </div>
                    <div className="border mt-10 h-20 w-[680px] mx-auto bg-[#EEEEEE] rounded-lg">
                        <p className="border w-[680px] h-3 rounded-lg bg-[#330033]">
                            <span className="flex justify-center mt-7">©2011-2024 RCGZHS, All rights reserved.</span>
                        </p>
                    </div>
                </div>

                {loading && <p>Loading...</p>}

                {/* Display search results only when search button is clicked */}
                {selectedResult && searchClicked && (
                    <div className="border mt-4 p-4">
                        <p>Student Result:</p>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Father's Name</th>
                                    <th>Mother's Name</th>
                                    <th>Class</th>
                                    <th>Roll</th>
                                    <th>Section</th>
                                    <th>Subject Grade Points</th>
                                    <th>Subject Grade Letters</th>
                                    <th>Average Grade Point</th>
                                    <th>Total Grade</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{selectedResult.name}</td>
                                    <td>{selectedResult.fName}</td>
                                    <td>{selectedResult.mName}</td>
                                    <td>{selectedResult.class}</td>
                                    <td>{selectedResult.roll}</td>
                                    <td>{selectedResult.section}</td>
                                    <td>
                                        <ul>
                                            {Object.entries(selectedResult.subjectGradePoints).map(([subject, points]) => (
                                                <li key={subject}>{subject}: {points}</li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td>
                                        <ul>
                                            {Object.entries(selectedResult.subjectGradeLetters).map(([subject, grade]) => (
                                                <li key={subject}>{subject}: {grade}</li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td>{selectedResult.averageGradePoint}</td>
                                    <td>{selectedResult.totalGrade}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Display search message */}
                {searchMessage && searchClicked && <p>{searchMessage}</p>}

                {/* Display message when results are not fetched yet */}
                {!resultsFetched && searchClicked && (
                    <p>Result is not published yet</p>
                )}

            </div>
        </div>
    );
};

export default SeenResult;
