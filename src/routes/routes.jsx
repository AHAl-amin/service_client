import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Registration from "../Pages/Authentication/Registration";
import Login from "../Pages/Authentication/Login";
import DashboardLayout from "../Layout/BuyerDashboardHome/DashboardLayout";
import EmailVerification from "../Pages/Authentication/EmailVerification";
import OTP_Verification from "../Pages/Authentication/OTP_Verification";
import ResetPassword from "../Pages/Authentication/ResetPassword";
// import Admin_Home from "../Layout/BuyerDashboardHome/BuyerDashboardHome";
import FeaturedPropertiesDettails from "../Pages/Componants/FeaturedPropertiesDettails";
import CostCalculation from "../Pages/CostCalculation/CostCalculation";
// import { View } from "lucide-react";
import ViewProfice from "../Pages/Componants/ViewProfice";
import BuyerDashboardHome from "../Layout/BuyerDashboardHome/BuyerDashboardHome";
import BuyerDasFeatureDetails from "../Layout/BuyerDashboardHome/BuyerDasFeatureDetails";
import BuyerDasProfileView from "../Layout/BuyerDashboardHome/BuyerDasProfileView";
// import BuyerDasFeatureDetails from "../Layout/BuyerDashboardHome/BuyerDasFeatureDetails";


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
// dashboard
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
     
      
    ]
  },

// authentication

  { path: '/sign_up', element: <Registration /> },
  { path: '/login', element: <Login /> },
  { path: '/verify', element: <EmailVerification /> },
  { path: '/otp_verify', element: <OTP_Verification /> },
  { path: '/reset_password', element: <ResetPassword /> },
]);