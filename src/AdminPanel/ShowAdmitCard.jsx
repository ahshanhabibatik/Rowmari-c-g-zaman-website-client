import React, { useState, useEffect } from 'react';
import useAxiosSecure from "../Hook/AxiosSecure";
import { NavLink } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';

const ShowAdmitCard = () => {
    const axiosSecure = useAxiosSecure();

    const { data: admitCardsClass6 = [], refetch: refetchClass6 } = useQuery({
        queryKey: ['admitCardsClass6'],
        queryFn: async () => {
            const response = await axiosSecure.get('/admitPost');
            return response.data.filter(admitCard => admitCard.class === '6');
        }
    });

    const { data: admitCardsClass7 = [], refetch: refetchClass7 } = useQuery({
        queryKey: ['admitCardsClass7'],
        queryFn: async () => {
            const response = await axiosSecure.get('/admitPost');
            return response.data.filter(admitCard => admitCard.class === '7');
        }
    });

    const { data: admitCardsClass8 = [], refetch: refetchClass8 } = useQuery({
        queryKey: ['admitCardsClass8'],
        queryFn: async () => {
            const response = await axiosSecure.get('/admitPost');
            return response.data.filter(admitCard => admitCard.class === '8');
        }
    });

    const { data: admitCardsClass9 = [], refetch: refetchClass9 } = useQuery({
        queryKey: ['admitCardsClass9'],
        queryFn: async () => {
            const response = await axiosSecure.get('/admitPost');
            return response.data.filter(admitCard => admitCard.class === '9');
        }
    });

    const { data: admitCardsClass10 = [], refetch: refetchClass10 } = useQuery({
        queryKey: ['admitCardsClass10'],
        queryFn: async () => {
            const response = await axiosSecure.get('/admitPost');
            return response.data.filter(admitCard => admitCard.class === '10');
        }
    });

    const handleDeleteAdmitCard = (admitCardId, refetch) => {
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
                axiosSecure.delete(`/admitPost/${admitCardId}`)
                    .then(() => {
                        refetch(); // Refresh the admit card data
                        Swal.fire({
                            title: "Deleted!",
                            text: "The admit card has been deleted.",
                            icon: "success"
                        });
                    })
                    .catch((error) => {
                        console.error("Error deleting admit card:", error);
                    });
            }
        });
    };



    const handlePublish = (admitCardId) => {
        axiosSecure.put(`/admitPost/publish/${admitCardId}`)
            .then(response => {
                console.log(response.data.message);
                // Show SweetAlert upon successful publishing
                Swal.fire({
                    icon: 'success',
                    title: 'Admit Card Published!',
                    text: 'The admit card has been successfully published.',
                });
            })
            .catch(error => {
                console.error("Error updating admit card role to published:", error);
            });
    };

    const handleUnpublish = (admitCardId) => {
        axiosSecure.put(`/admitPost/unpublish/${admitCardId}`)
            .then(response => {
                console.log(response.data.message);
                Swal.fire({
                    icon: 'success',
                    title: 'Admit Card Published!',
                    text: 'The admit card has been successfully Unpublished.',
                });
            })
            .catch(error => {
                console.error("Error updating admit card role to unpublished:", error);
            });
    };


    const renderTable = (admitCards, refetch) => (
        <table className="table-auto mx-auto">
            <thead>
                <tr>
                    <th className="px-4 py-2 border">Class</th>
                    <th className="px-4 py-2 border">Exam</th>
                    <th className="px-4 py-2 border">Shift</th>
                    <th className="px-4 py-2 border">Subject</th>
                    <th className="px-4 py-2 border">Date</th>
                    <th className="px-4 py-2 border">Day of Week</th>
                    <th className="px-4 py-2 border">Exam Time</th>
                    <th className="px-4 py-2 border">Action</th>
                </tr>
            </thead>
            <tbody>
                {admitCards.map((admitCard, index) => (
                    <tr key={index}>
                        <td className="border px-4 py-2">{admitCard.class}</td>
                        <td className="border px-4 py-2">{admitCard.exam}</td>
                        <td className="border px-4 py-2">{admitCard.shift}</td>
                        <td className="border px-4 py-2">{admitCard.subject}</td>
                        <td className="border px-4 py-2">{admitCard.date}</td>
                        <td className="border px-4 py-2">{admitCard.dayOfWeek}</td>
                        <td className="border px-4 py-2">{admitCard.exam_time}</td>
                        <td className="border text-center">
                            <NavLink to={`updateAdmit/${admitCard?._id}`}>
                                <button className="text-xl">
                                    <FaEdit></FaEdit>
                                </button>
                            </NavLink>
                            <button className="text-xl text-red-500 ml-2" onClick={() => handleDeleteAdmitCard(admitCard?._id, refetch)}>
                                <MdDelete />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <div className='mb-6'>
            <h1 className="font-bold text-center">Admit Cards</h1>
            <div className="mt-4">
                <h2 className="font-bold text-center">Class 6</h2>
                {renderTable(admitCardsClass6, refetchClass6)}
            </div>
            <div className="mt-4">
                <h2 className="font-bold text-center">Class 7</h2>
                {renderTable(admitCardsClass7, refetchClass7)}
            </div>
            <div className="mt-4">
                <h2 className="font-bold text-center">Class 8</h2>
                {renderTable(admitCardsClass8, refetchClass8)}
            </div>
            <div className="mt-4">
                <h2 className="font-bold text-center">Class 9</h2>
                {renderTable(admitCardsClass9, refetchClass9)}
            </div>
            <div className="mt-4">
                <h2 className="font-bold text-center">Class 10</h2>
                {renderTable(admitCardsClass10, refetchClass10)}
            </div>

            <button onClick={handlePublish} className='btn btn-secondary flex mx-auto mt-3 font-bold'>Public Routine</button>
            <button onClick={handleUnpublish} className='btn btn-secondary flex mx-auto mt-3 font-bold'>UnPublic Routine</button>
        </div>
    );
};

export default ShowAdmitCard;
