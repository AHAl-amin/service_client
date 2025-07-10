import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://192.168.10.34:1000/api/",
  prepareHeaders: (headers, { getState,  }) => {
    // Access token from localStorage or Redux state
    const accessToken = localStorage.getItem("access_token");
    const token = getState().auth?.token || accessToken;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

 

    return headers;
  },
});

export const profileApi = createApi({
  reducerPath: "profileApi", 
  baseQuery,
  tagTypes: ["Profile"],
  endpoints: (builder) => ({

 
    getSellerDataProfile: builder.query({
      query: () => "/accounts/seller/profile/",
      providesTags: ["Profile"],
    }),
    getBuyerDataProfile: builder.query({
      query: () => "/accounts/buyer/profile/",
      providesTags: ["Profile"],
    }),

  
    updateSellerDataProfile: builder.mutation({
      query: (data) => ({
        url: "/accounts/seller/profile/",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Profile"], // refetch after update
    }),

    ChangePassword: builder.mutation({
      query: (data) => ({
        url: "/accounts/change-password/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Profile"], // refetch after update
    }),

  }),
});


export const {
  useGetSellerDataProfileQuery,
  useUpdateSellerDataProfileMutation,
  useGetBuyerDataProfileQuery,
  useChangePasswordMutation
} = profileApi;
