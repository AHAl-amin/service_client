import React from 'react'
import mapImage from '../../../public/img/map.png'
function ExploreProperties() {
    return (
        <div className='py-10'>
            <div className='text-center my-6'>
                <h1 className='text font-bold text-2xl'>Explore Properties on the Map</h1>
                <p className='text-gray-400'>Whether you're looking to buy or sell land, we have the right tools and features for you.</p>
            </div>
            <div>
                <img src={mapImage} alt="" />
            </div>
            <div className='flex justify-center mt-10'>
                <button className='bg text-white py-3 px-6 rounded-xl flex justify-center cursor-pointer'>Open Map View</button>
            </div>
        </div>
    )
}

export default ExploreProperties