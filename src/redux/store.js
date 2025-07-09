
import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from './features/baseApi'
import { profileApi } from './features/profileApi'
import { sellerApi } from './features/sellerApi'
import { buyerApi } from './features/buyerApi'

export const store = configureStore({
  reducer: {
    //  auth: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [sellerApi.reducerPath]: sellerApi.reducer,
    [buyerApi.reducerPath]: buyerApi.reducer,
  },
 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware, profileApi.middleware, sellerApi.middleware ,buyerApi.middleware),
})


