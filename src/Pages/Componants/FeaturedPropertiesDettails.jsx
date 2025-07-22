


// import { useState } from "react";
// import { Link, useLocation, useParams } from "react-router-dom";
// import { RiArrowUpBoxLine } from "react-icons/ri";
// // import { IoIosHeartEmpty, IoLocationOutline } from "react-icons/io5";
// import scanImag from "../../../public/img/scan.png";
// import { IoIosHeartEmpty } from "react-icons/io";
// import { IoLocationOutline } from "react-icons/io5";
// import { useBuyAshareMutation, useContactWithSellerMutation } from "../../redux/features/buyerApi";
// import { toast } from "react-toastify";
// import { Toaster } from "react-hot-toast";

// function FeaturedPropertiesDettails() {
//   const { id } = useParams();
//   const { state } = useLocation();
//   const property = state?.property; // Get property from state
//   const [activeTab, setActiveTab] = useState("description");
//     const [buyAshare] = useBuyAshareMutation();
//      const [contactWithSeller] = useContactWithSellerMutation();
//   const [contactForm, setContactForm] = useState({
//     fullname: "",
//     email: "",
//     country: "",
//     phone: "",
//     message: "",
//   });

//   const baseImageUrl = "http://10.10.13.60:2100";
//   const fallbackImage = "https://via.placeholder.com/300x200?text=No+Image+Available";

//   if (!property) {
//     return <div className="p-10 text-red-500">Property Not Found</div>;
//   }

//   const handleContactSubmit = (e) => {
//     e.preventDefault();
//     console.log("Contact form submitted:", contactForm);
//   };

//   const handleInputChange = (e) => {
//     setContactForm({
//       ...contactForm,
//       [e.target.name]: e.target.value,
//     });
//   };
//   const BuyShare = async () => {
//     try {
//       const response = await buyAshare({
//         property_id: property.id, // Send property_id as expected by the backend
//       }).unwrap();

//       if (response.success) {
//         toast.success("Share purchased successfully!");
//       } else {
//         toast.error("Failed to purchase share: " + (response.message || "Unknown error"));
//       }
//     } catch (error) {
//       console.error("Buy share failed:", error);
//       if (error.data?.errors) {
//         const errorMessages = Object.entries(error.data.errors)
//           .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
//           .join("; ");
//         toast.error(`Validation errors: ${errorMessages}`);
//       } else {
//         toast.error(
//           "Something went wrong while purchasing the share: " +
//             (error.data?.message || error.message || "Unknown error")
//         );
//       }
//     }
//   }
//    const handleContactSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       console.log("Submitting contact form with payload:", contactForm);
//       const response = await contactWithSeller({
//         id: property.id,
//         body: contactForm,
//       }).unwrap();
//       console.log("API response:", response);
//       if (response.success) {
//         toast.success("Message sent successfully!");
//         setContactForm({
//           fullname: "",
//           email: "",
//           country: "",
//           phone: "",
//           message: "",
//         });
//       } else {
//         toast.error("Failed to send message: " + (response.message || "Unknown error"));
//       }
//     } catch (error) {
//       console.error("Contact submission failed:", error);
//       if (error.data?.errors) {
//         const errorMessages = Object.entries(error.data.errors)
//           .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
//           .join("; ");
//         toast.error(`Validation errors: ${errorMessages}`);
//       } else {
//         toast.error(
//           "Something went wrong while sending the message: " +
//             (error.data?.message || error.message || "Unknown error")
//         );
//       }
//     }
//   };


