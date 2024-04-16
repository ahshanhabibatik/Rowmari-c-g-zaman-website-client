import React, { useState, useEffect } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import useAxiosSecure from "../Hook/AxiosSecure";
import './calender.css'; // Corrected the filename to match your import
import { NavLink } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2';

const ShowEventAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const [events, setEvents] = useState([]);
    const [selectedDateEvents, setSelectedDateEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await axiosSecure.get('/getEvent');
                setEvents(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchEvent();
    }, [axiosSecure]);


    const handleEventDelete = (eventId) => {
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
                axiosSecure.delete(`/event/${eventId}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            // Remove the deleted event item from the events state
                            setEvents(events.filter(event => event._id !== eventId));
                            Swal.fire({
                                title: "Deleted!",
                                text: "The event has been deleted.",
                                icon: "success"
                            });
                        }
                    })
                    .catch((error) => {
                        console.error("Error deleting event:", error);
                    });
            }
        });
    };

    const handleDateClick = (date) => {
        const clickedDate = date.toISOString().split('T')[0];
        const filteredEvents = events.filter(event => event.date === clickedDate);
        setSelectedDateEvents(filteredEvents);
        if (filteredEvents.length > 0) {
            setSelectedEvent(filteredEvents[0]); // Set the clicked date's event as selected event
        } else {
            setSelectedEvent(null); // If no events on clicked date, reset selected event
        }
    };

    const eventDates = events.map(event => new Date(event.date));

    const tileContent = ({ date, view }) => {
        if (view === 'month' && eventDates.find(eventDate => eventDate.toISOString().split('T')[0] === date.toISOString().split('T')[0])) {
            return <div className="text-red-500 font-bold">•</div>;
        }
    };

    return (
        <div className="flex gap-7 mx-20 my-8">
            <div className="">
                <Calendar
                    onClickDay={handleDateClick}
                    tileContent={tileContent}
                />
            </div>
            <div className="">
                {selectedEvent ? (
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th className="border p-2 text-center">Head</th>
                                    <th className="border p-2">Details</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr>
                                    <td className="border p-2 text-center">{selectedEvent.head}</td>
                                    <td className="border p-2 text-center">{selectedEvent.details}</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div>
                        <h3>All Events</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th className="border p-2 text-center">Head</th>
                                    <th className="border p-2 text-center">Details</th>
                                    <th className="border p-2 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {events.map(event => (
                                    <tr key={event._id}>
                                        <td className="border p-2 text-center">{event.head}</td>
                                        <td className="border p-2 text-center">{event.details}</td>

                                        <td className="border text-center">
                                            <NavLink>
                                                <button className="text-xl">
                                                    <FaEdit></FaEdit>
                                                </button>
                                            </NavLink>
                                            <button className="text-xl text-red-500 ml-2" onClick={() => handleEventDelete(event._id)}>
                                                <MdDelete />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShowEventAdmin;
