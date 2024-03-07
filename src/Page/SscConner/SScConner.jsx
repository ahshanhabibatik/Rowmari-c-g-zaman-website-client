import React from "react";
import NavBar from "../../Navber/NavBar";
import useAxiosPublic from "../../Hook/UseAxiosPublic";

const SScConner = () => {
    const axiosPublic = useAxiosPublic();
    const [sscData, setSscData] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosPublic.get("/sscResult");
                setSscData(response.data);
            } catch (error) {
                console.error("Error fetching SSC result:", error);
            }
        };

        fetchData();
    }, [axiosPublic]);

    return (
        <div>
            <NavBar />
            <div className="mb-4">
                <h1 className="uppercase text-center my-4 text-2xl font-bold">SSC Result</h1>
                <table className="mx-auto md:w-[700px]">
                    <thead>
                        <tr className="bg-slate-500 text-white">
                            <th className="border border-black text-center p-1">Id</th>
                            <th className="border border-black text-center p-1">Description</th>
                            <th className="border border-black text-center p-1">Added Date</th>
                            <th className="border border-black text-center p-1">Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sscData.map((result, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-red-300' : 'bg-yellow-300'}>
                                <td className="border border-black text-center p-1">{index + 1}</td>
                                <td className="border border-black text-center p-1">{result.description}</td>
                                <td className="border border-black text-center p-1">{result.added_date}</td>
                                <td className="border border-black text-center p-1">
                                    <button className="border px-3 py-1 rounded-lg border-slate-500 hover:bg-sky-500">
                                        <a href={result.link} target="_blank" rel="noopener noreferrer">
                                            View PDF
                                        </a>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SScConner;
