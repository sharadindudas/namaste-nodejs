import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers: {
        addFeed: (state, action) => action.payload,
        updateFeed: (state, action) => {
            const userId = action.payload;
            const updatedFeed = state.filter((user) => user._id !== userId);
            return updatedFeed;
        },
        clearFeed: () => null
    }
});

export const { addFeed, updateFeed, clearFeed } = feedSlice.actions;
export default feedSlice.reducer;
