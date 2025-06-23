import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Registration from "../Pages/Authentication/Registration";
import Login from "../Pages/Authentication/Login";
import DashboardLayout from "../Layout/BuyerDashboardHome/DashboardLayout";
import EmailVerification from "../Pages/Authentication/EmailVerification";
import OTP_Verification from "../Pages/Authentication/OTP_Verification";
import ResetPassword from "../Pages/Authentication/ResetPassword";

import FeaturedPropertiesDettails from "../Pages/Componants/FeaturedPropertiesDettails";
import CostCalculation from "../Pages/CostCalculation/CostCalculation";

import ViewProfice from "../Pages/Componants/ViewProfice";
import BuyerDashboardHome from "../Layout/BuyerDashboardHome/BuyerDashboardHome";
import BuyerDasFeatureDetails from "../Layout/BuyerDashboardHome/BuyerDasFeatureDetails";
import BuyerDasProfileView from "../Layout/BuyerDashboardHome/BuyerDasProfileView";
import WishList from "../Layout/BuyerDashboardHome/WishList/WishList";
import Subscribtion from "../Layout/BuyerDashboardHome/Subscribtion";
import BuyerCostCalculation from "../Layout/BuyerDashboardHome/BuyerCostCalculation";
import BuyerSetting from "../Layout/BuyerDashboardHome/BuyerSetting";
import SellerDashboardLayout from "../Layout/SellerDashboardHome/SellerDashboardLayout";
import SellerDashboardHome from "../Layout/SellerDashboardHome/SellerDashboardHome";
// import WishList from "../Layout/BuyerDashboardHome/WishList";


export const router = createBrowserRouter([

  // landing page
  {
    path: "/",
    element: <Main />,
    children: [
      { path: '/', element: <Home /> },
      {
        path: '/dettails/:id',
        element: <FeaturedPropertiesDettails />
      },
      {
        path: '/cost_calculation',
        element: <CostCalculation />
      },
      {
        path: '/view_profice',
        element: <ViewProfice />
      },
    ]
  },
// Buyer dashboard
  {
    path: 'buyer_dashboard',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <BuyerDashboardHome/> },
      { path: 'buyer_feture_details/:id', 
        element: <BuyerDasFeatureDetails/> 
      },
      { path: 'buyer_das_profile_view', 
        element: <BuyerDasProfileView/> 
      },
      { path: 'wish_list', 
        element: <WishList/> 
      },
     
      { path: 'subscribtion', 
        element: <Subscribtion/> 
      },
      { path: 'buyer_cost_calculation',
        element: <BuyerCostCalculation/>
      },
      { path: 'buyer_setting',
        element: <BuyerSetting/>
      },
     
      
    ]
  },


  // Seller dashboard
  
{
  path: 'seller_dashboard',
  element: <SellerDashboardLayout />,
  children: [
    { index: true, element: <SellerDashboardHome /> },
    // Add more seller sub-routes here like
    // { path: 'properties', element: <SellerProperties /> },
    // { path: 'settings', element: <SellerSetting /> },
  ]
},

// authentication

  { path: '/sign_up', element: <Registration /> },
  { path: '/login', element: <Login /> },
  { path: '/verify', element: <EmailVerification /> },
  { path: '/otp_verify', element: <OTP_Verification /> },
  { path: '/reset_password', element: <ResetPassword /> },
]);