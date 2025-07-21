

import React from 'react'
import { Link } from 'react-router-dom'

function PaymentSuccess() {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  let dashboardLink = '/dashboard'; 
  if (role === 'chef') {
    dashboardLink = '/chef_dashboard';
  } else if (role === 'user') {
    dashboardLink = '/dashboard';
  }

  return (
    <div className='flex flex-col justify-center items-center h-screen '>
      <p className='text-green-400 text-center text-2xl'>Payment Successfully</p>
      <Link to={dashboardLink}>
        <button className='bg-[#5B21BD] text-white rounded-lg px-6 py-2 mt-4 text-lg font-semibold transition-opacity cursor-pointer'>
          Go to dashboard
        </button>
      </Link>
    </div>
  )
}

export default PaymentSuccess
