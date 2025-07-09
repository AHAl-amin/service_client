import React, { useState, useRef } from "react";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";

const PropertyDetails = ({ onNext, onBack, formData, setFormData, toast }) => {
  const [features, setFeatures] = useState({
    waterAccess: false,
    electricity: false,
    roadAccess: false,
    sewerSystem: false,
    internetAvailable: false,
    scenicViews: false,
    featuresAmenities: false,
    featuresAmenitie: false,
  });

  const [showInput, setShowInput] = useState(false);
  const [newFeature, setNewFeature] = useState("");
  const customFeatureInput = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFeatures((prev) => ({ ...prev, [name]: checked }));
    setFormData((prev) => ({
      ...prev,
      features: checked
        ? [...prev.features, name]
        : prev.features.filter((f) => f !== name),
    }));
  };

  const handleCustomFeature = (e) => {
    if (e.key === "Enter" && e.target.value) {
      addNewFeature(e.target.value);
      e.target.value = "";
    }
  };

  const handleInputChangeFeature = (e) => {
    setNewFeature(e.target.value);
  };

  const addNewFeature = (value) => {
    if (value.trim()) {
      const newFeatureName = value.toLowerCase().replace(" ", "");
      setFeatures((prev) => ({
        ...prev,
        [newFeatureName]: false,
      }));
      setNewFeature("");
      setShowInput(false);
    }
  };

  const validateForm = () => {
    if (!formData.title) {
      toast.error("Property Title is required.");
      return false;
    }
    if (!formData.land_size) {
      toast.error("Land Size is required.");
      return false;
    }
    if (!formData.property_type) {
      toast.error("Property Type is required.");
      return false;
    }
    if (!formData.description) {
      toast.error("Description is required.");
      return false;
    }
    return true;
  };

  const handleNextClick = () => {
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div>
      <div className="mx-auto p-6 bg-[#FFFFFF] border border-[#1C3988] rounded-lg mt-10">
        <h2 className="text-2xl font-bold text mb-4">Basic Information</h2>
        <p className="text-gray-600 mb-4">Enter the basic details about your property.</p>

        <div className="">
          <div className="mb-4">
            <label className="block text-xl font-bold mb-2 text">Property Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-2 border text-gray-800 rounded"
              placeholder="Property Title"
            />
          </div>

          <div className="flex gap-6">
            <div className="mb-4 md:w-1/2">
              <label className="block text-xl font-bold mb-2 text">Land Size</label>
              <input
                type="text"
                name="land_size"
                value={formData.land_size}
                onChange={handleInputChange}
                className="w-full p-2 border rounded text-gray-800"
                placeholder="1000"
              />
            </div>

            <div className="mb-4 md:w-1/2">
              <label className="block text-xl font-bold mb-2 text">Property Type</label>
              <select
                name="property_type"
                value={formData.property_type}
                onChange={handleInputChange}
                className="appearance-none w-full p-2 border rounded text-gray-800"
              >
                <option value="" disabled className="text-gray-400">Select Property Type</option>
                <option value="land">Land</option>
                <option value="ranch">Ranch</option>
                <option value="farm">Farm</option>
                <option value="recreational">Recreational</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-xl font-bold mb-2 text">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded text-gray-800"
              placeholder="Enter your description"
            ></textarea>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-bold text mb-2">Features & Amenities</h3>
          <div className="grid md:grid-cols-4 grid-cols-2 gap-2 text">
            {[
              "Water Access",
              "Electricity",
              "Road Access",
              "Sewer System",
              "Internet Available",
              "Scenic Views",
              "Features & Amenities",
              "Features & Amenitie",
              ...Object.keys(features)
                .filter(
                  (key) =>
                    ![
                      "waterAccess",
                      "electricity",
                      "roadAccess",
                      "sewerSystem",
                      "internetAvailable",
                      "scenicViews",
                      "featuresAmenities",
                      "featuresAmenitie",
                    ].includes(key)
                )
                .map((key) =>
                  key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())
                ),
            ].map((feature) => (
              <label key={feature} className="flex items-center">
                <input
                  type="checkbox"
                  name={feature.toLowerCase().replace(" ", "")}
                  checked={features[feature.toLowerCase().replace(" ", "")]}
                  onChange={handleCheckboxChange}
                  className="mr-2 w-4 h-4 bg-white border-2 border-[#1C3988]"
                />
                {feature}
              </label>
            ))}
          </div>
          <div className="pt-5">
            {showInput ? (
              <div className="mb-2">
                <input
                  type="text"
                  className="w-full p-2 border rounded text-gray-800"
                  placeholder="Enter new feature"
                  ref={customFeatureInput}
                  value={newFeature}
                  onChange={handleInputChangeFeature}
                  onKeyPress={handleCustomFeature}
                />
                <button
                  className="font-semibold flex gap-1 items-center bg-[#1C3988] px-4 py-2 rounded-xl cursor-pointer text-white mt-2"
                  onClick={() => addNewFeature(newFeature)}
                >
                  <IoMdAdd className="size-5" /> Add
                </button>
              </div>
            ) : (
              <button
                className="font-semibold flex gap-1 items-center bg-[#1C3988] px-4 py-2 rounded-xl cursor-pointer text-white"
                onClick={() => setShowInput(true)}
              >
                <IoMdAdd className="size-5" /> Add Custom feature
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Link
          onClick={handleNextClick}
          className="bg-[#1C3988] text-white p-2 rounded-xl my-4 px-4 cursor-pointer"
        >
          Next
        </Link>
      </div>
    </div>
  );
};

export default PropertyDetails;


