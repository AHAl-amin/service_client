

// src/redux/api/sellerApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://10.10.13.60:2100/api/",
    prepareHeaders: (headers, { getState, endpoint }) => {
        const accessToken = localStorage.getItem("access_token");
        const token = getState().auth?.token || accessToken;

        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }

        // Skip setting Content-Type for specific endpoints
        if (!["recipeCreate", "updateProfile", "aiTraining", "Properties"].includes(endpoint)) {
            headers.set("Content-Type", "application/json");
        }

        return headers;
    },
});

export const buyerApi = createApi({
    reducerPath: "api",
    baseQuery,
    tagTypes: ["Profile"],
    endpoints: (builder) => ({

        addToWishlist: builder.mutation({
            query: (body) => ({
                url: "/properties/buyer/add_to_wishlist/",
                method: "POST",
                body: body,
                headers: {
                    "Content-Type": "application/json",
                },
            }),
            invalidatesTags: ["Properties"],
        }),
        removeFromWishlist: builder.mutation({
            query: (body) => ({
                url: `/properties/buyer/remove_from_wishlist/`,
                method: "POST",
                body: body,
                headers: {
                    "Content-Type": "application/json",
                },
            }),
            invalidatesTags: ["Properties"],
        }),



        getAllPropertiesFeaturedList: builder.query({
            query: () => "/properties/featured/",
            providesTags: ["Properties"],
        }),
        getWishlistProperties: builder.query({
            query: () => "/properties/buyer/wishlist/",
            providesTags: ["Properties"],
        }),
        getBuyerSubscription: builder.query({
            query: () => "/subscriptions/plans/buyer/",
            providesTags: ["Properties"],
        }),

        SellerContactData: builder.mutation({
            query: ({ body, id }) => ({
                url: `/properties/contact/${id}/`,
                method: "POST",
                body: body,

            }),

        }),



    }),
});

export const { useGetAllPropertiesFeaturedListQuery, useAddToWishlistMutation, useRemoveFromWishlistMutation, useGetWishlistPropertiesQuery, useGetBuyerSubscriptionQuery, useSellerContactDataMutation } = buyerApi;