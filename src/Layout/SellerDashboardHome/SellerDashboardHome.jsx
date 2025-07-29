



import { MapPin, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";

import { IoEyeOutline } from "react-icons/io5";
import { LuClipboardList } from "react-icons/lu";
import { PiCurrencyDollarSimple } from "react-icons/pi";
import { SiBosch } from "react-icons/si";
import { Link } from "react-router-dom";
import { CiViewList } from "react-icons/ci";
// import EditProperties from "./EditProperties";
import { useDeletePropertiesMutation, useGetAllPropertiesListQuery, useGetSellerDesHeaderQuery } from "../../redux/features/sellerApi";
import toast, { Toaster } from "react-hot-toast";
import EditProperties from "./EditProperties/EditProperties";

export default function SellerDashboardHome() {
  const { data: getAllPropertiesList } = useGetAllPropertiesListQuery();
  const {data: getSellerDesHeader} = useGetSellerDesHeaderQuery();
  console.log(getAllPropertiesList, "llllllllllllllllll")
  const [deleteProperties] = useDeletePropertiesMutation();
  const [editPropertyId, setEditPropertyId] = useState(null);
  const [propertyList, setPropertyList] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  
  console.log(getSellerDesHeader, "getSellerDesHeader");



  useEffect(() => {
    if (getAllPropertiesList?.length > 0) {
      const transformed = getAllPropertiesList.map((item) => ({
        id: item.id,
        title: item.title,
        price: `$${Number(item.price).toLocaleString()}`,
        area: `${item.land_size} sq ft`,
        location: `${item.country},${item.city}`,
        description: item.description,
        person: `${item.remaining_shares}/${item.max_shares}`,
        payment: item.allow_down_payment ? "Down Payment Available" : "Full Payment Only",
        image: item.main_image
          ? `https://yoursafeland.duckdns.org${item.main_image}`
          : "https://via.placeholder.com/400x300?text=No+Image",
        features: item.features?.map((f) => f.name).join(", ") || "No features listed",
        booststatus: item.booststatus
      }));
      console.log("Updated propertyList:", transformed);
      setPropertyList(transformed);
    }
  }, [getAllPropertiesList]);


  const handleDelete = async (id) => {
    const previousList = [...propertyList]; // Backup current list
    setPropertyList((prevList) => prevList.filter((property) => property.id !== id)); // Optimistic update
    try {
      const response = await deleteProperties(id).unwrap();
      toast.success(response.message);
    } catch (error) {
      toast.error("Failed to delete property: " + error.message);
      setPropertyList(previousList); // Restore on error
    }
  };

  const handleEdit = async (property) => {
    console.log("Editing property ID:", property.id); // Debug log
    setEditPropertyId(property.id);
    await new Promise((resolve) => setTimeout(resolve, 0)); // Ensure state update
    setShowEditModal(true);
  };

  const closeModal = () => {
    setShowEditModal(false);
    setEditPropertyId(null); // Reset editPropertyId
  };

  const statsData = [
    {
      id: 1,
      title: "Total Listings",
     count: getSellerDesHeader?.total_listings,
   
      icon: <LuClipboardList size={24} className="text-blue-600" />,
      bgColor: "bg-blue-100",
    },
    {
      id: 2,
      title: "Total Wishlisted",
    
       count: getSellerDesHeader?.property_wishlisted,
    
      icon: <CiViewList  size={24} className="text-purple-600" />,
      bgColor: "bg-purple-100",
    },
    {
      id: 3,
      title: "Active Boosts",
     
       count: getSellerDesHeader?.active_boosts,

      
      icon: <SiBosch size={24} className="text-green-600" />,
      bgColor: "bg-green-100",
    },
    {
      id: 4,
      title: "Interested Buyers",
      
    
         count: getSellerDesHeader?.interested_buyers,
     
      icon: <PiCurrencyDollarSimple size={24} className="text-red-300" />,
      bgColor: "bg-red-100",
    },
  ];

  return (
    <div className="">
      <div className="mx-auto">
        {/* Statistics Cards */}
        <div className="m-4 space-y-2">
          <h1 className="text-4xl font-semibold mb">Dashboard</h1>
          <p className="text-gray-600">Welcome back, Here's an overview of your listings and performance.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statsData.map((stat) => (
            <div key={stat.id} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-[18px] text-gray-500 font-medium">{stat.title}</h3>
                <div className={`w-10 h-10 ${stat.bgColor} rounded-full flex items-center justify-center`}>
                  {stat.icon}
                </div>
              </div>
              <div className="text-3xl text font-bold mb-1">{stat.count}</div>
              
            </div>
          ))}
        </div>

        {/* Search Section */}
        <section className="py-16">
          <div className="container mx-auto text-center">
            <div className="flex items-center justify-between">
              <div className="basis-6/12">
                <h2 className="text-4xl font-bold text-[#1C3988] text-start">Recent listings</h2>
                <p className="text-[#545454] text-start text-xl mt-2 w-11/12 mb-10">
                  You have  total listings {getAllPropertiesList?.length}.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {propertyList.slice(0, 6).map((property, index) => (
                <div key={index} className="card w-full bg-white shadow-lg rounded-lg overflow-hidden relative">
                  {/* <p className="bg-green-700 p-2 rounded-xl px-6 top-2 left-2 absolute">Boost</p> */}

                  {property.booststatus === "Active" && (
                    <p className="bg-green-700 p-2 rounded-xl px-6 top-2 left-2 absolute">
                      Boost
                    </p>
                  )}



                  <img src={property.image} alt={property.title} className="w-full h-48 object-cover" />

                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-[#1C3988]">{property.title}</h3>
                      <div className="dropdown">
                        <div tabIndex={0} role="button" className="m-1 text cursor-pointer">
                          <HiDotsHorizontal className="text-xl" />
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu text bg-gray-300 rounded-box right-0 w-30 p-2 shadow-sm">
                          <li>
                            <button onClick={() => handleEdit(property)}>Edit</button>
                          </li>
                          <li>
                            <button className="text-red-400" onClick={() => handleDelete(property.id)}>
                              Delete
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <p className="flex items-center gap-1 text-start text-gray-500">
                      <MapPin size={16} />
                      <span>{property?.location}</span>
                    </p>
                    <p className="text-gray-600 mt-2">
                      <h1 className="text-lg flex items-center justify-between font-bold text-start text-[#1C3988]">
                        {property.price}
                        <span className="text-[#8D8D8D] font-medium">{property?.area}</span>
                      </h1>
                    </p>

                    <div className="flex items-center justify-between my-3">
                      <button className="px-5 py-[5px] rounded-full border-[1.5px] cursor-pointer border-[#1C3988] text-[#1C3988]">
                        {property?.payment}
                      </button>
                      <div className="flex items-center gap-1 text-[#8B8B8B]">
                        <Users size={18} className="text-[#1C3988]" />
                        {property?.person}
                      </div>
                    </div>

                    <p className="text-[#8B8B8B] text-start pt-2">{property?.description}</p>

                    <Link
                      to={`/seller_dashboard/seller_feture_details/${property.id}`}
                      className="btn bg-[#1C3988] py-2 text-white text-base font-medium mt-4 w-full"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Modal for EditProperties */}
      {showEditModal && (
        <div className="fixed inset-0 backdrop-blur shadow-2xl bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] h-[90%] shadow-lg relative">
            <button
              onClick={closeModal}
              className="absolute top-1 cursor-pointer right-2 text-gray-500 hover:text-gray-800 text-xl"
            >
              ✕
            </button>
            <div className="h-full overflow-y-auto">
              <EditProperties PropertiesId={editPropertyId} />
            </div>
          </div>
        </div>
      )}
      <Toaster position="top-right" />
    </div>
  );
}


