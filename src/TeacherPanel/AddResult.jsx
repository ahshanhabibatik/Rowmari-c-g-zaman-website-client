import { useState, useEffect } from "react";
import useAxiosSecure from "../Hook/AxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const AddResult = () => {
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);

    useEffect(() => {
        // Fetch all students data from the API
        const fetchStudents = async () => {
            try {
                const res = await axiosSecure.get('/students');
                setStudents(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchStudents();
    }, [axiosSecure]);

    const onSubmit = async (data) => {
        try {
            const res = await axiosSecure.post('/students', data);
            if (res.data.insertedId) {
                console.log('user added to the database');
                reset();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Student Data Added successfully.',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleClassChange = (e) => {
        const selectedClass = e.target.value;
        // Filter students based on the selected class
        const filteredStudents = students.filter(student => student.class === selectedClass);
        setStudents(filteredStudents);
        // Reset roll and section values
        setValue("roll", "");
        setValue("section", "");
        setSelectedStudent(null);
    };

    const handleRollChange = (e) => {
        const selectedRoll = e.target.value;
        // Filter students based on the selected roll and class
        const filteredStudents = students.filter(student => student.roll === selectedRoll);
        setSelectedStudent(filteredStudents[0] || null);
    };

    const handleSectionChange = (e) => {
        const selectedSection = e.target.value;
        // Filter students based on the selected section and class
        const filteredStudents = students.filter(student => student.section === selectedSection);
        setSelectedStudent(filteredStudents[0] || null);
    };

    return (
        <div>
            <h1 className="font-bold text-3xl text-center mt-6 mb-6 uppercase">Added Student Result</h1>
            <div className="lg:w-[600px] mx-auto bg-slate-300">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <div className='flex justify-evenly'>
                        <div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" defaultValue={selectedStudent?.name} readOnly className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Class</span>
                                </label>
                                <select {...register("class", { required: true })} name="class" className="select select-bordered" onChange={handleClassChange}>
                                    <option value="" disabled>Select Class</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="Vocational">Vocational</option>
                                </select>
                                {errors.class && <span className="text-red-600">Class is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Student Roll</span>
                                </label>
                                <input type="number" {...register("roll", { required: true })} name="roll" placeholder="Enter Roll" className="input input-bordered" onChange={handleRollChange} />
                                {errors.roll && <span className="text-red-600">Roll is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Section</span>
                                </label>
                                <select {...register("section", { required: true })} name="section" className="select select-bordered" onChange={handleSectionChange}>
                                    <option value="" disabled>Select Section</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                </select>
                                {errors.section && <span className="text-red-600">Section is required</span>}
                            </div>
                        </div>


                        {/* part-2 */}

                        <div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">ডিজিটাল প্রযুক্তি</span>
                                </label>
                                <input type="number"  {...register("ডিজিটাল প্রযুক্তি", { required: true })} name="ডিজিটাল প্রযুক্তি" placeholder="Please Enter Number" className="input input-bordered" />
                                {errors.email && <span className="text-red-600">Email is required</span>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">স্বাস্থ্য সুরক্ষা</span>
                                </label>
                                <input type="number"  {...register("স্বাস্থ্য সুরক্ষা", { required: true })} name="স্বাস্থ্য সুরক্ষা" placeholder="Please Enter Number" className="input input-bordered" />
                                {errors.email && <span className="text-red-600">Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">জীবন ও জীবিকা</span>
                                </label>
                                <input type="number"  {...register("জীবন ও জীবিকা", { required: true })} name="জীবন ও জীবিকা" placeholder="Please Enter Number" className="input input-bordered" />
                                {errors.email && <span className="text-red-600">Email is required</span>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">শিল্প ও সংস্কৃতি</span>
                                </label>
                                <input type="number"  {...register("শিল্প ও সংস্কৃতি", { required: true })} name="শিল্প ও সংস্কৃতি" placeholder="Please Enter Number" className="input input-bordered" />
                                {errors.email && <span className="text-red-600">Email is required</span>}
                            </div>
                        </div>
                    </div>
                    <div className="form-control w-[470px] mx-auto">
                        <label className="label">
                            <span className="label-text">Address</span>
                        </label>
                        <input type="text" {...register("address", { required: true })} placeholder="Enter your Address" className="input input-bordered" />
                        {errors.address && <span className="text-red-600">Address is required</span>}
                    </div>
                    <div className="form-control mt-6">
                        <input className="btn btn-primary" type="submit" value="Add Information" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddResult;
