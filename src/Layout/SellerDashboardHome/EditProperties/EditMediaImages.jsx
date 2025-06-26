

import { useState } from "react"

export default function EditMediaImages({ onNext, onBack }) {
  const [uploadedImages, setUploadedImages] = useState({
    mainProperty: null,
    aerialDrone: null,
    additional: [],
  })

  const handleImageUpload = (type, file) => {
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (type === "additional") {
          setUploadedImages((prev) => ({
            ...prev,
            additional: [...prev.additional, e.target.result],
          }))
        } else {
          setUploadedImages((prev) => ({
            ...prev,
            [type]: e.target.result,
          }))
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = (inputId) => {
    document.getElementById(inputId).click()
  }



  return (
    <div className=" ">
      <div className=" mx-auto">
        {/* Main Form Container */}
        <div className="bg-white rounded-2xl border border-[#1C3988] shadow-sm p-8">
          {/* Header */}
          <div className="mb-8 ">
            <h1 className="text-2xl font-bold text mb-2">Images & Media</h1>
            <p className="text-gray-500 text-[18px]">Upload high-quality images and media for your property</p>
          </div>

          {/* Upload Sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Main Property Image */}
            <div className="text-center">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-[#1C3988] transition-colors duration-200">
                {uploadedImages.mainProperty ? (
                  <img
                    src={uploadedImages.mainProperty || "/placeholder.svg"}
                    alt="Main Property"
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                  </div>
                )}
                <h3 className="text-xl font-medium text mb-3">Main Property Image</h3>
                <button
                  type="button"
                  onClick={() => triggerFileInput("mainPropertyInput")}
                  className="px-4 py-2 bg cursor-pointer text-white text-sm font-medium rounded-lg hover:border-[#1C3988] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                >
                  Upload Image
                </button>
                <input
                  id="mainPropertyInput"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload("mainProperty", e.target.files[0])}
                  className="hidden"
                />
              </div>
            </div>

            {/* Aerial/Drone Shot */}
            <div className="text-center">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8  hover:border-[#1C3988] transition-colors duration-200">
                {uploadedImages.aerialDrone ? (
                  <img
                    src={uploadedImages.aerialDrone || "/placeholder.svg"}
                    alt="Aerial/Drone Shot"
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                  </div>
                )}
                <h3 className="text-xl font-medium text mb-3">Aerial/Drone Shot</h3>
                <button
                  type="button"
                  onClick={() => triggerFileInput("aerialDroneInput")}
                  className="px-4 py-2 bg cursor-pointer text-white text-sm font-medium rounded-lg  hover:border-[#1C3988] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                >
                  Upload Image
                </button>
                <input
                  id="aerialDroneInput"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload("aerialDrone", e.target.files[0])}
                  className="hidden"
                />
              </div>
            </div>

            {/* Add Additional Picture */}
            <div className="text-center">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8  hover:border-[#1C3988] transition-colors duration-200">
                {uploadedImages.additional.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {uploadedImages.additional.slice(0, 4).map((img, index) => (
                      <img
                        key={index}
                        src={img || "/placeholder.svg"}
                        alt={`Additional ${index + 1}`}
                        className="w-full h-16 object-cover rounded"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                  </div>
                )}
                <h3 className="text-xl font-medium text mb-3">Add Additional Picture</h3>
                <button
                  type="button"
                  onClick={() => triggerFileInput("additionalInput")}
                  className="px-4 py-2 bg cursor-pointer text-white text-sm font-medium rounded-lg  hover:border-[#1C3988] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                >
                  Upload Image
                </button>
                <input
                  id="additionalInput"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    Array.from(e.target.files).forEach((file) => {
                      handleImageUpload("additional", file)
                    })
                  }}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          {/* Upload Guidelines */}
          <div className=" mb-8">
            <p className="text-sm text-orange-400">You Can Upload Up To 10 Images. Recommended Size: 1200x800 Pixels</p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-6">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 cursor-pointer"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back To Basic Information
          </button>

          <button
            type="button"
            onClick={onNext}
            className="px-8 py-3 bg cursor-pointer text-white font-medium rounded-lg  hover:border-[#1C3988] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
