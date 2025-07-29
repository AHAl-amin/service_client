

"use client";

import { Badge } from "lucide-react";
import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useBuyerRegistrationMutation } from "../../redux/features/baseApi";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import { getNames } from "country-list";
// import { useBuyerRegistrationMutation } from "../../redux/features/baseApi.js"; 

export default function BuyerRegistration() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    profilePhoto: null,
    
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    password: "",
    confirmPassword: "",
    emailVerification: false,
    phoneVerification: false,
    addressVerification: false,
    agreeToTerms: false,
    agreeToPrivacy: false,
    acceptResponsibility: false,
    streetAddress: "",
    city: "",
    stateProvince: "",
    zipPostalCode: "",
    country: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [buyerRegistration, { isLoading, error, data }] = useBuyerRegistrationMutation(); // Use the mutation hook

  const steps = [
    { id: 1, name: "Personal Information" },
    { id: 2, name: "Address" },
    { id: 3, name: "Security" },
    { id: 4, name: "Terms & Agreement" },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({
          ...prev,
          profilePhoto: event.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = async () => {
    // Validation
    if (currentStep === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.contactNumber) {
        toast.error("Please fill in all required fields.");
        return;
      }
    }
    if (currentStep === 2) {
      if (!formData.streetAddress || !formData.city || !formData.zipPostalCode || !formData.country) {
        toast.error("Please fill in all required address fields.");
        return;
      }
    }
    if (currentStep === 3) {
      if (!formData.password || !formData.confirmPassword) {
       toast.error("Please enter and confirm your password.");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match.");
        return;
      }
    }
    if (currentStep === 4) {
      if (!formData.agreeToTerms || !formData.agreeToPrivacy || !formData.acceptResponsibility) {
        toast.error("Please accept all terms and agreements.");
        return;
      }
      // Prepare data for backend
      const userData = {
        email: formData.email,
        password: formData.password,
        password_confirm: formData.confirmPassword,
        first_name: formData.firstName,
        last_name: formData.lastName,
        contact_number: formData.contactNumber,
        street_address: formData.streetAddress,
        city: formData.city,
        state_province: formData.stateProvince,
        postal_code: formData.zipPostalCode,
        country: formData.country,
        
      };


try {
  const response = await buyerRegistration(userData).unwrap();
  toast.success("Registration successful!");
  console.log("Registration successful:", response);
  setCurrentStep(5); 
} catch (err) {
  console.error("Registration failed:", err);

 
  const emailError = err?.data?.errors?.email?.[0];

  if (emailError) {
    toast.error(emailError); 
    toast.error(err?.data?.message || "Registration failed!");
  }
}


      return;
    }
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGoToLogin = () => {
    console.log("Navigate to buyer login");
  };

  const handleRunToHome = () => {
    console.log("Navigate to home");
  };

 const countries = [
    {  value: null },
    ...getNames().sort().map(name => ({ name, value: name.toLowerCase() }))
  ];

  // Success Page
  if (currentStep === 5) {
    return (
      <div className="min-h-screen bg-yellow-50/90 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl border border-[#1C3988] shadow-sm p-12 text-center max-w-3xl w-full">
          <div className="mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-[#1C3988] mb-4">Account Created Successfully!</h1>
          <p className="text-gray-600 mb-8">
            Your buyer account has been created. You can now access your buyer dashboard to start browsing properties.
          </p>
          <div className="flex flex-col gap-6 w-1/2 mx-auto">
           
            <Link to="/login">
              <button
                onClick={handleRunToHome}
                className="w-full px-6 py-3 cursor-pointer border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1C3988] focus:ring-offset-2 transition-all duration-200"
              >
                Go to login
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-yellow-50/90 p-6">
      <div className="max-w-7xl h-full mx-auto">
        <div className="bg-white rounded-2xl border border-[#1C3988] shadow-sm p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[#1C3988] mb-8">Create Your Buyer Account</h1>
            <div className="flex items-center justify-center gap-10 space-x-8 mb-8">
              {steps.map((step) => (
                <div key={step.id} className="flex flex-col items-center">
                  <div className="relative w-12 h-12 mb-2">
                    <Badge
                      className={`w-12 h-12 ${currentStep >= step.id ? "text-[#1C3988]" : "text-gray-300"}`}
                    />
                    <span
                      className={`absolute inset-0 flex items-center justify-center text-xl font-bold ${
                        currentStep > step.id ? "text-[#1C3988]" : "text-gray-400"
                      }`}
                    >
                      {currentStep > step.id ? (
                        <svg className="w-5 h-5 text-[#1C3988]" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <span className={`text-xl ${currentStep >= step.id ? "text-[#1C3988]" : "text-gray-400"}`}>
                          {step.id}
                        </span>
                      )}
                    </span>
                  </div>
                  <span className={`text-xs ${currentStep >= step.id ? "text-[#1C3988]" : "text-gray-400"}`}>
                    {step.name}
                  </span>
                </div>
              ))}
            </div>
            <div className="md:w-2/3 mx-auto bg-gray-200 h-2 rounded-full">
              <div
                className="bg-[#1C3988] h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
              ></div>
            </div>
          </div>

          {currentStep === 1 && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-[#1C3988] mb-2">Personal Information</h2>
                <p className="text-xl text-gray-600">
                  Create Your Buyer Account To Start Browsing Properties And Participate In Shared Ownership
                  Opportunities
                </p>
              </div>
              <div className="space-y-6">
                <div>
                  <label htmlFor="profilePhoto" className="block text-xl font-medium mb-4" style={{ color: "#1C3988" }}>
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
                        <label
                          htmlFor="profilePhotoInput"
                          className="cursor-pointer text-xl hover:text-[#1C3988]"
                          style={{ color: "#1C3988" }}
                        >
                          Change Profile Photo
                          <input
                            id="profilePhotoInput"
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
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
                          htmlFor="profilePhotoInput"
                          className="cursor-pointer text-xl font-medium hover:text-[#1C3988]"
                          style={{ color: "#1C3988" }}
                        >
                          Upload Profile Photo
                          <input
                            id="profilePhotoInput"
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-xl font-medium mb-2" style={{ color: "#1C3988" }}>
                      First Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="First name"
                      className="w-full px-3 py-3 border border-gray-300 rounded-md focus:ring-2 text-gray-800 focus:ring-[#1C3988] focus:border-[#1C3988] outline-none text-xl"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-xl font-medium mb-2" style={{ color: "#1C3988" }}>
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Last name"
                      className="w-full px-3 py-3 border border-gray-300 rounded-md focus:ring-2 text-gray-800 focus:ring-[#1C3988] focus:border-[#1C3988] outline-none text-xl"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-xl font-medium mb-2" style={{ color: "#1C3988" }}>
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email"
                      className="w-full px-3 py-3 border border-gray-300 rounded-md focus:ring-2 text-gray-800 focus:ring-[#1C3988] focus:border-[#1C3988] outline-none text-xl"
                    />
                  </div>
                  <div>
                    <label htmlFor="contactNumber" className="block text-xl font-medium mb-2" style={{ color: "#1C3988" }}>
                      Contact Number
                    </label>
                    <input
                      id="contactNumber"
                      type="tel"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      placeholder="Number"
                      className="w-full px-3 py-3 border border-gray-300 rounded-md focus:ring-2 text-gray-800 focus:ring-[#1C3988] focus:border-[#1C3988] outline-none text-xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-[#1C3988] mb-2">Address</h2>
                <p className="text-xl text-gray-600">
                  Provide your address details to complete your buyer profile.
                </p>
              </div>
              <div className="space-y-6">
                <div>
                  <label htmlFor="streetAddress" className="block text-xl font-medium text-[#1C3988] mb-2">
                    Street Address
                  </label>
                  <input
                    id="streetAddress"
                    type="text"
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleInputChange}
                    placeholder="Enter your street address"
                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:ring-2 text-gray-800 focus:ring-[#1C3988] focus:border-[#1C3988] outline-none text-xl"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-xl font-medium text-[#1C3988] mb-2">
                      City
                    </label>
                    <input
                      id="city"
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Enter your city"
                      className="w-full px-3 py-3 border border-gray-300 rounded-md focus:ring-2 text-gray-800 focus:ring-[#1C3988] focus:border-[#1C3988] outline-none text-xl"
                    />
                  </div>
                  <div>
                    <label htmlFor="stateProvince" className="block text-xl font-medium text-[#1C3988] mb-2">
                      State/Province
                    </label>
                    <input
                      id="stateProvince"
                      type="text"
                      name="stateProvince"
                      value={formData.stateProvince}
                      onChange={handleInputChange}
                      placeholder="Enter your state/province"
                      className="w-full px-3 py-3 border border-gray-300 rounded-md focus:ring-2 text-gray-800 focus:ring-[#1C3988] focus:border-[#1C3988] outline-none text-xl"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="zipPostalCode" className="block text-xl font-medium text-[#1C3988] mb-2">
                      Zip/Postal Code
                    </label>
                    <input
                      id="zipPostalCode"
                      type="text"
                      name="zipPostalCode"
                      value={formData.zipPostalCode}
                      onChange={handleInputChange}
                      placeholder="Enter zip/postal code"
                      className="w-full px-3 py-3 border border-gray-300 rounded-md focus:ring-2 text-gray-800 focus:ring-[#1C3988] focus:border-[#1C3988] outline-none text-xl"
                    />
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-xl font-medium text-[#1C3988] mb-2">
                      Country
                    </label>
                    <div className="relative">
                      {/* <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full px-3 py-3 border border-gray-300 rounded-md focus:ring-2 text-gray-800 focus:ring-[#1C3988] focus:border-[#1C3988] outline-none text-xl bg-white appearance-none cursor-pointer"
                      >
                        <option value="">Select your country</option>
                        {countries.map((country) => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </select> */}

                    <select
  id="country"
  name="country"
  value={formData.country}
  onChange={handleInputChange}
  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:ring-2 text-gray-800 focus:ring-[#1C3988] focus:border-[#1C3988] outline-none text-xl bg-white appearance-none cursor-pointer"
>
  <option value="">Select your country</option>
  {countries.map((country) => (
    <option key={country.value} value={country.value}>
      {country.name}
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

          {currentStep === 3 && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-[#1C3988] mb-2">Security</h2>
                <p className="text-xl text-gray-600">
                  Set up your password and verification preferences to secure your account.
                </p>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="password" className="block text-xl font-medium text-[#1C3988] mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        placeholder="Enter your password"
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 text-gray-800 focus:ring-[#1C3988] focus:border-[#1C3988] outline-none text-xl pr-10"
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
                    <label htmlFor="confirmPassword" className="block text-xl font-medium text-[#1C3988] mb-1">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 text-gray-800 focus:ring-[#1C3988] focus:border-[#1C3988] outline-none text-xl pr-10"
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
                  <p className="text-[#1C3988] col-span-2">
                    Must be at least 8 characters with letters, numbers, and special characters.
                  </p>
                </div>
                <div className="py-5">
                  <h3 className="text-xl font-semibold text-[#1C3988] mb-4">Verification Requirements</h3>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        name="emailVerification"
                        checked={formData.emailVerification}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-[#1C3988] border-gray-300 rounded focus:ring-[#1C3988]"
                      />
                      <span className="text-xl text-[#1C3988]">
                        Email verification required after registration
                      </span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        name="phoneVerification"
                        checked={formData.phoneVerification}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-[#1C3988] border-gray-300 rounded focus:ring-[#1C3988]"
                      />
                      <span className="text-xl text-[#1C3988]">
                        Phone verification required for full account access
                      </span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        name="addressVerification"
                        checked={formData.addressVerification}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-[#1C3988] border-gray-300 rounded focus:ring-[#1C3988]"
                      />
                      <span className="text-xl text-[#1C3988]">
                        Address verification required for property transactions
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <div className="mb-6">
                <h2 className="text-3xl font-semibold text-[#1C3988] mb-2">Trust & Responsibility Agreement</h2>
                <p className="text-xl text-gray-600">
                  Please Review And Accept Our Terms And Conditions To Complete Your Registration
                </p>
              </div>
              <div className="space-y-6">
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
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 ">
                  <h3 className="text-2xl font-semibold text-[#1C3988] mb-3">Platform Terms of Service</h3>
                  <div className="text-xs text-gray-700 space-y-4">
                    <p className="text-gray-500 font-medium text-[16px]">
                      Welcome to — a land listing and connection platform. Our mission is to offer verified listing
                      space, affordable access to co-buying opportunities, and a smart way to explore land deals
                      globally.
                    </p>
                    <p className="text-[#1c3988c5] text-xl font-bold">We do not:</p>
                    <ul className=" list-inside space-y-1 ml-3 text-sm text-gray-500">
                      <li className="before:content-['➤'] ">  Hold or transfer any funds</li>
                      <li className="before:content-['➤'] " >  Facilitate or guarantee any transactions</li>
                      <li className="before:content-['➤'] " >  Provide legal advice or legal transactions</li>
                      <li className="before:content-['➤'] " >  Act as a broker, legal agent, or real estate advisor</li>
                    </ul>
                    <p className="text-[#1c3988c5] text-xl font-bold ">All users are 100% responsible for:</p>
                    <ul className="list-inside space-y-1 ml-3 text-sm text-gray-500">
                      <li className="before:content-['➤'] ">  Performing due diligence</li>
                      <li className="before:content-['➤'] ">  Hiring their own real estate lawyer or licensed professional</li>
                      <li className="before:content-['➤'] ">  Conducting all transactions with public records or land registry</li>
                    </ul>
                    <p className="text-[#1c3988c5] text-xl font-bold ">We strongly advise:</p>
                    <ul className="list-inside space-y-1 ml-3 text-sm text-gray-500">
                      <li className="before:content-['➤'] " >  Consulting with a qualified real estate professional or legal channels</li>
                      <li className="before:content-['➤'] " >  Using our provided lawyer list as a starting point for guidance</li>
                      <li className="before:content-['➤'] " >  Treating all property decisions as your own independent choice</li>
                    </ul>
                    <p className="text-[#1c3988c5] text-xl font-bold">What we provide:</p>
                    <ul className="list-inside space-y-1 ml-3 text-sm text-gray-500">
                      <li className="before:content-['➤'] " >  A tool to discover and list land</li>
                      <li className="before:content-['➤'] " >  A system to connect multiple co-buyers</li>
                      <li className="before:content-['➤'] " >  A professional calculator to estimate the investment cost</li>
                      <li className="before:content-['➤'] " >  A comprehensive directory to help deals happen faster</li>
                      <li className="before:content-['➤'] " >  Easier access to land ownership for people with limited budgets</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-[#1C3988] border-gray-300 rounded focus:ring-[#1C3988] mt-1"
                    />
                    <span className="text-xl text-gray-700">
                      <strong className="text-[#1C3988]">I agree to the Terms of Service</strong>
                      <br />I have read and agree to the Terms of Service and understand my responsibilities as a buyer
                      on the platform
                    </span>
                  </label>
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      name="agreeToPrivacy"
                      checked={formData.agreeToPrivacy}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-[#1C3988] border-gray-300 rounded focus:ring-[#1C3988] mt-1"
                    />
                    <span className="text-xl text-gray-700">
                      <strong className="text-[#1C3988]">I agree to the Privacy Policy</strong>
                      <br />I understand how my data will be used and stored as described in the Privacy Policy
                    </span>
                  </label>
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      name="acceptResponsibility"
                      checked={formData.acceptResponsibility}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-[#1C3988] border-gray-300 rounded focus:ring-[#1C3988] mt-1"
                    />
                    <span className="text-xl text-gray-700">
                      <strong className="text-[#1C3988]">I accept full responsibility</strong>
                      <br />I understand that VerifiedLand is not liable for any outcomes related to real deals,
                      conversations, or transactions between users.
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`px-8 py-2 text-white font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1C3988] focus:ring-offset-2
                ${currentStep === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-[#1C3988] hover:bg-blue-700"}`}
            >
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={isLoading}
              className={`px-8 py-2 cursor-pointer bg-[#1C3988] text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-[#1C3988] focus:ring-offset-2 transition-all duration-200
                ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isLoading ? "Submitting..." : currentStep === 4 ? "Complete Registration" : "Next"}
            </button>
          </div>
         
        </div>
      </div>
       <ToastContainer position="top-right"  />
    </div>
  );
}