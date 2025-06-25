"use client"

import { Award, Badge, BadgeCheck } from "lucide-react"
import { useState } from "react"
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5"
import { Link } from "react-router-dom"

export default function BuyerRegistration() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1 - Personal Information
    profilePhoto: null,
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",

    // Step 2 - Password
    password: "",
    confirmPassword: "",

    // Step 3 - Verification Requirements
    emailVerification: false,
    phoneVerification: false,
    addressVerification: false,

    // Step 4 - Terms & Agreement
    agreeToTerms: false,
    agreeToPrivacy: false,
    acceptResponsibility: false,
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const steps = [
    { id: 1, name: "Personal Information" },
    { id: 2, name: "Address" },
    { id: 3, name: "Security" },
    { id: 4, name: "Terms & Agreement" },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setFormData((prev) => ({
          ...prev,
          profilePhoto: event.target.result,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    } else {
      // Complete registration
      console.log("Registration completed:", formData)
      setCurrentStep(5) // Success page
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleGoToLogin = () => {
    console.log("Navigate to buyer login")
  }

  const handleRunToHome = () => {
    console.log("Navigate to home")
  }

  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
    "Japan",
    "Brazil",
    "India",
    "China",
    "Mexico",
    "Italy",
    "Spain",
    "Netherlands",
    "Sweden",
  ]


  // Success Page
  if (currentStep === 5) {
    return (
      <div className="min-h-screen bg-yellow-50/90 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-12 text-center max-w-3xl w-full">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl font-bold text mb-4">Account Created Successfully!</h1>
          <p className="text-gray-600 mb-8">
            Your seller account has been created. You can now access your seller dashboard.
          </p>

          <div className="flex flex-col gap-6 w-1/2 mx-auto">
            <Link to="/login">
              <button
                onClick={handleGoToLogin}
                className="w-full px-6 py-3 bg cursor-pointer font-medium rounded-lg hover:bg focus:outline-none focus:ring-2 text-white  focus:ring-offset-2 transition-all duration-200"
              >
                Go To Buyer login
              </button>
            </Link>
            <Link to="/">
              <button
                onClick={handleRunToHome}
                className="w-full px-6 py-3 cursor-pointer border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 text-gray-800 text-gray-800 focus:ring-[#1C3988]  focus:ring-offset-2 transition-all duration-200"
              >
                Go to buyer dashboard
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-yellow-50/90 p-6">
      <div className="max-w-7xl h-full  mx-auto">
        <div className="bg-white rounded-2xl border border-[#1C3988] shadow-sm p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text mb-8">Create Your Buyer Account</h1>

            {/* Progress Circles */}




            <div className="flex items-center justify-center gap-10 space-x-8 mb-8">
              {steps.map((step) => (
                <div key={step.id} className="flex flex-col items-center">
                  <div className="relative w-12 h-12 mb-2"> {/* Increased to w-12 h-12 (48px x 48px) */}
                    {/* Badge Icon */}
                    <Badge
                      className={`w-12 h-12 ${currentStep >= step.id ? "text" : "text-gray-300"} ${currentStep === step.id ? "" : ""
                        }`}
                    >
                      {/* Empty for now, content will come from the span */}
                    </Badge>
                    {/* Number Overlay with Checkmark */}
                    <span
                      className={`absolute inset-0 flex items-center justify-center text-xl font-bold ${currentStep > step.id ? "text-gray-500" : "text-gray-400"}`} // Adjusted text size and color
                    >
                      {currentStep > step.id ? (
                        <svg
                          className="w-5 h-5 text" // Increased SVG size to match larger badge
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <span className={`text-xl ${currentStep >= step.id ? "text" : "text-gray-400"}`}>
                          {step.id}
                        </span>
                      )}
                    </span>
                  </div>
                  <span
                    className={`text-xs ${currentStep >= step.id ? "text" : "text-gray-400"}`}
                  >
                    {step.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="md:w-2/3 mx-auto bg-gray-200 h-2 rounded-full">
              <div
                className="bg h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Step 1 - Personal Information */}
          {currentStep === 1 && (


            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2" style={{ color: "#1C3988" }}>
                  Buyer Registration
                </h2>
                <p className="text-xl text-gray-600">
                  Create Your Buyer Account To Start Browsing Properties And Participate In Shared Ownership
                  Opportunities
                </p>
              </div>

              <div className="space-y-6">
                {/* Profile Photo */}
                <div>
                  <label className="block text-xl font-medium mb-4" style={{ color: "#1C3988" }}>
                    Profile Photo
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#1C3988] transition-colors duration-200">
                    {formData.profilePhoto ? (
                      <div className="flex flex-col items-center">
                        <img
                          src={formData.profilePhoto || "/placeholder.svg"}
                          alt="Profile"
                          className="w-20 h-20 object-cover rounded-full mb-4"
                        />
                        <label className="cursor-pointer text-xl hover:text" style={{ color: "#1C3988" }}>
                          Change Profile Photo
                          <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                        </label>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                          <svg
                            className="w-6 h-6"
                            style={{ color: "#1C3988" }}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                        </div>
                        <label
                          className="cursor-pointer text-xl font-medium hover:text"
                          style={{ color: "#1C3988" }}
                        >
                          Upload Profile Photo
                          <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xl font-medium mb-2" style={{ color: "#1C3988" }}>
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="first name"
                      className="w-full px-3 py-3 border border-gray-300 rounded-md focus:ring-2 text-gray-800 focus:ring-[#1C3988] focus:border-[#1C3988]  outline-none text-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-xl font-medium mb-2" style={{ color: "#1C3988" }}>
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="last name"
                      className="w-full px-3 py-3 border border-gray-300 rounded-md focus:ring-2 text-gray-800 focus:ring-[#1C3988] focus:border-[#1C3988] outline-none text-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xl font-medium mb-2" style={{ color: "#1C3988" }}>
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="email"
                      className="w-full px-3 py-3 border border-gray-300 rounded-md focus:ring-2 text-gray-800 focus:ring-[#1C3988] focus:border-[#1C3988]  outline-none text-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-xl font-medium mb-2" style={{ color: "#1C3988" }}>
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      placeholder="number"
                      className="w-full px-3 py-3 border border-gray-300 rounded-md focus:ring-2 text-gray-800 focus:ring-[#1C3988] focus:border-[#1C3988] outline-none text-xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2 - Password */}
          {currentStep === 2 && (
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text mb-2">Buyer Registration</h2>
                <p className="text-zl text-gray-600">
                  Create Your Buyer Account To Start Browsing Properties And Participate In Shared Ownership
                  Opportunities
                </p>
              </div>

              <div className="space-y-6">
                {/* Street Address */}
                <div>
                  <label className="block text-xl font-medium text mb-2">Street Address</label>
                  <input
                    type="text"
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleInputChange}
                    placeholder="Enter your street address"
                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:ring-2 text-gray-800 text-gray-800 focus:ring-[#1C3988] focus:border-[#1C3988] outline-none text-xl"
                  />
                </div>

                {/* City and State/Province */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xl font-medium text mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Enter your city"
                      className="w-full px-3 py-3 border border-gray-300 rounded-md focus:ring-2 text-gray-800 text-gray-800 focus:ring-[#1C3988]  focus:border-[#1C3988]  outline-none text-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-xl font-medium text mb-2">State/Province</label>
                    <input
                      type="text"
                      name="stateProvince"
                      value={formData.stateProvince}
                      onChange={handleInputChange}
                      placeholder="Enter your state/province"
                      className="w-full px-3 py-3 border border-gray-300 rounded-md focus:ring-2 text-gray-800 text-gray-800 focus:ring-[#1C3988]  focus:border-[#1C3988]  outline-none text-xl"
                    />
                  </div>
                </div>

                {/* Zip/Postal Code and Country */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xl font-medium text mb-2">Zip/Postal Code</label>
                    <input
                      type="text"
                      name="zipPostalCode"
                      value={formData.zipPostalCode}
                      onChange={handleInputChange}
                      placeholder="Enter zip/postal code"
                      className="w-full px-3 py-3 border border-gray-300 rounded-md focus:ring-2 text-gray-800 text-gray-800 focus:ring-[#1C3988]  focus:border-[#1C3988]  outline-none text-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-xl font-medium text mb-2">Country</label>
                    <div className="relative">
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full px-3 py-3 border border-gray-300 rounded-md focus:ring-2 text-gray-800 text-gray-800 focus:ring-[#1C3988]  focus:border-[#1C3988]  outline-none text-xl bg-white appearance-none cursor-pointer"
                      >
                        <option value="">Select your country</option>
                        {countries.map((country) => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3 - Verification Requirements */}
          {currentStep === 3 && (
            <div>

              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text mb-2">Buyer Registration</h2>
                  <p className="text-xl text-gray-600">
                    Create Your Buyer Account To Start Browsing Properties And Participate In Shared Ownership
                    Opportunities
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xl font-medium text mb-1">Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          placeholder="Enter your password"
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2  text-gray-800 focus:ring-[#1C3988]  focus:border-[#1C3988]  outline-none text-xl pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                        </button>

                      </div>
                    </div>
                    <div>
                      <label className="block text-xl font-medium text mb-1">Confirm Password</label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 text-gray-800 text-gray-800 focus:ring-[#1C3988]  focus:border-[#1C3988]  outline-none text-xl pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                        </button>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-5">
                <h3 className="text-xl font-semibold text mb-4">Verification Requirements</h3>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="emailVerification"
                      checked={formData.emailVerification}
                      onChange={handleInputChange}
                      className="w-4 h-4 text border-gray-300 rounded focus:ring-[#1C3988] "
                    />
                    <span className="text-xl text">Email verification required after registration</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="phoneVerification"
                      checked={formData.phoneVerification}
                      onChange={handleInputChange}
                      className="w-4 h-4 text border-gray-300 rounded focus:ring-[#1C3988] "
                    />
                    <span className="text-xl text">Phone verification required for full account access</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="addressVerification"
                      checked={formData.addressVerification}
                      onChange={handleInputChange}
                      className="w-4 h-4 text border-gray-300 rounded focus:ring-[#1C3988] "
                    />
                    <span className="text-xl text">
                      Address verification required for property transactions
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Step 4 - Terms & Agreement */}
          {currentStep === 4 && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text mb-2">Trust & Responsibility Agreement</h2>
                <p className="text-xl text-gray-600">
                  Please Review And Accept Our Terms And Conditions To Complete Your Registration
                </p>
              </div>

              <div className="space-y-6">
                {/* Important Notice */}
                <div className="bg-orange-100 border border-orange-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <svg
                      className="w-20 h-20 text-orange-700 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      <h3 className="text-2xl font-bold text-orange-700 mb-1">Important Notice</h3>
                      <p className="text-xl text-orange-700">
                        Your safety and security are our top priorities. Our platform utilizes the highest level of
                        encryption and security protocols to protect your personal information and financial data.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Platform Terms */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="text-xl font-semibold text mb-3">Platform Terms of Service</h3>
                  <div className="text-xs text-gray-700 space-y-2">
                    <p>
                      Welcome to — a land listing and connection platform. Our mission is to offer verified listing
                      space, affordable access to co-buying opportunities, and a smart way to explore land deals
                      globally.
                    </p>
                    <p className="text text-xl">We do not:</p>
                    <ul className="list-disc list-inside space-y-1 ml-3 text-xs">
                      <li>Hold or transfer any funds</li>
                      <li>Facilitate or guarantee any transactions</li>
                      <li>Provide legal advice or legal transactions</li>
                      <li>Act as a broker, legal agent, or real estate advisor</li>
                    </ul>
                    <p className="text text-xl">All users are 100% responsible for:</p>
                    <ul className="list-disc list-inside space-y-1 ml-3 text-xs">
                      <li>Performing due diligence</li>
                      <li>Hiring their own real estate lawyer or licensed professional</li>
                      <li>Conducting all transactions with public records or land registry</li>
                    </ul>
                    <p className="text text-xl">We strongly advise:</p>
                    <ul className="list-disc list-inside space-y-1 ml-3 text-xs">
                      <li>Consulting with a qualified real estate professional or legal channels</li>
                      <li>Using our provided lawyer list as a starting point for guidance</li>
                      <li>Treating all property decisions as your own independent choice</li>
                    </ul>
                    <p className="text text-xl">What we provide:</p>
                    <ul className="list-disc list-inside space-y-1 ml-3 text-xs">
                      <li>A tool to discover and list land</li>
                      <li>A system to connect multiple co-buyers</li>
                      <li>A professional calculator to estimate the investment cost</li>
                      <li>A comprehensive directory to help deals happen faster</li>
                      <li>Easier access to land ownership for people with limited budgets</li>
                    </ul>
                  </div>
                </div>

                {/* Agreement Checkboxes */}
                <div className="space-y-3">
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      className="w-4 h-4 text border-gray-300 rounded focus:ring-[#1C3988]  mt-1"
                    />
                    <span className="text-xl text-gray-700">
                      <strong>I agree to the Terms of Service</strong>
                      <br />I have read and agree to the Terms of Service and understand my responsibilities as a seller
                      on the platform
                    </span>
                  </label>
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      name="agreeToPrivacy"
                      checked={formData.agreeToPrivacy}
                      onChange={handleInputChange}
                      className="w-4 h-4 text border-gray-300 rounded focus:ring-[#1C3988]  mt-1"
                    />
                    <span className="text-xl text-gray-700">
                      <strong>I agree to the Privacy Policy</strong>
                      <br />I understand how my data will be used and stored as described in the Privacy Policy
                    </span>
                  </label>
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      name="acceptResponsibility"
                      checked={formData.acceptResponsibility}
                      onChange={handleInputChange}
                      className="w-4 h-4 text border-gray-300 rounded focus:ring-[#1C3988]  mt-1"
                    />
                    <span className="text-xl text-gray-700">
                      <strong>I accept full responsibility</strong>
                      <br />I understand that VerifiedLand is not liable for any outcomes related to real deals,
                      conversations, or transactions between users.
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`px-8 py-2 text-white font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 text-gray-800 text-gray-800 focus:ring-offset-2
    ${currentStep === 1
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg hover:bg-blue-700 focus:ring-[#1C3988] "}
  `}
            >
              Back
            </button>

            <button
              onClick={handleNext}
              className="px-8 py-2 cursor-pointer bg text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 text-gray-800 text-gray-800 focus:ring-[#1C3988]  focus:ring-offset-2 transition-all duration-200"
            >
              {currentStep === 4 ? "Complete Registration" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
