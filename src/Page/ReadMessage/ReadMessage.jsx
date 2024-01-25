import head from '../../assets/head.jpg'

const ReadMessage = () => {
    return (
        <div className='px-8'>
            <div className='lg:flex items-end'>
                <div className='border-2 border-[#0A56A2] mt-20 h-72 w-80'>
                    <img className='h-52  w-60 mb-8 px-4 py-3' src={head} alt="" />
                </div>
                <div>
                    <h1 className='text-2xl mb-6 px-2 bg-[#0A56A2] text-white font-bold py-2'>HEADMASTER's MESSAGE:</h1>
                </div>


            </div>
            <div className='border-2 border-[#0A56A2] mt-10 px-4 py-2 mb-7 rounded-md'>
                <h1>Dear inhabitants of Rowmari,<br />
                    Assalamualaikum</h1>

                <p>When the whole world is at the extreme limit of science and information technology, when the country is committed to building a digital Bangladesh, our students from the small area of ​​Roumari CG Zaman Government High School are also participating in the development.</p>
            </div>
        </div>
    );
};

export default ReadMessage;