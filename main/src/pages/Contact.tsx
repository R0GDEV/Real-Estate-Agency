
import Title from '../components/Title'
import Image from '../assets/Image.png'

const Contact = () => {
  return (
    <div>
    <p className='text-2xl ml-6  pt-8 '><Title text1={'CONTACT'} text2={' US'} /></p>
    <div className= 'px-4 my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={Image} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
            <p className='font-semibold text-xl text-gray-600'>Locate us</p>
            <p className=' text-gray-500'> 400701 Rabale < br /> Navi Mumbai, Maharashtra, IND</p >
            <p className=' text-gray-500'> Tel: +91-112-456-7890 < br /> Email: admin@xyz.com</p >
            <p className='font-semibold text-xl text-gray-600' > Careers at XYZ</p >
            <p className=' text-gray-500'> Learn more about our teams and job openings.</p >
            <button className='border  border-black px-8 py-4 text-sm  hover:bg-black hover:text-white transition-all duration-500 '>Explore Jobs</button>
        </div >
    </div >
</div>

  )
}

export default Contact