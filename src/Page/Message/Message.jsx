
import { Link } from 'react-router-dom';
import head from '../../assets/head.jpg'
const Message = () => {
    return (
        <div className='px-8 pb-5 bg-[#F1F3F5]'>
            <h1 className="font-bold text-3xl text-[#313544] text-center">Message</h1>

            <div className='md:flex gap-20 justify-center mt-8'>
                <div>
                    <img className='h-60 w-64' src={head} alt="" />
                </div>
                <div className=' '>
                    <h1 className='text-3xl text-[#797b7c] font-bold'>Headmaster's <br /> Message:</h1>
                    <h1 className='border-b-2 w-40 border-gray-400 lg:ml-40'></h1>
                    <h1 className='text-gray-500  font-semibold text-xl mt-4 '>Dear inhabitants of Rowmari,<br />
                        Assalamualaikum</h1>

                    <h1 className='text-gray-500   font-semibold text-xl mt-8'>By the grace of almighty Allah, this school...</h1>
                    <Link to={'/message'}><button className='text-gray-600  font-semibold mt-6 text-xl'>Read More..</button></Link>

                </div>
            </div>
        </div>
    );
};

export default Message;