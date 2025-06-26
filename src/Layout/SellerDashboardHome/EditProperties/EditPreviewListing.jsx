import { useState } from "react";
import { Link } from "react-router-dom";
import { RiArrowUpBoxLine } from "react-icons/ri";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";


// 👇 Demo JSON property data
const sampleProperty = {
    id: 1,
    title: "Luxury Mountain Villa",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    location: "Aspen, Colorado, USA",
    price: "$2,450,000",
    description:
        "This luxury mountain villa offers breathtaking views, modern design, and the ultimate privacy. Perfect for a vacation retreat or permanent residence.",
    area: "8,000 sqft",
    payment: "Bank Transfer, Crypto",
    person: "5/5",
};

function EditPreviewListing({ onNext, onBack }) {
    const [activeTab, setActiveTab] = useState("description");


    const property = sampleProperty;
    const thumbnailImages = [property.image, property.image, property.image];




    //   owner part

    const [reviewData, setReviewData] = useState({
        groupOwnership: {
            enabled: true,
            buyShareOption: true,
        },
        boostOptions: {
            dailyBoost: true,
            weeklyBoost: false,
        },
    })

    const handleGroupOwnershipChange = () => {
        setReviewData((prev) => ({
            ...prev,
            groupOwnership: {
                ...prev.groupOwnership,
                buyShareOption: !prev.groupOwnership.buyShareOption,
            },
        }))
    }

    const handleBoostOptionChange = (option) => {
        setReviewData((prev) => ({
            ...prev,
            boostOptions: {
                ...prev.boostOptions,
                [option]: !prev.boostOptions[option],
            },
        }))
    }


    return (
        <div className=" bg-gray-50 py-10 rounded-xl px-8">

            <div className="mx-auto mt-8">
                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Left */}
                    <div className="space-y-4">
                        <img src={property.image} alt={property.title} className="w-full rounded-lg shadow-lg" />
                        <div className="grid grid-cols-4 gap-2">
                            {thumbnailImages.map((img, idx) => (
                                <img key={idx} src={img} alt="" className="h-20 w-full object-cover rounded" />
                            ))}
                            <div className="h-20 flex justify-center items-center bg-gray-500 text-white rounded">+10</div>
                        </div>
                    </div>

                    {/* Right */}
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center justify-between">
                                <h1 className="text-3xl font-bold text-gray-800">{property.title}</h1>

                            </div>
                            <p className="flex items-center gap-2 text-gray-600 mt-2">
                                <IoLocationOutline /> {property.location}
                            </p>
                            <p className="text-3xl font-bold text-[#1C3988] mt-2">{property.price}</p>
                            <div className="flex space-x-4 text-sm text-gray-600 mt-4">
                                <span className="bg-[#B9C2DA] border border-[#1C3988] p-2 rounded-xl">424.03 Acres</span>
                                <span className="bg-[#B9C2DA] border border-[#1C3988] p-2 rounded-xl">Land</span>
                                <span className="bg-[#B9C2DA] border border-[#1C3988] p-2 rounded-xl">Down Payment Available </span>
                            </div>
                        </div>

                        <div className="hr p-[1px] bg-gray-400"></div>
                        {/* Tabs */}
                        <div>
                            <div className="flex justify-around rounded bg-[#E8EBF3] border border-[#1C3988]">
                                {["description", "information", "map"].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`py-2 px-4 m-2 rounded-xl text-sm font-medium capitalize cursor-pointer ${activeTab === tab ? "bg-[#1C3988] text-white" : "text-gray-600"
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

                            {/* Tab Content */}
                            <div className="mt-6 bg-[#E8EBF3] rounded p-4 border border-[#1C3988]">
                                {activeTab === "description" && <p className="text-gray-800">{property.description}</p>}

                                {activeTab === "information" && (
                                    <ul className="space-y-1 text-gray-800">
                                        <li><strong>Location:</strong> {property.location}</li>
                                        <li><strong>Price:</strong> {property.price}</li>
                                        <li><strong>Area:</strong> {property.area}</li>
                                        <li><strong>Payment:</strong> {property.payment}</li>
                                        <li><strong>Rating:</strong> {property.person}</li>
                                    </ul>
                                )}

                                {activeTab === "features" && (
                                    <div className="grid grid-cols-2 gap-3 text-[#1C3988] text-sm">
                                        {["Pool", "Garage", "Mountain View", "Private Driveway", "Smart Security", "Furnished"].map((f, i) => (
                                            <div key={i} className="flex gap-2 items-center">✔️ {f}</div>
                                        ))}
                                    </div>
                                )}

                                {activeTab === "map" && (
                                    <img src="https://i.ibb.co/7d2fXmCc/image-5.png" alt="Map" className="rounded" />
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Seller Section */}
                
                    <div className=" space-y-10">
                        {/* Group Ownership Option */}
                        <div className=" bg-[#E8EBF3]  border border-[#1C3988] rounded-2xl p-8">
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text mb-2">Group Ownership Option</h2>
                                <p className="text-gray-600 text-sm">Allow buyers to purchase shares of your property.</p>
                            </div>

                            {/* Enable Buy a Share Option */}
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

                            {/* Premium Plan Required Warning */}
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

                        {/* Boost Your Listing */}
                        <div className=" border border-[#1C3988] bg-[#E8EBF3] rounded-2xl p-6   ">
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text mb-2">Boost your listing</h2>
                                <p className="text-gray-600 text-sm">Increase Visibility and engagement</p>
                            </div>

                            <div className="flex gap-10">
                                {/* Daily Boost */}
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            checked={reviewData.boostOptions.dailyBoost}
                                            onChange={() => handleBoostOptionChange("dailyBoost")}
                                            className="w-5 h-5 text-blue-600 border-2 border-blue-300 rounded focus:ring-blue-500 focus:ring-2"
                                        />
                                     
                                    </div>
                                    <span className="text-sm font-medium text">Daily Boost ($20/days)</span>
                                </label>

                                {/* Weekly Boost */}
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

                        {/* Navigation Buttons */}
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

                            <button
                                type="button"
                                onClick={onNext}
                                className="px-8 py-3 bg text-white font-medium rounded-lg  focus:outline-none focus:ring-2 cursor-pointer focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm"
                            >
                                Listing Property
                            </button>
                        </div>
                    </div>
                
            </div>
        </div>
    );
}

export default EditPreviewListing;
