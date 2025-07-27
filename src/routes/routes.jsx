import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";

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
import MyListings from "../Layout/SellerDashboardHome/MyListings";
import BoostOptions from "../Layout/SellerDashboardHome/BoostOptions";
import SellerSetting from "../Layout/SellerDashboardHome/SellerSetting";
import AddProperties from "../Layout/SellerDashboardHome/AddProperties/AddProperties";
import MediaImages from "../Layout/SellerDashboardHome/AddProperties/MediaImages";
import BuyerRegistration from "../Pages/Authentication/BuyerRegistration";
import SellerRegistration from "../Pages/Authentication/SellerRegistration";
import Pricing from "../Pages/Home/Pricing";
import SellerDasFeatureDetails from "../Layout/SellerDashboardHome/SellerDasFeatureDetails";
import PaymentSuccess from "../Payment/PaymentSuccess";
import PaymentCancel from "../Payment/PaymentCancel";
import Unauthorized from "../Unauthorized/Unauthorized";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

// import AddProperties from "../Layout/SellerDashboardHome/AddProperties";
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
        path: '/view_profile/:sellerId',
        element: <ViewProfice />
      },
      {
        path: '/pricing',
        element: <Pricing />
      },
      {
        path: '/success',
        element: <PaymentSuccess/>
      },
      {
        path: '/cancel',
        element: <PaymentCancel/>
      },
           {
        path: "/unauthorized",
        element: <Unauthorized />,
      },


    ]
  },
  // Buyer dashboard

   
  {
    path: 'buyer_dashboard',
   element: (<PrivateRoute allowedRoles={['buyer']}>
      <DashboardLayout />
    </PrivateRoute>),
    children: [
      { index: true, element: <BuyerDashboardHome /> },
      {
        path: 'buyer_feture_details/:id',
        element: <BuyerDasFeatureDetails />
      },
      {
        path: 'buyer_das_profile_view/:sellerId',
        element: <BuyerDasProfileView />
      },
      {
        path: 'wish_list',
        element: <WishList />
      },

      {
        path: 'subscribtion',
        element: <Subscribtion />
      },
      {
        path: 'buyer_cost_calculation',
        element: <BuyerCostCalculation />
      },
      {
        path: 'buyer_setting',
        element: <BuyerSetting />
      },
    


    ]
  },


  // Seller dashboard

  {
    path: 'seller_dashboard',
     element: (<PrivateRoute allowedRoles={['seller']}>
      <SellerDashboardLayout />
    </PrivateRoute>),
    children: [
      { index: true, element: <SellerDashboardHome /> },

      { path: 'my_listings', element: <MyListings /> },
      {
        path: 'seller_feture_details/:id',
        element: <SellerDasFeatureDetails />
      },
      {
        path: 'boost_options',
        element: <BoostOptions />
      },
      {
        path: 'add_properties',
        element: <AddProperties />
      },
      {
        path: 'seller_settings',
        element: <SellerSetting />
      },
      {
        path: 'media_images',
        element: <MediaImages />
      },
    ]
  },

  // authentication

  { path: '/buyer_registration', element: <BuyerRegistration /> },
  { path: '/seller_registration', element: <SellerRegistration /> },
  { path: '/login', element: <Login /> },
  { path: '/verify', element: <EmailVerification /> },
  { path: '/otp_verify', element: <OTP_Verification /> },
  { path: '/reset_password', element: <ResetPassword /> },
]);