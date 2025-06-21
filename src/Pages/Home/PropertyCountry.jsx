

export default function PropertyCountry() {
  const countries = [
    // First row
    ["United States", "Canada", "Mexico", "Brazil", "Spain", "Australia"],
    // Second row
    ["United Kingdom", "France", "Germany", "Italy", "Japan", "South Africa"],
  ]

  const handleCountryClick = (country) => {
    console.log(`Exploring properties in ${country}`)
  }

  return (
    <div className=" pb-16 lg:px-40 md:20  ">
      <div className=" mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text mb-6">Explore Properties by Country</h1>
          <p className="text-gray-600 text-lg leading-relaxed max-w-4xl mx-auto">
            Join thousands of buyers and sellers on the world's premier land marketplace and experience a smarter, more
            secure way to buy and sell land across the globe; whether you're looking for a peaceful countryside plot, a
            strategic investment opportunity, or a space to build your dream home, our platform connects you with high-
            quality listings and trusted users worldwide.
          </p>
        </div>

        {/* Countries Grid */}
        <div className="space-y-4">
          {countries.map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {row.map((country, countryIndex) => (
                <button
                  key={countryIndex}
                  onClick={() => handleCountryClick(country)}
                  className="bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg px-6 py-4 text font-semibold text-center transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {country}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
