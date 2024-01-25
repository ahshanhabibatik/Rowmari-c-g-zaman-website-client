
import NavBar from '../../Navber/NavBar';
import image from '../../assets/banner-bg.png'


const Video = () => {
    return (
        <div>
            <NavBar></NavBar>
            <div className="relative">
                <img src={image} alt="" />
            </div>

            <div className="absolute top-72">


                <div className="lg:flex gap-2 mx-auto justify-center item-center lg:ml-5">
                    <iframe width="400" height="230" src="https://www.youtube.com/embed/reVA0ThP53E?si=5EBV8sYqcun7VXJR" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    <iframe width="400" height="230" src="https://www.youtube.com/embed/Y0S8gl1WECw?si=tyBRUvQaQtLm6dz8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    <iframe width="400" height="230" src="https://www.youtube.com/embed/fUB0ix4zlQM?si=VnLRxziZcfKo0C7N" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

                </div>
            </div>
        </div>
    );
};

export default Video;