//   // Use images from API
//   const thumbnailImages = [
//     property.main_image ? `${baseImageUrl}${property.main_image}` : fallbackImage,
//     ...(property.images?.map((img) => `${baseImageUrl}${img.image}`) || []),
//   ].slice(0, 3); // Limit to 3 thumbnails for demo

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4">
//       <div className="md:max-w-[80%] mx-auto">
//         {/* Main Content Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
//           {/* Left Side - Images */}
//           <div className="space-y-4">
//             {/* Main Image */}
//             <div className="relative">
//               <img
//                 src={property.main_image ? `${baseImageUrl}${property.main_image}` : fallbackImage}
//                 alt={property.title}
//                 className="w-full h-96 object-cover rounded-lg shadow-lg"
//               />
//             </div>
//             {/* Thumbnail Images */}
//             <div className="grid grid-cols-4 gap-2">
//               {thumbnailImages.map((img, index) => (
//                 <div key={index} className="relative">
//                   <img
//                     src={img}
//                     alt={`Thumbnail ${index + 1}`}
//                     className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
//                   />
//                 </div>
//               ))}
//               {thumbnailImages.length > 3 && (
//                 <div className="backdrop-blur-md bg-gray-500 text-white rounded flex items-center justify-center h-20 cursor-pointer hover:bg-gray-700 transition-colors">
//                   <span className="text-lg font-bold">{thumbnailImages.length - 3}+</span>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Right Side - Property Details */}
//           <div className="space-y-6">
//             {/* Property Header */}
//             <div>
//               <div className="flex items-center justify-between mb-2">
//                 <h1 className="text-3xl font-bold text-gray-800">{property.title}</h1>
//                 <p className="border p-2 rounded-2xl">{property.payment}</p>
//                 <div className="flex space-x-2">
//                   <button className="p-2 border bg-gray-300 rounded">
//                     <IoIosHeartEmpty className="text-2xl" />
//                   </button>
//                   <button className="p-2 border bg-gray-300 rounded">
//                     <RiArrowUpBoxLine className="text-2xl" />
//                   </button>
//                 </div>
//               </div>
//               <p className="text-gray-600 mb-4 flex items-center gap-2">
//                 <IoLocationOutline />
//                 {property.location}
//               </p>
//               <div className="text-3xl font-bold text-gray-800 mb-4">${parseFloat(property.price).toLocaleString()}</div>
//               <div className="flex space-x-4 text-sm text-gray-600 mb-6">
//                 <span className="border-r pr-4">{property.property_type}</span>
//                 <span className="border-r pr-4">{property.land_size}</span>
//                 <span>{property.max_shares} Shares</span>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex space-x-4">
//               <button
//               onClick={BuyShare}
//               className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-medium transition-colors cursor-pointer">
//                 Buy a Share
//               </button>
//               <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2 rounded font-medium transition-colors">
//                 Contact Seller
//               </button>
//             </div>

//             {/* Tabs */}
//             <div>
//               <div className="flex justify-around rounded bg-[#E8EBF3] border border-[#1C3988]">
//                 {["description", "information", "features", "map"].map((tab) => (
//                   <button
//                     key={tab}
//                     onClick={() => setActiveTab(tab)}
//                     className={`py-2 px-4 m-2 rounded-xl text-sm font-medium capitalize transition-colors cursor-pointer ${
//                       activeTab === tab ? "bg-[#1C3988] text-white" : "bg-transparent text-gray-500"
//                     }`}
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

//               {/* Tab Content */}
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
//                       <p><strong>Price:</strong> ${parseFloat(property.price).toLocaleString()}</p>
//                       <p><strong>Area:</strong> {property.land_size}</p>
//                       <p><strong>Payment:</strong> {property.payment}</p>
//                       <p><strong>Max Shares:</strong> {property.max_shares}</p>
//                     </div>
//                   </div>
//                 )}
//                 {activeTab === "features" && (
//                   <div className="bg-[#E8EBF3] p-6 rounded-md">
//                     <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-[#1C3988] text-sm">
//                       {property.features.map((feature, index) => (
//                         <div key={index} className="flex items-center gap-2">
//                           <span>✔️</span>
//                           <span>{feature.name}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//                 {activeTab === "map" && (
//                   <div className="text-gray-700">
//                     <img src="https://i.ibb.co/7d2fXmCc/image-5.png" alt="Map" />
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Contact Seller Section */}
//         <div className="bg-[#E8EBF3] border border-[#1C3988] rounded-lg shadow-lg p-8">
//           <div className="flex justify-between">
//             <div className="flex items-center mb-6">
//               <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mr-4">
//                 <span className="text-2xl text-gray-600">👤</span>
//               </div>
//               <div>
//                 <h3 className="text-2xl font-bold text-gray-800">
//                   {property.seller.first_name} {property.seller.last_name}
//                 </h3>
//                 <div className="flex gap-6">
//                   <p className="text-gray-600">{property.location}</p>
//                   <p className="text-gray-600">{property.seller.email}</p>
//                   <p className="text-gray-600">+1234567890</p>
//                 </div>
//               </div>
//             </div>
//             <div>
//               <p className="text-center w-full text-xl">Scan with smart</p>
//               <div className="flex justify-center items-center">
//                 <img src={scanImag} className="w-20 h-20" alt="QR Code" />
//               </div>
//             </div>
//           </div>

