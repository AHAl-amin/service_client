


// import { useState, useEffect } from "react";
// import EditPropertyDetails from "./EditPropertyDetails";
// import EditMediaImages from "./EditMediaImages";
// import EditPricingOptions from "./EditPricingOptions";
// import EditPreviewListing from "./EditPreviewListing";
// import EditLocationInfo from "./EditLocationInfo";
// import toast, { Toaster } from "react-hot-toast";
// import { useGetAllPropertiesListQuery } from "../../../redux/features/sellerApi";

// const tabs = [
//   { id: "details", label: "Property Details" },
//   { id: "media", label: "Media & Images" },
//   { id: "location", label: "Location" },
//   { id: "pricing", label: "Pricing & options" },
//   { id: "preview", label: "Preview" },
// ];

// export default function EditProperties({ PropertiesId }) {
//   const [activeTab, setActiveTab] = useState("details");
//   const [propertyData, setPropertyData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const { data: getAllPropertiesList, isLoading, isError, error: queryError } = useGetAllPropertiesListQuery();
//   const updateUrl = `http://10.10.13.60:2100/api/properties/seller/update/${PropertiesId}/`;

//   // Filter and set property data based on PropertiesId
//   useEffect(() => {
//     if (isLoading) {
//       setLoading(true);
//       return;
//     }

//     if (isError) {
//       setError(queryError?.message || "Failed to load property data.");
//       setLoading(false);
//       toast.error(queryError?.message || "Failed to load property data.");
//       return;
//     }

//     if (getAllPropertiesList && PropertiesId) {
//       const selectedProperty = getAllPropertiesList.find((property) => property.id === Number(PropertiesId));
//       if (selectedProperty) {
//         // Transform data to match child component expectations
//         const transformedProperty = {
//           id: selectedProperty.id,
//           title: selectedProperty.title,
//           land_size: selectedProperty.land_size,
//           property_type: selectedProperty.property_type,
//           description: selectedProperty.description,
//           features: selectedProperty.features || [],
//           main_image: selectedProperty.main_image
//             ? `http://10.10.13.60:2100${selectedProperty.main_image}`
//             : "https://via.placeholder.com/400x300?text=No+Image",
//           images: selectedProperty.images.map((img) => ({
//             id: img.id,
//             image: `http://10.10.13.60:2100${img.image}`,
//             image_type: img.image_type,
//             uploaded_at: img.uploaded_at,
//           })),
//           country: selectedProperty.country,
//           state_province: selectedProperty.state_province,
//           city: selectedProperty.city,
//           street_address: selectedProperty.street_address,
//           postal_code: selectedProperty.postal_code,
//           latitude: selectedProperty.latitude,
//           longitude: selectedProperty.longitude,
//           price: selectedProperty.price,
//           allow_down_payment: selectedProperty.allow_down_payment,
//           down_payment_percentage: selectedProperty.down_payment_percentage,
//           lock_period: selectedProperty.lock_period,
//           buy_share: selectedProperty.buy_share,
//           max_shares: selectedProperty.max_shares,
//           remaining_shares: selectedProperty.remaining_shares,
//           seller: selectedProperty.seller,
//           created_at: selectedProperty.created_at,
//           updated_at: selectedProperty.updated_at,
//           is_active: selectedProperty.is_active,
//           boostOptions: {
//             dailyBoost: selectedProperty.dailyBoost || false,
//             weeklyBoost: selectedProperty.weeklyBoost || false,
//             featuredListing: selectedProperty.featuredListing || false,
//           },
//         };
//         setPropertyData(transformedProperty);
//         setLoading(false);
//       } else {
//         setError("Property not found.");
//         setLoading(false);
//         toast.error("Property not found.");
//       }
//     } else {
//       setError("Invalid property ID or no properties available.");
//       setLoading(false);
//       toast.error("Invalid property ID or no properties available.");
//     }
//   }, [getAllPropertiesList, isLoading, isError, queryError, PropertiesId]);

//   // Handle form submission to update property data
//  // Handle form submission to update property data
// const handleUpdate = async () => {
//   try {
//     const accessToken = localStorage.getItem("access_token");
//     if (!accessToken) {
//       throw new Error("No access token found. Please log in.");
//     }

//     // Grouping utility: every 2 images into 1 string
//     const groupImagesByTwo = (images) => {
//       const grouped = [];
//       for (let i = 0; i < images.length; i += 2) {
//         grouped.push(images.slice(i, i + 2).join(","));
//       }
//       return grouped;
//     };

