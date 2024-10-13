import Title from '../components/Title';
import AU from '../assets/AU1.jpeg'
import OV from '../assets/OV1.jpeg'
import OS from '../assets/OS2.jpeg'
import OC from '../assets/OC1.jpeg'

const About = () => {
  return (
    <div className="w-full overflow-x-hidden">
      {/* Section 1 - Intro */}
      <section className="w-full h-screen flex items-center justify-center bg-cover bg-center min-h-screen text-white"
        style={{
          backgroundImage: `url(${AU})`, // Set the background image
        }}>
        <div className="absolute inset-0 bg-black opacity-50 "></div>
        <div className="text-center z-10">
          <h1 className="text-5xl font-bold mb-6">About Us</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Discover who we are and how we’re transforming the real estate industry. From humble beginnings to delivering high-tech solutions, we’re here to change how you buy and sell your property.
          </p>
          
        </div>
      </section>

      {/* Section 2 - Our Story */}
      <section className="w-full md:flex items-center justify-between px-10 py-20 bg-white">
        <div className="md:w-1/2 flex justify-center">
          <img
            className="w-full max-w-lg rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
            src={OS}
            alt="Our Story"
          />
        </div>
        <div className="md:w-1/2 text-gray-700 px-6">
          <Title text1={'Our'} text2={'Story'} />
          <p className="text-lg leading-relaxed">
            Our journey began with a simple idea: to transform the way people interact with real estate. Whether you're buying your first home, selling a property, or searching for your next investment, the experience should be seamless, transparent, and empowering.
          </p>
        </div>
      </section>

      {/* Section 3 - Vision */}
      <section className="w-full md:flex items-center justify-between px-10 py-20 bg-gray-100">
        <div className="md:w-1/2 text-gray-700 px-6 order-last md:order-first">
          <Title text1={'Our'} text2={'Vision'} />
          <p className="text-lg leading-relaxed">
            We envision a world where real estate transactions are as intuitive as a conversation. By leveraging cutting-edge technology, we aim to provide our users with the tools they need to make informed decisions, reducing stress, and turning dreams into reality.
          </p>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img
            className="w-full max-w-lg rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
            src={OV}
            alt="Our Vision"
          />
        </div>
      </section>

      {/* Section 4 - Commitment */}
      <section className="w-full md:flex items-center justify-between px-10 py-20 bg-white">
        <div className="md:w-1/2 flex justify-center">
          <img
            className="w-full max-w-lg rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
            src={OC}
            alt="Our Commitment"
          />
        </div>
        <div className="md:w-1/2 text-gray-700 px-6">
          <Title text1={'Our'} text2={'Commitment'} />
          <p className="text-lg leading-relaxed">
            We are committed to excellence in everything we do. Our platform is built on a foundation of trust, innovation, and user-centric design. We continuously listen to our users, refining our services to meet their evolving needs.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;