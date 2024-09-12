import React from 'react'
// Suggested code may be subject to a license. Learn more: ~LicenseLog:1636769453.
import bg from '../assets/B1.jpg';
const Home = () => {
  
  return (
 
    <div   style={{
      backgroundImage: `url(${bg})`,
      backgroundRepeat: 'no-repeat',
     
    }}
    className=" flex
    bg-cover bg-center h-screen
    sm:bg-contain sm:bg-center
    md:bg-cover md:bg-center
    lg:bg-cover lg:bg-center
    xl:bg-cover xl:bg-center">
  {/* Content goes here */}
</div>
  )
}

export default Home