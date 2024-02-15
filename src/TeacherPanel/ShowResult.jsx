import { useEffect, useState } from "react";
import useAxiosSecure from "../Hook/AxiosSecure";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";

const ShowResult = () => {
    const axiosSecure = useAxiosSecure();
    const [results, setResults] = useState([]);
    const [selectedResult, setSelectedResult] = useState(null);

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

    if (results.length === 0) {
        return <div>Loading...</div>;
    }

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
                            // Remove the deleted result item from the results state
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

    return (
        <div>
            <h1>Student Results: {results.length}</h1>
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
                <tbody >
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


        </div>
    );
};

export default ShowResult;
