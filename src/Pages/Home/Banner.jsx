
import { useForm } from "react-hook-form"
import { CircleDollarSign, CircleDollarSignIcon, MapPin, Search } from "lucide-react"
import { Link } from "react-router-dom"

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
            <h1 className="md:text-7xl text-2xl font-bold text-white leading-tight">
              Thank you for 10 years of trust proudly serving clients across the globe!
            </h1>

            <div>
              <div className="space-x-5 mt-12">
                <p className="text-2xl font-bold text-gray-200">Are you a buyer or seller?</p>
                <Link to="/buyer_registration">
                  <button className="mt-6 cursor-pointer bg-[#1C3988] text-white md:w-1/3 w-1/2 px-10 py-3 rounded-md md:text-lg font-semibold hover:bg-gray-900 transition duration-300">
                    Buyer Profile
                  </button>
                </Link>

                <Link to="/seller_registration">
                  <button className="mt-6 bg-[#FFFFFF] cursor-pointer text-black md:w-1/3 w-1/2 px-10 py-3 rounded-md md:text-lg font-semibold hover:bg-gray-200 transition duration-300">
                    Sell Your Land
                  </button>

                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default Banner

