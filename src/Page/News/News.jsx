import { useState, useEffect } from "react";
import NewNews from "./NewNews";
import NavBar from "../../Navber/NavBar";


const News = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        fetch('news.json')
            .then((response) => response.json())
            .then((data) => {
                setNews(data);
            });
    }, []);

    return (
        <div>
            <NavBar></NavBar>
            <h1 className="text-4xl text-emerald-400 text-center">Notice Board</h1>
            <div className="overflow-x-auto">
                <table className="table mx-16 table-zebra">
                    <thead className="">
                        <tr>
                            <th style={{ width: '5%' }}>Sl.</th>
                            <th style={{ width: '10%' }}>Date</th>
                            <th style={{ width: '30%' }}>Headline</th>
                            <th style={{ width: '40%' }}>Description</th>
                            <th style={{ width: '15%' }}>View</th>
                        </tr>
                    </thead>
                </table>

                <tbody className=" ">
                    {news.map((newNews) => (
                        <NewNews key={newNews.Sl} newNews={newNews} />
                    ))}

                </tbody>

            </div>
        </div>
    );
};

export default News;
