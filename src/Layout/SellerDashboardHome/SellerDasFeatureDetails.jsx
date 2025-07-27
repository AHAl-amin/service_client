


import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { RiArrowUpBoxLine } from "react-icons/ri";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { useGetAllPropertiesListQuery } from "../../redux/features/sellerApi";

const BASE_URL = "https://yoursafeland.duckdns.org"; // Corrected typo in BASE_URL

function SellerDasFeatureDetails() {
  const { id } = useParams();
  const { data: getAllPropertiesList, isLoading } = useGetAllPropertiesListQuery();
  console.log(getAllPropertiesList, "aaaaaaaaaaaaaaaaaaaaaa");

  const [activeTab, setActiveTab] = useState("description");
  const [mainImage, setMainImage] = useState(""); // State to track the selected main image

  if (isLoading) return <div className="p-10 text-gray-600">Loading...</div>;

  const property = getAllPropertiesList?.find(
    (item) => item.id == id // Using loose comparison to handle potential type differences
  );

  if (!property) {
    return <div className="p-10 text-red-500">Property Not Found</div>;
  }

  // Map thumbnail images from property.images array
  const thumbnailImages = property.images
    ? property.images.map((img) => `${BASE_URL}${img.image}`)
    : [];

  // Handle thumbnail click to update main image
  const handleImageClick = (image) => {
    setMainImage(image);
  };

  // Default main image fallback
  const displayedImage = mainImage || `${BASE_URL}${property.main_image}`;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-8">
      <Link
        to="/seller_dashboard"
        className="bg-[#1C3988] rounded-xl py-3 px-6 text-white"
      >
        Back to Dashboard
      </Link>

      <div className="mx-auto mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left - Images */}
          <div className="space-y-4">
            <img
              src={displayedImage} // Use mainImage state for dynamic display
              alt={property.title}
              className="w-full h-[500px] object-cover rounded-lg shadow-lg"
            />
            <div className="grid grid-cols-4 gap-2">
              {thumbnailImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  onClick={() => handleImageClick(img)} // Set image on click
                  className="w-full h-20 object-cover rounded hover:opacity-80 transition-opacity cursor-pointer"
                  alt={`Thumbnail ${index + 1}`}
                />
              ))}
              {thumbnailImages.length > 4 && (
                <div className="backdrop-blur-md bg-gray-500 text-white rounded flex items-center justify-center h-20">
                  <span className="text-lg font-bold">
                    {thumbnailImages.length - 4}+ {/* Show remaining images */}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right - Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl font-bold text-[#1C3988]">
                  {property.title}
                </h1>
                <p className="border border-[#1C3988] text-[#1C3988] p-2 rounded-2xl text-sm">
                  {property.allow_down_payment
                    ? "Down Payment Available"
                    : "Full Payment Only"}
                </p>
                <div className="flex gap-2">
                  <button className="p-2 border bg-gray-300 rounded text-2xl">
                    <IoIosHeartEmpty className="text-[#1C3988]" />
                  </button>
                  <button className="p-2 border bg-gray-300 rounded text-2xl">
                    <RiArrowUpBoxLine className="text-[#1C3988]" />
                  </button>
                </div>
              </div>
              <p className="text-gray-600 flex items-center gap-2 mb-2">
                <IoLocationOutline />
                {property.street_address}, {property.city}, {property.country},{" "}
                {property.state_province}
              </p>
              <div className="text-2xl font-bold text-[#1C3988] mb-2">
                ${Number(property.price).toLocaleString()}
              </div>
              <div className="flex space-x-4 text-sm text-gray-600">
                <span>{property.land_size} sqft</span>
                <span>{property.property_type}</span>
              </div>
            </div>

            <div>
              <div className="flex justify-around rounded bg-[#E8EBF3] border border-[#1C3988]">
                {["description", "information", "features", "map"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-2 px-4 m-2 rounded-xl text-sm font-medium capitalize transition-colors cursor-pointer ${
                      activeTab === tab
                        ? "bg-[#1C3988] text-white"
                        : "text-gray-500"
                    }`}
                  >
                    {tab === "description"
                      ? "Property Description"
                      : tab === "information"
                      ? "Property Info"
                      : tab === "map"
                      ? "Address Map"
                      : "Features"}
                  </button>
                ))}
              </div>

              <div className="py-4 mt-6 bg-[#E8EBF3] rounded p-3 border border-[#1C3988]">
                {activeTab === "description" && (
                  <p className="text-gray-700">{property.description}</p>
                )}

                {activeTab === "information" && (
                  <div className="space-y-1 text-gray-700">
                    <p>
                      <strong>Location:</strong> {property.city},{" "}
                      {property.country}
                    </p>
                    <p>
                      <strong>Price:</strong> $
                      {Number(property.price).toLocaleString()}
                    </p>
                    <p>
                      <strong>Area:</strong> {property.land_size} sqft
                    </p>
                    <p>
                      <strong>Payment:</strong>{" "}
                      {property.allow_down_payment
                        ? "Down Payment Available"
                        : "Full Payment"}
                    </p>
                    <p>
                      <strong>Lock Period:</strong> {property.lock_period} days
                    </p>
                    <p>
                      <strong>Remaining Shares:</strong>{" "}
                      {property.remaining_shares}
                    </p>
                  </div>
                )}

                {activeTab === "features" && (
                  <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-[#1C3988] text-sm">
                    {property.features?.length > 0 ? (
                      property.features.map((f) => (
                        <div key={f.id} className="flex gap-2 items-center">
                          <span>✔️</span>
                          <span>{f.name}</span>
                        </div>
                      ))
                    ) : (
                      <p>No features available.</p>
                    )}
                  </div>
                )}

                {activeTab === "map" && (
                  <img src="https://i.ibb.co/7d2fXmCc/image-5.png" alt="Map" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerDasFeatureDetails;
