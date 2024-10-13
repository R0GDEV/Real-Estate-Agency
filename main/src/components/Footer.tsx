const Footer = () => {
    return (
      <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black px-4 py-10 mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-sm text-white">
          <div className="flex flex-col">
            <img src="" className="mb-5 w-32" alt="Logo" />
            <p className="w-full md:w-2/3 text-gray-300">
              Your dream home awaits! At XYZ Real Estate, we specialize in providing top-notch properties that fit your lifestyle. With years of experience in the industry, we are dedicated to helping you find the perfect place to call home.
            </p>
          </div>
          <div>
            <p className="text-xl font-medium mb-5">COMPANY</p>
            <ul className="flex flex-col gap-1">
              <li className="hover:text-blue-400 cursor-pointer">Home</li>
              <li className="hover:text-blue-400 cursor-pointer">About Us</li>
              <li className="hover:text-blue-400 cursor-pointer">Contact</li>
              <li className="hover:text-blue-400 cursor-pointer">Privacy Policy</li>
            </ul>
          </div>
          <div>
            <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
            <ul className="flex flex-col gap-1">
              <li className="hover:text-blue-400 cursor-pointer">+91-112-456-7890</li>
              <li className="hover:text-blue-400 cursor-pointer">contact@xyz.com</li>
            </ul>
          </div>
        </div>
        <div className="mt-10">
          <hr className="border-gray-700" />
          <p className="py-5 text-sm text-center text-gray-400">Copyright 2024@ xyz.com All Rights Reserved.</p>
        </div>
      </div>
    );
  };
  
  export default Footer;
  