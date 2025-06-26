

import { useState } from "react"
import EditPropertyDetails from "./EditPropertyDetails";
import EditMediaImages from "./EditMediaImages";
import EditPricingOptions from "./EditPricingOptions";
import EditPreviewListing from "./EditPreviewListing";
import EditLocationInfo from "./EditLocationInfo";


const tabs = [
  { id: "details", label: "Property Details" },
  { id: "media", label: "Media & Images" },
  { id: "location", label: "Location" },
  { id: "pricing", label: "Pricing & options" },
  { id: "preview", label: "Preview" },
]

export default function EditProperties() {

  const tabIds = tabs.map(tab => tab.id); 

const handleNext = () => {
  const currentIndex = tabIds.indexOf(activeTab);
  if (currentIndex < tabIds.length - 1) {
    setActiveTab(tabIds[currentIndex + 1]);
  }
};

const handleBack = () => {
  const currentIndex = tabIds.indexOf(activeTab);
  if (currentIndex > 0) {
    setActiveTab(tabIds[currentIndex - 1]);
  }
};

  const [activeTab, setActiveTab] = useState("details")



  const renderContent = () => {
  const sharedProps = { onNext: handleNext, onBack: handleBack };

  switch (activeTab) {
    case "details":
      return <EditPropertyDetails {...sharedProps} />;
    case "media":
      return <EditMediaImages {...sharedProps} />;
    case "location":
      return <EditLocationInfo {...sharedProps} />;
    case "pricing":
      return <EditPricingOptions {...sharedProps} />;
    case "preview":
      return <EditPreviewListing {...sharedProps} />;
    default:
      return null;
  }
};


  return (
    <div className=" p-6">
        <div className="space-y-2 mb-6 text-start">
            <h1 className="text text-4xl font-bold">Edit Your Property Details</h1>
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
