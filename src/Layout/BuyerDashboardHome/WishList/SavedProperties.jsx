// "use client"

// import { MapPin, Users } from "lucide-react";
// import { useState } from "react"
// import { FaHeart } from "react-icons/fa6";
// import { IoIosHeartEmpty } from "react-icons/io";
// import { Link } from "react-router-dom";


// export default function SavedProperties() {

 
//   // JSON data embedded in the component
//   const properties = [
//     {
//       id: 1,
//       title: "Mountain View Ranch",
//       price: "$250,000",
//       area: "25 Acres",
//       location: "Colorado, USA",
//       description: "A serene ranch with beautiful mountain views, perfect for farming or a vacation home.",
//       person: "4/5",
//       payment: "Bank Transfer, Cash",
//       image: "https://cdn.pixabay.com/photo/2024/12/28/03/39/field-9295186_640.jpg",
//     },
//     {
//       id: 2,
//       title: "Oceanfront Paradise",
//       price: "$650,000",
//       area: "25 Acres",
//       location: "Malibu, California",
//       description: "Luxurious oceanfront property with private beach access and panoramic views.",
//       person: "2/5",
//       payment: "Mortgage, Bank Transfer",
//       image: "https://cdn.pixabay.com/photo/2024/12/28/03/39/field-9295186_640.jpg",
//     },
//     {
//       id: 3,
//       title: "Oceanfront Paradise",
//       price: "$650,000",
//       area: "25 Acres",
//       location: "Malibu, California",
//       description: "Identical listing with modern amenities and direct ocean access.",
//       person: "3/5",
//       payment: "Down Payment Available",
//       image: "https://cdn.pixabay.com/photo/2024/12/28/03/39/field-9295186_640.jpg",
//     },
//     {
//       id: 4,
//       title: "Mountain View Ranch",
//       price: "$250,000",
//       area: "25 Acres",
//       location: "Colorado, USA",
//       description: "Duplicate ranch listing ideal for eco-resorts or agricultural use.",
//       person: "1/5",
//       payment: "Bank Transfer, Cash",
//       image: "https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297_640.jpg",
//     },
//     {
//       id: 5,
//       title: "Oceanfront Paradise",
//       price: "$650,000",
//       area: "25 Acres",
//       location: "Malibu, California",
//       description: "A peaceful ocean getaway with palm trees and breeze.",
//       person: "2/5",
//       payment: "Down Payment Available",
//       image: "https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297_640.jpg",
//     },
//     {
//       id: 6,
//       title: "Oceanfront Paradise",
//       price: "$650,000",
//       area: "25 Acres",
//       location: "Malibu, California",
//       description: "Prime location property for residential or investment purposes.",
//       person: "4/5",
//       payment: "Down Payment Available",
//       image: "https://cdn.pixabay.com/photo/2022/04/15/07/58/sunset-7133867_640.jpg",
//     },
//   ];






//   return (
//     <div className="">
//         <section className="">
//             <div className=" mx-auto text-center">
             
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                 {properties.map((property, index) => (
//                   <div key={index} className="card w-full bg-white shadow-lg rounded-lg overflow-hidden relative">
//                      <p className="bg p-2 rounded-xl px-6 top-2 left-2 absolute">Recreational</p>
//                     <FaHeart  className="absolute right-2 top-2 text-2xl text bg-gray-300 p-1 size-8 rounded " />
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
//                         <button className=" px-5 py-[5px] rounded-full border-[1.5px] cursor-pointer border-[#1C3988] text-[#1C3988]">{property?.payment}</button>

//                         <div className="flex items-center gap-1 text-[#8B8B8B]">
//                           <Users size={18} className="text-[#1C3988]" />
//                           {property?.person}
//                         </div>
//                       </div>

//                       <p className="text-[#8B8B8B] text-start pt-2">{property?.description}</p>

//                       <Link to={`/buyer_dashboard/buyer_feture_details/${property.id}`} className="btn bg-[#1C3988] py-2 text-white text-base font-medium mt-4 w-full">View Details</Link>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//             </div>
//           </section>
//     </div>
//   )
// }

"use client";

import { MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa6";
import { useGetWishlistPropertiesQuery } from "../../../redux/features/buyerApi";

export default function SavedProperties() {
  const { data, isLoading, error } = useGetWishlistPropertiesQuery();

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Failed to load wishlist.</p>;

  const wishlist = data?.data || [];

  return (
    <div className="p-4">
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlist.map((item) => {
            const property = item.property_details;
            const imageUrl = property.main_image
              ? `http://192.168.10.34:1000${property.main_image}`
              : "https://via.placeholder.com/300x200?text=No+Image";

            return (
              <div
                key={item.id}
                className="card w-full bg-white shadow-lg rounded-lg overflow-hidden relative"
              >
                <p className="bg p-2 rounded-xl px-6 top-2 left-2 absolute">Recreational</p>
                <FaHeart className="absolute right-2 top-2 text-[#1C3988]  p-1 size-8 rounded bg-gray-200" />
                <img
                  src={imageUrl}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-start text-[#1C3988]">
                    {property.title}
                  </h3>
                  <p className="flex items-center gap-1 text-start text-gray-500">
                    <MapPin size={16} />
                    <span>{property.city}, {property.country}</span>
                  </p>
                  <div className="text-gray-600 mt-2">
                    <div className="text-lg flex items-center justify-between font-bold text-start text-[#1C3988]">
                      ${property.price}
                      <span className="text-[#8D8D8D] font-medium">{property.land_size} sqft</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between my-3">
                    <button className="px-5 py-[5px] rounded-full border-[1.5px] cursor-pointer border-[#1C3988] text-[#1C3988]">
                      {property.allow_down_payment ? "Down Payment Available" : "Full Payment"}
                    </button>

                    <div className="flex items-center gap-1 text-[#8B8B8B]">
                      <Users size={18} className="text-[#1C3988]" />
                      {property.max_shares}/5
                    </div>
                  </div>

                  <p className="text-[#8B8B8B] text-start pt-2">
                    {property.description.slice(0, 100)}...
                  </p>

                  <Link
                    to={`/buyer_dashboard/buyer_feture_details/${property.id}`}
                    className="btn bg-[#1C3988] py-2 text-white text-base font-medium mt-4 w-full"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
