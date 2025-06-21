
import { useForm } from "react-hook-form"
import { CircleDollarSign, CircleDollarSignIcon, MapPin, Search } from "lucide-react"

const Banner = () => {
  const { register, handleSubmit } = useForm()

  const onSubmit = (data) => {
    console.log("Search data:", data)

  }

  return (
    <>
      {/* Banner Section */}
      <div
        className="relative bg-cover bg-center bg-no-repeat h-screen w-full flex items-center"
        style={{
          backgroundImage: "url('https://i.ibb.co/v4wWMHxR/Group-2147226057.png')", 
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div> 
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-5xl mx-auto bg-opacity-90">
            <h1 className="text-7xl sm:text-7xl font-bold text-white leading-tight">
              Find Land, Ranches, Farms & Recreational Properties Worldwide
            </h1>


            <div className="space-x-5 mt-8">
              <button className="mt-6 cursor-pointer bg-[#1C3988] text-white w-1/3 px-10 py-3 rounded-md text-lg font-semibold hover:bg-gray-900 transition duration-300">
                Buyer Profile
              </button>

              <button className="mt-6 bg-[#FFFFFF] cursor-pointer text-black w-1/3 px-10 py-3 rounded-md text-lg font-semibold hover:bg-gray-200 transition duration-300">
                Sell Your Land
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full Width Search Form in One Line */}
      <div className="w-full bg-[#E8EBF3] py-10">
        <div className="container mx-auto px-4">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-4">
            {/* Location Search */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
               <MapPin size={20}  className="text-gray-500"/>
              </div>
              <input
                type="text"
                placeholder="Search of location"
                className="pl-10 w-full h-12 border border-gray-300 placeholder-[#1c398869] bg-white rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                {...register("location")}
              />
            </div>

            {/* Min Price */}
         <div className="flex-1 relative">
  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
    <CircleDollarSignIcon size={20} className="text-gray-500" />
  </div>
  <input
    type="text"
    placeholder="Min Price"
    className="w-full h-12 border border-gray-300 bg-white rounded-md pl-10 pr-3 placeholder-[#1c398869] focus:outline-none focus:ring-1 focus:ring-blue-500"
    {...register("minPrice")}
  />
</div>


            {/* Max Price */}
          <div className="flex-1 relative">
  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
    <CircleDollarSignIcon size={20} className="text-gray-500" />
  </div>
  <input
    type="text"
    placeholder="Max Price"
    className="w-full h-12 border placeholder-[#1c398869] bg-white border-gray-300 rounded-md pl-10 pr-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
    {...register("maxPrice")}
  />
</div>


            {/* Down Payment with Checkbox */}
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Down Payment"
                className="w-full h-12 border border-gray-300 bg-white placeholder-[#1c398869] rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
                {...register("downPayment")}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <input
                  type="checkbox"
                  className="h-5 w-5 border border-gray-300 rounded"
                  {...register("hasDownPayment")}
                />
              </div>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="h-12 px-8 bg-[#1C3988] placeholder-[#1c398869] text-white rounded-md flex items-center justify-center hover:bg-blue-900 transition duration-300"
            >
              <Search className="mr-2 h-5 w-5" />
              Search
            </button>
          </form>

          {/* Dropdowns Row */}
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            {/* Country Dropdown */}
            <div className="flex-1">
              <select
                className="w-full h-12 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none bg-white text-[#1c398869]"
                {...register("country")}
                defaultValue=""
              >
                <option className="" value="" disabled>
                  Select Country
                </option>
                <option value="usa">United States</option>
                <option value="canada">Canada</option>
                <option value="mexico">Mexico</option>
                <option value="uk">United Kingdom</option>
                {/* Add more countries as needed */}
              </select>
            </div>

            {/* Property Type Dropdown */}
            <div className="flex-1">
              <select
                className="w-full h-12 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none bg-white text-[#1c398869]"
                {...register("propertyType")}
                defaultValue=""
              >
                <option value="" disabled>
                  Property Type
                </option>
                <option value="land">Land</option>
                <option value="ranch">Ranch</option>
                <option value="farm">Farm</option>
                <option value="recreational">Recreational</option>
                {/* Add more property types as needed */}
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Banner

