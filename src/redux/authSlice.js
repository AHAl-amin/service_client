import { createSlice } from "@reduxjs/toolkit";

// Load accessToken from localStorage when Redux initializes
const storedAccessToken = localStorage.getItem("accessToken");

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: storedAccessToken || null  
    },
    reducers: {
        setUser: (state, action) => {
            console.log("Setting Token:", action?.payload?.accessToken);
            state.token = action.payload.accessToken;
        },
        logout: (state) => {
            state.token = null;
            localStorage.removeItem("accessToken"); 
        }
    }
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;