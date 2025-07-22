


import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaCalculator, FaRegHeart } from "react-icons/fa6";
import { Bell, ChevronDown, ChevronsLeft, ChevronsRight } from "lucide-react";


import Logo from '../../../public/img/logo.png'
import { TiMessages } from "react-icons/ti";
import { AiOutlineDollar } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import BuyerNotification from "./BuyerNotification";
import { toast, ToastContainer } from "react-toastify";
import { logout } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import { useGetBuyerDataProfileQuery } from "../../redux/features/profileApi";

export default function DashboardLayout() {
  const { data: getBuyerDataProfile } = useGetBuyerDataProfileQuery();
  const profile = getBuyerDataProfile?.data;
  console.log(profile)
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Dashboard");
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const menuItems = [
    {
      items: [
        { name: "Dashboard", icon: <LuLayoutDashboard size={20} />, path: "/buyer_dashboard" },
        { name: "My Wishlist", icon: <FaRegHeart size={20} />, path: "buyer_dashboard/wish_list" },
        // { name: "Messages", icon: <TiMessages size={20} />, path: "/subscribtion" },
        { name: "Cost Calculator", icon: <FaCalculator size={20} />, path: "buyer_dashboard/buyer_cost_calculation" },
        { name: "Subscription", icon: <AiOutlineDollar size={20} />, path: "buyer_dashboard/subscribtion" },
        { name: "Settings", icon: <IoSettingsOutline size={20} />, path: "buyer_dashboard/buyer_setting" },

      ],
    },
  ];



  useEffect(() => {
    const currentItem = menuItems[0].items.find(
      (item) => `/${item.path}` === location.pathname || item.path === location.pathname
    );
    if (currentItem) {
      setSelectedItem(currentItem.name);
    }
  }, [location.pathname]);

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

  const handleItemClick = (itemName, path) => {
    setSelectedItem(itemName); // Update the selected item on click
    navigate(path); // Navigate to the clicked item's path
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${isCollapsed ? "w-20" : "w-64"
          } bg-[#1C3988] border-r border-gray-200 transition-all duration-500 ease-in-out`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-4">
          <div className="flex items-center ms-1 gap-2 mt-20">
            <div
              className={`transform transition-all duration-500 ${isCollapsed ? "opacity-0 -translate-x-full" : "opacity-100 translate-x-0"
                }`}
            >
              <img src={Logo} alt="Logo" />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 md:mt-20 relative ">
          {menuItems.map((section, idx) => (
            <div key={idx} className="mb-8">
              <ul className="space-y-2">
                {section.items.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <Link
                      to={item.path}
                      onClick={() => handleItemClick(item.name, item.path)}
                      className={`flex items-center gap-3 px-3 py-2 text-gray-50 rounded-lg hover:bg-gray-400 group relative ${selectedItem === item.name ? "bg-gray-200 text-gray-900 font-semibold" : ""
                        }`}
                    >
                      <span
                        className={`text-gray-50 transition-colors duration-300 ${selectedItem === item.name ? "text-gray-900" : "text-gray-50"
                          }`}
                      >
                        {item.icon}
                      </span>
                      <span
                        className={`transform transition-all duration-500 ${isCollapsed ? "opacity-0 -translate-x-full" : "opacity-100 translate-x-0"
                          } whitespace-nowrap`}
                      >
                        {item.name}
                      </span>
                      {item.badge && !isCollapsed && (
                        <span className="ml-auto bg-red-500 text-white text-xs font-semibold rounded-full px-2 py-0.5">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <button onClick={handleLogout} className="text-gray-200 hover:text-gray-300 cursor-pointer absolute left-16 bottom-10">Logout</button>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="h-16 bg-white border-b border-gray-200">
          <div className="h-full px-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors duration-300"
              >
                {isCollapsed ? <ChevronsRight size={20} /> : <ChevronsLeft size={20} />}
              </button>
              <div className="flex flex-col">
                <span className="text-gray-700 font-bold text-xl">{selectedItem}</span>
                <h1 className="text-gray-900">
                  Hi, Welcome <span className="text-[#B28D28] font-bold">{profile?.first_name}</span>
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-4 me-10">
              <button
                onClick={() => setIsModalOpen(true)}
                className="p-2 bg-[#FAE08C1A] hover:bg-[#f8de91] border-2 border-[#B28D2833] rounded-full transition-colors duration-300 cursor-pointer"
              >
                <Bell size={24} className="text-[#B28D28]" />
              </button>


              <div className="flex items-center justify-center gap-2">
                <div className="w-12">
                  <img
                    src={profile?.profile_picture ? `http://10.10.13.60:2100${profile?.profile_picture}` : "https://i.ibb.co/jVcFCQf/businessman-icon-600nw-564112600.webp"}
                    className="rounded-full w-10 h-10 object-center"
                    alt="Admin Avatar"
                  />
                </div>
                <div>
                  <h2 className="font-bold text"> {profile?.first_name}</h2>
                  <p className="text-gray-900">{profile?.email}</p>
                </div>
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button">
                    <ChevronDown size={20} />
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content mt-4 menu bg-base-200 rounded-box z-50 w-32 p-2 shadow-md border border-gray-400"
                  >
                    <li>
                      <Link to="/profile" className="text-gray-700 hover:text-gray-900">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/logout" className="text-gray-700 hover:text-gray-900">
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-12 bg-[#F9F5ED]">
          <BuyerNotification isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
          <Outlet />
        </main>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
}

