import { useState, useEffect } from "react";
import useAxiosSecure from "../Hook/AxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const AddResult = () => {
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [totalMarks, setTotalMarks] = useState(0);
    const [totalSubjects, setTotalSubjects] = useState(0);
    const [subjectGradePoints, setSubjectGradePoints] = useState({});
    const [subjectGradeLetters, setSubjectGradeLetters] = useState({}); // Add state for subject grade letters
    const [averageGradePoint, setAverageGradePoint] = useState(0);
    const [totalGrade, setTotalGrade] = useState('');
    const [gpa, setGpa] = useState(0);

    const [selectedClass, setSelectedClass] = useState('');
    const [selectedRoll, setSelectedRoll] = useState('');
    const [selectedSection, setSelectedSection] = useState('');

    const handleSubjectChange = (subject) => {
        setSelectedSubject(subject);
    };

    // Function to calculate grade, grade point, and grade letter based on marks
    const calculateGradeAndPoint = (marks) => {
        let grade = '';
        let gradePoint = 0;
        let gradeLetter = '';

        if (marks >= 80) {
            grade = 'A+';
            gradePoint = 5.00;
            gradeLetter = 'A+';
        } else if (marks >= 70) {
            grade = 'A';
            gradePoint = 4.00;
            gradeLetter = 'A';
        } else if (marks >= 60) {
            grade = 'A-';
            gradePoint = 3.50;
            gradeLetter = 'A-';
        } else if (marks >= 50) {
            grade = 'B';
            gradePoint = 3.00;
            gradeLetter = 'B';
        } else if (marks >= 40) {
            grade = 'C';
            gradePoint = 2.00;
            gradeLetter = 'C';
        } else if (marks >= 33) {
            grade = 'D';
            gradePoint = 1.00;
            gradeLetter = 'D';
        } else {
            grade = 'F';
            gradePoint = 0.00;
            gradeLetter = 'F';
        }

        return { grade, gradePoint, gradeLetter };
    };

    const calculateTotalGrade = (totalPoint, subjectGradeLetters) => {
        let totalGrade = '';

        // Check if any subject has a grade letter of 'F'
        const hasFailingGrade = Object.values(subjectGradeLetters).some(gradeLetter => gradeLetter === 'F');

        // If any subject has a failing grade, set the total grade to 'F' and average grade point to 0
        if (hasFailingGrade) {
            totalGrade = 'F';
            totalPoint = 0; // Set average grade point to 0
        } else if (totalPoint === 5.00) {
            totalGrade = 'A+';
        } else if (totalPoint >= 4.00) {
            totalGrade = 'A';
        } else if (totalPoint >= 3.50) {
            totalGrade = 'A-';
        } else if (totalPoint >= 3.00) {
            totalGrade = 'B';
        } else if (totalPoint >= 2.00) {
            totalGrade = 'C';
        } else if (totalPoint >= 1.00) {
            totalGrade = 'D';
        } else {
            totalGrade = 'F';
        }

        return { totalGrade, averageGradePoint: totalPoint };
    };


    const onSubmit = async (data) => {
        // Calculate total marks, subject-wise grade points, grade letters, average grade point, and total grade
        let totalMarks = 0;
        let totalSubjects = 0;
        let subjectGradePoints = {};
        let subjectGradeLetters = {}; // Object to store subject-wise grade letters
        let totalGradePoints = 0;
        const subjects = ['bangla', 'english', 'math', 'history', 'health', 'Life', 'ArtAndCulture', 'Science', 'digital', 'ইসলাম'];

        subjects.forEach(subject => {
            const marks = parseInt(data[subject]);
            if (marks) {
                totalMarks += marks;
                totalSubjects++;
                const { grade, gradePoint, gradeLetter } = calculateGradeAndPoint(marks);
                subjectGradePoints[subject] = gradePoint;
                subjectGradeLetters[subject] = gradeLetter; // Store grade letter for each subject
                totalGradePoints += gradePoint;
            }
        });

        const totalPoint = totalGradePoints / totalSubjects;
        const { totalGrade } = calculateTotalGrade(totalPoint, subjectGradeLetters); // Pass subject grade letters to calculateTotalGrade function

        // Update state variables
        setTotalMarks(totalMarks);
        setTotalSubjects(totalSubjects);
        setSubjectGradePoints(subjectGradePoints);
        setSubjectGradeLetters(subjectGradeLetters); // Update state with subject grade letters
        setAverageGradePoint(totalPoint);
        setTotalGrade(totalGrade);

        try {
            const res = await axiosSecure.post('/results', {
                ...data,
                totalMarks,
                totalSubjects,
                subjectGradePoints,
                subjectGradeLetters, // Pass subject grade letters to the backend
                averageGradePoint: totalPoint,
                totalGrade // Pass the calculated total grade to the backend
            });

            if (res.data.insertedId) {
                console.log('user added to the database');
                reset();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Result Added successfully.',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (totalMarks > 0 && totalSubjects > 0) {
            setGpa(totalMarks / totalSubjects);
        }
    }, [totalMarks, totalSubjects]);


    // search student for class section and roll

    // Function to find a student based on class, roll, and section
    const findStudent = (students, classValue, roll, section) => {
        return students.find(student => student.class === classValue && student.roll === roll && student.section === section);
    };

    // Event handler for class selection
    const handleClassChange = (e) => {
        const selectedClass = e.target.value;
        setSelectedClass(selectedClass);
    };

    // Event handler for roll selection
    const handleRollChange = (e) => {
        const selectedRoll = e.target.value;
        setSelectedRoll(selectedRoll);
    };

    // Event handler for section selection
    const handleSectionChange = (e) => {
        const selectedSection = e.target.value;
        setSelectedSection(selectedSection);
    };

    // Fetch students data when the component mounts
    useEffect(() => {
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

    // Update student details when class, roll, or section changes
    useEffect(() => {
        if (selectedClass && selectedRoll && selectedSection) {
            const student = findStudent(students, selectedClass, selectedRoll, selectedSection);
            if (student) {
                // If a matching student is found, update the state with student details
                setSelectedStudent(student);
                setValue("name", student.name);
                setValue("fName", student.fName);
                setValue("mName", student.mName);
                setValue("shift", student.shift);
                setValue("dateOfBirth", student.dateOfBirth);
            } else {
                // If no matching student is found, clear the student details
                setSelectedStudent(null);
                setValue("name", "");
                setValue("fName", "");
                setValue("mName", "");
                setValue("shift", "");
                setValue("dateOfBirth", "");
            }
        }
    }, [selectedClass, selectedRoll, selectedSection, students, setValue]);


    return (
        <div>
            <h1 className="font-bold text-3xl text-center mt-6 mb-6 uppercase">Added Student Result</h1>
            <div className="lg:w-[600px] mx-auto bg-slate-300">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <p className="text-xl font-bold uppercase text-center">Fill Up Student Information</p>
                    <div className='flex justify-evenly'>

                        <div>
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
                                </select>
                                {errors.class && <span className="text-red-600">Class is required</span>}
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

                            <div>
                                <label className="label">
                                    <span className="label-text">Father Name</span>
                                </label>
                                <input readOnly type="text" value={selectedStudent?.fName || ''} onChange={(e) => setValue("fName", e.target.value)} {...register("fName", { required: true })} name="fName" placeholder="Enter Father Name" className="input input-bordered" />
                            </div>


                            <div>
                                <label className="label">
                                    <span className="label-text">Mother name</span>
                                </label>
                                <input readOnly type="text" value={selectedStudent?.mName || ''} onChange={(e) => setValue("mName", e.target.value)} {...register("mName", { required: true })} name="mName" placeholder="Enter Mother Name" className="input input-bordered" />
                            </div>
                        </div>

                        {/* part-2 */}
                        <div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Student Roll</span>
                                </label>
                                <input type="number" {...register("roll", { required: true })} name="roll" placeholder="Enter Roll" className="input input-bordered" onChange={handleRollChange} />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input readOnly type="name" value={selectedStudent?.name || ''} onChange={(e) => setValue("name", e.target.value)} {...register("name", { required: true })} name="name" className="input input-bordered" />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Shift</span>
                                </label>
                                <input readOnly type="text" value={selectedStudent?.shift || ''} onChange={(e) => setValue("shift", e.target.value)} {...register("shift", { required: true })} name="shift" className="input input-bordered" />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Date of Barth</span>
                                </label>
                                <input type="date" value={selectedStudent?.dateOfBirth || ''} onChange={(e) => setValue("dateOfBirth", e.target.value)} {...register("dateOfBirth", { required: true })} name="dateOfBirth" className="input input-bordered" />

                            </div>

                        </div>
                    </div>


                    {/* Result Part */}
                    <p className="text-xl font-bold uppercase mt-5 text-center">Input Subject Number</p>



                    <div className="flex justify-evenly">
                        <div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">বাংলা</span>
                                </label>
                                <input type="number"  {...register("bangla", { required: true })} name="bangla" placeholder="Bangla" className="input input-bordered" />
                                {errors.bangla && <span className="text-red-600">Name is required</span>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">English</span>
                                </label>
                                <input type="number"  {...register("english", { required: true })} name="english" placeholder="Enter the english mark" className="input input-bordered" />

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">গণিত</span>
                                </label>
                                <input type="number"  {...register("math", { required: true })} name="math" placeholder="Enter the mark" className="input input-bordered" />

                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">ইতিহাস ও সামাজিক বিজ্ঞান </span>
                                </label>
                                <input type="number"  {...register("history", { required: true })} name="history" placeholder="Please Enter Number" className="input input-bordered" />
                                {errors.email && <span className="text-red-600">Email is required</span>}
                            </div>





                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">স্বাস্থ্য সুরক্ষা</span>
                                </label>
                                <input type="number"  {...register("health", { required: true })} name="health" placeholder="Please Enter Number" className="input input-bordered" />
                                {errors.health && <span className="text-red-600">Email is required</span>}
                            </div>

                        </div>

                        {/* part-2 */}

                        <div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">জীবন ও জীবিকা</span>
                                </label>
                                <input type="number"  {...register("Life", { required: true })} name="Life" placeholder="Please Enter Number" className="input input-bordered" />
                                {errors.email && <span className="text-red-600">Email is required</span>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">শিল্প ও সংস্কৃতি</span>
                                </label>
                                <input type="number"  {...register("ArtAndCulture", { required: true })} name="ArtAndCulture" placeholder="Please Enter Number" className="input input-bordered" />
                                {errors.ArtAndCulture && <span className="text-red-600">Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">বিজ্ঞান</span>
                                </label>
                                <input type="number"  {...register("Science", { required: true })} name="Science" placeholder="Please Enter Number" className="input input-bordered" />
                                {errors.email && <span className="text-red-600">Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">ডিজিটাল প্রযুক্তি</span>
                                </label>
                                <input type="number"  {...register("digital", { required: true })} name="digital" placeholder="Please Enter Number" className="input input-bordered" />
                                {errors.digital && <span className="text-red-600">Email is required</span>}
                            </div>

                        </div>
                    </div>
                    <div className=" w-[480px] mx-auto">
                        <div className="flex gap-2 mx-auto">
                            {/* Radio inputs for subject selection */}
                            {['ইসলাম', 'বৌদ্ধধর্ম', 'খ্রিষ্টধর্ম', 'হিন্দুধর্ম'].map((subject, index) => (
                                <div className="form-control" key={index}>
                                    <label className="label">
                                        <input
                                            type="radio"
                                            value={subject}
                                            checked={selectedSubject === subject}
                                            onChange={() => handleSubjectChange(subject)}
                                            className="radio"
                                        />
                                        <span className="label-text">{subject}</span>
                                    </label>
                                </div>
                            ))}
                        </div>
                        {/* Input field for the selected subject */}
                        {selectedSubject && (
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">{selectedSubject}</span>
                                </label>
                                <input
                                    type="number"
                                    {...register(selectedSubject.toLowerCase(), { required: true })}
                                    name={selectedSubject.toLowerCase()}
                                    placeholder="Please Enter Number"
                                    className="input input-bordered"
                                />
                                {errors[selectedSubject.toLowerCase()] && (
                                    <span className="text-red-600">Number is required</span>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="form-control mt-6">
                        <input className="btn btn-primary" type="submit" value="Add Number" />
                    </div>
                </form>
            </div >
        </div >
    );
};

export default AddResult;
