import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.10.34:1000/' }),

    tagTypes: [],
    endpoints: (builder) => ({
// for buyer authentication
        buyerRegistration: builder.mutation({
            query: (userData) => ({
                url: '/api/accounts/buyer/register/',
                method: "POST",
                body: userData,
            })
        }),
        Login: builder.mutation({
            query: (userData) => ({
                url: '/api/accounts/login/',
                method: "POST",
                body: userData,
            })
        }),

        // for seller authentication
        sellerRegistration: builder.mutation({
            query: (userData) => ({
                url: '/api/accounts/seller/register/',
                method: "POST",
                body: userData,
            })
        }),
      
    }),
});


export const { 

    useBuyerRegistrationMutation,useLoginMutation,useSellerRegistrationMutation

 } = baseApi


