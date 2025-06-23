

import { Mails, MapPin, NotebookPen, ShoppingBag, Users } from "lucide-react"
import { useState } from "react"
import { CiLocationOn } from "react-icons/ci"
import { FaArrowLeftLong } from "react-icons/fa6"
import { GrLocation } from "react-icons/gr"
import { IoIosHeartEmpty } from "react-icons/io"
import { MdOutlineMail, MdOutlinePhone } from "react-icons/md"
import { Link, useNavigate } from "react-router-dom"
// import scanImag from "../../../public/img/scan.png"
const properties = [
    {
        id: 1,
        title: "Mountain View Ranch",
        price: "$250,000",
        area: "25 Acres",
        location: "Colorado, USA",
        description: "A serene ranch with beautiful mountain views, perfect for farming or a vacation home.",
        person: "4/5",
        payment: "Bank Transfer, Cash",
        image: "https://cdn.pixabay.com/photo/2024/12/28/03/39/field-9295186_640.jpg",
    },
    {
        id: 2,
        title: "Oceanfront Paradise",
        price: "$650,000",
        area: "25 Acres",
        location: "Malibu, California",
        description: "Luxurious oceanfront property with private beach access and panoramic views.",
        person: "2/5",
        payment: "Mortgage, Bank Transfer",
        image: "https://cdn.pixabay.com/photo/2024/12/28/03/39/field-9295186_640.jpg",
    },
    {
        id: 3,
        title: "Oceanfront Paradise",
        price: "$650,000",
        area: "25 Acres",
        location: "Malibu, California",
        description: "Identical listing with modern amenities and direct ocean access.",
        person: "3/5",
        payment: "Down Payment Available",
        image: "https://cdn.pixabay.com/photo/2024/12/28/03/39/field-9295186_640.jpg",
    },
    {
        id: 4,
        title: "Mountain View Ranch",
        price: "$250,000",
        area: "25 Acres",
        location: "Colorado, USA",
        description: "Duplicate ranch listing ideal for eco-resorts or agricultural use.",
        person: "1/5",
        payment: "Bank Transfer, Cash",
        image: "https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297_640.jpg",
    },
    {
        id: 5,
        title: "Oceanfront Paradise",
        price: "$650,000",
        area: "25 Acres",
        location: "Malibu, California",
        description: "A peaceful ocean getaway with palm trees and breeze.",
        person: "2/5",
        payment: "Down Payment Available",
        image: "https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297_640.jpg",
    },
    {
        id: 6,
        title: "Oceanfront Paradise",
        price: "$650,000",
        area: "25 Acres",
        location: "Malibu, California",
        description: "Prime location property for residential or investment purposes.",
        person: "4/5",
        payment: "Down Payment Available",
        image: "https://cdn.pixabay.com/photo/2022/04/15/07/58/sunset-7133867_640.jpg",
    },
]


