

export default function Footer() {
  const handleEmailSubmit = (e) => {
    e.preventDefault()
    const email = e.target.email.value
    console.log(`Subscribed email: ${email}`)
    e.target.reset()
  }

  return (
    <footer className="bg-[#000C2D] text-white py-12 lg:px-40 md:px-20">
      <div className=" mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
             <img src="https://i.ibb.co/20mKHM8m/logo-final-2.png" alt="" />
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              The premier global marketplace for buying and selling land properties worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Search Properties
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Featured listings
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Countries
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Seller plans
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Cost Calculator
                </a>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div className="md:col-span-1">
            <h3 className="text-white font-semibold text-lg mb-4">Information</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Terms And Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="md:col-span-1">
            <h3 className="text-white font-semibold text-lg mb-4">Subscribe To our land news Email</h3>
            <form onSubmit={handleEmailSubmit} className="flex">
              <input
                type="email"
                name="email"
                placeholder="Email..."
                required
                className="flex-1 px-4 py-2 rounded-l-md  border border-blue-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-r-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-900"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  )
}
