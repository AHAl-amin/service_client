import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function PaymentCancel() {

 const navigate = useNavigate();
  const userType = localStorage.getItem("user_type");
  let dashboardLink;

  if (userType === 'seller') {
    dashboardLink = '/seller_dashboard';
  } else if (userType === 'buyer') {
    dashboardLink = '/buyer_dashboard';
  } else {
    dashboardLink = '/'; // Fallback route
  }

  const handleNavigate = () => {
    navigate(dashboardLink);
  };
  
  return (
    <div className='flex justify-center items-center h-screen '>

        <div className='flex flex-col items-center justify-center'>
            <p className='text-red-400 text-center text-2xl'>Something error....</p>
            
            <button onClick={handleNavigate} className='bg-[#5B21BD] text-white rounded-lg px-6 py-2 mt-4 text-lg font-semibold transition-opacity cursor-pointer w-26 '>
                Back
            </button>
        
        </div>
    </div>
  )
}

export default PaymentCancel