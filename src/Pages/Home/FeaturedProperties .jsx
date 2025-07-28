




import { MapPin, Users, Search, CircleDollarSign } from "lucide-react";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useGetAllPropertiesFeaturedListQuery } from "../../redux/features/sellerApi";

export const FeaturedProperties = ({ onExploreClick }) => {
  const { selectedCountry, selectedPropertyType } = useSelector((state) => state.filters); // Access Redux state
  const { data: getAllPropertiesFeaturedList, isLoading, error } = useGetAllPropertiesFeaturedListQuery();
  const properties = getAllPropertiesFeaturedList?.data || [];
  const [sortOption, setSortOption] = useState("Featured");
  const [filteredProperties, setFilteredProperties] = useState([]);

  // Initialize useForm
  const { register, handleSubmit, setValue } = useForm();

  // Base URL for images
  const baseImageUrl = "https://yoursafeland.duckdns.org";
  const fallbackImage = "https://via.placeholder.com/300x200?text=No+Image+Available";

  // Sync form dropdowns with Redux state
  useEffect(() => {
    if (selectedCountry) {
      setValue("country", selectedCountry);
    }
    if (selectedPropertyType) {
      setValue("propertyType", selectedPropertyType);
    }
  }, [selectedCountry, selectedPropertyType, setValue]);

  // Handle form submission and filter properties
  const onSubmit = (data) => {
    const filtered = properties
      .filter((property) => {
        if (!property.featured_listing) return false;

        const fullLocation = `${property.city}, ${property.state_province}, ${property.country}`.toLowerCase();
        const matchesLocation = data.location
          ? fullLocation.includes(data.location.toLowerCase())
          : true;

        const matchesMinPrice = data.minPrice
          ? parseFloat(property.price) >= parseFloat(data.minPrice)
          : true;

        const matchesMaxPrice = data.maxPrice
          ? parseFloat(property.price) <= parseFloat(data.maxPrice)
          : true;

        const matchesDownPayment = data.hasDownPayment
          ? property.allow_down_payment
          : true;

        const matchesDownPaymentAmount = data.downPayment
          ? parseFloat(property.price) * (property.down_payment_percentage / 100) >= parseFloat(data.downPayment)
          : true;

        const matchesCountry = selectedCountry
          ? property.country.toLowerCase() === selectedCountry.toLowerCase()
          : data.country
          ? property.country.toLowerCase() === data.country.toLowerCase()
          : true;

        const matchesPropertyType = selectedPropertyType
          ? property.property_type.toLowerCase() === selectedPropertyType.toLowerCase()
          : data.propertyType
          ? property.property_type.toLowerCase() === data.propertyType.toLowerCase()
          : true;

        return (
          matchesLocation &&
          matchesMinPrice &&
          matchesMaxPrice &&
          matchesDownPayment &&
          matchesDownPaymentAmount &&
          matchesCountry &&
          matchesPropertyType
        );
      })
      .map((property) => ({
        ...property,
        location: `${property.city}, ${property.state_province}, ${property.country}`,
        area: property.land_size,
        payment: property.allow_down_payment ? "Down Payment Available" : "Full Payment",
        person: property.max_shares || "N/A",
      }))
      .sort((a, b) => {
        switch (sortOption) {
          case "Newest":
            return new Date(b.created_at) - new Date(a.created_at);
          case "Low to high":
            return parseFloat(a.price) - parseFloat(b.price);
          case "High to Low":
            return parseFloat(b.price) - parseFloat(a.price);
          case "Small to Large":
            return parseFloat(a.area || 0) - parseFloat(b.area || 0);
          case "Large to Small":
            return parseFloat(b.area || 0) - parseFloat(a.area || 0);
          default:
            return 0;
        }
      });

    setFilteredProperties(filtered);
  };

  // Filter properties when properties, selectedCountry, or selectedPropertyType change
  useEffect(() => {
    if (properties.length > 0) {
      const filtered = properties
        .filter((property) => {
          if (!property.featured_listing) return false;

          const matchesCountry = selectedCountry
            ? property.country.toLowerCase() === selectedCountry.toLowerCase()
            : true;

          const matchesPropertyType = selectedPropertyType
            ? property.property_type.toLowerCase() === selectedPropertyType.toLowerCase()
            : true;

          return matchesCountry && matchesPropertyType;
        })
        .map((property) => ({
          ...property,
          location: `${property.city}, ${property.state_province}, ${property.country}`,
          area: property.land_size,
          payment: property.allow_down_payment ? "Down Payment Available" : "Full Payment",
          person: property.max_shares || "N/A",
        }))
        .sort((a, b) => {
          switch (sortOption) {
            case "Newest":
              return new Date(b.created_at) - new Date(a.created_at);
            case "Low to high":
              return parseFloat(a.price) - parseFloat(b.price);
            case "High to Low":
              return parseFloat(b.price) - parseFloat(a.price);
            case "Small to Large":
              return parseFloat(a.area || 0) - parseFloat(b.area || 0);
            case "Large to Small":
              return parseFloat(b.area || 0) - parseFloat(a.area || 0);
            default:
              return 0;
          }
        });
      setFilteredProperties(filtered);
    }
  }, [properties, selectedCountry, selectedPropertyType, sortOption]);

  if (isLoading) return <div className="text-center py-16">Loading...</div>;
  if (error) return <div className="text-center py-16 text-red-500">Error loading properties</div>;

  return (
    <div>
      <div className="w-full bg-[#E8EBF3] py-10">
        <div className="container mx-auto px-4">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-4">
            {/* Location Search */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <MapPin size={20} className="text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Search by location"
                className="pl-10 w-full h-12 border border-gray-300 text-gray-800 placeholder-[#1c398869] bg-white rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                {...register("location")}
              />
            </div>

            {/* Min Price */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <CircleDollarSign size={20} className="text-gray-500" />
              </div>
              <input
                type="number"
                placeholder="Min Price"
                className="w-full h-12 border border-gray-300 bg-white rounded-md pl-10 pr-3 text-gray-800 placeholder-[#1c398869] focus:outline-none focus:ring-1 focus:ring-blue-500"
                {...register("minPrice")}
              />
            </div>

            {/* Max Price */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <CircleDollarSign size={20} className="text-gray-500" />
              </div>
              <input
                type="number"
                placeholder="Max Price"
                className="w-full h-12 border placeholder-[#1c398869] text-gray-800 bg-white border-gray-300 rounded-md pl-10 pr-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
                {...register("maxPrice")}
              />
            </div>

            {/* Down Payment with Checkbox */}
            <div className="flex-1 relative">
              <input
                type="number"
                placeholder="Down Payment"
                className="w-full h-12 border border-gray-300 bg-white text-gray-800 placeholder-[#1c398869] rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
              className="h-12 px-8 bg-[#1C3988] text-white rounded-md flex items-center justify-center hover:bg-blue-900 transition duration-300"
            >
              <Search className="mr-2 h-5 w-5 " />
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
                <option value="" disabled>
                  Select Country
                </option>
                <option value="usa">United States</option>
                <option value="canada">Canada</option>
                <option value="mexico">Mexico</option>
                <option value="uk">United Kingdom</option>
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
                <option value="villa">Villa</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-yellow-50/80 py-16">
        <div className="container mx-auto text-center">
          <div className="flex md:flex-row flex-col md:px-0 px-6 items-center justify-between">
            <div className="basis-6/12">
              <h2 className="text-4xl font-bold text-[#1C3988] text-start">Featured Properties</h2>
              <p className="text-[#545454] text-start mt-2 w-11/12 mb-10">
                Discover our featured properties, carefully selected for their prime locations and exceptional value.
              </p>
            </div>
            <div className="basis-6/12 flex items-center justify-end gap-4 md:px-0 px-6">
              <button
                onClick={onExploreClick}
                className="bg-[#fff] border text-[#1C3988] border-gray-300 px-5 py-2 w-[140px] flex rounded-sm items-center gap-[2px] text-center cursor-pointer"
              >
                <MapPin size={16} />
                View Map
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:px-0 mt-4 px-6 gap-6">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <div key={property.id} className="card w-full bg-white shadow-lg rounded-lg overflow-hidden relative">
                  <img
                    src={property.main_image ? `${baseImageUrl}${property.main_image}` : fallbackImage}
                    alt={property.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-start text-[#1C3988]">{property.title}</h3>
                    <p className="flex items-center gap-1 text-start text-gray-500">
                      <MapPin size={16} />
                      <span>{property.location}</span>
                    </p>
                    <p className="text-gray-600 mt-2">
                      <h1 className="text-lg flex items-center justify-between font-bold text-start text-[#1C3988]">
                        ${parseFloat(property.price).toLocaleString()}
                        <span className="text-[#8D8D8D] font-medium">{property.area}</span>
                      </h1>
                    </p>
                    <div className="flex items-center justify-between my-3">
                      <button className="px-5 py-[5px] rounded-full border-[1.5px] cursor-pointer border-[#1C3988] text-[#1C3988]">
                        {property.payment}
                      </button>
                      <div className="flex items-center gap-1 text-[#8B8B8B]">
                        <Users size={18} className="text-[#1C3988]" />
                        {property.shares_count}/5
                      </div>
                    </div>
                    <p className="text-[#8B8B8B] text-start pt-2">{property.description}</p>
                    <Link
                      to={`/dettails/${property.id}`}
                      state={{ property }}
                      className="btn bg-[#1C3988] py-2 text-white text-base font-medium mt-4 w-full text-center"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center col-span-full text-gray-500">
                No properties found.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};



// import { MapPin, Users, Search, CircleDollarSign } from "lucide-react";

// import { Link } from "react-router-dom";
// // import { useGetAllPropertiesFeaturedListQuery } from "../../redux/features/buyerApi";
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useGetAllPropertiesFeaturedListQuery } from "../../redux/features/sellerApi";

// export const FeaturedProperties = ({ onExploreClick }) => {
//   const { data: getAllPropertiesFeaturedList, isLoading, error } = useGetAllPropertiesFeaturedListQuery();
//   const properties = getAllPropertiesFeaturedList?.data || [];
//   const [sortOption, setSortOption] = useState("Featured");
//   const [filteredProperties, setFilteredProperties] = useState([]);
//   console.log(getAllPropertiesFeaturedList,"properties feature.........")

//   // Initialize useForm
//   const { register, handleSubmit } = useForm();

//   // Base URL for images
//   const baseImageUrl = "https://yoursafeland.duckdns.org";
//   const fallbackImage = "https://via.placeholder.com/300x200?text=No+Image+Available";

//   // Handle form submission and filter properties
//   const onSubmit = (data) => {
//     const filtered = properties
//       .filter((property) => {
//         if (!property.featured_listing) return false;

//         const fullLocation = `${property.city}, ${property.state_province}, ${property.country}`.toLowerCase();
//         const matchesLocation = data.location
//           ? fullLocation.includes(data.location.toLowerCase())
//           : true;

//         const matchesMinPrice = data.minPrice
//           ? parseFloat(property.price) >= parseFloat(data.minPrice)
//           : true;

//         const matchesMaxPrice = data.maxPrice
//           ? parseFloat(property.price) <= parseFloat(data.maxPrice)
//           : true;

//         const matchesDownPayment = data.hasDownPayment
//           ? property.allow_down_payment
//           : true;

//         const matchesDownPaymentAmount = data.downPayment
//           ? parseFloat(property.price) * (property.down_payment_percentage / 100) >= parseFloat(data.downPayment)
//           : true;

//         const matchesCountry = data.country
//           ? property.country.toLowerCase() === data.country.toLowerCase()
//           : true;

//         const matchesPropertyType = data.propertyType
//           ? property.property_type.toLowerCase() === data.propertyType.toLowerCase()
//           : true;

//         return (
//           matchesLocation &&
//           matchesMinPrice &&
//           matchesMaxPrice &&
//           matchesDownPayment &&
//           matchesDownPaymentAmount &&
//           matchesCountry &&
//           matchesPropertyType
//         );
//       })
//       .map((property) => ({
//         ...property,
//         location: `${property.city}, ${property.state_province}, ${property.country}`,
//         area: property.land_size,
//         payment: property.allow_down_payment ? "Down Payment Available" : "Full Payment",
//         person: property.max_shares || "N/A",
//       }))
//       .sort((a, b) => {
//         switch (sortOption) {
//           case "Newest":
//             return new Date(b.created_at) - new Date(a.created_at);
//           case "Low to high":
//             return parseFloat(a.price) - parseFloat(b.price);
//           case "High to Low":
//             return parseFloat(b.price) - parseFloat(a.price);
//           case "Small to Large":
//             return parseFloat(a.area || 0) - parseFloat(b.area || 0);
//           case "Large to Small":
//             return parseFloat(b.area || 0) - parseFloat(a.area || 0);
//           default:
//             return 0;
//         }
//       });

//     setFilteredProperties(filtered);
//   };

//   // Initialize filtered properties only once when properties are loaded
//   useEffect(() => {
//     if (properties.length > 0) {
//       const initialFiltered = properties
//         .filter((property) => property.featured_listing)
//         .map((property) => ({
//           ...property,
//           location: `${property.city}, ${property.state_province}, ${property.country}`,
//           area: property.land_size,
//           payment: property.allow_down_payment ? "Down Payment Available" : "Full Payment",
//           person: property.max_shares || "N/A",
//         }))
//         .sort((a, b) => {
//           switch (sortOption) {
//             case "Newest":
//               return new Date(b.created_at) - new Date(a.created_at);
//             case "Low to high":
//               return parseFloat(a.price) - parseFloat(b.price);
//             case "High to Low":
//               return parseFloat(b.price) - parseFloat(a.price);
//             case "Small to Large":
//               return parseFloat(a.area || 0) - parseFloat(b.area || 0);
//             case "Large to Small":
//               return parseFloat(b.area || 0) - parseFloat(a.area || 0);
//             default:
//               return 0;
//           }
//         });
//       setFilteredProperties(initialFiltered);
//     }
//   }, [properties]); // Only run when properties change

//   // Update filtered properties when sortOption changes
//   useEffect(() => {
//     const sortedProperties = [...filteredProperties].sort((a, b) => {
//       switch (sortOption) {
//         case "Newest":
//           return new Date(b.created_at) - new Date(a.created_at);
//         case "Low to high":
//           return parseFloat(a.price) - parseFloat(b.price);
//         case "High to Low":
//           return parseFloat(b.price) - parseFloat(a.price);
//         case "Small to Large":
//           return parseFloat(a.area || 0) - parseFloat(b.area || 0);
//         case "Large to Small":
//           return parseFloat(b.area || 0) - parseFloat(a.area || 0);
//         default:
//           return 0;
//       }
//     });
//     setFilteredProperties(sortedProperties);
//   }, [sortOption]); // Only run when sortOption changes

//   if (isLoading) return <div className="text-center py-16">Loading...</div>;
//   if (error) return <div className="text-center py-16 text-red-500">Error loading properties</div>;

//   return (
//     <div>
//        <div className="w-full bg-[#E8EBF3] py-10">
//         <div className="container mx-auto px-4">
//           <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-4">
//             {/* Location Search */}
//             <div className="relative flex-1">
//               <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
//                 <MapPin size={20} className="text-gray-500" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search by location"
//                 className="pl-10 w-full h-12 border border-gray-300 text-gray-800 placeholder-[#1c398869] bg-white rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
//                 {...register("location")}
//               />
//             </div>

//             {/* Min Price */}
//             <div className="flex-1 relative">
//               <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
//                 <CircleDollarSign size={20} className="text-gray-500" />
//               </div>
//               <input
//                 type="number"
//                 placeholder="Min Price"
//                 className="w-full h-12 border border-gray-300 bg-white rounded-md pl-10 pr-3 text-gray-800 placeholder-[#1c398869] focus:outline-none focus:ring-1 focus:ring-blue-500"
//                 {...register("minPrice")}
//               />
//             </div>

//             {/* Max Price */}
//             <div className="flex-1 relative">
//               <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
//                 <CircleDollarSign size={20} className="text-gray-500" />
//               </div>
//               <input
//                 type="number"
//                 placeholder="Max Price"
//                 className="w-full h-12 border placeholder-[#1c398869] text-gray-800 bg-white border-gray-300 rounded-md pl-10 pr-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
//                 {...register("maxPrice")}
//               />
//             </div>

//             {/* Down Payment with Checkbox */}
//             <div className="flex-1 relative">
//               <input
//                 type="number"
//                 placeholder="Down Payment"
//                 className="w-full h-12 border border-gray-300 bg-white text-gray-800 placeholder-[#1c398869] rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
//                 {...register("downPayment")}
//               />
//               <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
//                 <input
//                   type="checkbox"
//                   className="h-5 w-5 border border-gray-300 rounded"
//                   {...register("hasDownPayment")}
//                 />
//               </div>
//             </div>

//             {/* Search Button */}
//             <button
//               type="submit"
//               className="h-12 px-8 bg-[#1C3988] text-white rounded-md flex items-center justify-center hover:bg-blue-900 transition duration-300"
//             >
//               <Search className="mr-2 h-5 w-5 " />
//               Search
//             </button>
//           </form>

//           {/* Dropdowns Row */}
//           <div className="flex flex-col md:flex-row gap-4 mt-4">
//             {/* Country Dropdown */}
//             <div className="flex-1">
//               <select
//                 className="w-full h-12 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none bg-white text-[#1c398869]"
//                 {...register("country")}
//                 defaultValue=""
//               >
//                 <option value="" disabled>
//                   Select Country
//                 </option>
//                 <option value="usa">United States</option>
//                 <option value="canada">Canada</option>
//                 <option value="mexico">Mexico</option>
//                 <option value="uk">United Kingdom</option>
//               </select>
//             </div>

//             {/* Property Type Dropdown */}
//             <div className="flex-1">
//               <select
//                 className="w-full h-12 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none bg-white text-[#1c398869]"
//                 {...register("propertyType")}
//                 defaultValue=""
//               >
//                 <option value="" disabled>
//                   Property Type
//                 </option>
//                 <option value="land">Land</option>
//                 <option value="ranch">Ranch</option>
//                 <option value="farm">Farm</option>
//                 <option value="recreational">Recreational</option>
//                 <option value="villa">Villa</option> {/* Added to match sample data */}
//               </select>
//             </div>
//           </div>
//         </div>
//       </div>

//       <section className="bg-yellow-50/80 py-16">
//         <div className="container mx-auto text-center">
//           <div className="flex md:flex-row flex-col md:px-0 px-6 items-center justify-between">
//             <div className="basis-6/12">
//               <h2 className="text-4xl font-bold text-[#1C3988] text-start">Featured Properties</h2>
//               <p className="text-[#545454] text-start mt-2 w-11/12 mb-10">
//                 Discover our featured properties, carefully selected for their prime locations and exceptional value.
//               </p>
//             </div>
//             <div className="basis-6/12 flex items-center justify-end gap-4 md:px-0 px-6">
//               {/* <Link to="/all-properties" className="bg-[#1C3988] px-5 py-2 rounded-sm text-white w-[180px] text-center">
//                 View All Properties
//               </Link> */}
//               <button
//                 onClick={onExploreClick}
//                 className="bg-[#fff] border text-[#1C3988] border-gray-300 px-5 py-2 w-[140px] flex rounded-sm items-center gap-[2px] text-center cursor-pointer"
//               >
//                 <MapPin size={16} />
//                 View Map
//               </button>
//               {/* <select
//                 className="select rounded-sm w-[150px] text-[#1C3988] text-base bg-[#fff]"
//                 value={sortOption}
//                 onChange={(e) => setSortOption(e.target.value)}
//               >
//                 <option value="Featured">Featured</option>
//                 <option value="Newest">Newest</option>
//                 <option value="Low to high">Low to high</option>
//                 <option value="High to Low">High to Low</option>
//                 <option value="Small to Large">Small to Large</option>
//                 <option value="Large to Small">Large to Small</option>
//               </select> */}
//             </div>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:px-0 mt-4 px-6 gap-6">
//             {filteredProperties.length > 0 ? (
//               filteredProperties.map((property) => (
//                 <div key={property.id} className="card w-full bg-white shadow-lg rounded-lg overflow-hidden relative">
//                   <img
//                     src={property.main_image ? `${baseImageUrl}${property.main_image}` : fallbackImage}
//                     alt={property.title}
//                     className="w-full h-48 object-cover"
//                   />
//                   <div className="p-6">
//                     <h3 className="text-xl font-semibold text-start text-[#1C3988]">{property.title}</h3>
//                     <p className="flex items-center gap-1 text-start text-gray-500">
//                       <MapPin size={16} />
//                       <span>{property.location}</span>
//                     </p>
//                     <p className="text-gray-600 mt-2">
//                       <h1 className="text-lg flex items-center justify-between font-bold text-start text-[#1C3988]">
//                         ${parseFloat(property.price).toLocaleString()}
//                         <span className="text-[#8D8D8D] font-medium">{property.area}</span>
//                       </h1>
//                     </p>
//                     <div className="flex items-center justify-between my-3">
//                       <button className="px-5 py-[5px] rounded-full border-[1.5px] cursor-pointer border-[#1C3988] text-[#1C3988]">
//                         {property.payment}
//                       </button>
//                       <div className="flex items-center gap-1 text-[#8B8B8B]">
//                         <Users size={18} className="text-[#1C3988]" />
//                         {property.shares_count}/5
//                       </div>
//                     </div>
//                     <p className="text-[#8B8B8B] text-start pt-2">{property.description}</p>
//                     <Link
//                       to={`/dettails/${property.id}`}
//                       state={{ property }}
//                       className="btn bg-[#1C3988] py-2 text-white text-base font-medium mt-4 w-full text-center"
//                     >
//                       View Details
//                     </Link>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="text-center col-span-full text-gray-500">
//                 properties loading...
//               </div>
//             )}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };