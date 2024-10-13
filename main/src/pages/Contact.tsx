import Title from '../components/Title';
import Image from '../assets/Image.png';

const Contact = () => {
  return (
    <div className="w-full bg-gray-100 py-16 px-6">
      {/* Section Title */}
      <div className="text-center mb-12">
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      {/* Contact Section */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Info Section */}
        <div className="flex flex-col justify-center gap-6 p-6 bg-white rounded-lg shadow-lg">
          <div>
            <h2 className="font-bold text-3xl text-gray-800 mb-4">Locate Us</h2>
            <p className="text-gray-600 text-lg">
              400701 Rabale <br /> Navi Mumbai, Maharashtra, IND
            </p>
          </div>
          <div>
            <h2 className="font-bold text-3xl text-gray-800 mb-4">Contact Us</h2>
            <p className="text-gray-600 text-lg">
              Tel: +91-112-456-7890 <br /> Email: admin@xyz.com
            </p>
          </div>
          <div>
            <h2 className="font-bold text-3xl text-gray-800 mb-4">Careers at XYZ</h2>
            <p className="text-gray-600 text-lg">
              Learn more about our teams and job openings.
            </p>
          </div>

          {/* Explore Jobs Button */}
          <button className="w-full py-3 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition-all duration-300">
            Explore Jobs
          </button>
        </div>

        {/* Image Section */}
        <div className="flex justify-center">
          <img
            className="w-full md:max-w-[500px] rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
            src={Image}
            alt="Contact"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
