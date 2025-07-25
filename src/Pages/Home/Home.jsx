import React, { useEffect, useRef } from 'react'
import Banner from './Banner'
import { FeaturedProperties } from './FeaturedProperties '
import { WhyChoose } from './Why_we'
import Pricing from './Pricing'
import ExploreProperties from './ExploreProperties'
import FraQuestions from './FraQuestions'
import Review from './Review'
import ReadyToFind from './ReadyToFind'
import GetInTuch from './GetInTuch'
import PropertyCountry from './PropertyCountry'



const Home = () => {
  const exploreRef = useRef(null);
  
 

  // Function to scroll to ExploreProperties
  const handleScrollToExplore = () => {
    exploreRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div className='bg-yellow-50/90 '>
      <Banner />
      <FeaturedProperties onExploreClick={handleScrollToExplore} />
      <WhyChoose />
      
        <Pricing />
    
      <div ref={exploreRef}>
        <ExploreProperties />
      </div>
      <FraQuestions />
      <Review />
      <ReadyToFind />
      <GetInTuch />
      <PropertyCountry />
    </div>
  )
}

export default Home
