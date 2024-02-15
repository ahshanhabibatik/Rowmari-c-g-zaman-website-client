import { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import useAxiosSecure from '../../Hook/AxiosSecure';
import NavBar from '../../Navber/NavBar';
import './UserNotice.css'

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

const UserNotice = () => {
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

    return (
        <div>
            <NavBar></NavBar>
            <div className='flex justify-evenly'>
                <h1 className="font-bold mt-8 animate-charcter">Notice Board</h1>
            </div>
            <table className="table-auto mx-auto mt-8">
                <thead className='text-center'>
                    <tr>
                        <th className="px-4 border py-2">Id</th>
                        <th className="px-4 border py-2">Date & Time</th>
                        <th className="px-4 border py-2">Notice</th>
                        <th className="px-4 border py-2">View</th>
                    </tr>
                </thead>
                <tbody>
                    {notices.map((notice, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2">{index + 1}</td>
                            <td className="border px-4 py-2">{notice.dateTime}</td>
                            <td className="border px-4 py-2">{notice.head}</td>
                            <td className="border px-4 py-2">
                                <button className='border-2 hover:bg-teal-400 px-4 flex items-center gap-1 py-1 rounded-md' onClick={() => openModal(index)}>
                                    <FaEye></FaEye>
                                    <div className='uppercase'>View</div>
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

export default UserNotice;