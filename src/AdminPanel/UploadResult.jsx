import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import useAxiosPublic from '../Hook/UseAxiosPublic';
import Swal from 'sweetalert2';

const UploadResult = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();


    const onSubmit = async (data) => {
        try {
            // Send form data to backend
            const response = await axiosPublic.post('/sscResult', data);
            if (response.data.insertedId) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Ssc Data Added successfully.',
                    showConfirmButton: false,
                    timer: 1500
                });

            }
            reset();
        } catch (error) {
            console.error('Error uploading result:', error);
        }
    };

    return (
        <div>
            <h1 className="text-2xl text-center font-bold mt-5 mb-3">Uploaded SSC Result Pdf</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex items-center gap-4 mx-auto justify-center">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Date</span>
                        </label>
                        <input type="date" {...register('date')} className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <input type="text" {...register('description')} className="input input-bordered" />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Uploaded Drive Link</span>
                        </label>
                        <input type="text" {...register('link')} className="input input-bordered" />
                    </div>
                </div>
                <div>
                    <button type="submit" className="btn btn-primary flex mx-auto mt-5">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default UploadResult;
