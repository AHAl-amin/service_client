

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://10.10.13.60:2100/api/",
    prepareHeaders: (headers, { getState, endpoint }) => {
        const accessToken = localStorage.getItem("access_token");
        const token = getState().auth?.token || accessToken;

        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }

        if (!["recipeCreate", "updateProfile", "aiTraining"].includes(endpoint)) {
            headers.set("Content-Type", "application/json");
        }

        return headers;
    },
});

export const sellerApi = createApi({
    reducerPath: "sellerApi",
    baseQuery,
    tagTypes: ["Profile", "Properties"],
    endpoints: (builder) => ({
        PropertieCreate: builder.mutation({
            query: (body) => ({
                url: "properties/create/",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Properties"],
        }),

        getAllPropertiesList: builder.query({
            query: () => "properties/seller/all-properties/",
            providesTags: ["Properties"],
        }),

        getRecentPropertiesList: builder.query({
            query: () => "properties/all-properties/",
            providesTags: ["Properties"],
        }),

        getSellerSubscription: builder.query({
            query: () => "subscriptions/plans/seller/subscriptions/",
            providesTags: ["Properties"],
        }),
        SubscribtionPlan: builder.mutation({
            query: (body) => ({
                url: "/subscriptions/create-checkout-session/",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Properties"],
        }),

        getSellerDetails: builder.query({
            query: (id) => `accounts/seller/${id}/detail/`,
            providesTags: ["Properties"],
        }),
        deleteProperties: builder.mutation({
            query: (id) => ({
                url: `/properties/seller/delete/${id}/`,
                method: "DELETE",
            }),
            invalidatesTags: ["Properties"],
        }),
    }),
});

export const {
    usePropertieCreateMutation,
    useGetAllPropertiesListQuery,
    useGetRecentPropertiesListQuery,
    useGetSellerSubscriptionQuery,
    useGetSellerDetailsQuery,
    useDeletePropertiesMutation,
    useSubscribtionPlanMutation
} = sellerApi;
