"use client"

import { MdEmail, MdOutlineWifiCalling3 } from "react-icons/md"
import { IoLocationSharp } from "react-icons/io5"

export default function GetInTuch() {
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted")
  }

  return (
    <div className="min-h-screen  lg:px-40 md:px-20 p-4 flex items-center justify-center">
      <div className="w-full  bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Left Side - Contact Information */}
          <div className="bg-white p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Get In Touch</h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
              For property inquiries please contact the seller directly by using the contact seller section on each
              listing, we do not own the properties or have any additional information.
            </p>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg rounded-full flex items-center justify-center">
                  <MdEmail className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">Email Us</h3>
                  <p className="text-gray-600">info@Aprojectmanager.Com</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg rounded-full flex items-center justify-center">
                  <MdOutlineWifiCalling3 className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">Call Us</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg rounded-full flex items-center justify-center">
                  <IoLocationSharp className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">Location Us</h3>
                  <p className="text-gray-600">Dhanmondi, Dhaka</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-gray-50 p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter Your Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md  text-gray-600"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder=" Enter Your Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-600  transition-all duration-200"
                />
              </div>

              {/* Number Field */}
              <div>
                <label htmlFor="number" className="block text-sm font-medium text-gray-700 mb-2">
                  Number
                </label>
                <input
                type="tel"
                  id="number"
                  
                  placeholder="+1(555) 123-4567"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-600  transition-all duration-200"
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium  mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Write Your Message Here"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-600  resize-none transition-all duration-200"
                />
              </div>

              {/* Send Button */}
              <button
                type="submit"
                className="w-full md:w-auto px-8 py-3 bg cursor-pointer  text-white font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
