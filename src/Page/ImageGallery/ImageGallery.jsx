
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

import NavBar from '../../Navber/NavBar';
import img1 from '../../assets/imgGalary/img.jpg';
import img2 from '../../assets/imgGalary/img2.jpg';
import img3 from '../../assets/imgGalary/img3.jpg';
import img4 from '../../assets/imgGalary/img4.jpg';
import { Pagination, Navigation } from 'swiper/modules';


import 'react-image-gallery/styles/css/image-gallery.css'; // Import the CSS styles


const ImageGallery = () => {
    const [swiperRef, setSwiperRef] = useState(null)


    return (
        <div className=' bg-black h-[70vh] '>

            <div className='relative z-10'>
                <NavBar></NavBar>
            </div>

            <div className='py-6'>
                <>
                    <Swiper
                        onSwiper={setSwiperRef}
                        slidesPerView={3}
                        centeredSlides={true}
                        spaceBetween={30}
                        pagination={{
                            type: 'fraction',
                        }}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        className="mySwiper border absolute"
                    >
                        <SwiperSlide>
                            <img src={img1} alt="" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={img2} alt="" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={img3} alt="" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={img4} alt="" />
                        </SwiperSlide>
                    </Swiper>

                </>
            </div>
        </div>
    );
};

export default ImageGallery;