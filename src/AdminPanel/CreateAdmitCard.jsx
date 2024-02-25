import { useForm } from "react-hook-form";
import useAxiosSecure from "../Hook/AxiosSecure";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const CreateAdmitCard = () => {
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedDay, setSelectedDay] = useState('');
    const [selectedShift, setSelectedShift] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data) => {
        try {
            setIsSubmitting(true);
            data.dayOfWeek = selectedDay;
            if (selectedShift === 'Morning') {
                data.exam_time = '9.00am - 12.00pm';
            } else if (selectedShift === 'Day') {
                data.exam_time = '1.00pm - 4.00pm';
            }

            const res = await axiosSecure.post('/admitPost', data);
            if (res.data.insertedId) {
                console.log('user added to the database');
                reset();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Exam Routine Added successfully.',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        const calculateDay = () => {
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const date = new Date(selectedDate);
            const day = days[date.getDay()];
            setSelectedDay(day);
        };
        calculateDay();
    }, [selectedDate]);


    return (
        <div>
            <h1 className="font-bold text-center">Generate Admit Card</h1>
            <div className="mx-auto bg-slate-300 p-6 rounded-md">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Class</span>
                            </label>
                            <select {...register("class", { required: true })} name="class" className="select select-bordered">
                                <option value="">Select Class</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                            {errors.class && <span className="text-red-600">Class is required</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Section</span>
                            </label>
                            <select {...register("exam", { required: true })} name="exam" className="select select-bordered">
                                <option value="">Select Exam</option>
                                <option value="Mid Term Exam">Mid Term Exam</option>
                                <option value="Final Exam">Final Exam</option>
                            </select>
                            {errors.exam && <span className="text-red-600">Section is required</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Select Shift</span>
                            </label>
                            <select {...register("shift", { required: true })} name="shift" className="select select-bordered" onChange={(e) => setSelectedShift(e.target.value)}>
                                <option value="">Select Shift</option>
                                <option value="Morning">Morning</option>
                                <option value="Day">Day</option>
                            </select>
                            {errors.shift && <span className="text-red-600">Shift is required</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Select Subject</span>
                            </label>
                            <select {...register("subject", { required: true })} name="subject" className="select select-bordered">
                                <option value="">Select Subject</option>
                                <option value="বাংলা">বাংলা</option>
                                <option value="English">English</option>
                                <option value="গণিত">গণিত</option>
                                <option value="ইতিহাস ও সামাজিক বিজ্ঞান">ইতিহাস ও সামাজিক বিজ্ঞান</option>
                                <option value="স্বাস্থ্য সুরক্ষা">স্বাস্থ্য সুরক্ষা</option>
                                <option value="জীবন ও জীবিকা">জীবন ও জীবিকা</option>
                                <option value="শিল্প ও সংস্কৃতি">শিল্প ও সংস্কৃতি</option>
                                <option value="বিজ্ঞান">বিজ্ঞান</option>
                                <option value="ডিজিটাল প্রযুক্তি">ডিজিটাল প্রযুক্তি</option>
                                <option value="ইসলাম শিক্ষা">ইসলাম শিক্ষা</option>
                            </select>
                            {errors.subject && <span className="text-red-600">Subject is required</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Exam Date</span>
                            </label>
                            <input
                                type="date"
                                {...register("date", { required: true })}
                                name="date"
                                className="input input-bordered"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                            />
                            {errors.date && <span className="text-red-600">Exam Date is required</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Day of the Week</span>
                            </label>
                            <input
                                type="text"
                                className="input input-bordered"
                                value={selectedDay}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="form-control mt-6">
                        <input
                            className="btn btn-primary"
                            type="submit"
                            value="Add Information"
                            disabled={isSubmitting}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateAdmitCard;
