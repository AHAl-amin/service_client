

import { useState } from "react"
import PropertyDetails from "./PropertyDetails"
import MediaImages from "./MediaImages"
import LocationInfo from "./LocationInfo"
import PricingOptions from "./PricingOptions"
import PreviewListing from "./PreviewListing"


const tabs = [
  { id: "details", label: "Property Details" },
  { id: "media", label: "Media & Images" },
  { id: "location", label: "Location" },
  { id: "pricing", label: "Pricing & options" },
  { id: "preview", label: "Preview" },
]

export default function AddProperties() {
  const [activeTab, setActiveTab] = useState("details")

  const renderContent = () => {
    switch (activeTab) {
      case "details":
        return <PropertyDetails />
      case "media":
        return <MediaImages />
      case "location":
        return <LocationInfo />
      case "pricing":
        return <PricingOptions />
      case "preview":
        return <PreviewListing />
      default:
        return null
    }
  }

  return (
    <div className="w-full  mx-auto p-6">
        <div className="space-y-2 mb-6">
            <h1 className="text text-4xl font-bold">Add New Property</h1>
            <p className="text-gray-500 text-xl">Create a new property listing to showcase to potential buyers.</p>
        </div>
      <div className="flex flex-wrap gap-1 mb-6 bg-[#E8EBF3] border border-[#1C3988] p-2 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 min-w-fit px-4 py-3 rounded-md font-medium transition-all cursor-pointer ${
              activeTab === tab.id
                ? "bg font-semibold text-xl text-white shadow-sm"
                : "text font-semibold text-xl hover:text-gray-700 "
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="min-h-[400px]">{renderContent()}</div>
    </div>
  )
}
