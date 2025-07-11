


// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// export default function Pricing() {
//   const [plans, setPlans] = useState([]);
//   const UserType = localStorage.getItem("userType");


//   useEffect(() => {
//     fetch("http://192.168.10.34:1000/api/subscriptions/plans/seller/subscriptions/")
//       .then((response) => response.json())
//       .then((data) => {
//         const formattedPlans = data.map((plan) => ({
//           name: plan.name,
//           subtitle: plan.description,
//           price: `$${plan.price}`,
//           period: plan.period,
//           features: plan.feature_list.split(","),
//         }));
//         setPlans(formattedPlans);
//       })
//       .catch((error) => {
//         console.error("Error fetching plans:", error);
//       });
//   }, []);

//   return (
//     <div className="bg-stone-50 py-16 px-4">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <h1 className="text-4xl font-bold mb-3 text-[#1C3988]">Seller Pricing</h1>
//           <p className="text-gray-500 text-lg">Choose the plan that suits best for your need</p>
//         </div>

//         {/* Pricing Cards */}
//         <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
//           {plans.map((plan, index) => (
//             <div key={index} className="relative bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
//               <div className="text-white px-6 pt-6 pb-12">
//                 <h3 className="text-3xl font-bold mb-2 text-[#1C3988]">{plan.name}</h3>
//                 <p className="text-sm mb-4 min-h-[2.5rem] text-[#1C3988]">{plan.subtitle}</p>
//                 <div className="relative">
//                   <span className="text-4xl font-bold text-[#1C3988]">{plan.price}</span>
//                     <span className="text-[#1c39887c] ml-1 text-lg">/month</span>
//                   <span className="text-[#1c39887c] ml-1 text-lg">{plan.period}</span>
//                 </div>
//               </div>

//               {/* Features & Button */}
//               <div className="px-6 pt-8 pb-6 flex flex-col flex-grow">
//                 <ul className="space-y-4 mb-8 flex-grow">
//                   {plan.features.map((feature, featureIndex) => (
//                     <li key={featureIndex} className="flex items-start">
//                       <div className="w-2.5 h-2.5 bg-[#1C3988] rounded-full mt-2 mr-4 flex-shrink-0"></div>
//                       <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
//                     </li>
//                   ))}
//                 </ul>

//                 <Link
//                   to="/seller_registration"
//                   className="w-full bg-[#1C3988] text-white font-semibold py-3 px-6 cursor-pointer rounded-lg transition-colors duration-200 mt-auto"
//                 >
//                   <button className="text-center w-full">Get Started</button>
//                 </Link>



//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Pricing() {
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();
  const userType = localStorage.getItem("user_type");

  useEffect(() => {
    fetch("http://192.168.10.34:1000/api/subscriptions/plans/seller/subscriptions/")
      .then((response) => response.json())
      .then((data) => {
        const formattedPlans = data.map((plan) => ({
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
      });
  }, []);

  // Handle button click
  const handleGetStarted = () => {
    if (userType !== "seller") {
      navigate("/seller_registration");
    }
  };

  return (
    <div className="bg-stone-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-3 text-[#1C3988]">Seller Pricing</h1>
          <p className="text-gray-500 text-lg">Choose the plan that suits best for your need</p>
        </div>

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

                {/* Conditionally clickable button */}
                <button
                  onClick={handleGetStarted}
                  className="w-full bg-[#1C3988] text-white font-semibold py-3 px-6 cursor-pointer rounded-lg transition-colors duration-200 mt-auto"
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
