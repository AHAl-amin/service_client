import { FiChevronDown } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useGetBuyerDataProfileQuery, useGetSellerDataProfileQuery } from '../../redux/features/profileApi';
import { use, useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {

  const userType = localStorage.getItem("user_type");

  const { data: getBuyerDataProfile } = useGetBuyerDataProfileQuery(undefined, {
    skip: userType !== "buyer"
  });
  const { data: getSellerDataProfile } = useGetSellerDataProfileQuery(undefined, {
    skip: userType !== "seller"
  });
  //  console.log(getSellerDataProfile, "profile.....................");

  const profile =
    userType === "buyer" ? getBuyerDataProfile?.data : getSellerDataProfile?.data;

  const userName = profile ? `${profile.first_name} ` : '';
  const userEmail = profile?.email;
  const profileImage = profile?.profile_picture
    ? `http://your_base_url_here${profile.profile_picture}`
    : 'https://i.ibb.co/jVcFCQf/businessman-icon-600nw-564112600.webp';



  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("authToken");
    localStorage.removeItem("user_type");



    navigate("/login");
    toast.success("Logout successful!");
  };
  const location = useLocation();
  const activeClass = 'text-blue-600 border-b-2 border-blue-600';

  return (
    <nav className="bg-white py-3 px-6 shadow-md sticky top-0 z-50 shadow-black/20">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src="https://i.ibb.co/20mKHM8m/logo-final-2.png" alt="Logo" className="h-18 w-auto" />
        </div>

        <div className="hidden md:flex space-x-8">
          <Link
            to="/"
            className={`text-lg ${location.pathname === '/' ? activeClass : 'text-gray-600'}`}
          >
            Home
          </Link>


          <div className="dropdown relative w-35">
            <div tabIndex={0} role="button" className={`text-lg cursor-pointer  ${location.pathname.includes('property-types') ? activeClass : 'text-gray-600'}`}> Property Types</div>
            <FiChevronDown className="text-gray-600 ml-1 absolute bottom-2 right-0 " />
            <ul tabIndex={0} className="dropdown-content menu bg-white text rounded-box z-1 w-40   p-2 shadow-sm " >
              <li><a>Farms 7 ranches</a></li>
              <li><a>Recreational</a></li>
              <li><a>Residential lots</a></li>
              <li><a>Commercial</a></li>
              <li><a>waterfront</a></li>
            </ul>
          </div>

          <div className="dropdown relative w-24">
            <div tabIndex={0} role="button" className={`text-lg cursor-pointer  ${location.pathname.includes('property-types') ? activeClass : 'text-gray-600'}`}> Countries</div>
            <FiChevronDown className="text-gray-600 ml-1 absolute bottom-2 right-0 " />
            <ul tabIndex={0} className="dropdown-content menu bg-white text rounded-box z-1 w-40   p-2 shadow " >
              <li><a>United States</a></li>
              <li><a>Canada</a></li>
              <li><a>Mexico</a></li>
              <li><a>Brazil</a></li>
              <li><a>Spain</a></li>
              <li><a>Australia</a></li>

            </ul>
          </div>
          <Link to="/pricing" className={`text-lg ${location.pathname === '/pricing' ? activeClass : 'text-gray-600'}`}>
            Pricing
          </Link>

          <Link
            to="/cost_calculation"
            className={`text-lg ${location.pathname === '/cost_calculation' ? activeClass : 'text-gray-600'}`}
          >
            Cost Calculator
          </Link>
        </div>

        <div className="md:flex items-center space-x-4">
          {profile ? (
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 cursor-pointer"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-sm text-gray-700">
                <p className="font-medium">{userName}</p>
                <p className="text-xs">{userEmail}</p>
              </div>
              {menuOpen && (
                <div className="absolute lg:right-60 md:right-40 right-20  top-20 bg-gray-300 border shadow-md rounded-md cursor-pointer p-3 z-30 w-30">

                  <button
                    onClick={handleLogout}
                    className="w-full text-left text-gray-700  cursor-pointer  py-1 px-2 rounded"
                  >
                    Logout
                  </button>
                  <Link to={userType === "seller" ? "/seller_dashboard" : "/buyer_dashboard"} className='text-gray-700  cursor-pointer '>
                    Dashboard
                  </Link>
                </div>
              )}
            </div>
          ) : (

            <Link
              to="/login"
              className="text-lg bg-[#1C3988] text-white py-2 px-4 rounded-md"
            >
              Log in
            </Link>


          )}
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover />
    </nav>
  );
};

export default Navbar;
