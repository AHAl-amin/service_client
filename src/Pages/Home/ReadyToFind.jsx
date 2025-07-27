import React from 'react'

function ReadyToFind() {
    return (
        <div className='bg lg:py-16 '>
            <div className='lg:px-30 text-center lg:w-2/3  mx-auto'>
                <h1 className='font-bold text-4xl  uppercase text-gray-100 mb-4'>ready to find your perfect property?</h1>
                <p className='text-gray-300 text-sm'>Join thousands of buyers and sellers on the world’s premier land marketplace and experience a smarter, more secure way to buy and sell land across the globe. Whether you're looking for a peaceful countryside plot, a strategic investment opportunity, or a space to build your dream home, our platform connects you with high-quality listings and trusted users worldwide.</p>
            </div>
           <div className='space-x-4 flex justify-center mt-8 '>
             <button className="btn bg border-1 text-gray-100 border-gray-400">I am a buyer</button>
            <button className="btn bg border-1 text-gray-100 border-gray-400">I am a Seller</button>
           </div>
        </div>
    )
}

export default ReadyToFind