//           <h4 className="text-2xl font-semibold text-gray-800 mb-4">Contact Seller</h4>

//           <form onSubmit={handleContactSubmit} className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-xl font-medium mb-1">Full Name</label>
//                 <input
//                   type="text"
//                   name="fullname"
//                   placeholder="Full Name"
//                   value={contactForm.fullname}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-800 focus:ring-[#1C3988] focus:border-transparent"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-xl font-medium mb-1">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Email"
//                   value={contactForm.email}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-800 focus:ring-[#1C3988] focus:border-transparent"
//                   required
//                 />
//               </div>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-xl font-medium mb-1">Country</label>
//                 <input
//                   type="text"
//                   name="country"
//                   placeholder="Country"
//                   value={contactForm.country}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-800 focus:ring-[#1C3988] focus:border-transparent"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xl font-medium mb-1">Phone</label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   placeholder="Phone"
//                   value={contactForm.phone}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-800 focus:ring-[#1C3988] focus:border-transparent"
//                 />
//               </div>
//             </div>
//             <div>
//               <label className="block text-xl font-medium mb-1">Write Your Message Here...</label>
//               <textarea
//                 name="message"
//                 placeholder="Message"
//                 value={contactForm.message}
//                 onChange={handleInputChange}
//                 rows={4}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-800 focus:ring-[#1C3988] focus:border-transparent resize-none"
//               />
//             </div>
//             <div className="flex items-center mb-4">
//               <input type="checkbox" className="mr-2" required />
//               <span className="text-sm text-gray-600">By submitting you agree to our Terms and Conditions</span>
//             </div>
//             <div className="flex space-x-4">
//               <button
              
//                 type="submit"
//                 className="bg-[#1C3988] hover:bg-[#163070] text-white px-6 py-2 rounded font-medium transition-colors"
//               >
//                 Send
//               </button>
//   <Link to={`/view_profile/${property.seller.id}`} className="block">
//   <button
//     type="button"
//     className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2 rounded font-medium transition-colors cursor-pointer"
//   >
//     View Profile
//   </button>
// </Link>
//             </div>
//           </form>
//         </div>
//       </div>
//       <Toaster position="top-right"/>
//     </div>
//   );
// }

// export default FeaturedPropertiesDettails;


import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { RiArrowUpBoxLine } from "react-icons/ri";
// import { IoLocationOutline, IoIosHeartEmpty } from "react-icons/io5";
import scanImag from "../../../public/img/scan.png"; // Ensure this path is correct
import { useBuyAshareMutation, useContactWithSellerMutation } from "../../redux/features/buyerApi";
// import { toast, Toaster } from "react-toastify";

import { IoIosHeartEmpty } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { Toaster } from "react-hot-toast";