//     const aerialImages = propertyData.images
//       ?.filter((img) => img.image_type === "aerial" && img.image)
//       .map((img) => img.image) || [];

//     const additionalImages = propertyData.images
//       ?.filter((img) => img.image_type === "additional" && img.image)
//       .map((img) => img.image) || [];

//     // Transform propertyData to match the required JSON structure
//     const updatedData = {
//       title: propertyData.title,
//       land_size: propertyData.land_size,
//       property_type: propertyData.property_type,
//       description: propertyData.description,
//       features: propertyData.features.map((feature) => feature.name),
//       country: propertyData.country,
//       state_province: propertyData.state_province,
//       city: propertyData.city,
//       street_address: propertyData.street_address,
//       postal_code: propertyData.postal_code,
//       latitude: parseFloat(propertyData.latitude) || 0,
//       longitude: parseFloat(propertyData.longitude) || 0,
//       price: parseFloat(propertyData.price) || 0,
//       allow_down_payment: propertyData.allow_down_payment || false,
//       down_payment_percentage: propertyData.allow_down_payment
//         ? parseInt(propertyData.down_payment_percentage) || 25
//         : 0,
//       lock_period: propertyData.lock_period || "30",
//       buy_share: propertyData.buy_share || false,
//       max_shares: parseInt(propertyData.max_shares) || 8,
//       featured_listing: propertyData.boostOptions?.featuredListing || false,
//       main_image: propertyData.main_image?.startsWith("data:image")
//         ? propertyData.main_image
//         : undefined,
//       drone_images: groupImagesByTwo(aerialImages),
//       additional_images: groupImagesByTwo(additionalImages),
//     };

//     // Remove undefined fields to avoid sending unnecessary data
//     Object.keys(updatedData).forEach((key) => {
//       if (updatedData[key] === undefined) {
//         delete updatedData[key];
//       }
//     });

//     const response = await fetch(updateUrl, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${accessToken}`,
//       },
//       body: JSON.stringify(updatedData),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || `Failed to update property: ${response.statusText}`);
//     }

//     const updatedProperty = await response.json();

//     // Update local state with the response
//     setPropertyData({
//       ...propertyData,
//       ...updatedProperty,
//       main_image: updatedProperty.main_image
//         ? `http://10.10.13.60:2100${updatedProperty.main_image}`
//         : propertyData.main_image,
//       images: updatedProperty.images?.map((img) => ({
//         id: img.id,
//         image: `http://10.10.13.60:2100${img.image}`,
//         image_type: img.image_type,
//         uploaded_at: img.uploaded_at,
//       })) || propertyData.images,
//       features: updatedProperty.features?.map((name) => ({ name })) || propertyData.features,
//       boostOptions: {
//         dailyBoost: updatedProperty.dailyBoost || false,
//         weeklyBoost: updatedProperty.weeklyBoost || false,
//         featuredListing: updatedProperty.featuredListing || false,
//       },
//     });

//     toast.success("Property updated successfully!");
//   } catch (err) {
//     toast.error(err.message || "Failed to update property. Please try again.");
//     console.error("Update error:", err);
//   }
// };

//   const handleNext = () => {
//     const tabIds = tabs.map((tab) => tab.id);
//     const currentIndex = tabIds.indexOf(activeTab);
//     if (currentIndex < tabIds.length - 1) {
//       setActiveTab(tabIds[currentIndex + 1]);
//     }
//   };

//   const handleBack = () => {
//     const tabIds = tabs.map((tab) => tab.id);
//     const currentIndex = tabIds.indexOf(activeTab);
//     if (currentIndex > 0) {
//       setActiveTab(tabIds[currentIndex - 1]);
//     }
//   };

//   const renderContent = () => {
//     if (loading) return <div>Loading property data...</div>;
//     if (error) return <div>{error}</div>;

//     const sharedProps = {
//       onNext: handleNext,
//       onBack: handleBack,
//       propertyData,
//       updatePropertyData: setPropertyData,
//       onSave: handleUpdate,
//     };

