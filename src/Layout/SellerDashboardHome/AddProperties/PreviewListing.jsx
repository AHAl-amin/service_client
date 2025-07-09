


import { useState } from "react";
import { Link } from "react-router-dom";
import { RiArrowUpBoxLine } from "react-icons/ri";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { usePropertieCreateMutation } from "../../../redux/features/sellerApi";

function PreviewListing({ onNext, onBack, formData, toast }) {
  const [propertieCreate, { isLoading }] = usePropertieCreateMutation();
  const [activeTab, setActiveTab] = useState("description");

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
    if (!formData.main_image) {
      toast.error("Main Property Image is required.");
      return false;
    }
    if (!formData.country) {
      toast.error("Country is required.");
      return false;
    }
    if (!formData.state_province) {
      toast.error("State/Province is required.");
      return false;
    }
    if (!formData.city) {
      toast.error("City/Town is required.");
      return false;
    }
    if (!formData.street_address) {
      toast.error("Street Address is required.");
      return false;
    }
    if (!formData.postal_code) {
      toast.error("Postal/Zip Code is required.");
      return false;
    }
    if (!formData.price || formData.price <= 0) {
      toast.error("A valid price is required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const payload = {
        title: formData.title,
        land_size: formData.land_size,
        property_type: formData.property_type,
        description: formData.description,
        features: formData.features,
        main_image: formData.main_image,
        drone_shots: formData.drone_shots,
        additional_images: formData.additional_images || [],
        country: formData.country,
        state_province: formData.state_province,
        city: formData.city,
        street_address: formData.street_address,
        postal_code: formData.postal_code,
        latitude: formData.latitude || "0",
        longitude: formData.longitude || "0",
        price: formData.price,
        allow_down_payment: formData.allow_down_payment,
        lock_period: formData.lock_period,
        buy_share: formData.buy_share,
        // boost_type: formData.boost_type,
        featured_listing: formData.boostOptions.featuredListing,
      };

      const res = await propertieCreate(payload).unwrap();
      toast.success("Property created successfully!");
      console.log("Property Created", res);
    } catch (error) {
      toast.error("Failed to create property: " + (error.data?.message || "Unknown error"));
      console.error("Error:", error);
    }
  };

// const handleSubmit = async () => {
//   if (!validateForm()) return;

//   try {
//     const formDataToSend = new FormData();

//     // Basic fields
//     formDataToSend.append("title", formData.title);
//     formDataToSend.append("land_size", formData.land_size);
//     formDataToSend.append("property_type", formData.property_type);
//     formDataToSend.append("description", formData.description);

//     // Features array → send as JSON string
//     if (formData.features && Array.isArray(formData.features)) {
//       formDataToSend.append("features", JSON.stringify(formData.features));
//     }

//     // File fields (assumed to be File objects)
//     if (formData.main_image) {
//       formDataToSend.append("main_image", formData.main_image);
//     }

//     if (formData.drone_shots) {
//       formDataToSend.append("drone_shots", formData.drone_shots);
//     }

//     // Additional images (optional)
//     if (formData.additional_images?.length) {
//       formData.additional_images.forEach((file) => {
//         formDataToSend.append("additional_images", file); // Send as multiple files
//       });
//     }

//     // Location fields
//     formDataToSend.append("country", formData.country);
//     formDataToSend.append("state_province", formData.state_province);
//     formDataToSend.append("city", formData.city);
//     formDataToSend.append("street_address", formData.street_address);
//     formDataToSend.append("postal_code", formData.postal_code);
//     formDataToSend.append("latitude", formData.latitude || "0");
//     formDataToSend.append("longitude", formData.longitude || "0");

//     // Numeric & Boolean fields
//     formDataToSend.append("price", formData.price);
//     formDataToSend.append("allow_down_payment", formData.allow_down_payment ? "true" : "false");

//     if (formData.down_payment_percentage) {
//       formDataToSend.append("down_payment_percentage", formData.down_payment_percentage);
//     }

//     if (formData.lock_period) {
//       formDataToSend.append("lock_period", formData.lock_period);
//     }

//     formDataToSend.append("buy_share", formData.buy_share ? "true" : "false");

//     if (formData.max_shares) {
//       formDataToSend.append("max_shares", formData.max_shares);
//     }

//     // Boost section
//     if (formData.boost_type) {
//       formDataToSend.append("boost_type", formData.boost_type);
//     }

//     if (formData.boost_start) {
//       formDataToSend.append("boost_start", formData.boost_start);
//     }