export default function BuyerDasProfileView() {
    const [selectedProperty, setSelectedProperty] = useState(null)
    const navigate = useNavigate()

    return (
        <div>
            <div className="bg w-24 px-4 py-2 rounded cursor-pointer text-white ">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 cursor-pointer"
                >
                    <FaArrowLeftLong />
                    <span>Back</span>
                </button>
            </div>
            <div className=" ">
                {/* Hero Section */}

                <div
                    className="relative h-100 bg-cover bg-center rounded-2xl mt-4"
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

                <div className="  mx-auto p-6 ">
                    <div className="">
                        <div className=" rounded-lg gap-20 sticky top-6 flex justify-between ">
                            <div className="w-full">
                                <div className="text-center mb-6">
                                    <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                                        <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className=" font-semibold text text-5xl">John Smith</h3>
                                    <p className="text-2xl text-gray-600">Licensed Real Estate Agent</p>

                                </div>

                                <div className="space-y-4 flex flex-col justify-center items-center">
                                    <div className="w-full ml-24 space-y-4">
                                        <div className="flex items-center text-xl text-gray-600 ">
                                            <MdOutlinePhone className="text mr-2 " />
                                            +1 (555) 123-4567
                                        </div>
                                        <div className="flex items-center text-xl text-gray-600">
                                            <MdOutlineMail className="text mr-2 text-xl" />
                                            john@realestate.com
                                        </div>
                                        <div className="flex items-center text-xl text-gray-600">
                                            <GrLocation className="text mr-2 text-xl" />
                                            California, USA
                                        </div>
                                    </div>
                                </div>

                                <button className="w-full mt-6 bg cursor-pointer text-white font-medium py-2 px-4 rounded-md transition-colors">
                                    Contact Agent
                                </button>
                            </div>
                            <div className="max-w-5xl  py-6 rounded-lg  mt-6">
                                {/* Stats Section */}
                                <div className="flex gap-4 mb-6">
                                    <div className="text-center bg-white rounded  space-y-2 p-6 shadow">
                                        <NotebookPen className="text size-10 mx-auto" />
                                        <p className="text-2xl font-bold text ">12</p>
                                        <p className="text-gray-600">Active Listings</p>
                                    </div>
                                    <div className="text-center bg-white   rounded  space-y-2 p-6 shadow">
                                        <ShoppingBag className="text size-10 mx-auto  " />
                                        <p className="text-2xl font-bold text">12</p>
                                        <p className="text-gray-600">Properties Sold</p>
                                    </div>
                                    <div className="text-center bg-white  rounded p-6 space-y-2 shadow">
                                        <Mails className="text size-10 mx-auto" />
                                        <p className="text-2xl font-bold text">98%</p>
                                        <p className="text-gray-600">Response Rate</p>
                                    </div>
                                </div>

                                {/* About Section */}
                                <div className="bg-gray-50 p-8 rounded-lg shadow">
                                    <h1 className="text font-bold text-2xl mb-4">About Jon Smith</h1>
                                    <p className="text-gray-700 leading-relaxed">
                                        About Jon Smith: With over 15 years in sales and land, I have developed deep expertise in the unique landscapes and opportunities offered by mountain and recreational properties, particularly across the beautiful regions of Colorado and Utah. Over the years, I have had the privilege of helping hundreds of clients—from first-time land buyers to seasoned investors—navigate the process of purchasing everything from remote off-grid parcels to prime recreational land used for hunting, camping, and off-road adventures. I am passionate about connecting people with the land that fits their vision, lifestyle, and long-term goals.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid lg:grid-cols-4  gap-6">
                        {/* Profile Sidebar */}


                        {/* Property Cards Grid */}
                        <div className="lg:col-span-4">

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {properties.map((property, index) => (
                                    <div key={index} className="card w-full bg-white shadow-lg rounded-lg overflow-hidden relative">
                                        <p className="bg p-2 rounded-xl px-6 top-2 left-2 absolute">Recreational</p>
                                        <IoIosHeartEmpty className="absolute right-2 top-2 text-2xl text bg-gray-300 rounded " />
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
                                                <button className=" px-5 py-[5px] rounded-full border-[1.5px] cursor-pointer border-[#1C3988] text-[#1C3988]">{property?.payment}</button>

                                                <div className="flex items-center gap-1 text-[#8B8B8B]">
                                                    <Users size={18} className="text-[#1C3988]" />
                                                    {property?.person}
                                                </div>
                                            </div>

                                            <p className="text-[#8B8B8B] text-start pt-2">{property?.description}</p>

                                            <Link to={`/buyer_dashboard/buyer_feture_details/${property.id}`} className="btn bg-[#1C3988] py-2 text-white text-base font-medium mt-4 w-full">View Details</Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="py-16">
                        <img src='https://i.ibb.co/7d2fXmCc/image-5.png' className="w-full h-[600px]" alt="LOCATION" />
                    </div>
                </div>
            </div>
        </div>
    )
}