function FeaturedPropertiesDetails() {
  const { id } = useParams();
  const { state } = useLocation();
  const property = state?.property; // Get property from state
  const [activeTab, setActiveTab] = useState("description");
  const [buyAshare] = useBuyAshareMutation();
  const [contactWithSeller] = useContactWithSellerMutation();
  const [contactForm, setContactForm] = useState({
    fullname: "",
    email: "",
    country: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const baseImageUrl = "http://10.10.13.60:2100";
  const fallbackImage = "https://via.placeholder.com/300x200?text=No+Image+Available";

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm({ ...contactForm, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error for the field being edited
  };

  // Client-side form validation
  const validateForm = () => {
    const newErrors = {};
    if (!contactForm.fullname.trim()) newErrors.fullname = "This field is required.";
    if (!contactForm.email.trim()) newErrors.email = "This field is required.";
    else if (!/\S+@\S+\.\S+/.test(contactForm.email)) newErrors.email = "Invalid email format.";
    if (!contactForm.country.trim()) newErrors.country = "This field is required.";
    if (!contactForm.phone.trim()) newErrors.phone = "This field is required.";
    if (!contactForm.message.trim()) newErrors.message = "This field is required.";
    return newErrors;
  };

  // Handle form submission
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await contactWithSeller({
        id: property.id,
        body: contactForm,
      }).unwrap();

      if (response.success) {
        toast.success("Message sent successfully!");
        setContactForm({
          fullname: "",
          email: "",
          country: "",
          phone: "",
          message: "",
        });
        setErrors({});
      } else {
        toast.error("Failed to send message: " + (response.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Contact submission failed:", error);
      if (error.data?.errors) {
        const errorMessages = Object.entries(error.data.errors)
          .map(([field, messages]) => `${field}: ${messages.msg || messages.join(", ")}`)
          .join("; ");
        setErrors(error.data.errors);
        toast.error(`Validation errors: ${errorMessages}`);
      } else {
        toast.error(
          "Something went wrong while sending the message: " +
            (error.data?.message || error.message || "Unknown error")
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Buy Share
  const handleBuyShare = async () => {
    try {
      const response = await buyAshare({
        property_id: property.id,
      }).unwrap();

      if (response.success) {
        toast.success("Share purchased successfully!");
      } else {
        toast.error("Failed to purchase share: " + (response.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Buy share failed:", error);
      if (error.data?.errors) {
        const errorMessages = Object.entries(error.data.errors)
          .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
          .join("; ");
        toast.error(`Validation errors: ${errorMessages}`);
      } else {
        toast.error(
          "Something went wrong while purchasing the share: " +
            (error.data?.message || error.message || "Unknown error")
        );
      }
    }
  };

  // Thumbnail images
  const thumbnailImages = [
    property.main_image ? `${baseImageUrl}${property.main_image}` : fallbackImage,
    ...(property.images?.map((img) => `${baseImageUrl}${img.image}`) || []),
  ].slice(0, 3);

  if (!property) {
    return <div className="p-10 text-red-500">Property Not Found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="md:max-w-[80%] mx-auto">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left Side - Images */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={property.main_image ? `${baseImageUrl}${property.main_image}` : fallbackImage}
                alt={property.title}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {thumbnailImages.map((img, index) => (
                <div key={index} className="relative">
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                  />
                </div>
              ))}
              {thumbnailImages.length > 3 && (
                <div className="backdrop-blur-md bg-gray-500 text-white rounded flex items-center justify-center h-20 cursor-pointer hover:bg-gray-700 transition-colors">
                  <span className="text-lg font-bold">{thumbnailImages.length - 3}+</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Property Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl font-bold text-gray-800">{property.title}</h1>
                <p className="border p-2 rounded-2xl">{property.payment}</p>
                <div className="flex space-x-2">
                  <button className="p-2 border bg-gray-300 rounded">
                    <IoIosHeartEmpty className="text-2xl" />
                  </button>
                  <button className="p-2 border bg-gray-300 rounded">
                    <RiArrowUpBoxLine className="text-2xl" />
                  </button>
                </div>
              </div>
              <p className="text-gray-600 mb-4 flex items-center gap-2">
                <IoLocationOutline />
                {property.location}
              </p>
              <div className="text-3xl font-bold text-gray-800 mb-4">${parseFloat(property.price).toLocaleString()}</div>
              <div className="flex space-x-4 text-sm text-gray-600 mb-6">
                <span className="border-r pr-4">{property.property_type}</span>
                <span className="border-r pr-4">{property.land_size}</span>
                <span>{property.max_shares} Shares</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={handleBuyShare}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-medium transition-colors cursor-pointer"
                disabled={isSubmitting}
              >
                Buy a Share
              </button>
              <button
                className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2 rounded font-medium transition-colors"
              >
                Contact Seller
              </button>
            </div>

            {/* Tabs */}
            <div>
              <div className="flex justify-around rounded bg-[#E8EBF3] border border-[#1C3988]">
                {["description", "information", "features", "map"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-2 px-4 m-2 rounded-xl text-sm font-medium capitalize transition-colors cursor-pointer ${
                      activeTab === tab ? "bg-[#1C3988] text-white" : "bg-transparent text-gray-500"
                    }`}
                  >
                    {tab === "description"
                      ? "Property Description"
                      : tab === "information"
                      ? "Property Information"
                      : tab === "map"
                      ? "Address Map"
                      : "Features"}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="py-4 mt-6 bg-[#E8EBF3] rounded p-3 border border-[#1C3988]">
                {activeTab === "description" && (
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>{property.description}</p>
                  </div>
                )}
                {activeTab === "information" && (
                  <div className="text-gray-700">
                    <h3 className="font-semibold mb-2">Property Information</h3>
                    <div className="space-y-2">
                      <p><strong>Location:</strong> {property.location}</p>
                      <p><strong>Price:</strong> ${parseFloat(property.price).toLocaleString()}</p>
                      <p><strong>Area:</strong> {property.land_size}</p>
                      <p><strong>Payment:</strong> {property.payment}</p>
                      <p><strong>Max Shares:</strong> {property.max_shares}</p>
                    </div>
                  </div>
                )}
                {activeTab === "features" && (
                  <div className="bg-[#E8EBF3] p-6 rounded-md">
                    <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-[#1C3988] text-sm">
                      {property.features?.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span>✔️</span>
                          <span>{feature.name}</span>
                        </div>
                      )) || <p>No features available.</p>}
                    </div>
                  </div>
                )}
                {activeTab === "map" && (
                  <div className="text-gray-700">
                    <img src="https://i.ibb.co/7d2fXmCc/image-5.png" alt="Map" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Seller Section */}
        <div className="bg-[#E8EBF3] border border-[#1C3988] rounded-lg shadow-lg p-8">
          <div className="flex justify-between">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mr-4">
                <span className="text-2xl text-gray-600">👤</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {property.seller?.first_name} {property.seller?.last_name}
                </h3>
                <div className="flex gap-6">
                  <p className="text-gray-600">{property.location}</p>
                  <p className="text-gray-600">{property.seller?.email}</p>
                  <p className="text-gray-600">+1234567890</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-center w-full text-xl">Scan with smart</p>
              <div className="flex justify-center items-center">
                <img src={scanImag} className="w-20 h-20" alt="QR Code" />
              </div>
            </div>
          </div>

          <h4 className="text-2xl font-semibold text-gray-800 mb-4">Contact Seller</h4>

          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xl font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullname"
                  placeholder="Full Name"
                  value={contactForm.fullname}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${
                    errors.fullname ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 text-gray-800 focus:ring-[#1C3988] focus:border-transparent`}
                  required
                />
                {errors.fullname && <p className="text-red-500 text-sm">{errors.fullname}</p>}
              </div>
              <div>
                <label className="block text-xl font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={contactForm.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 text-gray-800 focus:ring-[#1C3988] focus:border-transparent`}
                  required
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xl font-medium mb-1">Country</label>
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={contactForm.country}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${
                    errors.country ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 text-gray-800 focus:ring-[#1C3988] focus:border-transparent`}
                />
                {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
              </div>
              <div>
                <label className="block text-xl font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={contactForm.phone}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 text-gray-800 focus:ring-[#1C3988] focus:border-transparent`}
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
              </div>
            </div>
            <div>
              <label className="block text-xl font-medium mb-1">Write Your Message Here...</label>
              <textarea
                name="message"
                placeholder="Message"
                value={contactForm.message}
                onChange={handleInputChange}
                rows={4}
                className={`w-full px-3 py-2 border ${
                  errors.message ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 text-gray-800 focus:ring-[#1C3988] focus:border-transparent resize-none`}
              />
              {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
            </div>
            <div className="flex items-center mb-4">
              <input type="checkbox" className="mr-2" required />
              <span className="text-sm text-gray-600">By submitting you agree to our Terms and Conditions</span>
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-[#1C3988] hover:bg-[#163070] text-white px-6 py-2 rounded font-medium transition-colors ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Sending..." : "Send"}
              </button>
              <Link to={`/view_profile/${property.seller?.id}`} className="block">
                <button
                  type="button"
                  className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2 rounded font-medium transition-colors cursor-pointer"
                >
                  View Profile
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default FeaturedPropertiesDetails;