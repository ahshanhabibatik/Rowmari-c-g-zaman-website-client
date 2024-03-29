import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal'; // Import the Modal component
import '../Media/Media.css';
import img1 from '../../assets/imgGalary/img.jpg';
import img2 from '../../assets/imgGalary/img2.jpg';
import img3 from '../../assets/imgGalary/img3.jpg';
import img4 from '../../assets/imgGalary/img4.jpg';

const Media = () => {
    const images = [img1, img2, img3, img4];
    const [activeImageIndex, setActiveImageIndex] = useState(null); // State to track active image index
    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

    // Function to handle image click and open modal
    const handleImageClick = (index) => {
        setActiveImageIndex(index);
        setIsModalOpen(true);
    };

    // Function to close modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className='mb-64'>
            <div>
                <div className='relative top-10'>
                    <div>
                        <h1 className="text-center text-3xl font-bold">Institute Media</h1>
                    </div>
                    {/* Buttons for filtering */}
                    <div className="flex mx-auto justify-center mt-5 gap-4">
                        <div>
                            <Link to="/">
                                <button className="bg-red-600 w-32 py-3 rounded-lg font-bold text-white hover:bg-stone-400">
                                    All
                                </button>
                            </Link>
                        </div>
                        <div>
                            <Link to="/images">
                                <button className="bg-red-600 w-32 py-3 rounded-lg font-bold text-white hover:bg-stone-400">
                                    Image
                                </button>
                            </Link>
                        </div>
                        <div>
                            <Link to="/videos">
                                <button className="bg-red-600 w-32 py-3 rounded-lg font-bold text-white hover:bg-stone-400">
                                    Video
                                </button>
                            </Link>
                        </div>
                    </div>
                    {/* Display images */}
                    <div className="lg:flex mx-auto justify-center mt-4 gap-2">
                        {images.map((img, index) => (
                            <div key={index} className="slider-container">
                                <img
                                    className={`h-56 w-72 slider-image ${activeImageIndex === index ? 'zoomed' : ''}`}
                                    src={img}
                                    alt=""
                                    onClick={() => handleImageClick(index)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Modal to display selected image */}
            <Modal isOpen={isModalOpen} onRequestClose={closeModal} className="image-modal mx-auto flex justify-center mt-10">
                {activeImageIndex !== null && (
                    <img
                        src={images[activeImageIndex]}
                        alt={`Image ${activeImageIndex + 1}`}
                        className="modal-image"
                        style={{ height: '400px', width: '800px' }}
                    />
                )}
                <button className='btn' onClick={closeModal}>Close</button>
            </Modal>
        </div>
    );
};

export default Media;
