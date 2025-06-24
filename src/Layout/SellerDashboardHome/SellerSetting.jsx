

import { useState } from "react"
import { FaChevronDown } from "react-icons/fa6"

export default function SellerSetting() {
    const [activeView, setActiveView] = useState("editProfile") // 'editProfile', 'changePassword'

    const userProfile = {
        name: "Pappu ray",
        email: "pappuray0453@gmail.com",
        phone: "04039386593",
        country: "United States",
        state: "Utah",
        city: "",
        zipcode: "",
        company: "",
    }

    const EditProfileForm = () => (
        <div className=" rounded-lg mt-6 md:w-6xl mx-auto">
            <div className="flex justify-center gap-6 items-center mb-6 ">
                <div className="w-16 h-16 rounded-full overflow-hidden mb-3">
                    <img src="https://i.ibb.co/jVcFCQf/businessman-icon-600nw-564112600.webp" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <h2 className="text-xl font-semibold text">{userProfile.name}</h2>
            </div>

            <div className=" mb-6 flex gap-4  justify-center items-center">
                <button
                    onClick={() => setActiveView("editProfile")}
                    className={`text-xl pb-1 transition border-b-2  cursor-pointer ${activeView === "editProfile" ? "border-[#1C3988] text-[#1C3988]" : "border-transparent text-gray-600 hover:text-[#1C3988]"}`}
                >
                    Edit Profile
                </button>
                <span className="text text-xl mx-2">|</span>
                <button
                    onClick={() => setActiveView("changePassword")}
                    className={`text-xl pb-1 transition border-b-2 cursor-pointer ${activeView === "changePassword" ? "border-[#1C3988] text-[#1C3988]" : "border-transparent text-gray-600 hover:text-[#1C3988]"}`}
                >
                    Change Password
                </button>
            </div>

            <h3 className="text-2xl font-medium text mb-6 text-center">Edit Your Profile</h3>

            <form className="space-y-4">
                <div className="">
                    <label className="block text-sm font-medium text text-xl mb-1">User name</label>
                    <input
                        type="text"
                     
                        placeholder="User name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-600 focus:ring-blue-500 focus:border-transparent"
                    />
                    
                </div>

                <div>
                    <label className="block text-sm font-medium text text-xl mb-1">Email</label>
                    <input
                        type="email"
                        placeholder="email"
                      
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-600 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text text-xl mb-1">Contact number</label>
                    <input
                        type="tel"
                       
                        placeholder="Contact number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-600 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <div className="relative">
                    <label className="block text-sm font-medium text text-xl mb-1">Country</label>
                    <select className="w-full appearance-none px-3 py-2 border border-gray-300 rounded-md focus:outline-none  text-gray-600 focus:ring-blue-500 focus:border-transparent">
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 top-6 flex items-center px-2 pointer-events-none">
                       <FaChevronDown className="w-4 h-4 text-gray-500" />
                    </div>
                </div>

                <div className="relative">
                    <label className="block text-sm font-medium text text-xl mb-1">State</label>
                    <select className=" appearance-none w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-600 focus:ring-blue-500 focus:border-transparent">
                        <option value="Utah">Utah</option>
                        <option value="California">California</option>
                        <option value="New York">New York</option>
                        <option value="Texas">Texas</option>
                    </select>
                     <div className="absolute inset-y-0 right-0 top-6 flex items-center px-2 pointer-events-none">
                       <FaChevronDown className="w-4 h-4 text-gray-500" />
                    </div>
                </div>

                <div className="relative">
                    <label className="block text-sm font-medium text text-xl mb-1">City</label>
                    <select className=" appearance-none w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-600 focus:ring-blue-500 focus:border-transparent">
                        <option value="">Select City</option>
                        <option value="Salt Lake City">Salt Lake City</option>
                        <option value="Provo">Provo</option>
                        <option value="Ogden">Ogden</option>
                    </select>

                     <div className="absolute inset-y-0 right-0 top-6 flex items-center px-2 pointer-events-none">
                       <FaChevronDown className="w-4 h-4 text-gray-500" />
                    </div>
                </div>

                <div className="relative">
                    <label className="block text-sm font-medium text text-xl mb-1">Zipcode</label>
                    <select className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-600 focus:ring-blue-500 focus:border-transparent">
                        <option value="">Select Zipcode</option>
                        <option value="84101">84101</option>
                        <option value="84102">84102</option>
                        <option value="84103">84103</option>
                    </select>
                     <div className="absolute inset-y-0 right-0 top-6 flex items-center px-2 pointer-events-none">
                       <FaChevronDown className="w-4 h-4 text-gray-500" />
                    </div>
                </div>

                <div className="relative">
                    <label className="block text-sm font-medium text text-xl mb-1">Company name</label>
                    <select className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md  focus:outline-none focus:ring-2 text-gray-600 focus:ring-blue-500 focus:border-transparent">
                        <option value="">Select Company</option>
                        <option value="Tech Corp">Tech Corp</option>
                        <option value="Digital Solutions">Digital Solutions</option>
                        <option value="Innovation Inc">Innovation Inc</option>
                    </select>
                     <div className="absolute inset-y-0 right-0 top-6 flex items-center px-2 pointer-events-none">
                       <FaChevronDown className="w-4 h-4 text-gray-500" />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg text-white py-3 px-4 rounded-md  transition duration-200 font-medium cursor-pointer"
                >
                    Save & Change
                </button>
            </form>
        </div>
    )

    const ChangePasswordForm = () => (
        <div className="mx-auto   rounded-lg mt-6 md:w-6xl ">
            <div className="flex  justify-center gap-6   items-center mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden mb-3">
                    <img src="https://i.ibb.co/jVcFCQf/businessman-icon-600nw-564112600.webp" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <h2 className="text-xl font-semibold text">{userProfile.name}</h2>
            </div>

            <div className="mb-6 flex gap-4  justify-center items-center  w-full mx-auto">
                <button
                    onClick={() => setActiveView("editProfile")}
                    className={`text-xl pb-1 transition border-b-2 cursor-pointer ${activeView === "editProfile" ? "border-[#1C3988] text-[#1C3988]" : "border-transparent text-gray-600 hover:text-[#1C3988]"}`}
                >
                    Edit Profile
                </button>
                <span className="text text-xl mx-2">|</span>
                <button
                    onClick={() => setActiveView("changePassword")}
                    className={`text-xl pb-1 transition border-b-2 cursor-pointer ${activeView === "changePassword" ? "border-[#1C3988] text-[#1C3988]" : "border-transparent text-gray-600 hover:text-[#1C3988]"}`}
                >
                    Change Password
                </button>

            </div>

            <h3 className="text-2xl font-medium text mb-6 text-center">Edit Password</h3>

            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text text-xl mb-1">Current Password</label>
                    <input
                        type="password"
                        placeholder="old password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-600 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text text-xl mb-1">New Password</label>
                    <input
                        type="password"
                        placeholder="new password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-600 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text text-xl mb-1">Confirm New Password</label>
                    <input
                        type="password"
                        placeholder="confirm password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-600 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg text-white py-3 px-4 rounded-md ransition duration-200 font-medium cursor-pointer"
                >
                    Save & Change
                </button>
            </form>
        </div>
    )

    return (
        <div className="w-6xl mx-auto">
            <h1 className="text text-3xl font-bold">Profile Information and Password </h1>
            <p className="text-gray-400 text-xl mt-2">Update your personal information</p>
            {activeView === "editProfile" && <EditProfileForm />}
            {activeView === "changePassword" && <ChangePasswordForm />}
        </div>
    )
}
