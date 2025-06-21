import { DollarSign, Globe, Heart, MapPin } from "lucide-react";
import { RiSecurePaymentLine } from "react-icons/ri";
import { TbContract } from "react-icons/tb";

export const WhyChoose = () => {
  return (
    <section className="bg-yellow-50/80 py-16">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-6 text-[#1C3988]">Why Choose You Safehand</h2>
          <p className="text-lg mb-6 text-[#656565]">
            The premier global marketplace for buying and selling land with innovative features designed for both buyers and sellers.
          </p>
          <div className="space-y-6">
            <div className="flex items-center">
              <div className=" bg-[#1C3988] rounded-md p-2 flex items-center justify-center mr-4">
                <Globe  size={24} className="h-10 w-10 flex items-center justify-center mx-auto text-white" />
              </div>
              <p className="text-[#656565]"><span className="text-xl font-semibold text-[#1C3988]">Global Reach</span> <br />Browse land and properties from around the world with country-specific categories and multi-language support.</p>
            </div>

             <div className="flex items-center">
              <div className=" bg-[#1C3988] rounded-md p-2 flex items-center justify-center mr-4">
                <RiSecurePaymentLine  size={24} className="h-10 w-10 flex items-center justify-center mx-auto text-white" />
              </div>
              <p className="text-[#656565]"><span className="text-xl font-semibold text-[#1C3988]">Down Payment Options</span> <br />Browse and list properties from around the world with country-specific categories and multi-language support.</p>
            </div>

            <div className="flex items-center">
              <div className=" bg-[#1C3988] rounded-md p-2 flex items-center justify-center mr-4">
                <TbContract  size={24} className="h-10 w-10 flex items-center justify-center mx-auto text-white" />
              </div>
              <p className="text-[#656565]"><span className="text-xl font-semibold text-[#1C3988]">Construction Calculator</span> <br />Browse and list properties from around the world with country-specific categories and multi-language support.</p>
            </div>

           <div className="flex items-center">
              <div className=" bg-[#1C3988] rounded-md p-2 flex items-center justify-center mr-4">
                <DollarSign  size={24} className="h-10 w-10 flex items-center justify-center mx-auto text-white" />
              </div>
              <p className="text-[#656565]"><span className="text-xl font-semibold text-[#1C3988]">Seller Subscriptions</span> <br />Browse land and properties from around the world with country-specific categories and multi-language support.</p>
            </div>

          </div>
        </div>

        {/* Right Side Image */}
        <div className="relative">
         {/* add map here */}
         <img src="https://www.magnificenttravel.com/public/uploads/2025/01/26/67965b935a1a3/Egypt-Map--3.jpg" alt="" className="rounded-lg" />
        </div>
      </div>
    </section>
  );
};