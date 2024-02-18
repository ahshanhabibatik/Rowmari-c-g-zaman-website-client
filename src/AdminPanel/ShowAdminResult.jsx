import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import useAxiosSecure from "../Hook/AxiosSecure";

const ShowAdminResult = () => {
    const axiosSecure = useAxiosSecure();
    const [results, setResults] = useState([]);
    const [selectedResult, setSelectedResult] = useState(null);
    const [searchClass, setSearchClass] = useState("");
    const [searchRoll, setSearchRoll] = useState("");
    const [searchSection, setSearchSection] = useState("");
    const [searchMessage, setSearchMessage] = useState("");
    const [resultsPublished, setResultsPublished] = useState(false);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axiosSecure.get("/results");
                setResults(response.data);
            } catch (error) {
                console.error("Error fetching results:", error);
            }
        };

        fetchResults();
    }, [axiosSecure]);

    useEffect(() => {
        if (searchClass && searchSection && searchRoll) {
            const student = results.find(result =>
                result.class === searchClass &&
                result.section === searchSection &&
                result.roll === searchRoll
            );
            setSelectedResult(student);
        }
    }, [searchClass, searchSection, searchRoll, results]);

    const handleSearch = () => {
        const filteredResults = results.filter(result =>
            result.class === searchClass &&
            result.roll === searchRoll &&
            result.section === searchSection
        );
        setResults(filteredResults);
        if (filteredResults.length === 0) {
            setSearchMessage("Student not found");
        } else {
            setSearchMessage("");
        }
    };

    const handleDeleteResult = (resultId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/results/${resultId}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            setResults(results.filter(result => result._id !== resultId));
                            Swal.fire({
                                title: "Deleted!",
                                text: "The result item has been deleted.",
                                icon: "success"
                            });
                        }
                    })
                    .catch((error) => {
                        console.error("Error deleting result item:", error);
                    });
            }
        });
    };

    const handleViewResultDetails = (result) => {
        setSelectedResult(result);
    };

    const handleCloseModal = () => {
        setSelectedResult(null);
    };

    const handlePublishResults = () => {
        if (resultsPublished) {
            Swal.fire({
                title: "Results Already Published!",
                text: "Results have already been published.",
                icon: "warning"
            });
            return;
        }

        axiosSecure.post('/results/publish')
            .then(res => {
                console.log(res.data);
                setResultsPublished(true);
                Swal.fire({
                    title: "Published!",
                    text: "Results have been published.",
                    icon: "success"
                });
            })
            .catch((error) => {
                console.error("Error publishing results:", error);
            });
    };

    const handleDoubleClickPublishButton = () => {
        Swal.fire({
            title: "Results Already Published!",
            text: "Results have already been published.",
            icon: "warning"
        });
    };

    return (
        <div>
            <div className="lg:flex mt-4 lg:justify-between justify-center mx-auto mb-6">
                <div>

                </div>
                <div className="lg:flex justify-center gap-3">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Class</span>
                        </label>
                        <select
                            name="class"
                            className="select select-bordered w-32"
                            value={searchClass}
                            onChange={(e) => setSearchClass(e.target.value)}
                        >
                            <option value="" disabled>Select Class</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Section</span>
                        </label>
                        <select
                            name="section"
                            className="select select-bordered w-32"
                            value={searchSection}
                            onChange={(e) => setSearchSection(e.target.value)}
                        >
                            <option value="" disabled>Select Section</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Student Roll</span>
                        </label>
                        <input
                            type="number"
                            name="roll"
                            placeholder="Roll"
                            className="input input-bordered w-32"
                            value={searchRoll}
                            onChange={(e) => setSearchRoll(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-primary mt-9" onClick={handleSearch}>Search</button>
                </div>
            </div>
            {searchMessage && <p className="text-red-500">{searchMessage}</p>}
            {results.length > 0 && (
                <table className="border mx-auto mt-4 w-[1100px]">
                    <thead>
                        <tr className="border">
                            <th className="border text-center">Id</th>
                            <th className="border text-center">Name</th>
                            <th className="border text-center">Father's Name</th>
                            <th className="border text-center">Mother's Name</th>
                            <th className="border text-center">Class</th>
                            <th className="border text-center">Roll</th>
                            <th className="border text-center">Section</th>
                            <th className="border text-center">Total Number</th>
                            <th className="border text-center">Grade</th>
                            <th className="border text-center">G_Point</th>
                            <th className="border text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result, index) => (
                            <tr key={index}>
                                <td className="border text-center">{index + 1}</td>
                                <td className="border text-center">{result.name}</td>
                                <td className="border text-center">{result.fName}</td>
                                <td className="border text-center">{result.mName}</td>
                                <td className="border text-center">{result.class}</td>
                                <td className="border text-center">{result.roll}</td>
                                <td className="border text-center">{result.section}</td>
                                <td className="border text-center">{result.totalMarks}</td>
                                <td className="border text-center">{result.totalGrade}</td>
                                <td className="border text-center">{result.averageGradePoint}</td>
                                <td className="border text-center">
                                    <div className="flex">
                                        <button className='border-2 border-yellow-300 hover:bg-teal-400 
                                        px-3 gap-1 rounded-md'
                                            onClick={() => handleViewResultDetails(result)}>
                                            <FaEye />
                                        </button>
                                        <button className="text-xl border-2 hover:bg-cyan-400 border-yellow-300
                                        px-3 gap-1 p rounded-md text-red-500 ml-2"
                                            onClick={() => handleDeleteResult(result._id)}>
                                            <MdDelete />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {selectedResult && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
                    <div className="bg-white p-4 rounded-lg" style={{ height: "500px", width: "800px" }}>
                        <h2 className="text-lg font-semibold">{selectedResult.name}'s Details</h2>
                        <div className="flex gap-6">
                            <p>Class: {selectedResult.class}</p>
                            <p>Section: {selectedResult.section}</p>
                            <p>Roll: {selectedResult.roll}</p>
                        </div>

                        <h3 className="text-lg font-semibold mt-1 mb-1">Subject Marks and Grade Points</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <table className="table-auto">
                                <thead>
                                    <tr>
                                        <th className="px-4 border py-2">Subject</th>
                                        <th className="px-4 border py-2">Marks</th>
                                        <th className="px-4 border py-2">Grade Points</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(selectedResult.subjectGradePoints).slice(0, 5).map(([subject, gradePoint]) => (
                                        <tr className="text-center" key={subject}>
                                            <td className="border px-4 py-2">{subject}</td>
                                            <td className="border px-4 py-2">{selectedResult[subject]}</td>
                                            <td className="border px-4 py-2">{gradePoint}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <table className="table-auto">
                                <thead>
                                    <tr>
                                        <th className="px-4 border py-2">Subject</th>
                                        <th className="px-4 border py-2">Marks</th>
                                        <th className="px-4 border py-2">Grade Points</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(selectedResult.subjectGradePoints).slice(5, 10).map(([subject, gradePoint], index) => (
                                        <tr className="text-center" key={index}>
                                            <td className="border px-4 py-2">{subject}</td>
                                            <td className="border px-4 py-2">{selectedResult[subject]}</td>
                                            <td className="border px-4 py-2">{gradePoint}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td className="border px-4 py-2 font-semibold text-center">Total</td>
                                        <td className="border px-4 py-2 font-semibold text-center" colSpan="2">{selectedResult.totalGrade}</td>
                                    </tr>
                                    <tr>
                                        <td className="border px-4 py-2 font-semibold text-center">Average</td>
                                        <td className="border px-4 py-2 font-semibold text-center" colSpan="2">{selectedResult.averageGradePoint}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        <div className="flex justify-end ">
                            <button className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded" onClick={handleCloseModal}>Close</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex gap-3 mt-6 mx-auto justify-end">
                <button
                    className={`btn btn-primary fixed bottom-5 right-5 ${resultsPublished ? "cursor-not-allowed" : ""
                        }`}
                    onClick={resultsPublished ? handleDoubleClickPublishButton : handlePublishResults}
                    disabled={resultsPublished}
                >
                    Publish Results
                </button>
            </div>
        </div>
    );
};

export default ShowAdminResult;
