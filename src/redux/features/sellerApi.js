// src/redux/api/sellerApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({

    
    baseUrl: "http://192.168.10.34:1000/api/",
    prepareHeaders: (headers, { getState, endpoint }) => {
        const accessToken = localStorage.getItem("access_token");
        const token = getState().auth?.token || accessToken;

        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }

        // Skip setting Content-Type for specific endpoints
        if (!["recipeCreate", "updateProfile", "aiTraining"].includes(endpoint)) {
            headers.set("Content-Type", "application/json");
        }

        return headers;
    },
});

export const sellerApi = createApi({
    reducerPath: "api",
    baseQuery,
    tagTypes: ["Profile"],
    endpoints: (builder) => ({

        PropertieCreate: builder.mutation({
            query: (body) => ({
                url: "/properties/create/",
                method: "POST",
                body,
                headers: {
                    "Content-Type": "application/json",
                },
            }),
        }),

        getAllPropertiesList: builder.query({
            query: () => "/properties/seller/all-properties/",
            providesTags: ["Properties"],
        }),
        getRecentPropertiesList: builder.query({
            query: () => "/properties/all-properties/",
            providesTags: ["Properties"],
        }),
        getSellerSubscription: builder.query({
            query: () => "/subscriptions/plans/seller/subscriptions/",
            providesTags: ["Properties"],
        }),


    }),
});

export const { usePropertieCreateMutation ,useGetAllPropertiesListQuery , useGetRecentPropertiesListQuery, useGetSellerSubscriptionQuery} = sellerApi;