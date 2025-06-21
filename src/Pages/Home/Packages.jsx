



export default function Pricing() {

  const plans = [
    {
      name: "Basic",
      subtitle: "Perfect for individuals starting out",
      price: "$29",
      period: "/month",
      features: ["Up to 3 properties", "Standard support", "Basic chat service", "Free daily reports"],
    },
    {
      name: "Premium",
      subtitle: "Great for growing businesses with more advanced needs",
      price: "$59",
      period: "/month",
      features: ["Unlimited listings", "Higher reports ranking", "Super chat services", "Free daily boost reports"],
    },
    {
      name: "Annual Premium",
      subtitle: "Best value for established businesses",
      price: "$499",
      period: "/Year",
      features: ["Unlimited listings", "Best search ranking", "Super chat services", "Free daily boost"],
    },
  ]


  return (
    <div className=" bg-stone-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">Seller Pricing</h1>
          <p className="text-gray-500 text-lg">Choose the plan that suits best for your need</p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto relative">

          {plans.map((plan, index) => (


            <div key={index} className="relative bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full ">

              {/* Design image shown in all cards */}
            
              
              <div className=" text-white px-6 pt-6 pb-12">
                <h3 className="text-xl font-bold mb-2 text-[#1C3988]">{plan.name}</h3>
                <p className=" text-sm mb-4 min-h-[2.5rem] ">{plan.subtitle}</p>
                <div className=" relative ">
                  <span className="text-4xl font-bold text-[#1C3988]">{plan.price}</span>
                  <span className="text-[#1c39887c] ml-1 text-lg">{plan.period}</span>
                </div>
              </div>

              {/* Features & Button */}
              <div className="px-6 pt-8 pb-6 flex flex-col flex-grow">
                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <div className="w-2.5 h-2.5 bg-[#1C3988] rounded-full mt-2 mr-4 flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
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
  )
}
