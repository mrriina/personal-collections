import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        colorPrimary: '#1677ff',
    },
    reducers: {
        setPrimaryColor: (state, action) => {
            state.colorPrimary = action.payload;
        },
    },
});

export const { setPrimaryColor } = themeSlice.actions;
export default themeSlice.reducer;