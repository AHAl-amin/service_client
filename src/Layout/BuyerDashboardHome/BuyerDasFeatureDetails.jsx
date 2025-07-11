


import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { RiArrowUpBoxLine } from "react-icons/ri";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import scanImag from "../../../public/img/scan.png";
import { useGetAllPropertiesFeaturedListQuery } from "../../redux/features/buyerApi";
import { MdOutlineEmail, MdOutlineLocalPhone } from "react-icons/md";

const BASE_URL = "http://192.168.10.34:1000";

function BuyerDasFeatureDetails() {
  const { id } = useParams();
  const { data: getAllPropertiesFeaturedList, isLoading } = useGetAllPropertiesFeaturedListQuery();

  const [activeTab, setActiveTab] = useState("description");
  const [contactForm, setContactForm] = useState({
    fullName: "",
    email: "",
    country: "",
    phone: "",
    message: "",
  });

  if (isLoading) return <div className="p-10 text-gray-600">Loading...</div>;

  const property = getAllPropertiesFeaturedList?.data?.find(
    (item) => item.id === Number(id)
  );

  if (!property) {
    return <div className="p-10 text-red-500">Property Not Found</div>;
  }

  const thumbnailImages = [
    property.main_image ? `${BASE_URL}${property.main_image}` : "https://via.placeholder.com/400x300?text=No+Image",
    ...property.images.map((img) => `${BASE_URL}${img.image}`),
  ];

  const handleInputChange = (e) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", contactForm);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-8">
      <Link to="/buyer_dashboard" className="bg-[#1C3988] rounded-xl py-3 px-6 text-white">
        Back to Dashboard
      </Link>

      <div className="mx-auto mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left - Images */}
          <div className="space-y-4">
            <img
              src={property.main_image ? `${BASE_URL}${property.main_image}` : "https://via.placeholder.com/400x300?text=No+Image"}
              alt={property.title}
              className="w-full object-cover rounded-lg shadow-lg"
            />
            <div className="grid grid-cols-4 gap-2">
              {thumbnailImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index}`}
                  className="w-full h-20 object-cover rounded hover:opacity-80 transition-opacity"
                />
              ))}
              <div className="backdrop-blur-md bg-gray-500 text-white rounded flex items-center justify-center h-20">
                <span className="text-lg font-bold">10+</span>
              </div>
            </div>
          </div>

          {/* Right - Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl font-bold text-[#1C3988]">{property.title}</h1>
                <p className="border border-[#1C3988] text-[#1C3988] p-2 rounded-2xl text-sm">
                  {property.allow_down_payment ? "Down Payment Available" : "Full Payment Only"}
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
                {property.street_address}, {property.city}, {property.state_province}, {property.country}
              </p>
              <div className="text-2xl font-bold text-[#1C3988] mb-2">${property.price}</div>
              <div className="flex space-x-4 text-sm text-gray-600">
                <span>{property.land_size} sqft</span>
                <span>{property.property_type}</span>
              </div>
            </div>

            <div className="flex space-x-4">
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded">Buy a Share</button>
              <button className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-6 py-2 rounded">Contact Seller</button>
            </div>

            <div>
              <div className="flex justify-around rounded bg-[#E8EBF3] border border-[#1C3988]">
                {["description", "information", "features", "map"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-2 px-4 m-2 rounded-xl text-sm font-medium capitalize transition-colors cursor-pointer ${
                      activeTab === tab ? "bg-[#1C3988] text-white" : "text-gray-500"
                    }`}
                  >
                    {tab === "description" ? "Property Description" : tab === "information" ? "Property Info" : tab === "map" ? "Address Map" : "Features"}
                  </button>
                ))}
              </div>

              <div className="py-4 mt-6 bg-[#E8EBF3] rounded p-3 border border-[#1C3988]">
                {activeTab === "description" && <p className="text-gray-700">{property.description}</p>}
                {activeTab === "information" && (
                  <div className="space-y-1 text-gray-700">
                    <p><strong>Location:</strong> {property.city}, {property.country}</p>
                    <p><strong>Price:</strong> ${property.price}</p>
                    <p><strong>Area:</strong> {property.land_size} sqft</p>
                    <p><strong>Payment:</strong> {property.allow_down_payment ? "Down Payment Available" : "Full Payment"}</p>
                    <p><strong>Lock Period:</strong> {property.lock_period} days</p>
                    <p><strong>Remaining Shares:</strong> {property.remaining_shares}</p>
                  </div>
                )}
                {activeTab === "features" && (
                  <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-[#1C3988] text-sm">
                    {property.features?.map((f) => (
                      <div key={f.id} className="flex gap-2 items-center">
                        <span>✔️</span>
                        <span>{f.name}</span>
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === "map" && (
                  <img src="https://i.ibb.co/7d2fXmCc/image-5.png" alt="Map" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Seller Section */}
        <div className="bg-[#E8EBF3] border-1 border-[#1C3988] rounded-lg shadow-lg p-8">
          <div className="flex justify-between">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mr-4">
                <span className="text-2xl text-gray-600">👤</span>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-[#1C3988]">{property.seller.first_name}</h3>
                <div className="text-gray-600 flex gap-6">
                  <p className="flex gap-3 items-center"><IoLocationOutline />{property.city}, {property.country}</p>
                  <p className="flex gap-3 items-center"><MdOutlineEmail />{property.seller.email}</p>
                  <p className="flex gap-3 items-center"><MdOutlineLocalPhone />{property.seller.contact || "No Contact"}</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text text-center w-full text-xl">Scan with smart</p>
              <div className="flex justify-center items-center">
                <img src={scanImag} className="w-20 h-20" alt="QR Code" />
              </div>
            </div>
          </div>

          <h4 className="text-2xl font-semibold text mb-4">Contact seller</h4>

          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text text-xl mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={contactForm.fullName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-800 focus:ring-[#1C3988] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text text-xl font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={contactForm.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-800 focus:ring-[#1C3988] focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text text-xl font-medium mb-1">Country</label>
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={contactForm.country}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-800 focus:ring-[#1C3988] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text text-xl font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={contactForm.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-800 focus:ring-[#1C3988] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text text-xl font-medium mb-1">Write Your Message Here...</label>
              <textarea
                name="message"
                placeholder="Message"
                value={contactForm.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-800 focus:ring-[#1C3988] focus:border-transparent resize-none"
              />
            </div>

            <div className="flex items-center mb-4">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm text-gray-600">By submitting you agree to our Terms and Conditions</span>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-[#1C3988] hover:bg-[#163070] cursor-pointer text-white px-6 py-2 rounded font-medium transition-colors"
              >
                Send
              </button>
              <Link to={`/buyer_dashboard/buyer_das_profile_view/${property.seller.id}`}>
                <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2 rounded font-medium transition-colors cursor-pointer">
                  View Profile
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BuyerDasFeatureDetails;


