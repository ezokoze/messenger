import { createSlice } from "@reduxjs/toolkit";

export const ConversationSlice = createSlice({
    name: 'conversation',
    initialState: {
        currentConversation: null,
        currentRecipient: null
    },
    reducers: {
        setCurrentConversation: (state, action) => {
            state.currentConversation = action.payload;
        },
        setCurrentRecipient: (state, action) => {
            state.currentRecipient = action.payload;
        }
    }
});

export const { setCurrentConversation } = ConversationSlice.actions;
export const { setCurrentRecipient } = ConversationSlice.actions;

// selectors
export const selectedConversation = (state: any) => state.conversation.currentConversation;

export const selectedConversationRecipient = (state: any) => state.conversation.currentRecipient;

// export const selectedConversationName = (state: any) => state.conversation.conversationId;
// export const selectedConversationMembers = (state: any) => state.conversation.conversationId;

export default ConversationSlice.reducer;