

import { Mails, MapPin, NotebookPen, ShoppingBag, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaArrowLeftLong } from "react-icons/fa6";
import { GrLocation } from "react-icons/gr";
import { IoIosHeartEmpty } from "react-icons/io";
import { MdOutlineMail, MdOutlinePhone } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function ViewProfice() {
    const { sellerId } = useParams();
    const navigate = useNavigate();
    const [sellerData, setSellerData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Base URL for images
    const baseImageUrl = "https://yoursafeland.duckdns.org";
    const fallbackImage = "https://via.placeholder.com/300x200?text=No+Image+Available";

    // Fetch seller profile and properties
    useEffect(() => {
        const fetchSellerProfile = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`https://yoursafeland.duckdns.org/api/accounts/seller/${sellerId}/detail/`);
                if (!response.ok) {
                    throw new Error("Failed to fetch seller profile");
                }
                const data = await response.json();
                setSellerData(data.data);
                setIsLoading(false);
                console.log("Seller Data:", data.data);
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        };

        if (sellerId) {
            fetchSellerProfile();
        }
    }, [sellerId]);

    if (isLoading) {
        return <div className="p-10 text-gray-600">Loading...</div>;
    }

    if (error) {
        return <div className="p-10 text-red-500">Error: {error}</div>;
    }

    if (!sellerData) {
        return <div className="p-10 text-red-500">Seller Not Found</div>;
    }

    const properties = sellerData.properties || [];
    console.log(properties, "Properties Data");

    return (
        <div className="min-h-screen bg-yellow-50/90">
            {/* Hero Section */}
            <div
                className="relative h-130 bg-cover bg-center"
                style={{
                    backgroundImage: "url('https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297_640.jpg')",
                }}
            >
                <div className="absolute inset-0 bg-opacity-40"></div>
                <div className="relative z-10 flex items-center justify-center h-full">
                    <div className="text-center text-white">
                        <h1 className="text-4xl font-bold mb-2">Premium Property Listings</h1>
                        <p className="text-lg">Find your perfect land investment opportunity</p>
                    </div>
                </div>
            </div>

            <div className="mx-auto md:max-w-[80%] ">
                <div className="mx-auto p-6 md:px-30">
                    <div className="rounded-lg p-6 sticky top-6 flex justify-between">
                        {/* Seller Info */}
                        <div className="w-[400px]">
                            <div className="text-center mb-6">
                                <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                                    <svg
                                        className="w-10 h-10 text-gray-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-5xl text-[#1C3988]">{sellerData.full_name}</h3>

                            </div>

                            <div className="space-y-4 flex flex-col justify-center items-center">
                                <div className="w-full ml-24 space-y-4">
                                    <div className="flex items-center text-xl text-gray-600">
                                        <MdOutlinePhone className="mr-2" />
                                        {sellerData.phone || "No Contact"}
                                    </div>
                                    <div className="flex items-center text-xl text-gray-600">
                                        <MdOutlineMail className="mr-2 text-xl" />
                                        {sellerData.email}
                                    </div>
                                    <div className="flex items-center text-xl text-gray-600">
                                        <GrLocation className="mr-2 text-xl" />
                                        {sellerData.city}, {sellerData.country}
                                    </div>
                                </div>
                            </div>
                            <button className="w-full mt-6 bg-[#1C3988] cursor-pointer text-white font-medium py-2 px-4 rounded-md transition-colors">
                                Contact Agent
                            </button>
                        </div>

                        {/* Stats and About Section */}
                        <div className="  p-6 rounded-lg mt-6 md:w-140">
                            <div className="flex gap-4 mb-6">
                                <div className="text-center bg-white rounded space-y-2 p-6 shadow">
                                    <NotebookPen className="size-10 mx-auto text-[#1C3988]" />
                                    <p className="text-2xl font-bold">{sellerData.active_properties_count}</p>
                                    <p className="text-gray-600">Active Listings</p>
                                </div>
                                <div className="text-center bg-white rounded space-y-2 p-6 shadow">
                                    <ShoppingBag className="size-10 mx-auto text-[#1C3988]" />
                                    <p className="text-2xl font-bold">{sellerData.properties_sold || "N/A"}</p>
                                    <p className="text-gray-600">Properties Sold</p>
                                </div>

                            </div>

                            <div className="bg-gray-50 p-8 rounded-lg shadow">
                                <h1 className="font-bold text-2xl mb-4 text-[#1C3988]">About our Company</h1>
                                <p className="text-gray-700 leading-relaxed">
                                    {sellerData.business_description || "No description available."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Property Cards Grid */}
                <div className="mx-auto p-6 md:px-30">
                    <div className="grid lg:grid-cols-4 gap-6">
                        <div className="lg:col-span-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {properties?.map((property) => (
                                    <div key={property.id} className="card w-full bg-white shadow-lg rounded-lg overflow-hidden relative">
                                        <p className="bg-[#1C3988] p-2 rounded-xl px-6 top-2 left-2 absolute text-white">{property?.property_type}</p>
                                        <IoIosHeartEmpty className="absolute right-2 top-2 text-2xl bg-gray-300 rounded" />
                                        <img
                                            src={property?.main_image ? `${baseImageUrl}${property?.main_image}` : fallbackImage}
                                            alt={property.title}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="p-6">
                                            <h3 className="text-xl font-semibold text-start text-[#1C3988]">{property.title}</h3>
                                            <p className="flex items-center gap-1 text-start text-gray-500">
                                                <MapPin size={16} />
                                                <span>{property.city}, {property.state_province}, {property.country}</span>
                                            </p>
                                            <p className="text-gray-600 mt-2">
                                                <h1 className="text-lg flex items-center justify-between font-bold text-start text-[#1C3988]">
                                                    ${parseFloat(property.price).toLocaleString()}
                                                    <span className="text-[#8D8D8D] font-medium">{property.land_size} </span>
                                                </h1>
                                            </p>
                                            <div className="flex items-center justify-between my-3">
                                                <button className="px-5 py-[5px] rounded-full border-[1.5px] cursor-pointer border-[#1C3988] text-[#1C3988]">
                                                    {property.allow_down_payment ? "Down Payment Available" : "Full Payment"}
                                                </button>
                                                <div className="flex items-center gap-1 text-[#8B8B8B]">
                                                    <Users size={18} className="text-[#1C3988]" />
                                                    {property.shares_count}/{property.max_shares}
                                                </div>
                                            </div>
                                            <p className="text-[#8B8B8B] text-start pt-2 line-clamp-2">{property.description}</p>
                                            <Link
                                                to={`/dettails/${property.id}`}
                                                state={{ property }}
                                                className="btn bg-[#1C3988] py-2 text-white text-base font-medium mt-4 w-full text-center block"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map Section */}
                <div className="py-16 px-6">
                    <img
                        src="https://i.ibb.co/7d2fXmCc/image-5.png"
                        className="w-full h-[600px]"
                        alt="Location Map"
                    />
                </div>
            </div>
        </div>
    );
}