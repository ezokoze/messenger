import { createSlice } from "@reduxjs/toolkit";

export const ConversationSlice = createSlice({
    name: 'conversation',
    initialState: {
        conversation: null
    },
    reducers: {
        setConversation: (state, action) => {
            state.conversation = action.payload;
        }
    }
});

export const { setConversation } = ConversationSlice.actions;

// selectors
export const selectedConversation = (state: any) => state.conversation.conversation;
// export const selectedConversationName = (state: any) => state.conversation.conversationId;
// export const selectedConversationMembers = (state: any) => state.conversation.conversationId;

export default ConversationSlice.reducer;