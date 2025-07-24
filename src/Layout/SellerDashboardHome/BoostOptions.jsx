

import { useState } from "react";
import { SiBosch } from "react-icons/si";
import { TfiWorld } from "react-icons/tfi";
import {
  useGetActiveBoostQuery,
  useGetSubscribtionPlanBoostQuery,
  useGetSubscriptionPropertyQuery,
  useSubscribtionPlanMutation,
} from "../../redux/features/sellerApi";
import { toast } from "react-toastify";

export default function BoostOptions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBoostType, setSelectedBoostType] = useState("daily");
  const [selectedProperty, setSelectedProperty] = useState("");
  const { data: getActiveBoost } = useGetActiveBoostQuery();
  const { data: getSubscriptionProperty } = useGetSubscriptionPropertyQuery();
  const { data: getSubscribtionPlanBoost } = useGetSubscribtionPlanBoostQuery();
  const [SubscribtionPlan] = useSubscribtionPlanMutation()

  const PropertyList = getSubscriptionProperty?.data || [];
  console.log(PropertyList,"p.............")
  const BostInfo = getActiveBoost?.data || [];
  const BoostPlans = getSubscribtionPlanBoost || [];

  const handleBoostClick = (boostType) => {
    setSelectedBoostType(boostType);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProperty("");
  };



// const handleConfirmBoost = async () => {
//   if (!selectedProperty) {
//      toast.error("Please select a property");
//     return;
//   }

//   const property = PropertyList.find((p) => p.id === Number.parseInt(selectedProperty));
//   const boost = BoostPlans.find((plan) => plan.name.toLowerCase().includes(selectedBoostType));

//   // Check if property and boost exist to avoid undefined errors
//   if (!property || !boost) {
//      toast.error("Error: Invalid property or boost plan selected.");
//     return;
//   }

//   const boostPrice = boost ? `$${boost.price}/${boost.duration === 1 ? "day" : "week"}` : "";

//   // Prepare getstartedData for the mutation
//   const getstartedData = {
//     plan_id: boost.id,
//     successUrl: "http://localhost:5173/success",
//     cancelUrl: "http://localhost:5173/cancel",
//     property_id: Number.parseInt(selectedProperty), // Ensure property_id is a number
//   };

//   try {
//     // Trigger the SubscribtionPlan mutation
//     const response = await SubscribtionPlan(getstartedData).unwrap();
//     console.log("Checkout session created:", response);

//     // Show success alert
//      toast.error(`Boost confirmed!\nProperty: ${property.name}\nBoost Type: ${boost.name}\nPrice: ${boostPrice}`);

//     // Redirect to checkout URL if provided, otherwise navigate to success page
//     if (response.checkout_url) {
//       window.location.href = response.checkout_url;
//     } else {
//       // Assuming you have access to navigate (from react-router-dom)
//       // If not using react-router-dom, you can use window.location.href = "/success";
//       window.location.href = "/success";
//     }

//     closeModal();
//   } catch (error) {
//     console.error("Error confirming boost:", error);
//     let errorMessage = "Failed to confirm boost. Please try again.";
    
//     // Handle specific error messages if available
//     if (error?.data?.plan_id) {
//       errorMessage = error.data.plan_id.join(" ");
//     }
    
//     else{
//       window.location.href = "/cancel";
//     }
//     toast.error(errorMessage);
//   }
// };


const handleConfirmBoost = async () => {
  if (!selectedProperty) {
    toast.error("Please select a property");
    return;
  }

  const property = PropertyList.find((p) => p.id === Number.parseInt(selectedProperty));
  const boost = BoostPlans.find((plan) => plan.name.toLowerCase().includes(selectedBoostType));

  console.log("Selected Property:", property);
  console.log("Selected Boost:", boost);
  console.log("getstartedData:", {
    plan_id: boost?.id,
    successUrl: "http://localhost:5173/success",
    cancelUrl: "http://localhost:5173/cancel",
    property_id: Number.parseInt(selectedProperty),
  });

  if (!property) {
    console.error("Property not found for ID:", selectedProperty);
    toast.error("Error: Invalid property selected.");
    return;
  }
  if (!boost) {
    console.error("Boost plan not found for type:", selectedBoostType);
    toast.error("Error: Invalid boost plan selected.");
    return;
  }

  const boostPrice = `$${boost.price}/${boost.duration === 1 ? "day" : "week"}`;

  const getstartedData = {
    plan_id: boost.id,
    successUrl: "http://localhost:5173/success",
    cancelUrl: "http://localhost:5173/cancel",
    property_id: Number.parseInt(selectedProperty),
  };

  try {
    const response = await SubscribtionPlan(getstartedData).unwrap();
    console.log("Checkout session created:", response);

    toast.success(`Boost confirmed!\nProperty: ${property.name}\nBoost Type: ${boost.name}\nPrice: ${boostPrice}`);

    if (response.checkout_url) {
      window.location.href = response.checkout_url;
    } else {
      window.location.href = "/success";
    }

    closeModal();
  } catch (error) {
    console.error("Error confirming boost:", error);
    let errorMessage = "Failed to confirm boost. Please try again.";
    if (error?.data?.plan_id) {
      errorMessage = error.data.plan_id.join(" ");
    } else if (error?.data?.message) {
      errorMessage = error.data.message;
    }
    toast.error(errorMessage);
    closeModal();
    if (!error?.data?.plan_id) {
      window.location.href = "/cancel";
    }
  }
};
  return (
    <div>
      <div className="px-6 space-y-2">
        <h1 className="text-4xl font-bold text">Boost Your Listings</h1>
        <p className="text-xl text-gray-600">Increase visibility and attract more potential buyers</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 p-6 mx-auto">
        {BoostPlans.map((plan) => (
          <div
            key={plan.id}
            className={`flex-1 ${
              plan.name.toLowerCase().includes("daily")
                ? "bg-green-50 border-2 border-green-200"
                : "bg-purple-50 border-2 border-purple-200"
            } rounded-2xl p-6`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`w-10 h-10 ${
                  plan.name.toLowerCase().includes("daily") ? "bg-[#059669]" : "bg-[#9333EA]"
                } rounded-full flex items-center justify-center`}
              >
                <SiBosch className="size-10 p-2 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">{plan.name}</h2>
                <p className="text-sm text-gray-600">{plan.description}</p>
                {plan.name.toLowerCase().includes("weekly") && (
                  <p className="text-sm text-purple-600 font-medium">Save $40 compared to daily</p>
                )}
              </div>
            </div>

            <div className="mb-6">
              <span className="text-3xl font-bold text-gray-800">${plan.price}</span>
              <span className="text-gray-600">/{plan.duration === 1 ? "day" : "week"}</span>
            </div>

            <div className="space-y-3 mb-8">
              {plan.feature_list.split(", ").map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 ${
                      plan.name.toLowerCase().includes("daily") ? "bg-[#059669]" : "bg-purple-500"
                    } rounded-full flex items-center justify-center`}
                  >
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => handleBoostClick(plan.name.toLowerCase().includes("daily") ? "daily" : "weekly")}
              className={`w-full ${
                plan.name.toLowerCase().includes("daily")
                  ? "bg-[#059669] hover:bg-green-700"
                  : "bg-purple-600 hover:bg-purple-800"
              } text-white font-semibold py-3 px-6 rounded-lg transition-colors cursor-pointer`}
            >
              Boost a property
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text mb-2">Boost Your Property</h2>
              <p className="text-gray-600">Increase visibility and attract more potential buyers</p>
            </div>

            <div className="mb-6">
              <label className="block text-xl font-medium text-gray-700 mb-3">Choose a property</label>
              <select
                value={selectedProperty}
                onChange={(e) => setSelectedProperty(e.target.value)}
                className="w-full appearance-none text-gray-800 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select a property...</option>
                {PropertyList.map((property) => (
                  <option key={property.id} value={property.id}>
                    {property.title} - {property.short_address}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-8">
              <label className="block text-xl font-medium text mb-3">Boost Type</label>
              <div className="grid grid-cols-1 gap-3">
                {BoostPlans.filter((plan) =>
                  plan.name.toLowerCase().includes(selectedBoostType)
                ).map((plan) => (
                  <div
                    key={plan.id}
                    className={`p-4 rounded-lg border-2 ${
                      plan.name.toLowerCase().includes("daily")
                        ? "border-green-500 bg-[#D6F7ED]"
                        : "border-purple-500 bg-[#EEE4F8]"
                    } cursor-pointer transition-all`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className={`w-10 h-10 ${
                          plan.name.toLowerCase().includes("daily") ? "bg-[#059669]" : "bg-purple-500"
                        } rounded-full flex items-center justify-center`}
                      >
                        <SiBosch className="size-10 p-2 text-white" />
                      </div>
                      <span className="font-semibold text-xl text-gray-800">{plan.name}</span>
                    </div>
                    <div className="text-sm font-medium text-gray-600">{plan.description}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={closeModal}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmBoost}
                className="flex-1 px-4 py-3 bg-[#059669] text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer"
              >
                Confirm Boost
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto p-6">
        <div>
          <div className="mb-5">
            <h1 className="text-4xl font-bold text mb-2">Active Boosts</h1>
            <p className="text-gray-600 text-xl">Your currently active property boosts and their performance.</p>
          </div>

          <div className="rounded-lg overflow-hidden border border-gray-200">
            <table className="w-full">
              <thead className="bg-[#0A3161] text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium">Property</th>
                  <th className="px-6 py-4 text-left text-sm font-medium">Location</th>
                  <th className="px-6 py-4 text-left text-sm font-medium">Boost Type</th>
                  <th className="px-6 py-4 text-left text-sm font-medium">Time Remaining</th>
                  <th className="px-6 py-4 text-left text-sm font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {BostInfo.map((boost, index) => (
                  <tr key={boost.id} className={index % 2 === 0 ? "" : "bg-gray-50"}>
                    <td className="px-6 py-4 text-sm text-gray-900">{boost.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 flex items-center">
                      <TfiWorld className="mr-2" />
                      {boost.full_address}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{boost.boost_type}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {boost.boost_remaining_time}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#10B981] text-green-100">
                        {boost.boost_status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

