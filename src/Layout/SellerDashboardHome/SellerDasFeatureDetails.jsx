// import { useState } from "react"
// import { Link, useParams } from "react-router-dom"
// import { RiArrowUpBoxLine } from "react-icons/ri"
// import { IoIosHeartEmpty } from "react-icons/io"
// import { IoLocationOutline } from "react-icons/io5"
// // import scanImag from "../../../public/img/scan.png"
// import {    useGetAllPropertiesListQuery, } from "../../redux/features/sellerApi"

// function SellerDasFeatureDetails() {
//   const { id } = useParams()
//   const { data: getAllPropertiesList } =    useGetAllPropertiesListQuery,()
//   const [activeTab, setActiveTab] = useState("description")
//   const [contactForm, setContactForm] = useState({
//     fullName: "",
//     email: "",
//     country: "",
//     phone: "",
//     message: "",
//   })

//   const property = getAllPropertiesList?.data?.find(
//     (item) => item.id === Number.parseInt(id)
//   )

//   const [mainImage, setMainImage] = useState(property?.main_image)
//   const thumbnailImages = property?.images || []

//   if (!property) {
//     return <div className="p-10 text-red-500">Property Not Found</div>
//   }

//   const handleContactSubmit = (e) => {
//     e.preventDefault()
//     console.log("Contact form submitted:", contactForm)
//   }

//   const handleInputChange = (e) => {
//     setContactForm({
//       ...contactForm,
//       [e.target.name]: e.target.value,
//     })
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-10 px-8">
//       <Link to="/buyer_dashboard" className=" bg-[#1C3988] rounded-xl  py-3 px-6">Back to Dashboard</Link>
//       <div className="mx-auto mt-8">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
//           <div className="space-y-4">
//             <div className="relative">
//               <img
//                 src={mainImage || "/placeholder.svg"}
//                 alt={property.title}
//                 className="w-full  object-cover rounded-lg shadow-lg"
//               />
//             </div>
//             <div className="grid grid-cols-4 gap-2">
//               {thumbnailImages.map((img, index) => (
//                 <div key={index} className="relative">
//                   <img
//                     src={img || "/placeholder.svg"}
//                     alt={`Thumbnail ${index + 1}`}
//                     className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
//                     onClick={() => setMainImage(img)}
//                   />
//                 </div>
//               ))}
//               <div className="backdrop-blur-md bg-gray-500 text-white rounded flex items-center justify-center h-20 cursor-pointer hover:bg-gray-700 transition-colors">
//                 <span className="text-lg font-bold">10+</span>
//               </div>
//             </div>
//           </div>

//           <div className="space-y-6">
//             <div>
//               <div className="flex items-center justify-between mb-2">
//                 <h1 className="text-3xl font-bold text-gray-800">{property.title}</h1>
//                 <p className="border-1 p-2 text rounded-2xl">Down Payment Available</p>
//                 <div className="flex space-x-2">
//                   <button className="p-2 border bg-gray-300 rounded ">
//                     <span className="text text-2xl"> <IoIosHeartEmpty /></span>
//                   </button>
//                   <button className="p-2 border bg-gray-300 rounded ">
//                     <span className="text text-2xl"><RiArrowUpBoxLine /></span>
//                   </button>
//                 </div>
//               </div>
//               <p className="text-gray-600 mb-4 flex items-center gap-2"> <span><IoLocationOutline /></span> {property.location}</p>
//               <div className="text-3xl font-bold text mb-4">{property.price}</div>
//               <div className="flex space-x-4 text-sm text-gray-600 mb-6">
//                 <span className="border-r-1 border-gray-400 pr-4">3 Beds   </span>
//                 <span className="border-r-1 border-gray-400 pr-4"> Recreational</span>
//                 <span className="">Vacant Land</span>
//               </div>
//             </div>

//             <div className="flex space-x-4">
//               <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-medium transition-colors">
//                 Buy a Share
//               </button>
//               <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2 rounded font-medium transition-colors">
//                 Contact Seller
//               </button>
//             </div>

