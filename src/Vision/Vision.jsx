import NavBar from "../Navber/NavBar";
import './vision.css'



const Vision = () => {
    return (
        <div>
            <div>
                <NavBar></NavBar>
            </div>


            <div className="bg-[#1B1A55] text-white lg:h-96">
                <div className="flex mx-auto justify-center">
                    <h1 className="titleStyle mt-3 shadow-lg roboto-slab">School Vision</h1>
                </div>

                <p className="border lg:w-[1100px] text-justify px-3 py-2 mx-auto rounded-lg mt-3 roboto-slab">The vision statement of Rowmari C. G. Zaman High School outlines its aspirations and long-term goals, reflecting its commitment to excellence in education and holistic development of its students. Here's a possible vision statement for the school:

                    "Rowmari C. G. Zaman High School envisions a nurturing and empowering educational environment where every student is inspired to achieve their fullest potential. We strive to cultivate a culture of academic excellence, innovation, and critical thinking, equipping our students with the knowledge, skills, and values to thrive in a rapidly changing world. Our vision is to foster a community of lifelong learners who are socially responsible, globally aware, and compassionate leaders, dedicated to making a positive impact on society. Through collaboration, creativity, and continuous improvement, we aim to be a beacon of educational excellence, shaping the future generation for success and meaningful contributions to the world."

                    This vision statement encapsulates the school's aspirations towards providing quality education, fostering personal growth, and preparing students to become responsible citizens and leaders in the global community.

                </p>
            </div>


        </div>
    );
};

export default Vision;