

import { useState, useEffect } from "react"
import { BsCalculator } from "react-icons/bs"

export default function BuyerCostCalculation() {
    const [activeTab, setActiveTab] = useState("basic")

    // Basic Info State (from the image)
    const [landSize, setLandSize] = useState("100000")
    const [landSizeAcres, setLandSizeAcres] = useState("")
    const [buildingSize, setBuildingSize] = useState("2000")
    const [buildingQuality, setBuildingQuality] = useState("standard")
    const [locationType, setLocationType] = useState("suburban")

    // Advanced Options State (from original images)
    const [foundationType, setFoundationType] = useState("")
    const [roofType, setRoofType] = useState("")
    const [stories, setStories] = useState("")
    const [garageType, setGarageType] = useState("")

    const [costs, setCosts] = useState({
        landCost: 100000,
        buildingCost: 300000,
        permitCost: 6000,
        utilityConnections: 10000,
        roadAccess: 6000,
    })

    const calculateCosts = () => {
        const baseBuildingCost = 200000
        const baseLandCost = 80000

        // Foundation type multiplier
        const foundationMultiplier =
            {
                "concrete-slab": 1.0,
                "crawl-space": 1.1,
                "full-basement": 1.3,
                "pier-beam": 1.05,
            }[foundationType] || 1.0

        // Roof type multiplier
        const roofMultiplier =
            {
                "asphalt-shingles": 1.0,
                metal: 1.2,
                tile: 1.4,
                slate: 1.8,
            }[roofType] || 1.0

        // Stories multiplier
        const storiesMultiplier = stories ? Number.parseFloat(stories) * 0.8 + 0.2 : 1.0

        // Building size impact
        const buildingSizeNum = buildingSize ? Number.parseFloat(buildingSize) : 2000
        const sizeMultiplier = buildingSizeNum / 2000

        // Quality multiplier
        const qualityMultiplier =
            {
                basic: 0.8,
                standard: 1.0,
                premium: 1.3,
                luxury: 1.8,
            }[buildingQuality] || 1.0

        // Location multiplier
        const locationMultiplier =
            {
                urban: 1.2,
                suburban: 1.0,
                rural: 0.9,
            }[locationType] || 1.0

        // Land size impact
        const landSizeNum = landSize ? Number.parseFloat(landSize) : 100000
        const landMultiplier = Math.sqrt(landSizeNum / 100000)

        const newBuildingCost = Math.round(
            baseBuildingCost *
            foundationMultiplier *
            roofMultiplier *
            storiesMultiplier *
            sizeMultiplier *
            qualityMultiplier *
            locationMultiplier,
        )

        const newLandCost = Math.round(baseLandCost * landMultiplier * locationMultiplier)

        setCosts({
            landCost: newLandCost,
            buildingCost: newBuildingCost,
            permitCost: Math.round(newBuildingCost * 0.02),
            utilityConnections: Math.round(8000 + (buildingSizeNum - 2000) * 2),
            roadAccess: locationType === "rural" ? 12000 : 6000,
        })
    }

    useEffect(() => {
        calculateCosts()
    }, [
        foundationType,
        roofType,
        stories,
        garageType,
        landSize,
        landSizeAcres,
        buildingSize,
        buildingQuality,
        locationType,
    ])

    const totalCost = Object.values(costs).reduce((sum, cost) => sum + cost, 0)

    return (
        <div className="bg-gray-50 py-10">
            <div className=" bg-gray-50 p-4">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-2">
                            <div className=" text text-3xl  rounded flex items-center justify-center">
                                <BsCalculator />
                            </div>
                            <h1 className="text-3xl font-bold text">Construction Cost Calculator</h1>
                        </div>
                        <p className="text-gray-600">
                            Estimate The Cost Of Building On Your Land With Our Construction Cost Calculator. This Tool Provides A Rough
                            Estimate Based On Your Inputs.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Left Panel - Property Details Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                                <div className="p-6 border-b border-gray-200">
                                    <h2 className="text-xl font-semibold text">Property Details</h2>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Enter the details of your property and construction project
                                    </p>
                                </div>
                                <div className="p-6">
                                    {/* Tabs */}
                                    <div className="flex mb-6
                p-2 bg-[#E8EBF3] border border-gray-300 rounded-md overflow-hidden">
                                        <button
                                            onClick={() => setActiveTab("basic")}
                                            className={`flex-1 text-xl py-3 px-4  font-medium rounded cursor-pointer ${activeTab === "basic" ? "bg text-white" : "  text-gray-700 "
                                                }`}
                                        >
                                            Basic Info
                                        </button>
                                        <button
                                            onClick={() => setActiveTab("advanced")}
                                            className={`flex-1 text-xl py-3 px-4  font-medium rounded cursor-pointer ${activeTab === "advanced" ? "bg text-white" : " text-gray-700 "
                                                }`}
                                        >
                                            Advanced options
                                        </button>
                                    </div>

                                    {/* Basic Info Tab */}
                                    {activeTab === "basic" && (
                                        <div className="space-y-6">
                                            <div>
                                                <label className="block text-sm font-medium text text-[20px] mb-2">Land Size ($)</label>
                                                <input
                                                    type="number"
                                                    placeholder="land size"
                                                    value={landSize}
                                                    onChange={(e) => setLandSize(e.target.value)}
                                                    className="w-full p-3 border border-gray-300 text-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 "
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text text-[20px] mb-2">Land Size (Acres)</label>
                                                <input
                                                    type="number"
                                                    step="0.1"
                                                    placeholder="land size (acres)"
                                                    value={landSizeAcres}
                                                    onChange={(e) => setLandSizeAcres(e.target.value)}
                                                    className="w-full p-3 border border-gray-300 text-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 "
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text text-[20px] mb-2">
                                                    Building Size (Square Feet)
                                                </label>
                                                <input
                                                    type="number"
                                                    placeholder="Select Building Size"
                                                    value={buildingSize}
                                                    onChange={(e) => setBuildingSize(e.target.value)}
                                                    className="w-full p-3 border border-gray-300 text-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 "
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text text-[20px] mb-2">Building Quality</label>
                                                <div className="relative">
                                                    <select
                                                        value={buildingQuality}
                                                        onChange={(e) => setBuildingQuality(e.target.value)}
                                                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 text-gray-800 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                                                    >
                                                        <option value="basic">Basic (Good Quality)</option>
                                                        <option value="standard">Standard (Good Quality)</option>
                                                        <option value="premium">Premium (High Quality)</option>
                                                        <option value="luxury">Luxury (Premium Quality)</option>
                                                    </select>
                                                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text text-[20px] mb-2">Location Type</label>
                                                <input
                                                    type="text"
                                                    placeholder="Select Location Type"
                                                    value={landSize}
                                                    onChange={(e) => setLandSize(e.target.value)}
                                                    className="w-full p-3 border border-gray-300 text-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 "
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* Advanced Options Tab */}
                                    {activeTab === "advanced" && (
                                        <div className="space-y-6">
                                            <div>
                                                <label className="block text text-[20px]  font-medium text-gray-700 mb-2">Foundation Type</label>
                                                <select
                                                    value={foundationType}
                                                    onChange={(e) => setFoundationType(e.target.value)}
                                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 text-gray-800 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                                                >
                                                    <option value="">Select foundation type</option>
                                                    <option value="concrete-slab">Concrete Slab</option>
                                                    <option value="crawl-space">Crawl Space</option>
                                                    <option value="full-basement">Full Basement</option>
                                                    <option value="pier-beam">Pier & Beam</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block  font-medium text text-[20px] mb-2">Roof Type</label>
                                                <select
                                                    value={roofType}
                                                    onChange={(e) => setRoofType(e.target.value)}
                                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 text-gray-800 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                                                >
                                                    <option value="">Select roof type</option>
                                                    <option value="asphalt-shingles">Asphalt Shingles</option>
                                                    <option value="metal">Metal Roofing</option>
                                                    <option value="tile">Tile Roofing</option>
                                                    <option value="slate">Slate Roofing</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text text-[20px]  font-medium text-gray-700 mb-2">Number Of Stories</label>
                                                <select
                                                    value={stories}
                                                    onChange={(e) => setStories(e.target.value)}
                                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 text-gray-800 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                                                >
                                                    <option value="">Select number of stories</option>
                                                    <option value="1">1 Story</option>
                                                    <option value="1.5">1.5 Story</option>
                                                    <option value="2">2 Story</option>
                                                    <option value="2.5">2.5 Story</option>
                                                    <option value="3">3 Story</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text text-[20px]  font-medium text-gray-700 mb-2">Garage Type</label>
                                                <select
                                                    value={garageType}
                                                    onChange={(e) => setGarageType(e.target.value)}
                                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 text-gray-800 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                                                >
                                                    <option value="">Select garage type</option>
                                                    <option value="none">No Garage</option>
                                                    <option value="1-car">1-Car Attached</option>
                                                    <option value="2-car">2-Car Attached</option>
                                                    <option value="3-car">3-Car Attached</option>
                                                    <option value="detached">Detached Garage</option>
                                                </select>
                                            </div>
                                        </div>
                                    )}

                                    <div>
                                        <label className="block text-[20px] font-medium text mb-4">Garage Type</label>
                                        <div className="space-y-4">
                                            {/* Slider */}
                                            <div className="relative">
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="2"
                                                    step="1"
                                                    value={garageType === "standard" ? 0 : garageType === "premium" ? 1 : 2}
                                                    onChange={(e) => {
                                                        const value = Number.parseInt(e.target.value)
                                                        setGarageType(value === 0 ? "standard" : value === 1 ? "premium" : "net-zero")
                                                    }}
                                                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer slider"
                                                    style={{
                                                        background: `linear-gradient(to right, #1C3988 0%, #1C3988 ${garageType === "standard" ? 33 : garageType === "premium" ? 66 : 100
                                                            }%, #d1d5db ${garageType === "standard" ? 33 : garageType === "premium" ? 66 : 100
                                                            }%, #d1d5db 100%)`,
                                                    }}
                                                />
                                                <style jsx>{`
                            .slider::-webkit-slider-thumb {
                              appearance: none;
                              height: 20px;
                              width: 20px;
                              border-radius: 50%;
                              background: #1C3988;
                              cursor: pointer;
                              border: 2px solid #ffffff;
                              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                            }
                            .slider::-moz-range-thumb {
                              height: 20px;
                              width: 20px;
                              border-radius: 50%;
                              background: #1C3988;
                              cursor: pointer;
                              border: 2px solid #ffffff;
                              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                            }
                          `}</style>
                                            </div>

                                            {/* Labels */}
                                            <div className="flex justify-between text-sm">
                                                <span
                                                    className={`${garageType === "standard" ? "text font-medium" : "text-gray-500"}`}
                                                >
                                                    Standard
                                                </span>
                                                <span
                                                    className={`${garageType === "premium" ? "text font-medium" : "text-gray-500"}`}
                                                >
                                                    Premium
                                                </span>
                                                <span
                                                    className={`${garageType === "net-zero" ? "text font-medium" : "text-gray-500"}`}
                                                >
                                                    Net Zero
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={calculateCosts}
                                        className="w-full mt-6 bg cursor-pointer text-white font-medium py-3 px-4 rounded-md transition-colors"
                                    >
                                        Calculate Estimate
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right Panel - Cost Breakdown */}
                        <div>
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                                <div className="p-6 border-b border-gray-200">
                                    <h2 className="text-xl font-semibold text">Property Details</h2>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Enter the details of your property and construction project
                                    </p>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text font-semibold">Land Cost:</span>
                                        <span className="font-semibold text">${costs.landCost.toLocaleString()}</span>
                                    </div>

                                    <div className="flex justify-between items-center py-2">
                                        <span className="text font-semibold">Building Cost:</span>
                                        <span className="font-semibold text">${costs.buildingCost.toLocaleString()}</span>
                                    </div>

                                    <div className="flex justify-between items-center py-2">
                                        <span className="text font-semibold ">Permit Cost:</span>
                                        <span className="font-semibold text">${costs.permitCost.toLocaleString()}</span>
                                    </div>

                                    <div className="flex justify-between items-center py-2">
                                        <span className="text font-semibold">Utility Connections:</span>
                                        <span className="font-semibold text">${costs.utilityConnections.toLocaleString()}</span>
                                    </div>

                                    <div className="flex justify-between items-center py-2">
                                        <span className="text font-semibold">Road Access:</span>
                                        <span className="font-semibold text">${costs.roadAccess.toLocaleString()}</span>
                                    </div>

                                    <div className="bg  text-white p-6 rounded-lg mt-6">
                                        <div className="text-center">
                                            <p className="text-sm opacity-90 mb-2">Total Estimated Cost</p>
                                            <p className="text-4xl font-bold">${totalCost.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
