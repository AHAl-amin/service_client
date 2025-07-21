import { MapPin, Users } from "lucide-react";
import { IoIosHeartEmpty } from "react-icons/io";
import { Link } from "react-router-dom";
import { useGetAllPropertiesFeaturedListQuery } from "../../redux/features/buyerApi";
import { useState } from "react";

// Featured Properties Section
export const FeaturedProperties = ({ onExploreClick }) => {
  const { data: getAllPropertiesFeaturedList } = useGetAllPropertiesFeaturedListQuery();
  console.log(getAllPropertiesFeaturedList,"adsffffffffffffff")
  const properties = getAllPropertiesFeaturedList?.data || [];
  const [sortOption, setSortOption] = useState("Featured");

  // Filter featured properties and sort based on selected option
  const filteredProperties = properties
    .filter((property) => property.featured_listing)
    .map((property) => ({
      ...property,
      location: `${property.city}, ${property.state_province}, ${property.country}`,
      area: property.land_size,
      payment: property.allow_down_payment ? "Down Payment Available" : "Full Payment",
      person: property.max_shares || "N/A",
    }))
    .sort((a, b) => {
      switch (sortOption) {
        case "Newest":
          return new Date(b.created_at) - new Date(a.created_at);
        case "Low to high":
          return parseFloat(a.price) - parseFloat(b.price);
        case "High to Low":
          return parseFloat(b.price) - parseFloat(a.price);
        case "Small to Large":
          return parseFloat(a.area || 0) - parseFloat(b.area || 0);
        case "Large to Small":
          return parseFloat(b.area || 0) - parseFloat(a.area || 0);
        default:
          return 0; // Featured (no sorting)
      }
    });

  // Fallback image URL
  const fallbackImage = "https://via.placeholder.com/300x200?text=No+Image+Available";

  return (
    <section className="bg-yellow-50/80 py-16">
      <div className="container mx-auto text-center">
        <div className="flex md:flex-row flex-col md:px-0 px-6 items-center justify-between">
          <div className="basis-6/12">
            <h2 className="text-4xl font-bold text-[#1C3988] text-start">Featured Properties</h2>
            <p className="text-[#545454] text-start mt-2 w-11/12 mb-10">
              Discover our featured properties, carefully selected for their prime locations and exceptional value. Whether for recreation, investment, or building your dream home, these listings offer unique opportunities
            </p>
          </div>

          <div className="basis-6/12 flex items-center justify-end gap-4 md:px-0 px-6">
            <button className="bg-[#1C3988] px-5 py-2 rounded-sm text-white w-[180px]">
              View All Properties
            </button>
            <button
              onClick={onExploreClick}
              className="bg-[#fff] border text-[#1C3988] border-gray-300 px-5 py-2 w-[140px] flex rounded-sm items-center gap-[2px] text-center cursor-pointer"
            >
              <MapPin size={16} />
              View Map
            </button>
            <select
              className="select rounded-sm w-[150px] text-[#1C3988] text-base bg-[#fff]"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="Featured">Featured</option>
              <option value="Newest">Newest</option>
              <option value="Low to high">Low to high</option>
              <option value="High to Low">High to Low</option>
              <option value="Small to Large">Small to Large</option>
              <option value="Large to Small">Large to Small</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:px-0 mt-4 px-6 gap-6">
          {filteredProperties.map((property) => (
            <div key={property.id} className="card w-full bg-white shadow-lg rounded-lg overflow-hidden relative">
              <IoIosHeartEmpty className="absolute right-2 top-2 text-2xl bg-gray-300 rounded" />
              <img
                src={property.main_image ? `http://10.10.13.60:2100${property.main_image}` : fallbackImage}
                alt={property.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-start text-[#1C3988]">{property.title}</h3>
                <p className="flex items-center gap-1 text-start text-gray-500">
                  <MapPin size={16} />
                  <span>{property.location}</span>
                </p>
                <p className="text-gray-600 mt-2">
                  <h1 className="text-lg flex items-center justify-between font-bold text-start text-[#1C3988]">
                    ${parseFloat(property.price).toLocaleString()}
                    <span className="text-[#8D8D8D] font-medium">{property.area}</span>
                  </h1>
                </p>
                <div className="flex items-center justify-between my-3">
                  <button className="px-5 py-[5px] rounded-full border-[1.5px] cursor-pointer border-[#1C3988] text-[#1C3988]">
                    {property.payment}
                  </button>
                  <div className="flex items-center gap-1 text-[#8B8B8B]">
                    <Users size={18} className="text-[#1C3988]" />
                    {property.person}
                  </div>
                </div>
                <p className="text-[#8B8B8B] text-start pt-2">{property.description}</p>
                <Link
                  to={`/dettails/${property.id}`}
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
  );
};