import React from 'react'
import Banner from './Banner'
import { FeaturedProperties } from './FeaturedProperties '
import { WhyChoose } from './Why_we'
import Pricing from './Packages'
import ExploreProperties from './ExploreProperties'
import FraQuestions from './FraQuestions'
import Review from './Review'
import ReadyToFind from './ReadyToFind'
import GetInTuch from './GetInTuch'
import PropertyCountry from './PropertyCountry'

const Home = () => {
  return (
    <div className='bg-yellow-50/90 '>
         <Banner/>
         <FeaturedProperties/>
         <WhyChoose/>
         <Pricing/>
         <ExploreProperties/>
         <FraQuestions/>
         <Review/>
         <ReadyToFind/>
         <GetInTuch/>
         <PropertyCountry/>
    </div>
  )
}

export default Home
