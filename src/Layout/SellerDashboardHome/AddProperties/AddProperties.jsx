


// AddProperties.jsx
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropertyDetails from "./PropertyDetails";
import MediaImages from "./MediaImages";
import LocationInfo from "./LocationInfo";
import PricingOptions from "./PricingOptions";
import PreviewListing from "./PreviewListing";

const tabs = [
  { id: "details", label: "Property Details" },
  { id: "media", label: "Media & Images" },
  { id: "location", label: "Location" },
  { id: "pricing", label: "Pricing & options" },
  { id: "preview", label: "Preview" },
];

export default function AddProperties() {
  const [activeTab, setActiveTab] = useState("details");
  const [formData, setFormData] = useState({
    title: "",
    land_size: "",
    property_type: "",
    description: "",
    features: [],
    main_image: null,
    drone_shots: null,
    country: "",
    state_province: "",
    city: "",
    street_address: "",
    postal_code: "",
    latitude: "",
    longitude: "",
    price: "",
    allow_down_payment: false,
    lock_period: "",
    buy_share: false,
    // boost_type: "",
    featured_listing: false,
    boostOptions: {
      dailyBoost: false,
      weeklyBoost: false,
      featuredListing: false,
    },
  });

  const tabIds = tabs.map((tab) => tab.id);

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

  const sharedProps = {
    onNext: handleNext,
    onBack: handleBack,
    formData,
    setFormData,
    toast,
  };

  const renderContent = () => {
    switch (activeTab) {
      case "details":
        return <PropertyDetails {...sharedProps} />;
      case "media":
        return <MediaImages {...sharedProps} />;
      case "location":
        return <LocationInfo {...sharedProps} />;
      case "pricing":
        return <PricingOptions {...sharedProps} />;
      case "preview":
        return <PreviewListing {...sharedProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full mx-auto p-6">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover />
      <div className="space-y-2 mb-6">
        <h1 className="text text-4xl font-bold">Add New Property</h1>
        <p className="text-gray-500 text-xl">
          Create a new property listing to showcase to potential buyers.
        </p>
      </div>
      <div className="flex flex-wrap gap-1 mb-6 bg-[#E8EBF3] border border-[#1C3988] p-2 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 min-w-fit px-4 py-3 rounded-md font-medium transition-all cursor-pointer ${
              activeTab === tab.id
                ? "bg-[#1C3988] font-semibold text-xl text-white shadow-sm"
                : "text font-semibold text-xl hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="min-h-[400px]">{renderContent()}</div>
    </div>
  );
}