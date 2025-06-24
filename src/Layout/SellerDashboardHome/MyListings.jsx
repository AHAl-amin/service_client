

import { MapPin, Users } from "lucide-react";
import { useState } from "react"
import { HiDotsHorizontal } from "react-icons/hi";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { LuClipboardList } from "react-icons/lu";
import { MdOutlineAddHome } from "react-icons/md";
import { PiCurrencyDollarSimple } from "react-icons/pi";
import { SiBosch } from "react-icons/si";
import { Link } from "react-router-dom";

export default function MyListings() {

    const [propertyList, setPropertyList] = useState(
        [
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
        ]);

    const handleDelete = (id) => {
        const updatedList = propertyList.filter(property => property.id !== id);
        setPropertyList(updatedList);
    };




    return (
        <div className="">
            <div className="mx-auto">





                <div className=" rounded-lg  ">


                    {/* Search Form */}


                    <section className="">
                        <div className="container mx-auto text-center">
                            <div className="flex items-center justify-between">
                                <div className="basis-6/12">
                                    <h2 className="text-4xl font-bold  text-[#1C3988] text-start">My properties listings</h2>
                                    <p className="text-[#545454] text-start mt-2 w-11/12 mb-10">Manage and monitor all your property listings.</p>
                                </div>
                                
                                    <div>
                                        <Link to="/seller_dashboard/add_properties" className="bg-[#1C3988] text-white px-5 py-2 rounded-full flex items-center gap-2 cursor-pointer"><MdOutlineAddHome size={20} /> Add Properties</Link>
                                    </div>
                               


                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {propertyList.map((property, index) => (
                                    <div key={index} className="card w-full bg-white shadow-lg rounded-lg overflow-hidden relative">
                                        {/* Boost badge and view count */}
                                        <p className="bg-green-700 p-2 rounded-xl px-6 top-2 left-2 absolute">Bost</p>
                                        <div className="absolute right-2 top-2 bg-gray-300 rounded flex items-center gap-2 p-2">
                                            <IoEyeOutline className="text-2xl text" />
                                            <span className=" text">50</span>
                                        </div>

                                        {/* Property image */}
                                        <img src={property.image} alt={property.title} className="w-full h-48 object-cover" />

                                        <div className="p-6">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-xl font-semibold text-[#1C3988]">{property.title}</h3>
                                                <div className="dropdown">
                                                    <div tabIndex={0} role="button" className="m-1 text cursor-pointer">
                                                        <HiDotsHorizontal className="text-xl" />
                                                    </div>
                                                    <ul tabIndex={0} className="dropdown-content menu text bg-gray-300 rounded-box z-10 right-0 w-30 p-2 shadow-sm">
                                                        <li><button>Edit</button></li>
                                                        <li>
                                                            <button className="text-red-400" onClick={() => handleDelete(property.id)}>
                                                                Delete
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
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
                    </section>

                    {/* Search Button */}
                </div>
            </div>
        </div>
    )
}