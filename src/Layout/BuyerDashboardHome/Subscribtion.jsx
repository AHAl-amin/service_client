import { useNavigate } from "react-router-dom";
import { useGetBuyerSubscriptionQuery } from "../../redux/features/buyerApi";
import { useSubscribtionPlanMutation } from "../../redux/features/sellerApi";
import { useState } from "react";

export default function Subscription() {
  const navigate = useNavigate();
  const { data: getBuyerSubscription, isLoading: isQueryLoading } = useGetBuyerSubscriptionQuery();
  const [SubscribtionPlan, { isLoading: isMutationLoading, error: mutationError }] = useSubscribtionPlanMutation();
  const [errorMessage, setErrorMessage] = useState("");

  const handleGetStarted = async (planId) => {
    if (!planId) {
      setErrorMessage("Plan ID is missing. Please try again.");
      return;
    }

    // Assuming userType is available in your app's context or state
    const userType = "seller"; // Replace with actual userType retrieval logic
    if (userType !== "seller") {
      navigate("/seller_registration");
      return;
    }

    const getstartedData = {
      plan_id: planId,
      successUrl: "https://leafy-lebkuchen-fbb411.netlify.app/success",
      cancelUrl: "https://leafy-lebkuchen-fbb411.netlify.app/cancel",
    };

    try {
      const response = await SubscribtionPlan(getstartedData).unwrap();
      console.log("Checkout session created:", response);
      if (response.checkout_url) {
        window.location.href = response.checkout_url;
      } else {
        navigate("/success");
      }
    } catch (err) {
      console.error("Error creating checkout session:", err);
      if (err?.data?.plan_id) {
        setErrorMessage(err.data.plan_id.join(" "));
      }
      else {
        setErrorMessage("No need subscribtion for free.");
      }

    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-bold mb-3 text-[#1C3988] md:text-5xl">Subscription Plans</h1>
          <p className="text-gray-500 text-lg md:text-xl">Manage your buyer subscription plan</p>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-8 max-w-6xl mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
            {errorMessage}
          </div>
        )}

        {/* Loading State */}
        {isQueryLoading ? (
          <div className="text-center text-gray-500">Loading subscription plans...</div>
        ) : (
          /* Pricing Cards */
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {getBuyerSubscription?.map((plan, index) => (
              <div
                key={index}
                className="relative bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full transform transition-transform hover:scale-105"
              >
                {/* Card Header */}
                <div className="text-[#1C3988] bg-white px-6 pt-6 pb-12">
                  <h3 className="text-2xl font-bold mb-2 md:text-3xl">{plan.name}</h3>
                  <p className="text-lg mb-4 min-h-[2.5rem] md:text-xl">{plan.description}</p>
                  <div className="relative">
                    <span className="text-4xl font-bold md:text-5xl">${plan.price}</span>
                    <span className="text-[#1C3988] ml-1 text-lg">
                        {String(plan.duration) === "999999" ? "/Forever" : `/Annually`}
                    </span>
                  </div>
                </div>

                {/* Features & Button */}
                <div className="px-6 pt-8 pb-6 flex flex-col flex-grow">
                  <ul className="space-y-4 mb-8 flex-grow">
                    {plan.feature_list?.split(",").map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <div className="w-2.5 h-2.5 bg-[#1C3988] rounded-full mt-2 mr-4 flex-shrink-0"></div>
                        <span className="text-gray-700 text-sm leading-relaxed md:text-base">
                          {feature.trim()}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleGetStarted(plan.id)}
                    disabled={isMutationLoading}
                    className={`w-full bg-[#1C3988] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 mt-auto ${isMutationLoading ? "hover:bg-[#152a6b]" : "hover:bg-[#152a6b]"
                      }`}
                  >
                    {isMutationLoading ? "Get Started" : "Get Started"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}