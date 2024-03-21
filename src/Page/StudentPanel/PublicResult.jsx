import { useEffect, useRef, useState } from "react";
import useAxiosSecure from "../../Hook/AxiosSecure";
import NavBar from "../../Navber/NavBar";
import Swal from "sweetalert2";
import { useReactToPrint } from "react-to-print";
import { FaDownload } from "react-icons/fa";

const PublicResult = () => {
    const axiosSecure = useAxiosSecure();
    const [publishedResults, setPublishedResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchedClass, setSearchedClass] = useState("");
    const [filteredResults, setFilteredResults] = useState([]);
    const componentRef = useRef();

    useEffect(() => {
        const fetchPublishedResults = async () => {
            try {
                const response = await axiosSecure.get('/results/publish');
                setPublishedResults(response.data);
                setLoading(false); // Set loading to false once results are fetched
                if (response.data.length === 0) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Results Not Published',
                        text: 'The results are not published yet!',
                    });
                }
            } catch (error) {
                console.error('Error fetching published results:', error);
                setLoading(false); // Set loading to false if there's an error
            }
        };

        fetchPublishedResults();
    }, [axiosSecure]);

    useEffect(() => {
        // Filter results based on searched class
        if (searchedClass) {
            const filtered = publishedResults.filter(result => result.class === searchedClass);
            setFilteredResults(filtered);
        } else {
            setFilteredResults(publishedResults); // Show all results if no class is searched
        }
    }, [searchedClass, publishedResults]);

    const handleInputChange = (event) => {
        setSearchedClass(event.target.value);
    };

    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });

    return (
        <div>
            <NavBar />
            <div className="flex justify-end mt-5 mx-8 gap-3 items-center">
                <h1>Search Class</h1>
                <input
                    type="number"
                    placeholder="Student Class"
                    className="border px-3 py-1 border-black rounded-lg"
                    value={searchedClass}
                    onChange={handleInputChange}
                />
            </div>
            {loading ? (
                <span className="loading loading-ring flex mx-auto justify-center text-9xl text-center w-60"></span>
            ) : (
                <div >
                    {filteredResults.length === 0 ? (
                        <div>
                            <h1 className="text-center text-2xl">No result published yet</h1>
                            <img src="https://i.ibb.co/WzZTFbb/noresult.jpg" alt="" />
                        </div>
                    ) : (
                        <div ref={componentRef} className="">
                            <h2 className="text-2xl font-semibold mb-4 text-center mt-2">Published Results</h2>
                            <table className="table-auto mx-auto text-cente mb-4 lg:w-[900px]">
                                <thead>
                                    <tr>
                                        <th className="border border-black text-center p-3">ID</th>
                                        <th className="border border-black text-center px-2">Student Name</th>
                                        <th className="border border-black text-center px-2">Class</th>
                                        <th className="border border-black text-center px-2">Roll</th>
                                        <th className="border border-black text-center px-2">Section</th>
                                        <th className="border border-black text-center px-2">Grade</th>
                                        <th className="border border-black text-center px-2">Average Grade Point</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredResults
                                        .sort((a, b) => a.class.localeCompare(b.class)) // Sort by class
                                        .map((result, index) => (
                                            <tr key={index}>
                                                <td className="border border-black text-center p-3">{index + 1}</td>
                                                <td className="border border-black text-center">{result.name}</td>
                                                <td className="border border-black text-center">{result.class}</td>
                                                <td className="border border-black text-center">{result.roll}</td>
                                                <td className="border border-black text-center">{result.section}</td>
                                                <td className="border border-black text-center">{result.totalGrade}</td>
                                                <td className="border border-black text-center">{result.averageGradePoint}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}

            <div className="flex justify-center mb-5">
                <button onClick={handlePrint} className="btn btn-outline  "><FaDownload></FaDownload></button>
            </div>
        </div>
    )
};

export default PublicResult;
