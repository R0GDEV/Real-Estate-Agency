// Suggested code may be subject to a license. Learn more: ~LicenseLog:1636769453.
import { Link } from 'react-router-dom';
import bg from '../assets/B2.png';
import QC from '../assets/QC.jpeg';
import SC from '../assets/SC.jpeg';


const Home = () => {

  return (



    <div className="home-page">


      {/* Hero Section */}
      <div>
        <section
          style={{
            backgroundImage: `url(${bg})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
          className="relative flex items-center h-screen text-left "
        >
          {/* Black opacity overlay */}
          <div className="absolute inset-0 bg-black opacity-50"></div>

          {/* Content Container */}
          <div className="relative px-8 sm:px-16 md:px-24 lg:px-32 text-white ">
            <p className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Welcome o Real Estate Agency</p>
            <p className="text-md sm:text-lg mb-6">
              Find your dream home with ease and confidence. We offer the best properties at unbeatable prices!
            </p>
            <button className='border transition-all duration-500 border-black bg-white text-black px-6 py-3 text-sm hover:bg-gradient-to-r hover:from-shine-100 hover:to-shine-300 hover:text-white'>
              <Link to={`/properties`} className="w-full h-full min-w-24 inline-block text-center">
                Browse
              </Link>
            </button>

          </div>
        </section>
      </div>


      {/* Introduction Section */}
      <section className="introduction py-12 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">Why Choose Us?</h2>
          <p className="text-lg mb-8">
            We are dedicated to providing top-notch real estate services. Whether you’re looking to buy or rent, we have something for everyone. Our team of experts will help you find the perfect property tailored to your needs.
          </p>
        </div>
      </section>

      {/* Quality Section */}
      <section className="quality py-12 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">Our Commitment to Quality</h2>
          <p className="text-lg mb-8">
            We only partner with trusted developers and property owners, ensuring the highest quality properties in prime locations. Our listings are thoroughly vetted to guarantee that you get exactly what you expect.
          </p>
          <div className="flex justify-center">
            <div className="w-1/3 p-4">
              <img src={QC} alt="Quality Properties" className="rounded shadow-lg" />
              <p className="mt-4 text-sm">We ensure top-quality homes, built with the best materials and modern designs.</p>
            </div>
            <div className="w-1/3 p-4">
              <img src={SC} alt="Safety First" className="rounded shadow-lg" />
              <p className="mt-4 text-sm">Your safety is our priority. We ensure all homes meet the highest safety standards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Price Section */}
      <section className="price py-12 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">Affordable Pricing for Everyone</h2>
          <p className="text-lg mb-8">
            We believe in making your dream home a reality without breaking the bank. Our properties are competitively priced to offer great value without compromising on quality.
          </p>
          <div className="flex justify-center">
            <div className="w-1/3 p-4">
              <h3 className="text-xl font-bold">$100,000 - $200,000</h3>
              <p className="mt-2">Ideal for first-time buyers and small families. Great locations at affordable prices.</p>
            </div>
            <div className="w-1/3 p-4">
              <h3 className="text-xl font-bold">$200,000 - $500,000</h3>
              <p className="mt-2">Luxury homes at unbeatable prices. Perfect for those seeking high-end properties.</p>
            </div>
            <div className="w-1/3 p-4">
              <h3 className="text-xl font-bold">$500,000+</h3>
              <p className="mt-2">Premium properties for those looking for the best of the best in exclusive locations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className=" py-12 bg-gradient-to-r from-shine-100 via-shine-200 to-shine-300  text-white text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold mb-4">Ready to Find Your Dream Home?</h2>
          <p className="text-lg mb-8">Browse our listings or contact our team today for personalized assistance.</p>
          <button className="bg-white text-blue-500 px-6 py-2 rounded font-bold hover:bg-gray-100 transition duration-300">
            <Link to={`/properties`} >
              Browse Properties
            </Link>

          </button>
        </div>
      </section>
    </div>
  );
};





export default Home