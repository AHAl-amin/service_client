

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
              ? `http://10.10.13.60:2100${property.main_image}`
              : "https://via.placeholder.com/300x200?text=No+Image";

            return (
              <div
                key={item.id}
                className="card w-full bg-white shadow-lg rounded-lg overflow-hidden relative"
              >
                <p className="bg p-2 rounded-xl px-6 top-2 left-2 absolute text-gray-100">Recreational</p>
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
                         
                            <span>{property?.shares_count}/5</span>
                          
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
