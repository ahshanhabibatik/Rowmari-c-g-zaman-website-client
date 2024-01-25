


import NavBar from '../../Navber/NavBar';
import image from '../../assets/banner-bg.png'
import img1 from '../../assets/imgGalary/img.jpg';
import img2 from '../../assets/imgGalary/img2.jpg';
import img3 from '../../assets/imgGalary/img3.jpg';
import img4 from '../../assets/imgGalary/img4.jpg';
import Gallery from 'react-image-gallery';


import 'react-image-gallery/styles/css/image-gallery.css'; // Import the CSS styles

const images = [
    {
        original: img1,
        thumbnail: img1,
    },
    {
        original: img2,
        thumbnail: img2,
    },
    {
        original: img3,
        thumbnail: img3,
    },
    {
        original: img4,
        thumbnail: img4,
    },
];
const ImageGallery = () => {
    return (
        <div>
            <NavBar></NavBar>

            <div>
                <div className="absolute">
                    <img className="h-[700px]" src={image} alt="" />
                </div>
                <div>
                    <div className="lg:flex mx-auto justify-center pt-5   gap-3">
                        <Gallery
                            items={images}
                            showBullets
                            showPlayButton={false}
                            showFullscreenButton={false}
                            className="h-60 w-72"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageGallery;