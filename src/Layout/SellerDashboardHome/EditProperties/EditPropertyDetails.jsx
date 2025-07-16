import { useState, useRef, useEffect } from 'react';
import { IoMdAdd } from 'react-icons/io';

const EditPropertyDetails = ({ onNext, onBack, propertyData, updatePropertyData }) => {
  const [features, setFeatures] = useState({});
  const [showInput, setShowInput] = useState(false);
  const [newFeature, setNewFeature] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    land_size: '',
    property_type: '',
    description: '',
  });
  const customFeatureInput = useRef(null);

  // Initialize formData and features with propertyData
  useEffect(() => {
    if (propertyData) {
      setFormData({
        title: propertyData.title || '',
        land_size: propertyData.land_size || '',
        property_type: propertyData.property_type || '',
        description: propertyData.description || '',
      });
      const initialFeatures = {};
      propertyData.features?.forEach((feature) => {
        initialFeatures[feature.name.toLowerCase().replace(' ', '')] = true;
      });
      setFeatures(initialFeatures);
    }
  }, [propertyData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedFormData = { ...prev, [name]: value };
      updatePropertyData({ ...propertyData, ...updatedFormData });
      return updatedFormData;
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFeatures((prev) => {
      const updatedFeatures = { ...prev, [name]: checked };
      const featuresArray = Object.keys(updatedFeatures)
        .filter((key) => updatedFeatures[key])
        .map((key) => ({ name: key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()) }));
      updatePropertyData({ ...propertyData, features: featuresArray });
      return updatedFeatures;
    });
  };

  const handleCustomFeature = (e) => {
    if (e.key === 'Enter' && e.target.value) {
      addNewFeature(e.target.value);
      e.target.value = '';
    }
  };

  const handleInputFeatureChange = (e) => {
    setNewFeature(e.target.value);
  };

  const addNewFeature = (value) => {
    if (value.trim()) {
      const newFeatureName = value.toLowerCase().replace(' ', '');
      setFeatures((prev) => {
        const updatedFeatures = { ...prev, [newFeatureName]: true };
        const featuresArray = Object.keys(updatedFeatures)
          .filter((key) => updatedFeatures[key])
          .map((key) => ({ name: key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()) }));
        updatePropertyData({ ...propertyData, features: featuresArray });
        return updatedFeatures;
      });
      setNewFeature('');
      setShowInput(false);
    }
  };

  if (!propertyData) {
    return <div>Loading property data...</div>;
  }

  return (
    <div>
      <div className="mx-auto p-6 bg-[#FFFFFF] border border-[#1C3988] rounded-lg mt-10">
        <h2 className="text-2xl font-bold text mb-4 text-start">Basic Information</h2>
        <p className="text-gray-600 mb-4 text-start">Enter the basic details about your property.</p>

        <div>
          <div className="mb-4">
            <label className="block text-xl font-bold mb-2 text text-start">Property Title</label>
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
              <label className="block text-xl font-bold mb-2 text text-start">Land Size</label>
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
              <label className="block text-xl font-bold mb-2 text text-start">Property Type</label>
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
            <label className="block text-xl font-bold mb-2 text text-start">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded text-gray-800"
              placeholder="Type your message"
            ></textarea>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-bold text mb-2 text-start">Features & Amenities</h3>
          <div className="grid md:grid-cols-4 grid-cols-2 gap-2 text">
            {Object.keys(features).map((feature) => (
              <label key={feature} className="flex items-center">
                <input
                  type="checkbox"
                  name={feature}
                  checked={features[feature]}
                  onChange={handleCheckboxChange}
                  className="mr-2 w-4 h-4 bg-white border-2 border-[#1C3988]"
                />
                {feature.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
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
                  onChange={handleInputFeatureChange}
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

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="px-8 py-3 bg-[#1C3988] text-white font-medium rounded-lg focus:outline-none focus:ring-2 cursor-pointer focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EditPropertyDetails;


