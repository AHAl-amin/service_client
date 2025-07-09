// import { useGetBuyerSubscriptionQuery } from "../../redux/features/buyerApi";




// export default function Subscribtion() {
//   const { data: getBuyerSubscription } = useGetBuyerSubscriptionQuery();
  

//   const plans = [
//     {
//       name: "Free Browsing",
//       subtitle: "Perfect for occasional sellers",
//       price: "$0",
//       period: "/month",
//       features: ["Browse all listings", "Save favorite properties", "No listing boosts included.", "Standard search visibility"],
//     },
//     {
//       name: "Buy a Share",
//       subtitle: "Ideal for active sellers with multiple properties",
//       price: "$99",
//       period: "/month",
//       features: ["Unlimited listings", "Higher reports ranking", "Super chat services", "Free daily boost reports"],
//     },
  
//   ]


//   return (
//     <div className="  ">
//       <div className=" mx-auto">
//         {/* Header */}
//         <div className=" mb-16 max-w-6xl mx-auto">
//           <h1 className="text-4xl font-bold text mb-3">Subscription</h1>
//           <p className="text-gray-500 text-lg">Manage your buyer subscription plan </p>
//         </div>

//         {/* Pricing Cards */}
//         <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto relative">

//           {plans.map((plan, index) => (


//             <div key={index} className="relative bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full ">

//               {/* Design image shown in all cards */}
            
              
//               <div className=" text-white px-6 pt-6 pb-12">
//                 <h3 className="text-xl font-bold mb-2 text-[#1C3988]">{plan.name}</h3>
//                 <p className=" text-sm mb-4 min-h-[2.5rem]  text-[#1C3988]">{plan.subtitle}</p>
//                 <div className=" relative ">
//                   <span className="text-4xl font-bold text-[#1C3988]">{plan.price}</span>
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

//                 <button className="w-full bg-[#1C3988] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 mt-auto">
//                   Get Started
//                 </button>
//               </div>
//             </div>

//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

import { useGetBuyerSubscriptionQuery } from "../../redux/features/buyerApi";

export default function Subscribtion() {
  const { data: getBuyerSubscription } = useGetBuyerSubscriptionQuery();
  console.log(getBuyerSubscription, "getBuyerSubscription.....................");

  return (
    <div className="">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-16 max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-3 text-[#1C3988]">Subscription</h1>
          <p className="text-gray-500 text-lg">Manage your buyer subscription plan</p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
          {getBuyerSubscription?.map((plan, index) => (
            <div key={index} className="relative bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
              {/* Card Header */}
              <div className="text-white px-6 pt-6 pb-12">
                <h3 className="text-3xl font-bold mb-2 text-[#1C3988]">{plan.name}</h3>
                <p className="text-xl mb-4 min-h-[2.5rem] text-[#1C3988]">{plan.description}</p>
                <div className="relative">
                  <span className="text-4xl font-bold text-[#1C3988]">${plan.price}</span>
                  <span className="text-[#1c39887c] ml-1 text-lg">/month</span>
                </div>
              </div>

              {/* Features & Button */}
              <div className="px-6 pt-8 pb-6 flex flex-col flex-grow">
                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.feature_list?.split(",").map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <div className="w-2.5 h-2.5 bg-[#1C3988] rounded-full mt-2 mr-4 flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm leading-relaxed">
                        {feature.trim()}
                      </span>
                    </li>
                  ))}
                </ul>

                <button className="w-full bg-[#1C3988] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 mt-auto">
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

