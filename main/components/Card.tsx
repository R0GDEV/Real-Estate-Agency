
import { Link } from 'react-router-dom'

const Card = ({ id,title, price, location }) => {
    interface Property {
        id: string;
        title: string;
        price: number;
        location: string;
    }


        return (
            <Link className=' text-gray-700 cursor-pointer' to={`/product/${id}`}>
                <div className=' overflow-hidden' >
                    <img className='hover:scale-110 transition ease-in-out' src="" alt="" /> </div>
                <p className='pt-3 pb-1 text-sm'>{title}</p>
                <p className="flex gap-5 text-sm font-medium justify-between">{price}<span className="text-sm font-medium">{location}</span></p>
            </Link>
        )
    }



export default Card