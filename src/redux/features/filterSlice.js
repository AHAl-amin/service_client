// import { createSlice } from '@reduxjs/toolkit';

// const filterSlice = createSlice({
//   name: 'filters',
//   initialState: {
//     selectedCountry: null,
//     selectedPropertyType: null,
//   },
//   reducers: {
//     setSelectedCountry: (state, action) => {
//       state.selectedCountry = action.payload;
//     },
//     setSelectedPropertyType: (state, action) => {
//       state.selectedPropertyType = action.payload;
//     },
//     clearFilters: (state) => {
//       state.selectedCountry = null;
//       state.selectedPropertyType = null;
//     },
//   },
// });

// export const { setSelectedCountry, setSelectedPropertyType, clearFilters } = filterSlice.actions;
// export default filterSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filters',
  initialState: {
    selectedCountry: null,
    selectedPropertyType: null,
  },
  reducers: {
    setSelectedCountry: (state, action) => {
      state.selectedCountry = action.payload;
    },
    setSelectedPropertyType: (state, action) => {
      state.selectedPropertyType = action.payload;
    },
    clearFilters: (state) => {
      state.selectedCountry = null;
      state.selectedPropertyType = null;
    },
  },
});

export const { setSelectedCountry, setSelectedPropertyType, clearFilters } = filterSlice.actions;
export default filterSlice.reducer;