"use client"

import { MapPin, Users } from "lucide-react";
import { useState } from "react"
import { IoIosHeartEmpty } from "react-icons/io";
import { Link } from "react-router-dom";

export default function BuyerDashboardHome() {
  // JSON data embedded in the component
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
  ];


  const statsData = [
    {
      id: 1,
      title: "Recently Viewed",
      count: 15,
      description: "Properties viewed in the last 30 days",
      icon: {
        paths: [
          "M15 12a3 3 0 11-6 0 3 3 0 016 0z",
          "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
        ],
        strokeColor: "text-blue-600",
        bgColor: "bg-blue-100",
      },
    },
    {
      id: 2,
      title: "Saved Properties",
      count: 7,
      description: "Properties in your wishlist",
      icon: {
        paths: [
          "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
        ],
        strokeColor: "text-purple-600",
        bgColor: "bg-purple-100",
      },
    },
    {
      id: 3,
      title: "Active Chats",
      count: 3,
      description: "Ongoing conversations with sellers",
      icon: {
        paths: [
          "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
        ],
        strokeColor: "text-green-600",
        bgColor: "bg-green-100",
      },
    },
    {
      id: 4,
      title: "Share Interest",
      count: 2,
      description: "Jointly owned properties",
      icon: {
        paths: [
          "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z",
        ],
        strokeColor: "text-blue-600",
        bgColor: "bg-blue-100",
      },
    },
  ]

  const [searchData, setSearchData] = useState({
    location: "",
    minPrice: "",
    maxPrice: "",
    country: "",
    propertyType: "",
    downPayment: false,
  })

  const handleInputChange = (field, value) => {
    setSearchData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSearch = () => {
    console.log("Search data:", searchData)
    // Handle search logic here
  }

  return (
    <div className="">
      <div className="mx-auto">
        {/* Statistics Cards */}
        <h1 className="text text-4xl font-semibold mb-6">Dashboard overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statsData.map((stat) => (
            <div
              key={stat.id}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text">{stat.title}</h3>
                <div
                  className={`w-10 h-10 bg-[#E8EBF3] ${stat.icon.bgColor} rounded-full flex items-center justify-center`}
                >
                  <svg
                    className={`w-5 h-5 text ${stat.icon.strokeColor}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {stat.icon.paths.map((path, index) => (
                      <path
                        key={index}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={path}
                      />
                    ))}
                  </svg>
                </div>
              </div>
              <div className="text-3xl font-bold text mb-1">{stat.count}</div>
              <p className="text-sm text-[#00B69B]">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* Search Section */}
        <div className=" rounded-lg  ">
          <div className="mb-8 ">
            <h1 className="text-3xl font-bold text mb-2">Find Your Perfect Land</h1>
            <p className="text-gray-600">Search and filter properties based on your preferences</p>
          </div>

          {/* Search Form */}
          <div className="bg-[#E8EBF3] p-6 sm:p-10 rounded-xl  mx-auto">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSearch()
              }}
              className="flex flex-col gap-4"
            >
              {/* Search Location */}
              <div className="flex gap-6">
                <div className="w-1/2 ">
                  <div className="relative ">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Search for location"
                      value={searchData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 text-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                      aria-label="Search location"
                    />
                  </div>
                </div>

                <div className="w-1/2 flex gap-6">
                  {/* Min Price */}
                  <div className="w-full">
                    <input
                      type="number"
                      placeholder="Min Price"
                      value={searchData.minPrice}
                      onChange={(e) => handleInputChange("minPrice", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 text-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                      aria-label="Minimum price"
                    />
                  </div>


                  {/* Down Payment Checkbox */}
                  <div className="w-full">
                    <div className="flex items-center px-4 py-3 border border-gray-300 rounded-md  bg-white ">
                      <input
                        type="checkbox"
                        id="downPayment"
                        checked={searchData.downPayment}
                        onChange={(e) => handleInputChange("downPayment", e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 bg-white"
                        aria-label="Down payment option"
                      />
                      <label htmlFor="downPayment" className="ml-2 text-gray-700 ">
                        Down Payment
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-6">
                {/* Select Country */}
                <div className="w-full ">
                  <div className="relative">
                    <select
                      value={searchData.country}
                      onChange={(e) => handleInputChange("country", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                      aria-label="Select country"
                    >
                      <option value="">Select Country</option>
                      <option value="usa">United States</option>
                      <option value="canada">Canada</option>
                      <option value="uk">United Kingdom</option>
                      <option value="australia">Australia</option>
                      <option value="germany">Germany</option>
                      <option value="france">France</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Property Type */}
                <div className="w-full">
                  <div className="relative">
                    <select
                      value={searchData.propertyType}
                      onChange={(e) => handleInputChange("propertyType", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                      aria-label="Select property type"
                    >
                      <option value="">Property Type</option>
                      <option value="residential">Residential Land</option>
                      <option value="commercial">Commercial Land</option>
                      <option value="agricultural">Agricultural Land</option>
                      <option value="industrial">Industrial Land</option>
                      <option value="recreational">Recreational Land</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Max Price */}
                <div className="w-full">
                  <input
                    type="number"
                    placeholder="Max Price"
                    value={searchData.maxPrice}
                    onChange={(e) => handleInputChange("maxPrice", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 text-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    aria-label="Maximum price"
                  />
                </div>
                {/* Search Button */}
                <div className="w-full">
                  <button
                    type="submit"
                    className="w-full bg hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-md transition-colors flex items-center justify-center gap-2 bg-white"
                    aria-label="Search properties"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>

          <section className="py-16">
            <div className="container mx-auto text-center">
              <div className="flex items-center justify-between">
                <div className="basis-6/12">
                  <h2 className="text-4xl font-bold  text-[#1C3988] text-start">Featured Properties</h2>
                  <p className="text-[#545454] text-start mt-2 w-11/12 mb-10">Handpicked premium land listings from around the world </p>
                </div>

                <div className="basis-6/12 flex items-center justify-end gap-4 ">
                  <button className="bg-[#1C3988] px-5 py-2 rounded-sm text-white w-[180px]">View All Properties</button>

                  <button className="bg-[#fff] border text-[#1C3988] border-gray-300 px-5 py-2 w-[140px] flex rounded-sm items-center gap-[2px] text-center"><MapPin size={16} />View Map</button>

                  <select className="select rounded-sm w-[150px] text-[#1C3988] text-base  bg-[#fff] ">
                    <option disabled selected>Featured</option>
                    {/* <option>Featured</option> */}
                    <option>Newest</option>
                    <option>Low to high</option>
                    <option>High to Low</option>
                    <option>Small to Large</option>
                    <option>Large to Small</option>
                  </select>

                </div>

              </div>
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
          </section>

          {/* Search Button */}
        </div>
      </div>
    </div>
  )
}