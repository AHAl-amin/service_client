


import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { useChangePasswordMutation, useGetSellerDataProfileQuery, useUpdateSellerDataProfileMutation } from "../../redux/features/profileApi";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";

export default function SellerSetting() {
  const { data: getSellerDataProfile, isLoading, isError, error, refetch } = useGetSellerDataProfileQuery();
  const profile = getSellerDataProfile?.data;
  console.log(profile,"ppppppppppppppp")
  const [activeView, setActiveView] = useState("editProfile");
  const [country, setCountry] = useState("");
  const [updateSellerDataProfile] = useUpdateSellerDataProfileMutation();

  const [previewImage, setPreviewImage] = useState(
    profile?.profile_picture
      ? `https://yoursafeland.duckdns.org${profile.profile_picture}`
      : "https://i.ibb.co/jVcFCQf/businessman-icon-600nw-564112600.webp"
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: "",
      email: "",
      contact_number: "",
      state_province: "",
      city: "",
      postal_code: "",
      company: "",
    },
  });

  useEffect(() => {
    if (profile) {
      const newFormData = {
        first_name: profile.first_name || "",
        email: profile.email || "",
        contact_number: profile.contact_number || "",
        state_province: profile.state_province || "",
        city: profile.city || "",
        postal_code: profile.postal_code || "",
        company: profile.company_name || "", // Map company_name to company
      };
      setCountry(profile.country || "");
      setPreviewImage(
        profile.profile_picture
          ? `https://yoursafeland.duckdns.org${profile.profile_picture}`
          : "https://i.ibb.co/jVcFCQf/businessman-icon-600nw-564112600.webp"
      );
      reset(newFormData);
    }
  }, [profile, reset]);

  const EditProfileForm = () => {
    const onSubmit = async (data) => {
  try {
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("first_name", data.first_name);
    formDataToSubmit.append("contact_number", data.contact_number);
    formDataToSubmit.append("country", country);
    formDataToSubmit.append("state_province", data.state_province);
    formDataToSubmit.append("city", data.city);
    formDataToSubmit.append("postal_code", data.postal_code);
    formDataToSubmit.append("company_name", data.company);
    if (data.profile_picture && data.profile_picture[0] instanceof File) {
      formDataToSubmit.append("profile_picture", data.profile_picture[0]);
    }

    console.log([...formDataToSubmit.entries()]); // Debug payload
    const response = await updateSellerDataProfile(formDataToSubmit).unwrap();
    console.log(response); // Debug response
    toast.success(response?.message || "Profile updated successfully!");
    await refetch();
    if (response?.data) {
      reset({
        first_name: response.data.first_name,
        contact_number: response.data.contact_number,
        email: response.data.email,
        state_province: response.data.state_province,
        city: response.data.city,
        postal_code: response.data.postal_code,
        company: response.data.company_name,
      });
      setCountry(response.data.country || "");
      setPreviewImage(
        response.data.profile_picture
          ? `https://yoursafeland.duckdns.org${response.data.profile_picture}`
          : "https://i.ibb.co/jVcFCQf/businessman-icon-600nw-564112600.webp"
      );
    }
  } catch (err) {
    console.error("Error updating profile:", err);
    toast.error(err?.data?.message || "Failed to update profile.");
  }
};

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setPreviewImage(URL.createObjectURL(file));
      }
    };

    return (
      <div className="rounded-lg mt-6 max-w-6xl mx-auto">
        <div className="flex justify-center gap-6 items-center mb-6">
          <div className="w-16 h-16 rounded-full overflow-hidden mb-3">
            <img src={previewImage} alt="User Avatar" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-xl font-semibold text-[#1C3988]">{profile?.first_name}</h2>
        </div>

        <div className="mb-6 flex gap-4 justify-center items-center">
          <button
            onClick={() => setActiveView("editProfile")}
            className={`text-xl pb-1 transition border-b-2 cursor-pointer ${
              activeView === "editProfile"
                ? "border-[#1C3988] text-[#1C3988]"
                : "border-transparent text-gray-600 hover:text-[#1C3988]"
            }`}
          >
            Edit Profile
          </button>
          <span className="text-xl mx-2">|</span>
          <button
            onClick={() => setActiveView("changePassword")}
            className={`text-xl pb-1 transition border-b-2 cursor-pointer ${
              activeView === "changePassword"
                ? "border-[#1C3988] text-[#1C3988]"
                : "border-transparent text-gray-600 hover:text-[#1C3988]"
            }`}
          >
            Change Password
          </button>
        </div>

        <h3 className="text-2xl font-medium mb-6 text-center text-[#1C3988]">Edit Your Profile</h3>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-center mb-4">
            <label className="text-[#1C3988] border border-[#1C3988] p-2 rounded-md cursor-pointer flex items-center">
              <span className="mr-2 text-xl">Change Photo</span>
              <FaChevronDown />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                {...register("profile_picture")}
                onChange={(e) => {
                  register("profile_picture").onChange(e);
                  handleImageChange(e);
                }}
              />
            </label>
          </div>

          <div>
            <label htmlFor="first_name" className="block font-medium text-xl mb-1 text-[#1C3988]">
              User name
            </label>
            <input
              id="first_name"
              type="text"
              placeholder="User name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-600 focus:ring-[#1C3988] focus:border-transparent"
              {...register("first_name", { required: "Username is required" })}
            />
            {errors.first_name && (
              <p className="text-red-500 text-sm mt-1">{errors.first_name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block font-medium text-xl mb-1 text-[#1C3988]">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="email"
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-600 cursor-not-allowed"
              {...register("email", { required: "Email is required" })}
            />
          </div>

          <div>
            <label htmlFor="contact_number" className="block font-medium text-xl mb-1 text-[#1C3988]">
              Contact number
            </label>
            <input
              id="contact_number"
              type="tel"
              placeholder="Contact number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-600 focus:ring-[#1C3988] focus:border-transparent"
              {...register("contact_number", {
                required: "Contact number is required",
              })}
            />
            {errors.contact_number && (
              <p className="text-red-500 text-sm mt-1">{errors.contact_number.message}</p>
            )}
          </div>

          <div className="relative">
            <label htmlFor="country" className="block font-medium text-xl mb-1 text-[#1C3988]">
              Country
            </label>
            <select
              id="country"
              className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-600 focus:ring-[#1C3988] focus:border-transparent"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">Select a country</option>
              {!["United States", "Canada", "United Kingdom", "Australia"].includes(country) && (
                <option value={country}>{country}</option>
              )}
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Australia">Australia</option>
            </select>
          </div>

          <div>
            <label htmlFor="state_province" className="block font-medium text-xl mb-1 text-[#1C3988]">
              State
            </label>
            <input
              id="state_province"
              type="text"
              placeholder="State"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-600 focus:ring-[#1C3988] focus:border-transparent"
              {...register("state_province")}
            />
          </div>

          <div>
            <label htmlFor="city" className="block font-medium text-xl mb-1 text-[#1C3988]">
              City
            </label>
            <input
              id="city"
              type="text"
              placeholder="City"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-600 focus:ring-[#1C3988] focus:border-transparent"
              {...register("city")}
            />
          </div>

          <div>
            <label htmlFor="postal_code" className="block font-medium text-xl mb-1 text-[#1C3988]">
              Zipcode
            </label>
            <input
              id="postal_code"
              type="text"
              placeholder="Zipcode"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-600 focus:ring-[#1C3988] focus:border-transparent"
              {...register("postal_code")}
            />
            {errors.postal_code && (
              <p className="text-red-500 text-sm mt-1">{errors.postal_code.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="company" className="block font-medium text-xl mb-1 text-[#1C3988]">
              Company name
            </label>
            <input
              id="company"
              type="text"
              placeholder="Company name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-600 focus:ring-[#1C3988] focus:border-transparent"
              {...register("company")}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#1C3988] text-white py-3 px-4 rounded-md transition duration-200 font-medium cursor-pointer hover:bg-[#1C3988]"
          >
            Save & Change
          </button>
        </form>

        <Toaster position="top-right" />
      </div>
    );
  };

  const ChangePasswordForm = () => {
    const [changePassword] = useChangePasswordMutation();
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
      try {
        const res = await changePassword({
          old_password: data.old_password,
          new_password: data.new_password,
          confirm_password: data.confirm_password,
        }).unwrap();

        if (res.success) {
          toast.success("Password changed successfully!");
        } else {
          toast.error(res?.message || "Failed to change password.");
        }
      } catch (err) {
        const errors = err?.data?.errors || {};
        if (errors.old_password) toast.error(errors.old_password[0]);
        if (errors.new_password) toast.error(errors.new_password[0]);
        if (errors.confirm_password) toast.error(errors.confirm_password[0]);
        else toast.error(err?.data?.message || "Failed to change password.");
      }
    };

    return (
      <div className="mx-auto rounded-lg mt-6 max-w-6xl">
        <div className="flex justify-center gap-6 items-center mb-6">
          <div className="w-16 h-16 rounded-full overflow-hidden mb-3">
            <img
              src={
                profile?.profile_picture
                  ? `https://yoursafeland.duckdns.org${profile.profile_picture}`
                  : "https://i.ibb.co/jVcFCQf/businessman-icon-600nw-564112600.webp"
              }
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-xl font-semibold text-[#1C3988]">{profile?.first_name}</h2>
        </div>

        <div className="mb-6 flex gap-4 justify-center items-center w-full mx-auto">
          <button
            onClick={() => setActiveView("editProfile")}
            className={`text-xl pb-1 transition border-b-2 cursor-pointer ${
              activeView === "editProfile"
                ? "border-[#1C3988] text-[#1C3988]"
                : "border-transparent text-gray-600 hover:text-[#1C3988]"
            }`}
          >
            Edit Profile
          </button>
          <span className="text-xl mx-2">|</span>
          <button
            onClick={() => setActiveView("changePassword")}
            className={`text-xl pb-1 transition border-b-2 cursor-pointer ${
              activeView === "changePassword"
                ? "border-[#1C3988] text-[#1C3988]"
                : "border-transparent text-gray-600 hover:text-[#1C3988]"
            }`}
          >
            Change Password
          </button>
        </div>

        <h3 className="text-2xl font-medium mb-6 text-center text-[#1C3988]">Edit Password</h3>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="old_password" className="block font-medium text-xl mb-1 text-[#1C3988]">
              Current Password
            </label>
            <input
              id="old_password"
              type="password"
              placeholder="Old password"
              {...register("old_password", { required: "Old password is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#1C3988]"
            />
            {errors.old_password && <p className="text-red-500 text-sm">{errors.old_password.message}</p>}
          </div>

          <div>
            <label htmlFor="new_password" className="block font-medium text-xl mb-1 text-[#1C3988]">
              New Password
            </label>
            <input
              id="new_password"
              type="password"
              placeholder="New password"
              {...register("new_password", { required: "New password is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#1C3988]"
            />
            {errors.new_password && <p className="text-red-500 text-sm">{errors.new_password.message}</p>}
          </div>

          <div>
            <label htmlFor="confirm_password" className="block font-medium text-xl mb-1 text-[#1C3988]">
              Confirm New Password
            </label>
            <input
              id="confirm_password"
              type="password"
              placeholder="Confirm password"
              {...register("confirm_password", {
                required: "Please confirm your password",
                validate: (value) => value === watch("new_password") || "Passwords do not match",
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#1C3988]"
            />
            {errors.confirm_password && <p className="text-red-500 text-sm">{errors.confirm_password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-[#1C3988] text-white py-3 px-4 rounded-md transition duration-200 font-medium cursor-pointer"
          >
            Save & Change
          </button>
        </form>
      </div>
    );
  };

  if (isLoading) {
    return <div className="text-center text-xl text-gray-600">Loading profile...</div>;
  }

  if (isError) {
    return <div className="text-red-500 text-center text-xl">Error loading profile: {error?.data?.message || "Unknown error"}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-[#1C3988]">Profile Information and Password</h1>
      <p className="text-gray-400 text-xl mt-2">Update your personal information</p>
      {activeView === "editProfile" && <EditProfileForm />}
      {activeView === "changePassword" && <ChangePasswordForm />}
      <Toaster position="top-right" />
    </div>
  );
}