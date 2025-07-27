



import { useState } from "react";
import { BsCalculator } from "react-icons/bs";

export default function BuyerCostCalculation() {
  const [activeTab, setActiveTab] = useState("basic");

  // Basic Info State
  const [landCost, setLandCost] = useState("0");
  const [buildingCost, setBuildingCost] = useState("0");
  const [permitCost, setPermitCost] = useState("0");
  const [utilityConnections, setUtilityConnections] = useState("0");
  const [roadAccess, setRoadAccess] = useState("0");
  const [buildingQuality, setBuildingQuality] = useState("standard");
  const [locationType, setLocationType] = useState("suburban");

  // Advanced Options State
  const [foundationType, setFoundationType] = useState("");
  const [roofType, setRoofType] = useState("");
  const [stories, setStories] = useState("");
  const [garageType, setGarageType] = useState("");

  const [costs, setCosts] = useState({
    landCost: 0,
    buildingCost: 0,
    permitCost: 0,
    utilityConnections: 0,
    roadAccess: 0,
  });

  const calculateCosts = () => {
    // Use direct input values from Basic Info tab
    const newLandCost = Number.parseFloat(landCost) || 0;
    const newBuildingCost = Number.parseFloat(buildingCost) || 0;
    const newPermitCost = Number.parseFloat(permitCost) || 0;
    const newUtilityConnections = Number.parseFloat(utilityConnections) || 0;
    const newRoadAccess = Number.parseFloat(roadAccess) || 0;

    // Apply multipliers for advanced options
    const foundationMultiplier = {
      "concrete-slab": 1.0,
      "crawl-space": 1.1,
      "full-basement": 1.3,
      "pier-beam": 1.05,
    }[foundationType] || 1.0;

    const roofMultiplier = {
      "asphalt-shingles": 1.0,
      metal: 1.2,
      tile: 1.4,
      slate: 1.8,
    }[roofType] || 1.0;

    const storiesMultiplier = stories ? Number.parseFloat(stories) * 0.8 + 0.2 : 1.0;

    const qualityMultiplier = {
      basic: 0.8,
      standard: 1.0,
      premium: 1.3,
      luxury: 1.8,
    }[buildingQuality] || 1.0;

    const locationMultiplier = {
      urban: 1.2,
      suburban: 1.0,
      rural: 0.9,
    }[locationType] || 1.0;

    setCosts({
      landCost: Math.round(newLandCost * locationMultiplier),
      buildingCost: Math.round(newBuildingCost * foundationMultiplier * roofMultiplier * storiesMultiplier * qualityMultiplier * locationMultiplier),
      permitCost: Math.round(newPermitCost),
      utilityConnections: Math.round(newUtilityConnections),
      roadAccess: Math.round(newRoadAccess * (locationType === "rural" ? 2 : 1)),
    });
  };

  const totalCost = Object.values(costs).reduce((sum, cost) => sum + cost, 0);

  return (
    <div className="bg-gray-50 py-10">
      <div className="bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="text text-3xl rounded flex items-center justify-center">
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
                  <div className="flex mb-6 p-2 bg-[#E8EBF3] border border-gray-300 rounded-md overflow-hidden">
                    <button
                      onClick={() => setActiveTab("basic")}
                      className={`flex-1 text-xl py-3 px-4 font-medium rounded cursor-pointer ${
                        activeTab === "basic" ? "bg text-white" : "text-gray-700"
                      }`}
                    >
                      Basic Info
                    </button>
                    <button
                      onClick={() => setActiveTab("advanced")}
                      className={`flex-1 text-xl py-3 px-4 font-medium rounded cursor-pointer ${
                        activeTab === "advanced" ? "bg text-white" : "text-gray-700"
                      }`}
                    >
                      Advanced options
                    </button>
                  </div>

                  {/* Basic Info Tab */}
                  {activeTab === "basic" && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 text-[20px] mb-2">Land Cost ($):</label>
                        <input
                          type="number"
                          placeholder="Enter land cost"
                          
                          onChange={(e) => setLandCost(e.target.value)}
                          className="w-full p-3 border border-gray-300 text-gray-800 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 text-[20px] mb-2">Building Cost ($):</label>
                        <input
                          type="number"
                          placeholder="Enter building cost"
                         
                          onChange={(e) => setBuildingCost(e.target.value)}
                          className="w-full p-3 border border-gray-300 text-gray-800 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 text-[20px] mb-2">Permit Cost ($):</label>
                        <input
                          type="number"
                          placeholder="Enter permit cost"
                        
                          onChange={(e) => setPermitCost(e.target.value)}
                          className="w-full p-3 border border-gray-300 text-gray-800 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 text-[20px] mb-2">Utility Connections ($):</label>
                        <input
                          type="number"
                          placeholder="Enter utility connections cost"
                         
                          onChange={(e) => setUtilityConnections(e.target.value)}
                          className="w-full p-3 border border-gray-300 text-gray-800 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 text-[20px] mb-2">Road Access ($):</label>
                        <input
                          type="number"
                          placeholder="Enter road access cost"
                          
                          onChange={(e) => setRoadAccess(e.target.value)}
                          className="w-full p-3 border border-gray-300 text-gray-800 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                    

                     
                    </div>
                  )}

                  {/* Advanced Options Tab */}
                  {activeTab === "advanced" && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-[20px] font-medium text-gray-700 mb-2">Foundation Type</label>
                        <select
                          value={foundationType}
                          onChange={(e) => setFoundationType(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 text-gray-800 focus:ring-blue-500 appearance-none bg-white"
                        >
                          <option value="">Select foundation type</option>
                          <option value="concrete-slab">Concrete Slab</option>
                          <option value="crawl-space">Crawl Space</option>
                          <option value="full-basement">Full Basement</option>
                          <option value="pier-beam">Pier & Beam</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-medium text-[20px] mb-2">Roof Type</label>
                        <select
                          value={roofType}
                          onChange={(e) => setRoofType(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 text-gray-800 focus:ring-blue-500 appearance-none bg-white"
                        >
                          <option value="">Select roof type</option>
                          <option value="asphalt-shingles">Asphalt Shingles</option>
                          <option value="metal">Metal Roofing</option>
                          <option value="tile">Tile Roofing</option>
                          <option value="slate">Slate Roofing</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[20px] font-medium text-gray-700 mb-2">Number Of Stories</label>
                        <select
                          value={stories}
                          onChange={(e) => setStories(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 text-gray-800 focus:ring-blue-500 appearance-none bg-white"
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
                        <label className="block text-[20px] font-medium text-gray-700 mb-2">Garage Type</label>
                        <select
                          value={garageType}
                          onChange={(e) => setGarageType(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 text-gray-800 focus:ring-blue-500 appearance-none bg-white"
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

                  <button
                    onClick={calculateCosts}
                    className="w-full mt-6 bg cursor-pointer text-white font-medium py-3 px-4 rounded-md hover:bg-blue-600 transition-colors"
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
                  <h2 className="text-xl font-semibold text-gray-800">Cost Breakdown</h2>
                  <p className="text-sm text-gray-600 mt-1">Estimated costs based on your inputs</p>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center py-2">
                    <span className="text font-semibold">Land Cost:</span>
                    <span className="font-semibold text-gray-800">${costs.landCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text font-semibold">Building Cost:</span>
                    <span className="font-semibold text-gray-800">${costs.buildingCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text font-semibold">Permit Cost:</span>
                    <span className="font-semibold text-gray-800">${costs.permitCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text font-semibold">Utility Connections:</span>
                    <span className="font-semibold text-gray-800">${costs.utilityConnections.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text font-semibold">Road Access:</span>
                    <span className="font-semibold text-gray-800">${costs.roadAccess.toLocaleString()}</span>
                  </div>
                  <div className="bg text-white p-6 rounded-lg mt-6">
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
  );
}