//             <div className="">
//               <div className="flex justify-around rounded bg-[#E8EBF3] border border-[#1C3988]">
//                 {["description", "information", "features", "map"].map((tab) => (
//                   <button
//                     key={tab}
//                     onClick={() => setActiveTab(tab)}
//                     className={`py-2 px-4 m-2 rounded-xl text-sm font-medium capitalize transition-colors cursor-pointer
//                       ${activeTab === tab
//                         ? "bg-[#1C3988] text-white"
//                         : "bg-transparent text-gray-500"
//                       }`}
//                   >
//                     {tab === "description"
//                       ? "Property Description"
//                       : tab === "information"
//                         ? "Property Information"
//                         : tab === "map"
//                           ? "Address Map"
//                           : "Features"}
//                   </button>
//                 ))}
//               </div>

//               <div className="py-4 mt-6 bg-[#E8EBF3] rounded p-3 border border-[#1C3988]">
//                 {activeTab === "description" && (
//                   <div className="space-y-4 text-gray-700 leading-relaxed">
//                     <p>{property.description}</p>
//                   </div>
//                 )}
//                 {activeTab === "information" && (
//                   <div className="text-gray-700">
//                     <h3 className="font-semibold mb-2">Property Information</h3>
//                     <div className="space-y-2">
//                       <p><strong>Location:</strong> {property.location}</p>
//                       <p><strong>Price:</strong> {property.price}</p>
//                       <p><strong>Area:</strong> {property.area}</p>
//                       <p><strong>Payment:</strong> {property.payment}</p>
//                       <p><strong>Rating:</strong> {property.person}</p>
//                     </div>
//                   </div>
//                 )}
//                 {activeTab === "features" && (
//                   <div className="bg-[#E8EBF3] p-6 rounded-md">
//                     <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-[#1C3988] text-sm">
//                       <div className="flex items-center gap-2"><span>✔️</span><span>Mountain views</span></div>
//                       <div className="flex items-center gap-2"><span>✔️</span><span>Road access</span></div>
//                       <div className="flex items-center gap-2"><span>✔️</span><span>Utilities nearby</span></div>
//                       <div className="flex items-center gap-2"><span>✔️</span><span>Creek on property</span></div>
//                       <div className="flex items-center gap-2"><span>✔️</span><span>Buildable land</span></div>
//                       <div className="flex items-center gap-2"><span>✔️</span><span>Buildable land</span></div>
//                     </div>
//                   </div>
//                 )}
//                 {activeTab === "map" && (
//                   <div className="text-gray-700">
//                     <img src="https://i.ibb.co/7d2fXmCc/image-5.png" alt="" />
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* Contact seller section remains unchanged */}
//       </div>
//     </div>
//   )
// }

// export default SellerDasFeatureDetails



import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { RiArrowUpBoxLine } from "react-icons/ri";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { useGetAllPropertiesListQuery } from "../../redux/features/sellerApi";

const BASE_URL = "http://10.10.13.60:2100"; // Corrected typo in BASE_URL

