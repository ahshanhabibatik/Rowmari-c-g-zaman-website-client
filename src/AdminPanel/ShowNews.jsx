import { useEffect, useState } from 'react';
import useAxiosSecure from '../Hook/AxiosSecure';
import { FaEdit, FaEye } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';

const Modal = ({ children, onClose }) => {
    return (
        <dialog className="modal" open>
            <div className="modal-box w-11/12 max-w-5xl">
                {children}
                <div className="modal-action">
                    <button className="btn" onClick={onClose}>Close</button>
                </div>
            </div>
        </dialog>
    );
};

const ShowNews = () => {
    const axiosSecure = useAxiosSecure();
    const [notices, setNotices] = useState([]);
    const [selectedNotice, setSelectedNotice] = useState(null);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const res = await axiosSecure.get('/news');
                setNotices(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchNotices();
    }, [axiosSecure]);

    const openModal = (index) => {
        setSelectedNotice(notices[index]);
    };

    const closeModal = () => {
        setSelectedNotice(null);
    };

    const handleDeleteNews = (newsId) => {
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
                axiosSecure.delete(`/news/${newsId}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            // Remove the deleted news item from the notices state
                            setNotices(notices.filter(notice => notice._id !== newsId));
                            Swal.fire({
                                title: "Deleted!",
                                text: "The news item has been deleted.",
                                icon: "success"
                            });
                        }
                    })
                    .catch((error) => {
                        console.error("Error deleting news item:", error);
                    });
            }
        });
    };



    return (
        <div>
            <h1 className="text-2xl font-bold mt-4 text-center">Notice Board Management</h1>
            <table className="table-auto mx-auto mt-8">
                <thead className='text-center'>
                    <tr>
                        <th className="px-4 border py-2">Id</th>
                        <th className="px-4 border py-2">Date & Time</th>
                        <th className="px-4 border py-2">Notice</th>
                        <th className="px-4 border py-2">View</th>
                        <th className="px-4 border py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {notices.map((notice, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2">{index+1}</td>
                            <td className="border px-4 py-2">{notice.dateTime}</td>
                            <td className="border px-4 py-2">{notice.head}</td>
                            <td className="border px-4 py-2">
                                <button className='border-2 hover:bg-teal-400 px-4 flex items-center gap-1 py-1 rounded-md' onClick={() => openModal(index)}>
                                    <FaEye></FaEye>
                                    <div className='uppercase'>View</div>
                                </button>
                            </td>
                            <td className="border text-center">
                                <NavLink to={`updateNews/${notice._id}`}>
                                    <button className="text-xl">
                                        <FaEdit></FaEdit>
                                    </button>
                                </NavLink>
                                <button className="text-xl text-red-500 ml-2" onClick={() => handleDeleteNews(notice._id)}>
                                    <MdDelete />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedNotice && (
                <Modal onClose={closeModal}>
                    <div className='my-2 space-y-3'>
                        <h3 className="font-bold text-lg text-center">View News</h3>
                        <p className='font-bold text-center'>Date & Time: {selectedNotice.dateTime}</p>
                        <p><span className='font-bold uppercase'>Notice Heading:</span> {selectedNotice.head}</p>
                        <p><span className='font-bold  uppercase'>Notice:</span></p>
                        <p className='text-justify'>{selectedNotice.news}</p>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default ShowNews;
