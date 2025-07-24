
import React from 'react';
import { useNavigate } from 'react-router-dom';

function PaymentSuccess() {
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
    <div className='flex flex-col justify-center items-center h-screen'>
      <p className='text-green-400 text-center text-2xl'>Payment Successful</p>
      <button
        onClick={handleNavigate}
        className='bg-[#5B21BD] text-white rounded-lg px-6 py-2 mt-4 text-lg font-semibold transition-opacity cursor-pointer hover:bg-opacity-80'
        aria-label="Go to dashboard"
      >
        Go to dashboard
      </button>
    </div>
  );
}

export default PaymentSuccess;

