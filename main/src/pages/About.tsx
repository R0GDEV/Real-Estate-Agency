
//import React from 'react'
import Title from '../components/Title'

const About = () => {
  return (
    <div className='px-4'>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT '} text2={'US'} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src='' alt="" />

        <div className='flex flex-col justify-center gap-6 md:w-2/4text-gray-600'>
          <Title text1={'Our '} text2={'Story'} />
          <p>Our journey began with a simple idea: to transform the way people interact with real estate.Whether you're buying your first home, selling a property, or searching for your next investment, the experience should be seamless, transparent, and empowering. We started as a small team of passionate developers, real estate enthusiasts, and business experts, united by a common goal—to create a platform that redefines the real estate experience for everyone.
          </p>
          <Title text1={'Our '} text2={'Story'} />
          <p>We envision a world where real estate transactions are as intuitive as a conversation.Our goal is to bridge the gap between technology and real estate, creating an ecosystem where buyers, sellers, and agents can connect effortlessly.By leveraging cutting - edge technology, we aim to provide our users with the tools they need to make informed decisions, saving time, reducing stress, and ultimately turning dreams into reality.
          </p>
          <Title text1={'Our '} text2={'Story'} />
          <p>We are committed to excellence in everything we do.Our platform is built on a foundation of trust, innovation, and user - centric design.We continuously listen to our users, refining and enhancing our services to meet their evolving needs.Our promise is to remain dedicated to delivering a seamless, transparent, and empowering experience in every interaction, ensuring that your journey in the real estate market is nothing short of exceptional.
          </p>

        </div>

      </div>


    </div>

  )
}

export default About