

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: "https://yoursafeland.duckdns.org/api/",
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
      getAllPropertiesFeaturedList: builder.query({
    query: () => "/properties/featured/",
    providesTags: ["Properties"],
    refetchOnMountOrArgChange: true,  // This will reload data when the component mounts or args change
    refetchOnFocus: true,             // This will reload data when the page comes back into focus
}),

        getAllPropertiesList: builder.query({
            query: () => "properties/seller/all-properties/",
            providesTags: ["Properties"],
            refetchOnMountOrArgChange: true,
            refetchOnFocus: true,
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
        getActiveBoost: builder.query({
            query: () => "/properties/seller/boosted-properties/",
            providesTags: ["Properties"],
        }),
        getSubscriptionProperty: builder.query({
            query: () => "/subscriptions/property-listings/",
            providesTags: ["Properties"],
        }),
        getSubscribtionPlanBoost: builder.query({
            query: () => "/subscriptions/plans/seller/boost/",
            providesTags: ["Properties"],
        }),
        getSellerDesHeader: builder.query({
            query: () => "/properties/seller/stats/",
            
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
    useSubscribtionPlanMutation,
    useGetActiveBoostQuery,
    useGetSubscriptionPropertyQuery,
    useGetSubscribtionPlanBoostQuery,
    useGetAllPropertiesFeaturedListQuery,
    useGetSellerDesHeaderQuery
} = sellerApi;
