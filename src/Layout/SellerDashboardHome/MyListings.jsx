

import { MapPin, Users } from "lucide-react";
import { useEffect, useState } from "react"
import { HiDotsHorizontal } from "react-icons/hi";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { LuClipboardList } from "react-icons/lu";
import { MdOutlineAddHome } from "react-icons/md";


import { Link } from "react-router-dom";
import EditProperties from "./EditProperties/EditProperties";
import { useGetAllPropertiesListQuery } from "../../redux/features/sellerApi";

export default function MyListings() {
     const {data:getAllPropertiesList} = useGetAllPropertiesListQuery();
  console.log(getAllPropertiesList,"getAllPropertiesList.....................");


    const [propertyList, setPropertyList] = useState([]);
     
useEffect(() => {
  if (getAllPropertiesList?.length > 0) {
    const transformed = getAllPropertiesList.map((item) => ({
      id: item.id,
      title: item.title,
      price: `$${Number(item.price).toLocaleString()}`,
      area: `${item.land_size} sq ft`,
      location: ` ${item.country},${item.city}`,
      description: item.description,
      person: `${item.remaining_shares}/${item.max_shares}`,
      payment: item.allow_down_payment ? "Down Payment Available" : "Full Payment Only",
      image: item.main_image
        ? `http://10.10.13.60:2100${item.main_image}`
        : "https://via.placeholder.com/400x300?text=No+Image",
      features: item.features?.map((f) => f.name).join(", ") || "No features listed",
    }));

    setPropertyList(transformed);
  }
}, [getAllPropertiesList]);

      

  


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
                                        {/* <div className="absolute right-2 top-2 bg-gray-300 rounded flex items-center gap-2 p-2">
                                            <IoEyeOutline className="text-2xl text" />
                                            <span className=" text">50</span>
                                        </div> */}

                                        {/* Property image */}
                                        <img src={property.image} alt={property.title} className="w-full h-48 object-cover" />

                                        <div className="p-6">
                                          
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

                                            <p className="text-[#8B8B8B] text-start pt-2 line-clamp-2">{property?.description}</p>

                                            <Link to={`/seller_dashboard/seller_feture_details/${property.id}`} className="btn bg-[#1C3988] py-2 text-white text-base font-medium mt-4 w-full">View Details</Link>
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