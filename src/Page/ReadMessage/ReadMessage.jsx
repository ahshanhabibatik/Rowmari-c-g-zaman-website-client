import head from '../../assets/head.jpg'
import './message.css'

const ReadMessage = () => {
    return (
        <div className='px-8'>
            <div className='lg:flex items-end'>
                <div className='border-2 border-[#0A56A2] mt-20 h-72 w-80'>
                    <img className='h-52  w-60 mb-8 px-4 py-3' src={head} alt="" />
                </div>
                <div>
                    <h1 className='text-2xl mb-6 px-2 bg-[#0A56A2] text-white font-bold py-2 inter'>HEADMASTER's MESSAGE:</h1>
                </div>


            </div>
            <div className='border-2 border-[#0A56A2] mt-10 px-4 py-2 mb-7 rounded-md inter'>
                <h1>Dear inhabitants of Rowmari,<br />
                    Assalamualaikum</h1>

                <p className='text-justify inter'>Amidst a world propelled by cutting-edge science and information technology, and with a national commitment to forging a digital Bangladesh, students from the modest locale of Rowmari CG Zaman Government High School are actively contributing to this transformative journey. Empowered by quality education and equipped with digital literacy, they are embracing innovation and playing their part in the nation's digital evolution. Through their endeavors, they not only enrich their own educational experiences but also contribute to the collective progress of their community and beyond.</p>
            </div>
        </div>
    );
};

export default ReadMessage;