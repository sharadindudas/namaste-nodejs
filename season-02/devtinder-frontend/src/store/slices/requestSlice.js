import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "requests",
    initialState: null,
    reducers: {
        addRequests: (state, action) => action.payload,
        updateRequests: (state, action) => {
            const requestId = action.payload;
            const newRequests = state.filter((request) => request._id !== requestId);
            return newRequests;
        },
        clearRequests: () => null
    }
});

export const { addRequests, updateRequests, clearRequests } = requestSlice.actions;
export default requestSlice.reducer;
