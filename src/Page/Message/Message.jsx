
import { Link } from 'react-router-dom';
import head from '../../assets/head.jpg'
import { useEffect, useState } from 'react';
import useAxiosPublic from '../../Hook/UseAxiosPublic';
import { IoLinkSharp } from "react-icons/io5";

const Message = () => {
    const [links, setLinks] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosPublic.get('/links');
                setLinks(response.data.slice(0, 5));
            } catch (error) {
                console.error('Error fetching links:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <div className='mx-8'>
                <div className='md:flex justify-evenly mx-auto mt-8 gap-2'>
                    <div className=' flex lg:w-[66%] gap-4 bg-[#F1F3F5] border-2 py-3 px-6 rounded-lg'>
                        <div className='border mx-auto h-60 w-64 mt-3'>
                            <img className='h-60 w-64' src={head} alt="" />
                        </div>
                        <div className=''>
                            <h1 className='text-3xl text-[#797b7c] font-bold'>Headmaster's <br /> Message:</h1>
                            <h1 className='border-b-2 w-40 lg:ml-40'></h1>
                            <h1 className='text-gray-500  font-semibold text-xl mt-4 '>Dear inhabitants of Rowmari,<br />
                                Assalamualaikum</h1>

                            <h1 className='text-gray-500   font-semibold text-xl mt-8'>By the grace of almighty Allah, this school...</h1>
                            <Link to={'/message'}><button className='text-gray-600 btn btn-outline font-semibold mt-6 text-xl'>Read More..</button></Link>
                        </div>
                    </div>
                    <div className='lg:w-[34%] border-2 mt-4 lg:mt-0 rounded-lg'>
                        <h1 className='text-center border rounded-t-lg text-xl font-bold bg-zinc-300 text-[#797b7c] py-3'>Impotent Links</h1>
                        <div>
                            {links.map((link) => (
                                <div key={link._id} className='border lg:w-[370px] mx-auto mt-[6px] px-2 py-1 bg-gray-200 rounded-lg'>
                                    <div className='flex items-center gap-3'>
                                        <IoLinkSharp />
                                        <a href={link.link} target="_blank" rel="noopener noreferrer">{link.name}</a>
                                    </div>
                                </div>
                            ))}

                            <Link>
                                <button className='border px-3 py-2 uppercase mt-1 flex mx-auto rounded-lg border-gray-800 hover:bg-yellow-500'>See More</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Message;