

import { useState } from "react"

export default function EditLocationInfo({ onNext, onBack }) {
  const [locationData, setLocationData] = useState({
    country: "",
    state: "",
    city: "",
    streetAddress: "",
    postalCode: "",
  })

  const [mapPinned, setMapPinned] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setLocationData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePinLocation = () => {
    setMapPinned(true)
    console.log("Pin location manually clicked")
    // Here you would integrate with a map service like Google Maps
  }

//   const handleBackToMedia = () => {
//     console.log("Navigate back to Media")
//   }

//   const handleNext = () => {
//     console.log("Navigate to next step")
//     console.log("Location data:", locationData)
//   }

  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
    "Japan",
    "Brazil",
    "India",
    "China",
  ]

  return (
    <div className="">
      <div className=" mx-auto">
        {/* Main Form Container */}
        <div className="bg-white rounded-2xl border border-[#1C3988] shadow-sm p-8">
          {/* Header */}
          <div className="mb-8 text-start">
            <h1 className="text-4xl font-bold text mb-2">Location Information</h1>
            <p className="text-gray-600 text-xl">Provide detailed location information for your property</p>
          </div>

          <div className="space-y-6">
            {/* Country */}
            <div>
              <label htmlFor="country" className="block text-xl text font-medium text mb-2 text-start">
                Country
              </label>
              <div className="relative">
                <select
                  id="country"
                  name="country"
                  value={locationData.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C3988] focus:border-[#1C3988] outline-none transition-all duration-200 text-gray-700 bg-white appearance-none cursor-pointer"
                >
                  <option value="" className="text-gray-400">
                    Select Country
                  </option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* State/Province and City/Town Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="state" className="block text-xl text font-medium  mb-2 text-start">
                  State/Province
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={locationData.state}
                  onChange={handleInputChange}
                  placeholder="write your state"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C3988] focus:border-[#1C3988]  outline-none transition-all duration-200 text-gray-700 placeholder-gray-400"
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-xl text font-medium text-blue-700 mb-2">
                  City/Town
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={locationData.city}
                  onChange={handleInputChange}
                  placeholder="Write your city"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C3988] focus:border-[#1C3988]  outline-none transition-all duration-200 text-gray-700 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Street Address and Postal/Zip Code Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="streetAddress" className="block text-xl text font-medium text-blue-700 mb-2 text-start">
                  Street Address
                </label>
                <input
                  type="text"
                  id="streetAddress"
                  name="streetAddress"
                  value={locationData.streetAddress}
                  onChange={handleInputChange}
                  placeholder="Enter Street Address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C3988] focus:border-[#1C3988]  outline-none transition-all duration-200 text-gray-700 placeholder-gray-400"
                />
              </div>
              <div>
                <label htmlFor="postalCode" className="block text-xl text font-medium text-blue-700 mb-2">
                  Postal/Zip Code
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={locationData.postalCode}
                  onChange={handleInputChange}
                  placeholder="Write Your City/Town"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C3988] focus:border-[#1C3988]  outline-none transition-all duration-200 text-gray-700 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Map Preview */}
            <div>
              <label className="block text-xl text font-medium text-blue-700 mb-4 ">Map Preview</label>
              <div className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 rounded-lg h-120 flex items-center justify-center overflow-hidden">
                {/* Background pattern to simulate map */}
                <div className="absolute inset-0 opacity-20">
                 <img src="https://i.ibb.co/8DzvkF46/image.png" alt="" />
                </div>

                {/* Content */}
                <div className="text-center z-10">
                  <p className="text-white text-lg font-medium mb-4">
                    Map Preview Will Appear Here After Entering Location Details
                  </p>
                  <button
                    type="button"
                    onClick={handlePinLocation}
                    className="inline-flex items-center cursor-pointer px-4 py-2 bg text-white text-xl text font-medium rounded-lg focus:outline-none focus:ring-2  focus:ring-offset-2 transition-all duration-200 shadow-lg"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                   <div className="text-gray-400">
                     Pin Location Manually
                   </div>
                  </button>
                </div>

                {/* Map pin indicator if location is pinned */}
                {mapPinned && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <svg className="w-8 h-8 text-red-500 animate-bounce" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-6">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 text-xl text font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1C3988] focus:ring-offset-2 transition-all duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Media
          </button>

          <button
            type="button"
            onClick={onNext}
            className="px-8 py-3 bg text-white font-medium rounded-lg hover:bg cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1C3988] focus:ring-offset-2 transition-all duration-200 shadow-sm"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
