import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import banner from '../../assets/banner-bg.png';
import slider1 from '../../assets/slider/1637769815_sld1.jpg';
import slider2 from '../../assets/slider/slider-2.jpg';
import slider3 from '../../assets/slider/slider-3.jpg';
import slider4 from '../../assets/slider/slider-4.jpg';
import Marquee from 'react-fast-marquee';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Banner = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000); // Update every 1 second

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className="relative z-[1]">
            <img className="h-[800px]" src={banner} alt="" />

            <div className='absolute top-5 px-8'>
                <div className="flex items-center text-center p-1">
                    <div>
                        <h1 className='text-xl text-white bg-red-800 p-2'>NEWS</h1>
                    </div>
                    <div className="bg-white text-white p-2">
                        <Marquee pauseOnHover={true}>
                            <Link to={'/news'} className='text-gray-500'>
                                
                                <Link className='ml-10' to={'/news'}>
                                    চৌধুরী গওহরুজ্জামান সরকারি উচ্চ বিদ্যালয়ে ষষ্ঠ শ্রেণিতে ভর্তির আবেদন শুরু ১৬-১১-২০২২ শেষ ০৬-১২-২০২২ । বিদ্যালয়ের ওয়েবসাইটে Admission 2023 Link এ প্রবেশ করে বিস্তারিত তথ্য পুরণ করে ফরমটি ডাউনলোড করুন এবং ১১০ টাকা ফি সহ বিদ্যালয়ের অফিস চলাকালীন সময়ে জমা করুন। ভর্তির জন্য শিক্ষার্থী বাছাই লটারীর মাধ্যমে করা হবে। লটারীর তারিখ পরবর্তীতে ওয়েব সাইটে নোটিশের মাধ্যমে এবং অভিভাবকের মোবাইলে মেসেজের মাধ্যমে জানানো হবে।
                                </Link>
                            </Link>
                        </Marquee>
                    </div>
                    <div className='flex'>

                        <h1 className='text-xl w-36 border-r text-white bg-red-800 p-2'>{currentTime.toLocaleTimeString()}</h1>
                        <h1 className='text-xl text-white bg-red-800 p-2'>{currentTime.toLocaleDateString()}</h1>
                    </div>
                </div>
            </div>

            <div className="absolute top-24 px-8">
                <Carousel autoPlay interval={5000} infiniteLoop showThumbs={false}>
                    <div>
                        <img className='rounded-lg h-[500px]' src={slider1} alt="Slide 1" />
                    </div>
                    <div>
                        <img className='rounded-lg h-[500px]' src={slider2} alt="Slide 2" />
                    </div>
                    <div>
                        <img className='rounded-lg h-[500px]' src={slider3} alt="Slide 3" />
                    </div>
                    <div>
                        <img className='rounded-lg h-[500px]' src={slider4} alt="Slide 4" />
                    </div>
                </Carousel>
            </div>
        </div>
    );
};

export default Banner;
