import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hook/UseAxiosPublic";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calender2.css'



const ShowEventStudent = () => {
    const axiosPublic = useAxiosPublic();
    const [events, setEvents] = useState([]);
    const [selectedDateEvents, setSelectedDateEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await axiosPublic.get('/getEvent');
                setEvents(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchEvent();
    }, [axiosPublic]);

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
                        <h3>{selectedEvent.head}</h3>
                        <p>{selectedEvent.details}</p>
                    </div>
                ) : (
                    <div>
                        <h3>All Events</h3>
                        {events.map(event => (
                            <div key={event._id}>
                                <h3>{event.head}</h3>
                                <p>{event.details}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};


export default ShowEventStudent;