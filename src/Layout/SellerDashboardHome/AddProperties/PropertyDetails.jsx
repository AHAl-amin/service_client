


import React, { useState, useRef } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { Link } from 'react-router-dom';

const PropertyDetails = ({onNext }) => {
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
  const [newFeature, setNewFeature] = useState('');
  const customFeatureInput = useRef(null);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFeatures((prev) => ({ ...prev, [name]: checked }));
  };

  const handleCustomFeature = (e) => {
    if (e.key === 'Enter' && e.target.value) {
      addNewFeature(e.target.value);
      e.target.value = '';
    }
  };

  const handleInputChange = (e) => {
    setNewFeature(e.target.value);
  };

  const addNewFeature = (value) => {
    if (value.trim()) {
      const newFeatureName = value.toLowerCase().replace(' ', '');
      setFeatures((prev) => ({
        ...prev,
        [newFeatureName]: false,
      }));
      setNewFeature('');
      setShowInput(false);
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
              className="w-full p-2 border text-gray-800 rounded"
              placeholder="Property Title"
            />
          </div>

          <div className="flex gap-6">
            <div className="mb-4 md:w-1/2">
              <label className="block text-xl font-bold mb-2 text">Land Size</label>
              <input
                type="text"
                className="w-full p-2 border rounded text-gray-800"
                placeholder="1000"
              />
            </div>

            <div className="mb-4 md:w-1/2">
              <label className="block text-xl font-bold mb-2 text">Property Type</label>
              <select className="appearance-none w-full p-2 border rounded text-gray-800">
                <option>Select Property Type</option>
                <option>Select Property Type</option>
                <option>Select Property Type</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-xl font-bold mb-2 text">Description</label>
            <textarea
              className="w-full p-2 border rounded text-gray-800"
              placeholder="text your massage"
            ></textarea>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-bold text mb-2">Features & Amenities</h3>
          <div className="grid md:grid-cols-4 grid-cols-2 gap-2 text">
            {[
              'Water Access',
              'Electricity',
              'Road Access',
              'Sewer System',
              'Internet Available',
              'Scenic Views',
              'Features & Amenities',
              'Features & Amenitie',
              ...Object.keys(features)
                .filter((key) => ![
                  'waterAccess',
                  'electricity',
                  'roadAccess',
                  'sewerSystem',
                  'internetAvailable',
                  'scenicViews',
                  'featuresAmenities',
                  'featuresAmenitie',
                ].includes(key))
                .map((key) => key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())),
            ].map((feature) => (
              <label key={feature} className="flex items-center">
                <input
                  type="checkbox"
                  name={feature.toLowerCase().replace(' ', '')}
                  checked={features[feature.toLowerCase().replace(' ', '')]}
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
                  onChange={handleInputChange}
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

      <div className="flex justify-end" onClick={onNext}>
        <Link  className="bg-[#1C3988] text-white p-2 rounded-xl my-4 px-4">
          Next
        </Link>
      </div>
    </div>
  );
};

export default PropertyDetails;