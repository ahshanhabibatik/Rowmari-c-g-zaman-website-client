import NavBar from "../Navber/NavBar";
import './vision.css'


const Mision = () => {
    return (
        <div>
            <div>
                <NavBar></NavBar>
            </div>


            <div className="bg-[#1B1A55] text-white lg:h-96">
                <div className="flex mx-auto justify-center">
                    <h1 className="titleStyle mt-3 shadow-lg roboto-slab">School Mission</h1>
                </div>

                <p className="border lg:w-[1100px] text-justify px-3 py-2 mx-auto rounded-lg mt-3 roboto-slab">
                    "The mission of Rowmari C. G. Zaman High School is to provide a transformative educational experience that empowers students to realize their full potential and become responsible, compassionate, and lifelong learners. Grounded in the principles of equity, integrity, and excellence, our mission is to cultivate a dynamic learning community where every student is inspired to achieve academic success, personal growth, and social responsibility.

                    We are committed to delivering a comprehensive and rigorous curriculum that promotes critical thinking, creativity, and communication skills, preparing students for success in higher education, careers, and citizenship. Through innovative teaching methods, technology integration, and experiential learning opportunities, we strive to foster intellectual curiosity, resilience, and a love for learning in our students.

                    Central to our mission is the holistic development of each individual, encompassing their intellectual, emotional, physical, and social well-being. We aim to create a safe, inclusive, and nurturing environment where diversity is celebrated, and students feel valued, supported, and empowered to reach their highest potential.

                    This mission statement reflects the core values, goals, and aspirations of Rowmari C. G. Zaman High School, outlining its commitment to providing a quality education and nurturing the holistic development of its students."

                </p>
            </div>


        </div>
    );
};

export default Mision;