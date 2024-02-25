import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";

const UpdateAdmitCard = () => {
    const { register, handleSubmit } = useForm();
    const { id } = useParams();
    const data = useLoaderData();
    const [calculatedDayOfWeek, setCalculatedDayOfWeek] = useState("");
    

    const calculateDayOfWeek = (dateString) => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const date = new Date(dateString);
        const dayOfWeek = date.getDay();
        return days[dayOfWeek];
    };

    const onSubmit = async (formData) => {
        try {
             
            if (formData.shift === "Morning") {
                formData.exam_time = "9.00am - 12.00am";
            } else if (formData.shift === "Day") {
                formData.exam_time = "1.00pm - 4.00pm";
            }

            // Send PUT request
            const response = await fetch(`http://localhost:5001/admitPost/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                // Show success message
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Student information updated successfully!'
                });
            }
        } catch (error) {
            console.error("Error updating student information:", error);
        }
    };

    

    const handleDateChange = (event) => {
        const selectedDate = event.target.value;
        setCalculatedDayOfWeek(calculateDayOfWeek(selectedDate));
    };

    return (
        <div>
            <h1 className="font-bold text-center">Update Exam Admit Card</h1>
            <div className="mx-auto bg-slate-300 p-6 rounded-md">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Class</span>
                            </label>
                            <select defaultValue={data.class} {...register("class", { required: true })} name="class" className="select select-bordered">
                                <option value="">Select Class</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Select Exam</span>
                            </label>
                            <select defaultValue={data?.exam} name="exam" {...register("exam", { required: true })} className="select select-bordered">
                                <option value="">Select Exam</option>
                                <option value="Mid Term Exam">Mid Term Exam</option>
                                <option value="Final Exam">Final Exam</option>
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Select Shift</span>
                            </label>
                            <select defaultValue={data?.shift}   {...register("shift", { required: true })} name="shift" className="select select-bordered">
                                <option value="">Select Shift</option>
                                <option value="Morning">Morning</option>
                                <option value="Day">Day</option>
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Select Subject</span>
                            </label>
                            <select defaultValue={data?.subject} {...register("subject", { required: true })} name="subject" className="select select-bordered">
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
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Exam Date</span>
                            </label>
                            <input type="date" defaultValue={data?.date} {...register("date", { required: true })} name="date" className="input input-bordered" onChange={handleDateChange} />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Day of the Week</span>
                            </label>
                            <input type="text" value={calculatedDayOfWeek} readOnly {...register("dayOfWeek", { required: true })} className="input input-bordered" />
                        </div>


                    </div>
                    <div className="form-control mt-6">
                        <input className="btn btn-primary" type="submit" value="Update Information" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateAdmitCard;