//     switch (activeTab) {
//       case "details":
//         return <EditPropertyDetails {...sharedProps} />;
//       case "media":
//         return <EditMediaImages {...sharedProps} />;
//       case "location":
//         return <EditLocationInfo {...sharedProps} />;
//       case "pricing":
//         return <EditPricingOptions {...sharedProps} />;
//       case "preview":
//         return <EditPreviewListing {...sharedProps} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="p-6">
//       <div className="space-y-2 mb-6 text-start">
//         <h1 className="text text-4xl font-bold">Edit Your Property Details</h1>
//         <p className="text-gray-500 text-xl">Update your property listing to showcase to potential buyers.</p>
//       </div>
//       <div className="flex flex-wrap gap-1 mb-6 bg-[#E8EBF3] border border-[#1C3988] p-2 rounded-lg">
//         {tabs.map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id)}
//             className={`flex-1 min-w-fit px-4 py-3 rounded-md font-medium transition-all cursor-pointer ${
//               activeTab === tab.id
//                 ? "bg-[#1C3988] font-semibold text-xl text-white shadow-sm"
//                 : "text-[#1C3988] font-semibold text-xl hover:text-gray-700"
//             }`}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>
//       <div className="min-h-[400px]">{renderContent()}</div>
//       <Toaster position="top-right" />
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import EditPropertyDetails from "./EditPropertyDetails";
import EditMediaImages from "./EditMediaImages";
import EditPricingOptions from "./EditPricingOptions";
import EditPreviewListing from "./EditPreviewListing";
import EditLocationInfo from "./EditLocationInfo";
import toast, { Toaster } from "react-hot-toast";
import { useGetAllPropertiesListQuery } from "../../../redux/features/sellerApi";

const tabs = [
  { id: "details", label: "Property Details" },
  { id: "media", label: "Media & Images" },
  { id: "location", label: "Location" },
  { id: "pricing", label: "Pricing & options" },
  { id: "preview", label: "Preview" },
];

export default function EditProperties({ PropertiesId }) {
  const [activeTab, setActiveTab] = useState("details");
  const [propertyData, setPropertyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { data: getAllPropertiesList, isLoading, isError, error: queryError } = useGetAllPropertiesListQuery();
  const updateUrl = `http://10.10.13.60:2100/api/properties/seller/update/${PropertiesId}/`;

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
      return;
    }

    if (isError) {
      setError(queryError?.message || "Failed to load property data.");
      setLoading(false);
      toast.error(queryError?.message || "Failed to load property data.");
      return;
    }

    if (getAllPropertiesList && PropertiesId) {
      const selectedProperty = getAllPropertiesList.find((property) => property.id === Number(PropertiesId));
      if (selectedProperty) {
        const transformedProperty = {
          ...selectedProperty,
          main_image: selectedProperty.main_image
            ? `http://10.10.13.60:2100${selectedProperty.main_image}`
            : "https://via.placeholder.com/400x300?text=No+Image",
          images: selectedProperty.images.map((img) => ({
            id: img.id,
            image: `http://10.10.13.60:2100${img.image}`,
            image_type: img.image_type,
            uploaded_at: img.uploaded_at,
          })),
          boostOptions: {
            dailyBoost: selectedProperty.dailyBoost || false,
            weeklyBoost: selectedProperty.weeklyBoost || false,
            featuredListing: selectedProperty.featuredListing || false,
          },
        };
        setPropertyData(transformedProperty);
        setLoading(false);
      } else {
        setError("Property not found.");
        setLoading(false);
        toast.error("Property not found.");
      }
    } else {
      setError("Invalid property ID or no properties available.");
      setLoading(false);
      toast.error("Invalid property ID or no properties available.");
    }
  }, [getAllPropertiesList, isLoading, isError, queryError, PropertiesId]);

  // Group every 2 images into a single comma-separated string
  const groupImagesByTwo = (images) => {
    const grouped = [];
    for (let i = 0; i < images.length; i += 2) {
      grouped.push(images.slice(i, i + 2).join(","));
    }
    return grouped;
  };

