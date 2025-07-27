



import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSubscribtionPlanMutation } from "../../redux/features/sellerApi";

export default function Pricing() {
  const [plans, setPlans] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null); // State for error messages
  const navigate = useNavigate();
  const userType = localStorage.getItem("user_type");
  const [SubscribtionPlan, { isLoading, error }] = useSubscribtionPlanMutation();


  useEffect(() => {
    fetch("https://yoursafeland.duckdns.org/api/subscriptions/plans/seller/subscriptions/")
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        const formattedPlans = data.map((plan) => ({
          id: plan.id, // Ensure the backend returns a plan ID
          name: plan.name,
          subtitle: plan.description,
          price: `$${plan.price}`,
          period: plan.period,
          features: plan.feature_list.split(","),
        }));
        setPlans(formattedPlans);
      })
      .catch((error) => {
        console.error("Error fetching plans:", error);
        setErrorMessage("Failed to load plans. Please try again.");
      });
  }, []);
 
  // Handle button click
 const handleGetStarted = async (planId) => {
  if (!planId) {
    setErrorMessage("Plan ID is missing. Please try again.");
    return;
  }

  if (userType !== "seller") {
    navigate("/seller_registration");
    return;
  }

  const getstartedData = {
    plan_id: planId, // Fixed: Use planId parameter
    successUrl: "http://localhost:5173/success",
    cancelUrl: "http://localhost:5173/cancel",
  };

  try {
    const response = await SubscribtionPlan(getstartedData).unwrap();
    console.log("Checkout session created:", response);
    if (response.checkout_url) {
      window.location.href = response.checkout_url; // Redirect to checkout session
    } else {
      navigate("/success"); // Fallback navigation
    }
  } catch (err) {
    console.error("Error creating checkout session:", err);
    // Handle specific backend error
    if (err?.data?.plan_id) {
      setErrorMessage(err.data.plan_id.join(" "));
    } else {
      setErrorMessage("Failed to create checkout session. Please try again.");
    }
    navigate("/cancel");
  }
};
  return (
    <div className="bg-stone-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-3 text-[#1C3988]">Seller Pricing</h1>
          <p className="text-gray-500 text-lg">Choose the plan that suits best for your need</p>
        </div>

        {errorMessage && (
          <div className="text-red-600 text-center mb-8">{errorMessage}</div>
        )}

        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
          {plans.map((plan, index) => (
            <div key={index} className="relative bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
              <div className="text-white px-6 pt-6 pb-12">
                <h3 className="text-3xl font-bold mb-2 text-[#1C3988]">{plan.name}</h3>
                <p className="text-sm mb-4 min-h-[2.5rem] text-[#1C3988]">{plan.subtitle}</p>
                <div className="relative">
                  <span className="text-4xl font-bold text-[#1C3988]">{plan.price}</span>
                </div>
              </div>

              <div className="px-6 pt-8 pb-6 flex flex-col flex-grow">
                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <div className="w-2.5 h-2.5 bg-[#1C3988] rounded-full mt-2 mr-4 flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleGetStarted(plan.id)}
                  disabled={isLoading}
                  className={`w-full bg-[#1C3988] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 mt-auto ${
                    isLoading ? "cursor-pointer" : "cursor-pointer"
                  }`}
                >
                  {isLoading ? "Get Started" : "Get Started"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
