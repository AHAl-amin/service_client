
import { MapPin, Users } from "lucide-react";
import { IoIosHeartEmpty } from "react-icons/io";
import { Link } from "react-router-dom";

// Featured Properties Section
export const FeaturedProperties = ({onExploreClick}) => {
 const properties = [
  {
    id: 1,
    title: "Mountain View Ranch",
    price: "$250,000",
    area: "25 Acres",
    location: "Colorado, USA",
    description: "A serene ranch with beautiful mountain views, perfect for farming or a vacation home.",
    person: "4/5",
    payment: "Bank Transfer, Cash",
    image: "https://cdn.pixabay.com/photo/2024/12/28/03/39/field-9295186_640.jpg",
  },
  {
    id: 2,
    title: "Oceanfront Paradise",
    price: "$650,000",
    area: "25 Acres",
    location: "Malibu, California",
    description: "Luxurious oceanfront property with private beach access and panoramic views.",
    person: "2/5",
    payment: "Mortgage, Bank Transfer",
    image: "https://cdn.pixabay.com/photo/2024/12/28/03/39/field-9295186_640.jpg",
  },
  {
    id: 3,
    title: "Oceanfront Paradise",
    price: "$650,000",
    area: "25 Acres",
    location: "Malibu, California",
    description: "Identical listing with modern amenities and direct ocean access.",
    person: "3/5",
    payment: "Down Payment Available",
    image: "https://cdn.pixabay.com/photo/2024/12/28/03/39/field-9295186_640.jpg",
  },
  {
    id: 4,
    title: "Mountain View Ranch",
    price: "$250,000",
    area: "25 Acres",
    location: "Colorado, USA",
    description: "Duplicate ranch listing ideal for eco-resorts or agricultural use.",
    person: "1/5",
    payment: "Bank Transfer, Cash",
    image: "https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297_640.jpg",
  },
  {
    id: 5,
    title: "Oceanfront Paradise",
    price: "$650,000",
    area: "25 Acres",
    location: "Malibu, California",
    description: "A peaceful ocean getaway with palm trees and breeze.",
    person: "2/5",
    payment: "Down Payment Available",
    image: "https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297_640.jpg",
  },
  {
    id: 6,
    title: "Oceanfront Paradise",
    price: "$650,000",
    area: "25 Acres",
    location: "Malibu, California",
    description: "Prime location property for residential or investment purposes.",
    person: "4/5",
    payment: "Down Payment Available",
    image: "https://cdn.pixabay.com/photo/2022/04/15/07/58/sunset-7133867_640.jpg",
  },
];




  return (
    <section className="bg-yellow-50/80 py-16">
      <div className="container mx-auto text-center">
        <div className="flex md:flex-row flex-col md:px-0 px-6 items-center justify-between">
          <div className="basis-6/12">
            <h2 className="text-4xl font-bold  text-[#1C3988] text-start">Featured Properties</h2>
            <p className="text-[#545454] text-start mt-2 w-11/12 mb-10">Discover our featured properties, carefully selected for their prime locations and exceptional value. Whether for recreation, investment, or building your dream home, these listings offer unique opportunities </p>
          </div>

          <div className="basis-6/12 flex items-center justify-end gap-4 md:px-0 px-6">
            <button className="bg-[#1C3988] px-5 py-2 rounded-sm text-white w-[180px]">View All Properties</button>

            <button onClick={onExploreClick} className="bg-[#fff] border text-[#1C3988] border-gray-300 px-5 py-2 w-[140px] flex rounded-sm items-center gap-[2px] text-center cursor-pointer"><MapPin size={16} />View Map</button>

            <select className="select rounded-sm w-[150px] text-[#1C3988] text-base  bg-[#fff] ">
              <option disabled selected>Featured</option>
              {/* <option>Featured</option> */}
              <option>Newest</option>
              <option>Low to high</option>
              <option>High to Low</option>
              <option>Small to Large</option>
              <option>Large to Small</option>
            </select>

          </div>

        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:px-0 mt-4 px-6 gap-6">
          {properties.map((property, index) => (
            <div key={index} className="card w-full bg-white shadow-lg rounded-lg overflow-hidden relative">
              <IoIosHeartEmpty className="absolute right-2 top-2 text-2xl text bg-gray-300 rounded " />
              <img src={property.image} alt={property.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-start text-[#1C3988]">{property.title}</h3>
                <p className="flex items-center gap-1 text-start text-gray-500">
                  <MapPin size={16} />
                  <span>{property?.location}</span>
                </p>
                <p className="text-gray-600 mt-2">
                  <h1 className="text-lg flex items-center justify-between font-bold text-start text-[#1C3988]">
                    {property.price}
                    <span className="text-[#8D8D8D] font-medium">{property?.area}</span>
                  </h1>
                </p>


                <div className="flex items-center justify-between my-3">
                  <button className=" px-5 py-[5px] rounded-full border-[1.5px] cursor-pointer border-[#1C3988] text-[#1C3988]">{property?.payment}</button>

                  <div className="flex items-center gap-1 text-[#8B8B8B]">
                    <Users size={18} className="text-[#1C3988]" />
                    {property?.person}
                  </div>
                </div>

                <p className="text-[#8B8B8B] text-start pt-2">{property?.description}</p>

                <Link to={`/dettails/${property.id}`} className="btn bg-[#1C3988] py-2 text-white text-base font-medium mt-4 w-full">View Details</Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};