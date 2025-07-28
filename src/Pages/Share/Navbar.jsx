


import { FiChevronDown } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useGetBuyerDataProfileQuery, useGetSellerDataProfileQuery } from '../../redux/features/profileApi';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { setSelectedCountry, setSelectedPropertyType } from '../../redux/features/filterSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoIosArrowDown } from 'react-icons/io';
import Logo from '../../../public/img/logo.png'; // Adjust the path as necessary
import { HashLink } from 'react-router-hash-link';

const Navbar = () => {
  const dispatch = useDispatch();
  const { selectedCountry, selectedPropertyType } = useSelector((state) => state.filters); // Access Redux state
  const userType = localStorage.getItem("user_type");

  const { data: getBuyerDataProfile } = useGetBuyerDataProfileQuery(undefined, {
    skip: userType !== "buyer",
  });
  const { data: getSellerDataProfile } = useGetSellerDataProfileQuery(undefined, {
    skip: userType !== "seller",
  });

  const profile = userType === "buyer" ? getBuyerDataProfile?.data : getSellerDataProfile?.data;

  const userName = profile ? `${profile.first_name} ` : '';
  const userEmail = profile?.email;
  const profileImage = profile?.profile_picture
    ? `https://yoursafeland.duckdns.org${profile.profile_picture}`
    : 'https://i.ibb.co/jVcFCQf/businessman-icon-600nw-564112600.webp';

  const [menuOpen, setMenuOpen] = useState(false);
  const [propertyDropdownOpen, setPropertyDropdownOpen] = useState(false);
  const [countriesDropdownOpen, setCountriesDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const propertyRef = useRef(null);
  const countriesRef = useRef(null);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("authToken");
    localStorage.removeItem("user_type");
    navigate("/login");
    toast.success("Logout successful!");
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        propertyRef.current &&
        !propertyRef.current.contains(event.target) &&
        countriesRef.current &&
        !countriesRef.current.contains(event.target)
      ) {
        setPropertyDropdownOpen(false);
        setCountriesDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const location = useLocation();
  const activeClass = 'text-blue-600 border-b-2 border-blue-600';

  // Property types and countries

  const propertyTypes = [
    { name: 'All ', value: null }, // Added "All Properties" option
    { name: 'Residential', value: 'residential' },
    { name: 'Commercial', value: 'commercial' },
    { name: 'Land', value: 'land' },
    { name: 'Villa', value: 'villa' },
    { name: 'Ranch', value: 'ranch' },
  ];

  const countries = [
    { name: 'All ', value: null },
    { name: 'United States', value: 'usa' },
    { name: 'Canada', value: 'canada' },
    { name: 'United Kingdom', value: 'uk' },
    { name: 'Australia', value: 'australia' },
    { name: 'Germany', value: 'germany' },
    { name: 'France', value: 'france' },
    { name: 'Japan', value: 'japan' },
    { name: 'Brazil', value: 'brazil' },
    { name: 'India', value: 'india' },
    { name: 'China', value: 'china' },
  ];

  return (
    <nav className="bg-white py-3 px-6 shadow-md sticky top-0 z-50 shadow-black/20">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src={Logo} alt="Logo" className="h-18 w-auto" />
        </div>

        <div className="hidden md:flex space-x-8">
          <Link
            to="/"
            className={`text-lg ${location.pathname === '/' ||
                location.pathname.startsWith('/dettails') ||
                location.pathname.startsWith('/view_profile')
                ? activeClass
                : 'text-gray-600'
              }`}
          >
            Home
          </Link>

          <div className="relative" ref={propertyRef}>
            <button
              onClick={() => {
                setPropertyDropdownOpen(!propertyDropdownOpen);
                setCountriesDropdownOpen(false);
              }}
              className={`text-lg flex gap-2 items-center  text-gray-600
                }`}
            >
              {selectedPropertyType
                ? propertyTypes.find((pt) => pt.value === selectedPropertyType)?.name || 'All Properties'
                : 'Property Types'}
              <IoIosArrowDown />
            </button>
            {propertyDropdownOpen && (
              <div className="absolute top-10 bg-gray-300 border shadow-md rounded-md cursor-pointer p-3 z-30 w-40">
                {propertyTypes.map((type) => (
                  <button
                    key={type.value || 'all-properties'}
                    onClick={() => {
                      dispatch(setSelectedPropertyType(type.value));
                      setPropertyDropdownOpen(false);
                    }}
                    className="block text-gray-700 py-1 px-2 rounded hover:bg-gray-200 w-full text-left"
                  >
                    {type.name}
                  </button>
                ))}
              </div>
            )}
          </div>


          <div className="relative" ref={countriesRef}>
            <button
              onClick={() => {
                setCountriesDropdownOpen(!countriesDropdownOpen);
                setPropertyDropdownOpen(false);
              }}
              className={`text-lg flex gap-2 items-center text-gray-600
                }`}
            >
              {selectedCountry
                ? countries.find((c) => c.value === selectedCountry)?.name || 'All Countries'
                : 'Countries'}
              <IoIosArrowDown />
            </button>
            {countriesDropdownOpen && (
              <div className="absolute top-10 bg-gray-300 border shadow-md rounded-md cursor-pointer p-3 z-30 w-40">
                {countries.map((country) => (
                  <button
                    key={country.value || 'all-countries'}
                    onClick={() => {
                      dispatch(setSelectedCountry(country.value));
                      setCountriesDropdownOpen(false);
                    }}
                    className="block text-gray-700 py-1 px-2 rounded hover:bg-gray-200 w-full text-left"
                  >
                    {country.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <HashLink smooth to="/#why-choose" className={`text-lg ${location.hash === '#why-choose' ? 'text-blue-600' : 'text-gray-600'}`}>
  About us
</HashLink>

<HashLink smooth to="/#get-in-touch" className={`text-lg ${location.hash === '#get-in-touch' ? 'text-blue-600' : 'text-gray-600'}`}>
  Contact us
</HashLink>
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
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className="text-sm text-gray-700">
                <p className="font-medium">{userName}</p>
                <p className="text-xs">{userEmail}</p>
              </div>
              {menuOpen && (
                <div className="absolute lg:right-60 md:right-40 right-20 top-20 bg-gray-300 border shadow-md rounded-md cursor-pointer p-3 z-30 w-30">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left text-gray-700 cursor-pointer py-1 px-2 rounded"
                  >
                    Logout
                  </button>
                  <Link
                    to={userType === "seller" ? "/seller_dashboard" : "/buyer_dashboard"}
                    className="text-gray-700 cursor-pointer block py-1 px-2 rounded"
                  >
                    Dashboard
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="text-lg bg-[#1C3988] text-white py-2 px-4 rounded-md">
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