function SellerDasFeatureDetails() {
  const { id } = useParams();
  const { data: getAllPropertiesList, isLoading } = useGetAllPropertiesListQuery();
  console.log(getAllPropertiesList, "aaaaaaaaaaaaaaaaaaaaaa");

  const [activeTab, setActiveTab] = useState("description");

  if (isLoading) return <div className="p-10 text-gray-600">Loading...</div>;

  const property = getAllPropertiesList?.find(
    (item) => item.id == id // Using loose comparison to handle potential type differences
  );

  if (!property) {
    return <div className="p-10 text-red-500">Property Not Found</div>;
  }

  // Map thumbnail images from property.images array
  const thumbnailImages = property.images
    ? property.images.map((img) => `${BASE_URL}${img.image}`)
    : [];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-8">
      <Link
        to="/seller_dashboard"
        className="bg-[#1C3988] rounded-xl py-3 px-6 text-white"
      >
        Back to Dashboard
      </Link>

      <div className="mx-auto mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left - Images */}
          <div className="space-y-4">
            <img
              src={`${BASE_URL}${property.main_image}`} // Use main_image for primary display
              alt={property.title}
              className="w-full object-cover rounded-lg shadow-lg"
            />
            <div className="grid grid-cols-4 gap-2">
              {thumbnailImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  className="w-full h-20 object-cover rounded hover:opacity-80 transition-opacity"
                  alt={`Thumbnail ${index + 1}`}
                />
              ))}
              <div className="backdrop-blur-md bg-gray-500 text-white rounded flex items-center justify-center h-20">
                <span className="text-lg font-bold">10+</span>
              </div>
            </div>
          </div>

          {/* Right - Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl font-bold text-[#1C3988]">
                  {property.title}
                </h1>
                <p className="border border-[#1C3988] text-[#1C3988] p-2 rounded-2xl text-sm">
                  {property.allow_down_payment
                    ? "Down Payment Available"
                    : "Full Payment Only"}
                </p>
                <div className="flex gap-2">
                  <button className="p-2 border bg-gray-300 rounded text-2xl">
                    <IoIosHeartEmpty className="text-[#1C3988]" />
                  </button>
                  <button className="p-2 border bg-gray-300 rounded text-2xl">
                    <RiArrowUpBoxLine className="text-[#1C3988]" />
                  </button>
                </div>
              </div>
              <p className="text-gray-600 flex items-center gap-2 mb-2">
                <IoLocationOutline />
                {property.street_address}, {property.city}, {property.country},{" "}
                {property.state_province}
              </p>
              <div className="text-2xl font-bold text-[#1C3988] mb-2">
                ${Number(property.price).toLocaleString()}
              </div>
              <div className="flex space-x-4 text-sm text-gray-600">
                <span>{property.land_size} sqft</span>
                <span>{property.property_type}</span>
              </div>
            </div>

        

            <div>
              <div className="flex justify-around rounded bg-[#E8EBF3] border border-[#1C3988]">
                {["description", "information", "features", "map"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-2 px-4 m-2 rounded-xl text-sm font-medium capitalize transition-colors cursor-pointer ${
                      activeTab === tab
                        ? "bg-[#1C3988] text-white"
                        : "text-gray-500"
                    }`}
                  >
                    {tab === "description"
                      ? "Property Description"
                      : tab === "information"
                      ? "Property Info"
                      : tab === "map"
                      ? "Address Map"
                      : "Features"}
                  </button>
                ))}
              </div>

              <div className="py-4 mt-6 bg-[#E8EBF3] rounded p-3 border border-[#1C3988]">
                {activeTab === "description" && (
                  <p className="text-gray-700">{property.description}</p>
                )}

                {activeTab === "information" && (
                  <div className="space-y-1 text-gray-700">
                    <p>
                      <strong>Location:</strong> {property.city},{" "}
                      {property.country}
                    </p>
                    <p>
                      <strong>Price:</strong> $
                      {Number(property.price).toLocaleString()}
                    </p>
                    <p>
                      <strong>Area:</strong> {property.land_size} sqft
                    </p>
                    <p>
                      <strong>Payment:</strong>{" "}
                      {property.allow_down_payment
                        ? "Down Payment Available"
                        : "Full Payment"}
                    </p>
                    <p>
                      <strong>Lock Period:</strong> {property.lock_period} days
                    </p>
                    <p>
                      <strong>Remaining Shares:</strong>{" "}
                      {property.remaining_shares}
                    </p>
                  </div>
                )}

                {activeTab === "features" && (
                  <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-[#1C3988] text-sm">
                    {property.features?.length > 0 ? (
                      property.features.map((f) => (
                        <div key={f.id} className="flex gap-2 items-center">
                          <span>✔️</span>
                          <span>{f.name}</span>
                        </div>
                      ))
                    ) : (
                      <p>No features available.</p>
                    )}
                  </div>
                )}

                {activeTab === "map" && (
                  <img src="https://i.ibb.co/7d2fXmCc/image-5.png" alt="Map" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerDasFeatureDetails;