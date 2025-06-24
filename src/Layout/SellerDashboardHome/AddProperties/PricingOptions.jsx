"use client"

import { useState } from "react"

export default function PricingOptions() {
  const [pricingData, setPricingData] = useState({
    price: "",
    allowDownPayment: false,
    lockPeriod: "30",
    enableBuyShare: false,
    boostOptions: {
      dailyBoost: false,
      weeklyBoost: false,
      featuredListing: false,
    },
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setPricingData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (name) => {
    setPricingData((prev) => ({
      ...prev,
      [name]: !prev[name],
    }))
  }

  const handleBoostOptionChange = (option) => {
    setPricingData((prev) => ({
      ...prev,
      boostOptions: {
        ...prev.boostOptions,
        [option]: !prev.boostOptions[option],
      },
    }))
  }

  const handleBackToLocation = () => {
    console.log("Navigate back to Location")
  }

  const handleReviewListing = () => {
    console.log("Review listing")
    console.log("Pricing data:", pricingData)
  }

  const lockPeriodOptions = [
    { value: "7", label: "7 DAYS" },
    { value: "14", label: "14 DAYS" },
    { value: "30", label: "30 DAYS" },
    { value: "60", label: "60 DAYS" },
    { value: "90", label: "90 DAYS" },
  ]

  return (
    <div className=" p-6">
      <div className=" mx-auto">
        {/* Main Form Container */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text mb-2">Pricing Options</h1>
            <p className="text-gray-600 text-xl">Set your property price and payment options</p>
          </div>

          <div className="space-y-8">
            {/* Price Section */}
            <div>
              <label htmlFor="price" className="block text-xl font-medium text mb-2">
                Price
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">$</span>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={pricingData.price}
                  onChange={handleInputChange}
                  placeholder="0"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C3988] hover:border-[#1C3988] outline-none transition-all duration-200 text-gray-700 placeholder-gray-400"
                />
              </div>

              {/* Allow Down Payment Option */}
              <div className="mt-4">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pricingData.allowDownPayment}
                    onChange={() => handleCheckboxChange("allowDownPayment")}
                    className="w-12 h-12 text border-gray-300 rounded focus:ring-[#1C3988] hover:border-[#1C3988] focus:ring-2 mt-0.5"
                  />
                  <div>
                    <span className="text-xl font-medium text">Allow Down Payment Option</span>
                    <p className="text-sm text-gray-500 mt-1">
                      Enable buyers to place a 10% down payment to lock the listing for a period of time.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Lock Period */}
            <div>
              <label htmlFor="lockPeriod" className="block text-xl font-medium text mb-2">
                Lock period
              </label>
              <div className="relative">
                <select
                  id="lockPeriod"
                  name="lockPeriod"
                  value={pricingData.lockPeriod}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 text-gray-700 bg-white appearance-none cursor-pointer"
                >
                  {lockPeriodOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Warning Message */}
              <div className="flex items-center mt-3 text-orange-400">
                <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm">Down Payments Are 100% Refundable If The Deal Doesn't Close</span>
              </div>
            </div>

            {/* Enable Buy a Share Option */}
            <div>
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={pricingData.enableBuyShare}
                  onChange={() => handleCheckboxChange("enableBuyShare")}
                  className="w-12 h-12 text border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mt-0.5"
                />
                <div>
                  <span className="text-xl font-medium text">Enable "Buy a Share" Option</span>
                  <p className="text-sn text-gray-500 mt-1">
                    Allow buyers to express interest in purchasing a portion of your property as part of a group.
                  </p>
                </div>
              </label>

              {/* Warning Message */}
              <div className="flex items-center mt-3 text-orange-400">
                <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm">This Feature Is Only Available For Premium And Annual Premium Sellers</span>
              </div>
            </div>

            {/* Boost Options */}
            <div className="border-t border-gray-200 pt-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text mb-2">Boost Options</h2>
                <p className="text-gray-600 text-xl">Set your property price and payment options</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Daily Boost */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={pricingData.boostOptions.dailyBoost}
                      onChange={() => handleBoostOptionChange("dailyBoost")}
                      className="w-12 h-12 text border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mt-1"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-2xl  text mb-1">Daily boost ($30/day)</div>
                      <p className="text-sm text-gray-500">Premium visibility for 24 hours</p>
                    </div>
                  </label>
                </div>

                {/* Weekly Boost */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={pricingData.boostOptions.weeklyBoost}
                      onChange={() => handleBoostOptionChange("weeklyBoost")}
                      className="w-12 h-12 text border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mt-1"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-2xl text mb-1">Weekly Boost ($100/week)</div>
                      <p className="text-sm text-gray-500">Premium visibility for 7 days (save $110)</p>
                    </div>
                  </label>
                </div>

                {/* Featured Listing */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={pricingData.boostOptions.featuredListing}
                      onChange={() => handleBoostOptionChange("featuredListing")}
                      className="w-12 h-12 text border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mt-1"
                    />
                    <div className="flex-1">
                      <div className="font-medium text text-2xl mb-1">Featured Listing</div>
                      <p className="text-sm text-gray-500">
                        Encourages your property in the featured section on the homepage
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-6">
          <button
            type="button"
            onClick={handleBackToLocation}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Location
          </button>

          <button
            type="button"
            onClick={handleReviewListing}
            className="px-8 py-3 bg text-white font-medium rounded-lg  focus:outline-none focus:ring-2 cursor-pointer focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm"
          >
            Review Your Listing
          </button>
        </div>
      </div>
    </div>
  )
}
