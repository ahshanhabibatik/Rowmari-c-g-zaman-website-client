import { useForm } from "react-hook-form";
import useAxiosSecure from "../Hook/AxiosSecure";
import Swal from 'sweetalert2';

const AddEvent = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {

        try {
            const res = await axiosSecure.post('/postEvent', data);
            if (res.data.insertedId) {
                reset();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Event Added successfully.',
                    showConfirmButton: false,
                    timer: 1500
                });

            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className="mx-4">
                <h1 className="text-2xl font-bold text-center my-3">Event Management</h1>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="lg:flex lg:w-[800px] gap-4 mx-auto">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Select Event Date</span>
                            </label>
                            <input type="date"  {...register("date", { required: true })} name="date" placeholder="Date" className="border p-6 rounded-lg mx-auto lg:w-[390px] w-full flex  shadow-md" />
                            {errors.date && <span className="text-red-600">Date is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Select Event Time</span>
                            </label>
                            <input type="time"  {...register("time", { required: true })} name="time" placeholder="" className="border p-6 rounded-lg lg:w-[390px] w-full mx-auto flex  shadow-md" />
                            {errors.time && <span className="text-red-600">time is required</span>}
                        </div>
                    </div>
                    <div className="form-control">
                        <input type="text"  {...register("head", { required: true })} name="head" placeholder="Write your news Heading" className="border p-6 rounded-lg mt-8  lg:w-[800px] w-full mx-auto flex  shadow-md" />
                        {errors.head && <span className="text-red-600 lg:w-[800px]">Heading is required</span>}
                    </div>
                    <textarea
                        {...register('details', { required: true })}
                        className={`border p-6 rounded-lg mt-8  lg:w-[800px] w-full mx-auto flex  shadow-md ${errors.details && 'border-red-500'}`}
                        placeholder="Write Event Details"
                        cols="50"
                        rows="7"
                    ></textarea>
                    <input
                        type="submit"
                        className="border-2 hover:bg-green-400 px-10 uppercase rounded-xl cursor-pointer border-orange-400 py-4 mx-auto flex my-5"
                        value="Submit event"
                    />
                </form>
            </div>
        </div>
    );
};

export default AddEvent;