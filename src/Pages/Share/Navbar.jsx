import { FiChevronDown } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
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
          <Link
            to="/login"
            className="text-lg bg-[#1C3988] text-white py-2 px-4 rounded-md"
          >
            Log in
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
