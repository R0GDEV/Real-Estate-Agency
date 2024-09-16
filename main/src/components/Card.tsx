
import { Link } from 'react-router-dom'
import B from '../assets/B.jpg';

interface CardgProps {
  id: any;
  title: string;
  price: number;
  location: string;
  showDeleteButton: boolean;
  onDelete: any;
}

const Card: React.FC<CardgProps> = ({ id, title, price, location, showDeleteButton = false, onDelete }) => {
  return (

    <Link className='px-5 py-3 bg-gray-100 rounded text-gray-700 cursor-pointer' to={`/property/${id}`}>
      <div className='p-0 overflow-hidden' >
        <img className='hover:scale-110 transition ease-in-out min-h-20 h-auto w-auto rounded ' src={B} alt="" />
      </div>
      <div className="">
        <p className='pt-3 pb-1 text-sm'>{title}</p>
        <p className="text-sm font-medium justify-between flex flex-col gap-5 sm:flex-row">
          {price}
          <span className="text-sm font-medium">{location}</span>
        </p>
      </div>

      {showDeleteButton && (
        <div className="flex gap-4 my-2 ">
          <button
            className="  bg-lime-500 text-white text-xs w-full px-3 py-3 border transition ease-in-out duration-800 border-gray-800 hover:scale-110  hover:bg-lime-600 "
          >
            <Link
              to={`/editproperty/${id}`}
              className="w-full h-full inline-block text-white"
            >
              Update
            </Link>
          </button>
          <button
            className="  bg-red-500 text-white text-xs w-full px-3 py-2 border border-gray-800 hover:scale-110 hover:bg-red-600  transition ease-in-out"
            onClick={() => onDelete(id)} // Pass the ID to the delete function
          >
            Delete
          </button></div>
      )}
    </Link>
  )
}



export default Card