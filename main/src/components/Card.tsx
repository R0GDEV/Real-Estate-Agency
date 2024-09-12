
import { Link, Route } from 'react-router-dom'
import About from '../pages/About';


const Card = ({ id,title, price, location }) => {
    

        return (
           
            <Link className='px-5 bg-gray-100 rounded text-gray-700 cursor-pointer'to={`/property/${id}`}>
                <div className=' overflow-hidden' >
                    <img className='hover:scale-110 transition ease-in-out h-4 w-6' src="" alt="" /> </div>
                <p className='pt-3 pb-1 text-sm'>{title}</p>
                <p className="flex gap-5 text-sm font-medium justify-between">{price}<span className="text-sm font-medium">{location}</span></p>
                
            </Link>
        )
    }



export default Card