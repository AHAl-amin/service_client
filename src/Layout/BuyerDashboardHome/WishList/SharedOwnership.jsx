




import { MapPin, Users } from "lucide-react";

import { Link } from "react-router-dom";
import { useGetShareOwnershipQuery } from "../../../redux/features/buyerApi";

export default function SharedOwnership() {
  const { data: getShareOwnership, isLoading, isError } = useGetShareOwnershipQuery();
  const OwnerShipData = getShareOwnership?.data || [];

  return (
    <div className="">
      <section className="py-16">
        <div className="container mx-auto text-center">
          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center h-64">
              <p className="text-xl text-gray-600">Loading...</p>
            </div>
          )}

          {/* Error State */}
          {isError && (
            <div className="flex justify-center items-center h-64">
              <p className="text-xl text-red-600">Error loading data. Please try again later.</p>
            </div>
          )}

          {/* No Data Found */}
          {!isLoading && !isError && OwnerShipData.length === 0 && (
            <div className="flex justify-center items-center h-64">
              <p className="text-xl text-gray-600">No Data Found</p>
            </div>
          )}

          {/* Data Display */}
          {!isLoading && !isError && OwnerShipData.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {OwnerShipData.map((property, index) => {
                const { property_details } = property;
                const location = `${property_details.city}, ${property_details.state_province}, ${property_details.country}`;
                const payment = property_details.allow_down_payment
                  ? `Down Payment: ${property_details.down_payment_percentage}%`
                  : "Full Payment";
                const person = `${property_details.shares_count}/${property_details.max_shares} Shares Taken`;

                return (
                  <div
                    key={index}
                    className="card w-full bg-white shadow-lg rounded-lg overflow-hidden relative"
                  >
                    <p className="bg-[#1C3988] p-2 rounded-xl px-6 top-2 left-2 absolute text-gray-100">
                      {property_details.property_type.charAt(0).toUpperCase() +
                        property_details.property_type.slice(1)}
                    </p>
                 
                    <img
                      src={
                        property_details.main_image
                          ? `https://yoursafeland.duckdns.org${property_details.main_image}`
                          : "https://via.placeholder.com/300x200?text=No+Image"
                      }
                      alt={property_details.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-start text-[#1C3988]">
                        {property_details.title}
                      </h3>
                      <p className="flex items-center gap-1 text-start text-gray-500">
                        <MapPin size={16} />
                        <span>{location}</span>
                      </p>
                      <p className="text-gray-600 mt-2">
                        <h1 className="text-lg flex items-center justify-between font-bold text-start text-[#1C3988]">
                          ${parseFloat(property_details.price).toLocaleString()}
                          <span className="text-[#8D8D8D] font-medium">{property_details.land_size}</span>
                        </h1>
                      </p>

                      <div className="flex items-center justify-between my-3">
                        <button className="px-5 py-[5px] rounded-full border-[1.5px] cursor-pointer border-[#1C3988] text-[#1C3988]">
                          {payment}
                        </button>
                        <div className="flex items-center gap-1 text-[#8B8B8B]">
                          <Users size={18} className="text-[#1C3988]" />
                          {person}
                        </div>
                      </div>

                      <p className="text-[#8B8B8B] text-start pt-2">{property_details.description}</p>

                      <Link
                        to={`/buyer_dashboard/buyer_feture_details/${property_details.id}`}
                        className="btn bg-[#1C3988] py-2 text-white text-base font-medium mt-4 w-full block text-center rounded"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}