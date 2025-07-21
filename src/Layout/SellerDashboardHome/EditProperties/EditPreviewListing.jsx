import { useState, useEffect } from "react";
import { IoLocationOutline } from "react-icons/io5";
import toast from "react-hot-toast";

export default function EditPreviewListing({ onNext, onBack, propertyData, updatePropertyData, onSave }) {
  const [activeTab, setActiveTab] = useState("description");
  const [reviewData, setReviewData] = useState({
    groupOwnership: {
      enabled: true,
      buyShareOption: false,
    },
    boostOptions: {
      dailyBoost: false,
      weeklyBoost: false,
    },
  });

  useEffect(() => {
    if (propertyData) {
      setReviewData({
        groupOwnership: {
          enabled: true,
          buyShareOption: propertyData.buy_share || false,
        },
        boostOptions: {
          dailyBoost: propertyData.dailyBoost || false,
          weeklyBoost: propertyData.weeklyBoost || false,
        },
      });
    }
  }, [propertyData]);

  const handleGroupOwnershipChange = () => {
    setReviewData((prev) => {
      const updatedReviewData = {
        ...prev,
        groupOwnership: {
          ...prev.groupOwnership,
          buyShareOption: !prev.groupOwnership.buyShareOption,
        },
      };
      updatePropertyData({
        ...propertyData,
        buy_share: updatedReviewData.groupOwnership.buyShareOption,
      });
      return updatedReviewData;
    });
  };

  const handleBoostOptionChange = (option) => {
    setReviewData((prev) => {
      const updatedBoostOptions = {
        ...prev.boostOptions,
        [option]: !prev.boostOptions[option],
      };
      updatePropertyData({
        ...propertyData,
        ...updatedBoostOptions,
      });
      return {
        ...prev,
        boostOptions: updatedBoostOptions,
      };
    });
  };

  const handleUpdate = () => {
    onSave(propertyData);
    // toast.success("Listing updated successfully!");
  };

  if (!propertyData) {
    return <div>Loading property data...</div>;
  }

  const thumbnailImages = propertyData.images?.slice(0, 3).map((img) => img.image) || [];

  return (
    <div className="bg-gray-50 py-10 rounded-xl px-8">
      <div className="mx-auto mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <img
              src={propertyData.main_image || "https://via.placeholder.com/400x300?text=No+Image"}
              alt={propertyData.title}
              className=" w-full md:h-[70%]  rounded-lg shadow-lg"
            />
            <div className="grid grid-cols-4 gap-2">
              {thumbnailImages.map((img, idx) => (
                <img key={idx} src={img} alt={`Thumbnail ${idx + 1}`} className="h-20 w-full object-cover rounded" />
              ))}
              {propertyData.images?.length > 3 && (
                <div className="h-20 flex justify-center items-center bg-gray-500 text-white rounded">
                  +{propertyData.images.length - 3}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-800">{propertyData.title}</h1>
              </div>
              <p className="flex items-center gap-2 text-gray-600 mt-2">
                <IoLocationOutline /> {`${propertyData.city}, ${propertyData.state_province}, ${propertyData.country}`}
              </p>
              <p className="text-3xl font-bold text-[#1C3988] mt-2">${Number(propertyData.price).toLocaleString()}</p>
              <div className="flex space-x-4 text-sm text-gray-600 mt-4">
                <span className="bg-[#B9C2DA] border border-[#1C3988] p-2 rounded-xl">{propertyData.land_size} sq ft</span>
                <span className="bg-[#B9C2DA] border border-[#1C3988] p-2 rounded-xl">{propertyData.property_type}</span>
                <span className="bg-[#B9C2DA] border border-[#1C3988] p-2 rounded-xl">
                  {propertyData.allow_down_payment ? "Down Payment Available" : "Full Payment Only"}
                </span>
              </div>
            </div>

            <div className="hr p-[1px] bg-gray-400"></div>
            <div>
              <div className="flex justify-around rounded bg-[#E8EBF3] border border-[#1C3988]">
                {["description", "information", "map"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-2 px-4 m-2 rounded-xl text-sm font-medium capitalize cursor-pointer ${
                      activeTab === tab ? "bg-[#1C3988] text-white" : "text-gray-600"
                    }`}
                  >
                    {tab === "description"
                      ? "Property Description"
                      : tab === "information"
                      ? "Basic Details"
                      : "Map"}
                  </button>
                ))}
              </div>

              <div className="mt-6 bg-[#E8EBF3] rounded p-4 border border-[#1C3988]">
                {activeTab === "description" && <p className="text-gray-800">{propertyData.description}</p>}
                {activeTab === "information" && (
                  <ul className="space-y-1 text-gray-800">
                    <li><strong>Location:</strong> {`${propertyData.city}, ${propertyData.state_province}, ${propertyData.country}`}</li>
                    <li><strong>Price:</strong> ${Number(propertyData.price).toLocaleString()}</li>
                    <li><strong>Area:</strong> {propertyData.land_size} sq ft</li>
                    <li><strong>Payment:</strong> {propertyData.allow_down_payment ? "Down Payment Available" : "Full Payment Only"}</li>
                    <li><strong>Shares:</strong> {propertyData.remaining_shares}/{propertyData.max_shares}</li>
                  </ul>
                )}
                {activeTab === "map" && (
                  <img src="https://i.ibb.co/7d2fXmCc/image-5.png" alt="Map" className="rounded" />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-10">
          <div className="bg-[#E8EBF3] border border-[#1C3988] rounded-2xl p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text mb-2">Group Ownership Option</h2>
              <p className="text-gray-600 text-sm">Allow buyers to purchase shares of your property.</p>
            </div>
            <div className="mb-6">
              <label className="flex items-center space-x-3 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={reviewData.groupOwnership.buyShareOption}
                    onChange={handleGroupOwnershipChange}
                    className="w-5 h-5 text-blue-600 border-2 border-blue-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                </div>
                <span className="text-sm font-medium text">Enable "Buy a Share" option</span>
              </label>
            </div>
            <div className="bg-orange-100 border border-orange-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <svg className="w-10 h-10 text-orange-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-orange-400 mb-1">Premium Plan Required</h3>
                  <p className="text-sm text-orange-400">
                    The "Buy a Share" feature is only available for Premium and Annual Premium sellers. This enables group
                    chat access once 5 interested buyers are found.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-[#1C3988] bg-[#E8EBF3] rounded-2xl p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text mb-2">Boost your listing</h2>
              <p className="text-gray-600 text-sm">Increase visibility and engagement</p>
            </div>
            <div className="flex gap-10">
              <label className="flex items-center space-x-3 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={reviewData.boostOptions.dailyBoost}
                    onChange={() => handleBoostOptionChange("dailyBoost")}
                    className="w-5 h-5 text-blue-600 border-2 border-blue-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                </div>
                <span className="text-sm font-medium text">Daily Boost ($20/day)</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={reviewData.boostOptions.weeklyBoost}
                    onChange={() => handleBoostOptionChange("weeklyBoost")}
                    className="w-5 h-5 text-blue-600 border-2 border-blue-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                </div>
                <span className="text-sm font-medium text">Weekly Boost ($100/week)</span>
              </label>
            </div>
          </div>

          <div className="flex justify-between items-center pt-6">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Edit
            </button>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleUpdate}
                className="px-8 py-3 bg-[#1C3988] text-white font-medium rounded-lg focus:outline-none focus:ring-2 cursor-pointer focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm"
              >
                Update Listing
              </button>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}




