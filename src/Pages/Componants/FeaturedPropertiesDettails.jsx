// import React from 'react'


// import { useParams } from 'react-router-dom';
// import { properties } from './Properties';


// function FeaturedPropertiesDettails() {
//   const { id } = useParams();
//   const property = properties.find(item => item.id === parseInt(id));

//   if (!property) {
//     return <div className="p-10 text-red-500"> Property Not Found</div>;
//   }

//   return (
//     <div className="p-10 max-w-3xl mx-auto bg-white shadow-md rounded-lg">
//       <img src={property.image} alt={property.title} className="w-full h-64 object-cover rounded" />
//       <h2 className="text-3xl font-bold text-[#1C3988] mt-4">{property.title}</h2>
//       <p className="mt-2 text-gray-600">{property.description}</p>
//       <div className="mt-4 text-lg text-gray-700">
//         <p><strong>Location:</strong> {property.location}</p>
//         <p><strong>Price:</strong> {property.price}</p>
//         <p><strong>Area:</strong> {property.area}</p>
//         <p><strong>Payment:</strong> {property.payment}</p>
//         <p><strong>Rating:</strong> {property.person}</p>
//       </div>
//     </div>
//   );
// }

// export default FeaturedPropertiesDettails;


"use client"

import { useState } from "react"
import { useParams } from "react-router-dom"
import { properties } from "./Properties"
import { RiArrowUpBoxLine } from "react-icons/ri"
import { IoIosHeartEmpty } from "react-icons/io"
import { IoLocationOutline } from "react-icons/io5"

function FeaturedPropertiesDettails() {
  const { id } = useParams()
  const property = properties.find((item) => item.id === Number.parseInt(id))
  const [activeTab, setActiveTab] = useState("description")
  const [contactForm, setContactForm] = useState({
    fullName: "",
    email: "",
    country: "",
    phone: "",
    message: "",
  })

  if (!property) {
    return <div className="p-10 text-red-500">Property Not Found</div>
  }

  const handleContactSubmit = (e) => {
    e.preventDefault()
    console.log("Contact form submitted:", contactForm)
  }

  const handleInputChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value,
    })
  }

  // Static thumbnail images for demo
  const thumbnailImages = [property.image, property.image, property.image]

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="md:max-w-[80%] mx-auto">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left Side - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative">
              <img
                src={property.image || "/placeholder.svg"}
                alt={property.title}
                className="w-full h-80 object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {thumbnailImages.map((img, index) => (
                <div key={index} className="relative">
                  <img
                    src={img || "/placeholder.svg"}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                  />
                </div>
              ))}
              <div className="bg-blue-600 text-white rounded flex items-center justify-center h-20 cursor-pointer hover:bg-blue-700 transition-colors">
                <span className="text-lg font-bold">10+</span>
              </div>
            </div>
          </div>

          {/* Right Side - Property Details */}
          <div className="space-y-6">
            {/* Property Header */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl font-bold text-gray-800">{property.title}</h1> 
                <p className="border-1 p-2 text rounded-2xl">Down Payment Available</p>
                <div className="flex space-x-2">
                  <button className="p-2 border bg-gray-300 rounded hover:bg-gray-50">
                    <span className="text text-2xl"> <IoIosHeartEmpty /></span>
                  </button>
                  <button className="p-2 border bg-gray-300 rounded hover:bg-gray-50">
                    <span className="text text-2xl"><RiArrowUpBoxLine /></span>
                  </button>
                </div>
              </div>
              <p className="text-gray-600 mb-4 flex items-center gap-2"> <span><IoLocationOutline /></span> {property.location}</p>
              <div className="text-3xl font-bold text mb-4">{property.price}</div>
              <div className="flex space-x-4 text-sm text-gray-600 mb-6">
                <span className="border-r-1 border-gray-400 pr-4">3 Beds   </span>
                <span className="border-r-1 border-gray-400 pr-4"> Recreational</span>
                <span className="border-r-1 border-gray-400 pr-4">
                     Vacant Land</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-medium transition-colors">
                Buy a Share
              </button>
              <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2 rounded font-medium transition-colors">
                Contact Seller
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="border-b border-gray-200">
              <div className="flex space-x-8">
                {["description", "information", "reviews", "map"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                      activeTab === tab
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab === "description"
                      ? "Property Description"
                      : tab === "information"
                        ? "Property Information"
                        : tab === "map"
                          ? "Advisor Map"
                          : tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="py-4">
              {activeTab === "description" && (
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>{property.description}</p>
                  <p>
                    Welcome to our exceptional property listing, where we bring years of expertise from a leading real
                    estate firm to offer you unparalleled service and access to premium properties. Our commitment to
                    excellence ensures that every client receives personalized attention and expert guidance throughout
                    their real estate journey.
                  </p>
                  <p>
                    <strong>Area:</strong> {property.area}
                  </p>
                  <p>
                    <strong>Payment Terms:</strong> {property.payment}
                  </p>
                </div>
              )}
              {activeTab === "information" && (
                <div className="text-gray-700">
                  <h3 className="font-semibold mb-2">Property Information</h3>
                  <div className="space-y-2">
                    <p>
                      <strong>Location:</strong> {property.location}
                    </p>
                    <p>
                      <strong>Price:</strong> {property.price}
                    </p>
                    <p>
                      <strong>Area:</strong> {property.area}
                    </p>
                    <p>
                      <strong>Payment:</strong> {property.payment}
                    </p>
                    <p>
                      <strong>Rating:</strong> {property.person}
                    </p>
                  </div>
                </div>
              )}
              {activeTab === "reviews" && (
                <div className="text-gray-700">
                  <h3 className="font-semibold mb-2">Reviews</h3>
                  <p>No reviews available yet.</p>
                </div>
              )}
              {activeTab === "map" && (
                <div className="text-gray-700">
                  <h3 className="font-semibold mb-2">Location Map</h3>
                  <p>Map integration coming soon.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contact Seller Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mr-4">
              <span className="text-2xl text-gray-600">👤</span>
            </div>
            <div className="">
              <h3 className="text-xl font-bold text-gray-800">John Smith</h3>
              <div className="flex gap-6">
                <p className="text-gray-600">Edwards, Colorado, USA</p>
              <p className="text-gray-600">johnsmith@example.com</p>
              <p className="text-gray-600">+1234567890</p>
              </div>
            </div>
          </div>

          <h4 className="text-lg font-semibold text-gray-800 mb-4">Contact seller</h4>

          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={contactForm.fullName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <input
                  type="text"
                  name="country"
                  value={contactForm.country}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={contactForm.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Write Your Message Here...</label>
              <textarea
                name="message"
                value={contactForm.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            <div className="flex items-center mb-4">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm text-gray-600">By submitting you agree to our Terms and Conditions</span>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg hover:bg cursor-pointer text-white px-6 py-2 rounded font-medium transition-colors"
              >
                Send
              </button>
              <button
                type="button"
                className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2 rounded font-medium transition-colors"
              >
                View Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default FeaturedPropertiesDettails