//     if (formData.boost_end) {
//       formDataToSend.append("boost_end", formData.boost_end);
//     }

//     formDataToSend.append("featured_listing", formData.boostOptions?.featuredListing ? "true" : "false");

//     // API call
//     const res = await propertieCreate(formDataToSend).unwrap();
//     toast.success("Property created successfully!");
//     console.log("✅Property Created:", res);

//   } catch (error) {
//     toast.error(" Failed to create property: " + (error?.data?.message || "Unknown error"));
//     console.error("Error:", error);
//   }
// };



  return (
    <div className="bg-gray-50 py-10 rounded-xl px-8">
      <div className="mx-auto mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <img
              src={formData.main_image || "/placeholder.png"}
              alt={formData.title || "Untitled Property"}
              className="w-full rounded-lg shadow-lg"
            />
            <div className="grid grid-cols-4 gap-2">
              {formData.additional_images?.slice(0, 3).map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Additional ${idx + 1}`}
                  className="h-20 w-full object-cover rounded"
                />
              ))}
              <div className="h-20 flex justify-center items-center bg-gray-500 text-white rounded">+10</div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-800">{formData.title || "Untitled Property"}</h1>
              </div>
              <p className="flex items-center gap-2 text-gray-600 mt-2">
                <IoLocationOutline /> {formData.city || "City"}, {formData.state_province || "State"}, {formData.country || "Country"}
              </p>
              <p className="text-3xl font-bold text-[#1C3988] mt-2">${formData.price || "0"}</p>
              <div className="flex space-x-4 text-sm text-gray-600 mt-4">
                <span className="bg-[#B9C2DA] border border-[#1C3988] p-2 rounded-xl">{formData.land_size || "N/A"}</span>
                <span className="bg-[#B9C2DA] border border-[#1C3988] p-2 rounded-xl">{formData.property_type || "N/A"}</span>
                {formData.allow_down_payment && (
                  <span className="bg-[#B9C2DA] border border-[#1C3988] p-2 rounded-xl">Down Payment Available</span>
                )}
              </div>
            </div>

            <div className="hr p-[1px] bg-gray-400"></div>

            <div>
              <div className="flex justify-around rounded bg-[#E8EBF3] border border-[#1C3988]">
                {["description", "information", "map"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-2 px-4 m-2 rounded-xl text-sm font-medium capitalize cursor-pointer ${
                      activeTab === tab ? "bg-[#1C3988] text-white" : "text-gray-600"
                    }`}
                  >
                    {tab === "description"
                      ? "Property Description"
                      : tab === "information"
                      ? "Basic Details"
                      : "Map"}
                  </button>
                ))}
              </div>

              <div className="mt-6 bg-[#E8EBF3] rounded p-4 border border-[#1C3988]">
                {activeTab === "description" && <p className="text-gray-800">{formData.description || "No description provided."}</p>}
                {activeTab === "information" && (
                  <ul className="space-y-1 text-gray-800">
                    <li><strong>Location:</strong> {formData.city || "N/A"}, {formData.state_province || "N/A"}, {formData.country || "N/A"}</li>
                    <li><strong>Price:</strong> ${formData.price || "N/A"}</li>
                    <li><strong>Area:</strong> {formData.land_size || "N/A"}</li>
                    <li><strong>Type:</strong> {formData.property_type || "N/A"}</li>
                  </ul>
                )}
                {activeTab === "map" && (
                  <img src="https://i.ibb.co/7d2fXmCc/image-5.png" alt="Map" className="rounded" />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-10">
          <div className="bg-[#E8EBF3] border border-[#1C3988] rounded-2xl p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text mb-2">Group Ownership Option</h2>
              <p className="text-gray-600 text-sm">Allow buyers to purchase shares of your property.</p>
            </div>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.buy_share}
                readOnly
                className="w-5 h-5 text-blue-600 border-2 border-blue-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <span className="text-sm font-medium text">Enable "Buy a Share" option</span>
            </label>
          </div>

          <div className="border border-[#1C3988] bg-[#E8EBF3] rounded-2xl p-6">
            <h2 className="text-2xl font-bold text mb-2">Boost your listing</h2>
            <p className="text-gray-600 text-sm">Selected boost: {formData.boost_type || "None"}</p>
          </div>

          <div className="flex justify-between items-center pt-6">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className={`px-8 py-3 bg-[#1C3988] text-white font-medium rounded-lg focus:outline-none cursor-pointer shadow-sm ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Submitting..." : "Listing Property"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewListing;