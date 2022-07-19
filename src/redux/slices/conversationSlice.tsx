import { createSlice } from "@reduxjs/toolkit";

export const ConversationSlice = createSlice({
    name:'conversation',
    initialState: {
        conversations: null
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        }
    }
});

export const { login, logout } = ConversationSlice.actions;

// selectors
export const selectUser = (state: any) => state.user.user;

export default ConversationSlice.reducer;