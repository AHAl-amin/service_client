



// "use client";

// import { MapPin, Users } from "lucide-react";
// import { useEffect, useState } from "react";
// import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
// import { Link } from "react-router-dom";
// import { useAddToWishlistMutation, useGetAllPropertiesFeaturedListQuery, useRemoveFromWishlistMutation } from "../../redux/features/buyerApi";
// import { toast, ToastContainer } from "react-toastify";




// export default function BuyerDashboardHome() {
//   const { data: getAllPropertiesFeaturedList } = useGetAllPropertiesFeaturedListQuery();
//   console.log(getAllPropertiesFeaturedList, "lllllllllllllllllllll")





//   const [wishlistIds, setWishlistIds] = useState([]);
//   const [propertyList, setPropertyList] = useState([]);
//   console.log(propertyList, "pppppppppppppppppp")



//   useEffect(() => {
//     if (getAllPropertiesFeaturedList?.data?.length > 0) {
//       const transformed = getAllPropertiesFeaturedList?.data?.map((item) => ({
//         id: item.id,
//         title: item.title,
//         price: `$${Number(item.price).toLocaleString()}`,
//         area: `${item.land_size} sq ft`,
//         location: `${item.city}, ${item.country}`,
//         description: item.description,
//         person: `${item.remaining_shares}/${item.max_shares}`,
//         payment: item.allow_down_payment ? "Down Payment Available" : "Full Payment Only",
//         image: item.main_image
//           ? `http://10.10.13.60:2100${item.main_image}`
//           : "https://via.placeholder.com/400x300?text=No+Image",
//         features: item.features?.map((f) => f.name).join(", ") || "No features listed",
//       }));
//       setPropertyList(transformed);
//     }
//   }, [getAllPropertiesFeaturedList]);

//   const [addToWishlist] = useAddToWishlistMutation();
//   const [removeFromWishlist] = useRemoveFromWishlistMutation();

//   const handleToggleWishlist = async (propertyId) => {
//     try {
//       if (wishlistIds.includes(propertyId)) {
//         const res = await removeFromWishlist({ property_id: propertyId }).unwrap();
//         if (res.message === "Property removed from wishlist successfully") {
//           setWishlistIds((prev) => prev.filter((id) => id !== propertyId));
//           toast.success("Removed from wishlist");
//         } else {
//           toast.error("Failed to remove from wishlist");
//         }
//       } else {
//         const res = await addToWishlist({ property_id: propertyId }).unwrap();
//         if (res.success) {
//           setWishlistIds((prev) => [...prev, propertyId]);
//           toast.success("Added to wishlist");
//         } else {
//           toast.error("Failed to add to wishlist");
//         }
//       }
//     } catch (error) {
//       console.error("Wishlist toggle failed:", error);
//       // toast.error("Something went wrong");
//     }
//   };

//   const statsData = [
//     {
//       id: 1,
//       title: "Recently Viewed",
//       count: 15,
//       description: "Properties viewed in the last 30 days",
//       icon: {
//         paths: [
//           "M15 12a3 3 0 11-6 0 3 3 0 016 0z",
//           "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
//         ],
//         strokeColor: "text-blue-600",
//         bgColor: "bg-blue-100",
//       },
//     },
//     {
//       id: 2,
//       title: "Saved Properties",
//       count: 7,
//       description: "Properties in your wishlist",
//       icon: {
//         paths: [
//           "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
//         ],
//         strokeColor: "text-purple-600",
//         bgColor: "bg-purple-100",
//       },
//     },
//     {
//       id: 3,
//       title: "Active Chats",
//       count: 3,
//       description: "Ongoing conversations with sellers",
//       icon: {
//         paths: [
//           "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
//         ],
//         strokeColor: "text-green-600",
//         bgColor: "bg-green-100",
//       },
//     },
//     {
//       id: 4,
//       title: "Share Interest",
//       count: 2,
//       description: "Jointly owned properties",
//       icon: {
//         paths: [
//           "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z",
//         ],
//         strokeColor: "text-blue-600",
//         bgColor: "bg-blue-100",
//       },
//     },
//   ];



//   const [searchData, setSearchData] = useState({
//     location: "",
//     minPrice: "",
//     maxPrice: "",
//     country: "",
//     propertyType: "",
//     downPayment: false,
//   });

//   const handleInputChange = (field, value) => {
//     setSearchData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleSearch = () => {
//     console.log("Search data:", searchData);
//   };

//   return (
//     <div className="">
//       <div className="mx-auto">
//         <h1 className="text text-4xl font-semibold mb-6">Dashboard overview</h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//           {statsData.map((stat) => (
//             <div
//               key={stat.id}
//               className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
//             >
//               <div className="flex items-center justify-between mb-2">
//                 <h3 className="text-sm font-medium text">{stat.title}</h3>
//                 <div
//                   className={`w-10 h-10 bg-[#E8EBF3] ${stat.icon.bgColor} rounded-full flex items-center justify-center`}
//                 >
//                   <svg
//                     className={`w-5 h-5 text ${stat.icon.strokeColor}`}
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     {stat.icon.paths.map((path, index) => (
//                       <path
//                         key={index}
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d={path}
//                       />
//                     ))}
//                   </svg>
//                 </div>
//               </div>
//               <div className="text-3xl font-bold text mb-1">{stat.count}</div>
//               <p className="text-sm text-[#00B69B]">{stat.description}</p>
//             </div>
//           ))}
//         </div>

//         <div className=" rounded-lg  ">
//           <div className="mb-8 ">
//             <h1 className="text-3xl font-bold text mb-2">Find Your Perfect Land</h1>
//             <p className="text-gray-600">Search and filter properties based on your preferences</p>
//           </div>

//           <div className="bg-[#E8EBF3] p-6 sm:p-10 rounded-xl  mx-auto">
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 handleSearch();
//               }}
//               className="flex flex-col gap-4"
//             >
//               <div className="flex gap-6">
//                 <div className="w-1/2 ">
//                   <div className="relative ">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                         />
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                         />
//                       </svg>
//                     </div>
//                     <input
//                       type="text"
//                       placeholder="Search for location"
//                       value={searchData.location}
//                       onChange={(e) => handleInputChange("location", e.target.value)}
//                       className="w-full pl-10 pr-4 py-3 border border-gray-300 text-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
//                       aria-label="Search location"
//                     />
//                   </div>
//                 </div>

//                 <div className="w-1/2 flex gap-6">
//                   <div className="w-full">
//                     <input
//                       type="number"
//                       placeholder="Min Price"
//                       value={searchData.minPrice}
//                       onChange={(e) => handleInputChange("minPrice", e.target.value)}
//                       className="w-full px-4 py-3 border border-gray-300 text-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
//                       aria-label="Minimum price"
//                     />
//                   </div>

//                   <div className="w-full">
//                     <div className="flex items-center px-4 py-3 border border-gray-300 rounded-md  bg-white ">
//                       <input
//                         type="checkbox"
//                         id="downPayment"
//                         checked={searchData.downPayment}
//                         onChange={(e) => handleInputChange("downPayment", e.target.checked)}
//                         className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 bg-white"
//                         aria-label="Down payment option"
//                       />
//                       <label htmlFor="downPayment" className="ml-2 text-gray-700 ">
//                         Down Payment
//                       </label>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex gap-6">
//                 <div className="w-full ">
//                   <div className="relative">
//                     <select
//                       value={searchData.country}
//                       onChange={(e) => handleInputChange("country", e.target.value)}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
//                       aria-label="Select country"
//                     >
//                       <option value="">Select Country</option>
//                       <option value="usa">United States</option>
//                       <option value="canada">Canada</option>
//                       <option value="uk">United Kingdom</option>
//                       <option value="australia">Australia</option>
//                       <option value="germany">Germany</option>
//                       <option value="france">France</option>
//                     </select>
//                     <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//                       <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                       </svg>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="w-full">
//                   <div className="relative">
//                     <select
//                       value={searchData.propertyType}
//                       onChange={(e) => handleInputChange("propertyType", e.target.value)}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
//                       aria-label="Select property type"
//                     >
//                       <option value="">Property Type</option>
//                       <option value="residential">Residential Land</option>
//                       <option value="commercial">Commercial Land</option>
//                       <option value="agricultural">Agricultural Land</option>
//                       <option value="industrial">Industrial Land</option>
//                       <option value="recreational">Recreational Land</option>
//                     </select>
//                     <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//                       <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                       </svg>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="w-full">
//                   <input
//                     type="number"
//                     placeholder="Max Price"
//                     value={searchData.maxPrice}
//                     onChange={(e) => handleInputChange("maxPrice", e.target.value)}
//                     className="w-full px-4 py-3 border border-gray-300 text-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
//                     aria-label="Maximum price"
//                   />
//                 </div>

//                 <div className="w-full">
//                   <button
//                     type="submit"
//                     className="w-full bg hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-md transition-colors flex items-center justify-center gap-2 bg-white"
//                     aria-label="Search properties"
//                   >
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                       />
//                     </svg>
//                     Search
//                   </button>
//                 </div>
//               </div>
//             </form>

//           </div>

//           <section className="py-16">
//             <div className="container mx-auto text-center">
//               <div className="flex items-center justify-between">
//                 <div className="basis-6/12">
//                   <h2 className="text-4xl font-bold  text-[#1C3988] text-start">Featured Properties</h2>
//                   <p className="text-[#545454] text-start mt-2 w-11/12 mb-10">Handpicked premium land listings from around the world </p>
//                 </div>


//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                 {propertyList?.map((property, index) => (
//                   <div key={index} className="card w-full bg-white shadow-lg rounded-lg overflow-hidden relative">
//                     <p className="bg text-gray-100 p-2 rounded-xl px-6 top-2 left-2 absolute">Recreational</p>
//                     {wishlistIds.includes(property.id) ? (
//                       <IoIosHeart
//                         className="absolute bg-gray-300 right-2  top-2 text-2xl text-[#1C3988] rounded p-1 cursor-pointer"
//                         onClick={() => handleToggleWishlist(property.id)}
//                         aria-label={`Remove ${property.title} from wishlist`}
//                       />
//                     ) : (
//                       <IoIosHeartEmpty
//                         className="absolute bg-gray-300 right-2 size-8 top-2 text-2xl text-gray-600 rounded p-1 cursor-pointer"
//                         onClick={() => handleToggleWishlist(property.id)}
//                         aria-label={`Add ${property.title} to wishlist`}
//                       />
//                     )}
//                     <img src={property.image} alt={property.title} className="w-full h-48 object-cover" />
//                     <div className="p-6">
//                       <h3 className="text-xl font-semibold text-start text-[#1C3988]">{property.title}</h3>
//                       <p className="flex items-center gap-1 text-start text-gray-500">
//                         <MapPin size={16} />
//                         <span>{property?.location}</span>
//                       </p>
//                       <p className="text-gray-600 mt-2">
//                         <h1 className="text-lg flex items-center justify-between font-bold text-start text-[#1C3988]">
//                           {property.price}
//                           <span className="text-[#8D8D8D] font-medium">{property?.area}</span>
//                         </h1>
//                       </p>
//                       <div className="flex items-center justify-between my-3">
//                         <button className="px-5 py-[5px] rounded-full border-[1.5px] cursor-pointer border-[#1C3988] text-[#1C3988]">
//                           {property?.payment}
//                         </button>


//                         <div className="flex items-center gap-1 text-[#8B8B8B]">
//                           <Users size={18} className="text-[#1C3988]" />
//                           {property?.person === "5/5" ? (
//                             <button className="ml-2 px-3 text-xs  py-1 text-white bg-[#1C3988] rounded cursor-pointer">
//                               Contact by Email
//                             </button>
//                           ) : (
//                             <span>{property?.person}</span>
//                           )}
//                         </div>


//                       </div>
//                       <p className="text-[#8B8B8B] text-start pt-2 line-clamp-2">{property?.description}</p>
//                       <Link
//                         to={`/buyer_dashboard/buyer_feture_details/${property.id}`}
//                         className="btn bg-[#1C3988] py-2 text-white text-base font-medium mt-4 w-full"
//                       >
//                         View Details
//                       </Link>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </section>
//         </div>
//       </div>
//       <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//   );
// }



"use client";

import { MapPin, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { Link } from "react-router-dom";
import { useAddToWishlistMutation, useGetAllPropertiesFeaturedListQuery, useGetBuyShareOwnerQuery, useRemoveFromWishlistMutation } from "../../redux/features/buyerApi";
import { toast, ToastContainer } from "react-toastify";

export default function BuyerDashboardHome() {
  const { data: getAllPropertiesFeaturedList } = useGetAllPropertiesFeaturedListQuery();
  console.log(getAllPropertiesFeaturedList, "lllllllllllllllllllll");

  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [showShareholderModal, setShowShareholderModal] = useState(false);
  const { data: shareholdersData, isLoading: shareholdersLoading } = useGetBuyShareOwnerQuery(selectedPropertyId, {
    skip: !selectedPropertyId,
  });
  // console.log(getBuyShareOwner,"buyshar owern")



  const [wishlistIds, setWishlistIds] = useState([]);
  const [propertyList, setPropertyList] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [sortOption, setSortOption] = useState("Newest");
  const [searchData, setSearchData] = useState({
    location: "",
    minPrice: "",
    maxPrice: "",
    country: "",
    propertyType: "",
    downPayment: false,
  });

  console.log(propertyList, "pppppppppppppppppp");

  // Transform and set property list
  useEffect(() => {
    if (getAllPropertiesFeaturedList?.data?.length > 0) {
      const transformed = getAllPropertiesFeaturedList?.data?.map((item) => ({
        id: item.id,
        title: item.title,
        price: `$${Number(item.price).toLocaleString()}`,
        rawPrice: item.price, // Store raw price for filtering
        area: `${item.land_size} sq ft`,
        rawArea: item.land_size, // Store raw area for sorting
        location: `${item.city}, ${item.country}`,
        city: item.city,
        country: item.country,
        description: item.description,
        person: `${item.shares_count}/${item.max_shares}`,
        payment: item.allow_down_payment ? "Down Payment Available" : "Full Payment Only",
        image: item.main_image
          ? `http://10.10.13.60:2100${item.main_image}`
          : "https://via.placeholder.com/400x300?text=No+Image",
        features: item.features?.map((f) => f.name).join(", ") || "No features listed",
        property_type: item.property_type || "unknown", // Add property_type for filtering
        created_at: item.created_at || new Date().toISOString(), // Add created_at for sorting
      }));
      setPropertyList(transformed);
      setFilteredProperties(transformed); // Initialize filtered properties
    }
  }, [getAllPropertiesFeaturedList]);

  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  const handleToggleWishlist = async (propertyId) => {
    try {
      if (wishlistIds.includes(propertyId)) {
        const res = await removeFromWishlist({ property_id: propertyId }).unwrap();
        if (res.message === "Property removed from wishlist successfully") {
          setWishlistIds((prev) => prev.filter((id) => id !== propertyId));
          toast.success("Removed from wishlist");
        } else {
          toast.error("Failed to remove from wishlist");
        }
      } else {
        const res = await addToWishlist({ property_id: propertyId }).unwrap();
        if (res.success) {
          setWishlistIds((prev) => [...prev, propertyId]);
          toast.success("Added to wishlist");
        } else {
          toast.error("Failed to add to wishlist");
        }
      }
    } catch (error) {
      console.error("Wishlist toggle failed:", error);
      toast.error("Something went wrong");
    }
  };

  const handleInputChange = (field, value) => {
    setSearchData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = propertyList
      .filter((property) => {
        const fullLocation = property.location.toLowerCase();
        const matchesLocation = searchData.location
          ? fullLocation.includes(searchData.location.toLowerCase())
          : true;

        const matchesMinPrice = searchData.minPrice
          ? parseFloat(property.rawPrice) >= parseFloat(searchData.minPrice)
          : true;

        const matchesMaxPrice = searchData.maxPrice
          ? parseFloat(property.rawPrice) <= parseFloat(searchData.maxPrice)
          : true;

        const matchesDownPayment = searchData.downPayment
          ? property.payment === "Down Payment Available"
          : true;

        const matchesCountry = searchData.country
          ? property.country.toLowerCase() === searchData.country.toLowerCase()
          : true;

        const matchesPropertyType = searchData.propertyType
          ? property.property_type.toLowerCase() === searchData.propertyType.toLowerCase()
          : true;

        return (
          matchesLocation &&
          matchesMinPrice &&
          matchesMaxPrice &&
          matchesDownPayment &&
          matchesCountry &&
          matchesPropertyType
        );
      })
      .sort((a, b) => {
        switch (sortOption) {
          case "Newest":
            return new Date(b.created_at) - new Date(a.created_at);
          case "Low to high":
            return parseFloat(a.rawPrice) - parseFloat(b.rawPrice);
          case "High to Low":
            return parseFloat(b.rawPrice) - parseFloat(a.rawPrice);
          case "Small to Large":
            return parseFloat(a.rawArea || 0) - parseFloat(b.rawArea || 0);
          case "Large to Small":
            return parseFloat(b.rawArea || 0) - parseFloat(a.rawArea || 0);
          default:
            return 0;
        }
      });

    setFilteredProperties(filtered);
  };

  // Update sorting when sortOption changes
  useEffect(() => {
    const sortedProperties = [...filteredProperties].sort((a, b) => {
      switch (sortOption) {
        case "Newest":
          return new Date(b.created_at) - new Date(a.created_at);
        case "Low to high":
          return parseFloat(a.rawPrice) - parseFloat(b.rawPrice);
        case "High to Low":
          return parseFloat(b.rawPrice) - parseFloat(a.rawPrice);
        case "Small to Large":
          return parseFloat(a.rawArea || 0) - parseFloat(b.rawArea || 0);
        case "Large to Small":
          return parseFloat(b.rawArea || 0) - parseFloat(a.rawArea || 0);
        default:
          return 0;
      }
    });
    setFilteredProperties(sortedProperties);
  }, [sortOption]);

  // Stats data (unchanged)
  const statsData = [
    {
      id: 1,
      title: "Recently Viewed",
      count: 15,
      description: "Properties viewed in the last 30 days",
      icon: {
        paths: [
          "M15 12a3 3 0 11-6 0 3 3 0 016 0z",
          "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
        ],
        strokeColor: "text-blue-600",
        bgColor: "bg-blue-100",
      },
    },
    {
      id: 2,
      title: "Saved Properties",
      count: 7,
      description: "Properties in your wishlist",
      icon: {
        paths: [
          "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
        ],
        strokeColor: "text-purple-600",
        bgColor: "bg-purple-100",
      },
    },
    {
      id: 3,
      title: "Active Chats",
      count: 3,
      description: "Ongoing conversations with sellers",
      icon: {
        paths: [
          "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
        ],
        strokeColor: "text-green-600",
        bgColor: "bg-green-100",
      },
    },
    {
      id: 4,
      title: "Share Interest",
      count: 2,
      description: "Jointly owned properties",
      icon: {
        paths: [
          "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z",
        ],
        strokeColor: "text-blue-600",
        bgColor: "bg-blue-100",
      },
    },
  ];

  return (
    <div className="">
      <div className="mx-auto">
        <h1 className="text text-4xl font-semibold mb-6">Dashboard overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statsData.map((stat) => (
            <div
              key={stat.id}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text">{stat.title}</h3>
                <div
                  className={`w-10 h-10 bg-[#E8EBF3] ${stat.icon.bgColor} rounded-full flex items-center justify-center`}
                >
                  <svg
                    className={`w-5 h-5 text ${stat.icon.strokeColor}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {stat.icon.paths.map((path, index) => (
                      <path
                        key={index}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={path}
                      />
                    ))}
                  </svg>
                </div>
              </div>
              <div className="text-3xl font-bold text mb-1">{stat.count}</div>
              <p className="text-sm text-[#00B69B]">{stat.description}</p>
            </div>
          ))}
        </div>

        <div className="rounded-lg">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text mb-2">Find Your Perfect Land</h1>
            <p className="text-gray-600">Search and filter properties based on your preferences</p>
          </div>

          <div className="bg-[#E8EBF3] p-6 sm:p-10 rounded-xl mx-auto">
            <form onSubmit={handleSearch} className="flex flex-col gap-4">
              <div className="flex gap-6">
                <div className="w-1/2">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Search for location"
                      value={searchData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 text-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                      aria-label="Search location"
                    />
                  </div>
                </div>

                <div className="w-1/2 flex gap-6">
                  <div className="w-full">
                    <input
                      type="number"
                      placeholder="Min Price"
                      value={searchData.minPrice}
                      onChange={(e) => handleInputChange("minPrice", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 text-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                      aria-label="Minimum price"
                    />
                  </div>

                  <div className="w-full">
                    <div className="flex items-center px-4 py-3 border border-gray-300 rounded-md bg-white">
                      <input
                        type="checkbox"
                        id="downPayment"
                        checked={searchData.downPayment}
                        onChange={(e) => handleInputChange("downPayment", e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 bg-white"
                        aria-label="Down payment option"
                      />
                      <label htmlFor="downPayment" className="ml-2 text-gray-700">
                        Down Payment
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-full">
                  <div className="relative">
                    <select
                      value={searchData.country}
                      onChange={(e) => handleInputChange("country", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                      aria-label="Select country"
                    >
                      <option value="">Select Country</option>
                      <option value="usa">United States</option>
                      <option value="canada">Canada</option>
                      <option value="uk">United Kingdom</option>
                      <option value="australia">Australia</option>
                      <option value="germany">Germany</option>
                      <option value="france">France</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="w-full">
                  <div className="relative">
                    <select
                      value={searchData.propertyType}
                      onChange={(e) => handleInputChange("propertyType", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                      aria-label="Select property type"
                    >
                      <option value="">Property Type</option>
                      <option value="residential">Residential Land</option>
                      <option value="commercial">Commercial Land</option>
                      <option value="agricultural">Agricultural Land</option>
                      <option value="industrial">Industrial Land</option>
                      <option value="recreational">Recreational Land</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="w-full">
                  <input
                    type="number"
                    placeholder="Max Price"
                    value={searchData.maxPrice}
                    onChange={(e) => handleInputChange("maxPrice", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 text-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    aria-label="Maximum price"
                  />
                </div>

                <div className="w-full">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-md transition-colors flex items-center justify-center gap-2"
                    aria-label="Search properties"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>

          <section className="py-16">
            <div className="container mx-auto text-center">
              <div className="flex items-center justify-between">
                <div className="basis-6/12">
                  <h2 className="text-4xl font-bold text-[#1C3988] text-start">Featured Properties</h2>
                  <p className="text-[#545454] text-start mt-2 w-11/12 mb-10">
                    Handpicked premium land listings from around the world
                  </p>
                </div>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProperties?.map((property, index) => (
                  <div key={index} className="card w-full bg-white shadow-lg rounded-lg overflow-hidden relative">
                    <p className="bg text-gray-100 p-2 rounded-xl px-6 top-2 left-2 absolute">{property.property_type}</p>
                    {wishlistIds.includes(property.id) ? (
                      <IoIosHeart
                        className="absolute bg-gray-300 right-2 top-2 text-2xl text-[#1C3988] rounded p-1 cursor-pointer"
                        onClick={() => handleToggleWishlist(property.id)}
                        aria-label={`Remove ${property.title} from wishlist`}
                      />
                    ) : (
                      <IoIosHeartEmpty
                        className="absolute bg-gray-300 right-2 size-8 top-2 text-2xl text-gray-600 rounded p-1 cursor-pointer"
                        onClick={() => handleToggleWishlist(property.id)}
                        aria-label={`Add ${property.title} to wishlist`}
                      />
                    )}
                    <img src={property.image} alt={property.title} className="w-full h-48 object-cover" />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-start text-[#1C3988]">{property.title}</h3>
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
                        {/* <div className="flex items-center gap-1 text-[#8B8B8B]">
                          <Users size={18} className="text-[#1C3988]" />
                          {property?.person === "5/5" ? (
                            <button className="ml-2 px-3 text-xs py-1 text-white bg-[#1C3988] rounded cursor-pointer">
                              Contact by Email
                            </button>
                          ) : (
                            <span>{property?.person}</span>
                          )}
                        </div> */}

                       <div className="flex gap-2">
                         <Users size={18} className="text-[#1C3988]" />
                        {property?.person === "5/5" ? (
                          <button
                            className="ml-2 px-3 text-xs py-1 text-white bg-[#1C3988] rounded cursor-pointer"
                            onClick={() => {
                              setSelectedPropertyId(property.id); // Set the property ID to fetch shareholders
                              setShowShareholderModal(true); // Open the modal
                            }}
                          >
                            Contact by Email
                          </button>
                        ) : (
                          <span>{property?.person}</span>
                        )}
                       </div>
                      </div>
                      <p className="text-[#8B8B8B] text-start pt-2 line-clamp-2">{property?.description}</p>
                      <Link
                        to={`/buyer_dashboard/buyer_feture_details/${property.id}`}
                        className="btn bg-[#1C3988] py-2 text-white text-base font-medium mt-4 w-full"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {showShareholderModal && (
                <div className="fixed inset-0 backdrop-blur  bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-6 max-w-md w-full shadow">
                    <h2 className="text-3xl font-bold mb-4 text-blue-900 ">Shareholder Contacts</h2>
                    {shareholdersLoading ? (
                      <p>Loading shareholders...</p>
                    ) : shareholdersData?.success && shareholdersData?.data?.length > 0 ? (
                      <ul className="space-y-2">
                        {shareholdersData.data.map((shareholder) => (
                          <li key={shareholder.id} className="text-gray-800">
                            <span>{shareholder.buyer_name}: </span>
                            <a
                              href={`mailto:${shareholder.buyer_email}`}
                              className="text-blue-900 hover:underline"
                            >
                              {shareholder.buyer_email}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No shareholders found for this property.</p>
                    )}
                    <button
                      className="mt-4 px-4 py-2 bg-[#1C3988] text-white rounded hover:bg-blue-700/70 cursor-pointer"
                      onClick={() => {
                        setShowShareholderModal(false);
                        setSelectedPropertyId(null); // Reset the property ID
                      }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}