const handleUpdate = async () => {
  try {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      throw new Error("No access token found. Please log in.");
    }

    const updatedData = {
      title: propertyData.title,
      land_size: propertyData.land_size,
      property_type: propertyData.property_type,
      description: propertyData.description,
      features: propertyData.features.map((feature) => feature.name),
      country: propertyData.country,
      state_province: propertyData.state_province,
      city: propertyData.city,
      street_address: propertyData.street_address,
      postal_code: propertyData.postal_code,
      latitude: parseFloat(propertyData.latitude) || 0,
      longitude: parseFloat(propertyData.longitude) || 0,
      price: parseFloat(propertyData.price) || 0,
      allow_down_payment: propertyData.allow_down_payment || false,
      down_payment_percentage: propertyData.allow_down_payment
        ? parseInt(propertyData.down_payment_percentage) || 25
        : 0,
      lock_period: propertyData.lock_period || "30",
      buy_share: propertyData.buy_share || false,
      max_shares: parseInt(propertyData.max_shares) || 8,
      featured_listing: propertyData.boostOptions?.featuredListing || false,
      main_image: propertyData.main_image?.startsWith("data:image")
        ? propertyData.main_image
        : undefined,

   drone_images: groupImagesByTwo(
  propertyData.images
    ?.filter((img) => img.image_type === "aerial" && img.image)
    .map((img) =>
      img.image.startsWith("data:image") // already base64
        ? img.image
        : undefined
    )
    .filter(Boolean) || []
),

additional_images: groupImagesByTwo(
  propertyData.images
    ?.filter((img) => img.image_type === "additional" && img.image)
    .map((img) =>
      img.image.startsWith("data:image") // already base64
        ? img.image
        : undefined
    )
    .filter(Boolean) || []
),


    };

    // Clean out undefined
    Object.keys(updatedData).forEach((key) => {
      if (updatedData[key] === undefined) {
        delete updatedData[key];
      }
    });

    const response = await fetch(updateUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Failed to update property: ${response.statusText}`);
    }

    const updatedProperty = await response.json();

    setPropertyData({
      ...propertyData,
      ...updatedProperty,
      main_image: updatedProperty.main_image
        ? `http://10.10.13.60:2100${updatedProperty.main_image}`
        : propertyData.main_image,
      images:
        updatedProperty.images?.map((img) => ({
          id: img.id,
          image: `http://10.10.13.60:2100${img.image}`,
          image_type: img.image_type,
          uploaded_at: img.uploaded_at,
        })) || propertyData.images,
      features:
        updatedProperty.features?.map((name) => ({ name })) || propertyData.features,
      boostOptions: {
        dailyBoost: updatedProperty.dailyBoost || false,
        weeklyBoost: updatedProperty.weeklyBoost || false,
        featuredListing: updatedProperty.featuredListing || false,
      },
    });

    toast.success("Property updated successfully!");
  } catch (err) {
    toast.error(err.message || "Failed to update property. Please try again.");
    console.error("Update error:", err);
  }
};


  const handleNext = () => {
    const tabIds = tabs.map((tab) => tab.id);
    const currentIndex = tabIds.indexOf(activeTab);
    if (currentIndex < tabIds.length - 1) setActiveTab(tabIds[currentIndex + 1]);
  };

  const handleBack = () => {
    const tabIds = tabs.map((tab) => tab.id);
    const currentIndex = tabIds.indexOf(activeTab);
    if (currentIndex > 0) setActiveTab(tabIds[currentIndex - 1]);
  };

  const renderContent = () => {
    if (loading) return <div>Loading property data...</div>;
    if (error) return <div>{error}</div>;

    const sharedProps = {
      onNext: handleNext,
      onBack: handleBack,
      propertyData,
      updatePropertyData: setPropertyData,
      onSave: handleUpdate,
    };

    switch (activeTab) {
      case "details":
        return <EditPropertyDetails {...sharedProps} />;
      case "media":
        return <EditMediaImages {...sharedProps} />;
      case "location":
        return <EditLocationInfo {...sharedProps} />;
      case "pricing":
        return <EditPricingOptions {...sharedProps} />;
      case "preview":
        return <EditPreviewListing {...sharedProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="space-y-2 mb-6 text-start">
        <h1 className="text text-4xl font-bold">Edit Your Property Details</h1>
        <p className="text-gray-500 text-xl">Update your property listing to showcase to potential buyers.</p>
      </div>
      <div className="flex flex-wrap gap-1 mb-6 bg-[#E8EBF3] border border-[#1C3988] p-2 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 min-w-fit px-4 py-3 rounded-md font-medium transition-all cursor-pointer ${
              activeTab === tab.id
                ? "bg-[#1C3988] font-semibold text-xl text-white shadow-sm"
                : "text-[#1C3988] font-semibold text-xl hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="min-h-[400px]">{renderContent()}</div>
      <Toaster position="top-right" />
    </div>
  );
}

