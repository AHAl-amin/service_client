

import { useState } from "react"
import { SiBosch } from "react-icons/si"
import { TfiWorld } from "react-icons/tfi"

export default function BoostOptions() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedBoostType, setSelectedBoostType] = useState("daily")
    const [selectedProperty, setSelectedProperty] = useState("")

    const properties = [
        { id: 1, name: "Modern Villa in Downtown", address: "123 Main St, City Center" },
        { id: 2, name: "Cozy Apartment", address: "456 Oak Ave, Suburb" },
        { id: 3, name: "Luxury Penthouse", address: "789 High St, Uptown" },
        { id: 4, name: "Family House", address: "321 Pine Rd, Residential" },
    ]

    const boostsData = [
        {
            id: 1,
            property: "Lakefront property",
            location: "Lakefront property",
            boostType: "Daily ($20)",
            timeRemaining: "16 hours",
            status: "Active",
            view: 400,
        },
        {
            id: 2,
            property: "Lakefront property",
            location: "Lakefront property",
            boostType: "Weekly ($500)",
            timeRemaining: "16 hours",
            status: "Active",
            view: 400,
        },
        {
            id: 3,
            property: "Lakefront property",
            location: "Lakefront property",
            boostType: "Daily ($20)",
            timeRemaining: "16 hours",
            status: "Active",
            view: 400,
        },
        {
            id: 4,
            property: "Lakefront property",
            location: "Lakefront property",
            boostType: "Weekly ($500)",
            timeRemaining: "16 hours",
            status: "Active",
            view: 300,
        },
        {
            id: 5,
            property: "Lakefront property",
            location: "Lakefront property",
            boostType: "Daily ($20)",
            timeRemaining: "16 hours",
            status: "Active",
            view: 500,
        },
        {
            id: 6,
            property: "Lakefront property",
            location: "Lakefront property",
            boostType: "Weekly ($500)",
            timeRemaining: "16 hours",
            status: "Active",
            view: 700,
        },
    ]

    const handleBoostClick = (boostType) => {
        setSelectedBoostType(boostType)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setSelectedProperty("")
    }

    const handleConfirmBoost = () => {
        if (!selectedProperty) {
            alert("Please select a property")
            return
        }

        const property = properties.find((p) => p.id === Number.parseInt(selectedProperty))
        const boostPrice = selectedBoostType === "daily" ? "$20/day" : "$100/week"

        alert(`Boost confirmed!\nProperty: ${property.name}\nBoost Type: ${selectedBoostType} Boost\nPrice: ${boostPrice}`)
        closeModal()
    }

    return (
        <div>
            <div className="px-6 space-y-2">
                <h1 className="text-4xl font-bold text">Boost Your Listings</h1>
                <p className="text-xl text-gray-600">Increase visibility and attract more potential buyers</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-10 p-6 mx-auto">
                {/* Daily Boost Card */}
                <div className="flex-1 bg-green-50 border-2 border-green-200 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-[#059669] rounded-full flex items-center justify-center">
                            <SiBosch className="size-10 p-2 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">Daily Boost</h2>
                            <p className="text-sm text-gray-600">Premium visibility for 24 hours</p>
                        </div>
                    </div>

                    <div className="mb-6">
                        <span className="text-3xl font-bold text-gray-800">$20</span>
                        <span className="text-gray-600">/day</span>
                    </div>

                    <div className="space-y-3 mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-5 h-5 bg-[#059669] rounded-full flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <span className="text-gray-700">Featured placement on homepage</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-5 h-5 bg-[#059669] rounded-full flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <span className="text-gray-700">Top position in search results</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-5 h-5 bg-[#059669] rounded-full flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <span className="text-gray-700">Social media promotion</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-5 h-5 bg-[#059669] rounded-full flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <span className="text-gray-700">+70% more views on average</span>
                        </div>
                    </div>

                    <button
                        onClick={() => handleBoostClick("daily")}
                        className="w-full bg-[#059669] hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors cursor-pointer"
                    >
                        Boost a property
                    </button>
                </div>

                {/* Weekly Boost Card */}
                <div className="flex-1 bg-purple-50 border-2 border-purple-200 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-[#9333EA] rounded-full flex items-center justify-center">
                            <SiBosch className="size-10 p-2 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">Weekly Boost</h2>
                            <p className="text-sm text-gray-600">Extended visibility for 7 days</p>
                            <p className="text-sm text-purple-600 font-medium">Save $40 compared to daily</p>
                        </div>
                    </div>

                    <div className="mb-6">
                        <span className="text-3xl font-bold text-gray-800">$100</span>
                        <span className="text-gray-600">/week</span>
                    </div>

                    <div className="space-y-3 mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <span className="text-gray-700">All daily boost features</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <span className="text-gray-700">Featured in weekly newsletter</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <span className="text-gray-700">Premium badge on listing</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <span className="text-gray-700">+150% more views on average</span>
                        </div>
                    </div>

                    <button
                        onClick={() => handleBoostClick("weekly")}
                        className="w-full bg-purple-600 hover:bg-purple-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors cursor-pointer"
                    >
                        Boost a property
                    </button>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 backdrop-blur bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-lg mx-auto">
                        {/* Header */}
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text mb-2">Boost Your property</h2>
                            <p className="text-gray-600">Increase visibility and attract more potential buyers</p>
                        </div>

                        {/* Choose Property */}
                        <div className="mb-6">
                            <label className="block text-xl font-medium text-gray-700  mb-3">Choose a property</label>
                            <select
                                value={selectedProperty}
                                onChange={(e) => setSelectedProperty(e.target.value)}
                                className="w-full appearance-none text-gray-800 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Select a property...</option>
                                {properties.map((property) => (
                                    <option key={property.id} value={property.id}>
                                        {property.name} - {property.address}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Boost Type */}
                        <div className="mb-8">
                            <label className="block text-xl font-medium text mb-3">Boost Type</label>
                            <div className="grid grid-cols-2 gap-3">
                                {/* Daily Boost Option */}
                                <div
                                    onClick={() => setSelectedBoostType("daily")}
                                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${selectedBoostType === "daily"
                                            ? "border-green-500 bg-[#D6F7ED]"
                                            : "border-gray-200 bg-white hover:border-gray-300"
                                        }`}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-10 h-10 bg-[#059669] rounded-full flex items-center justify-center">
                                            <SiBosch className="size-10 p-2 text-white" />
                                        </div>
                                        <span className="font-semibold text-xl  text-gray-800 ">Daily Boost</span>
                                    </div>
                                    <div className="text-sm font-medium text-gray-600">
                                        Premium visibility for 24 hours
                                    </div>
                                </div>

                                {/* Weekly Boost Option */}
                                <div
                                    onClick={() => setSelectedBoostType("weekly")}
                                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${selectedBoostType === "weekly"
                                            ? "border-purple-500 bg-[#EEE4F8]"
                                            : "border-gray-200 bg-white hover:border-gray-300"
                                        }`}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                                            <SiBosch className="size-10 p-2 text-white" />
                                        </div>
                                        <span className=" text-gray-800 font-semibold text-xl">Weekly Boost</span>
                                    </div>
                                    <div className="text-sm font-medium text-gray-600">
                                        Premium visibility for 24 hours
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3">
                            <button
                                onClick={closeModal}
                                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmBoost}
                                className="flex-1 px-4 py-3 bg-[#059669] text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                                Confirm Boost
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="  mx-auto p-6  ">
                <div className=" ">
                    {/* Header */}
                    <div className=" mb-5 ">
                        <h1 className="text-4xl font-bold text mb-2">Active Boosts</h1>
                        <p className="text-gray-600 text-xl">Your currently active property boosts and their performance.</p>
                    </div>

                    {/* Table */}
                    <div className="rounded-lg overflow-hidden border border-gray-200  ">
                        <table className="w-full">
                            <thead className="bg-[#0A3161]  text-white">
                                <tr className="">
                                    <th className="px-6 py-4 text-left text-sm font-medium">Property</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium">Location</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium">Boost Type</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium">Time Remaining</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium">Status</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium">View</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {boostsData.map((boost, index) => (
                                    <tr key={boost.id} className={index % 2 === 0 ? "" : "bg-gray-50"}>
                                        <td className="px-6 py-4 text-sm text-gray-900">{boost.property}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600 flex items-center">
                                            <TfiWorld className="mr-2" />
                                            {boost.location}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{boost.boostType}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600 flex items-center">
                                            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                            {boost.timeRemaining}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#10B981] text-green-100">
                                                {boost.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">{boost.view}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

