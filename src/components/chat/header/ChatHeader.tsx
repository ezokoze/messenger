import React from 'react'
import { useSelector } from 'react-redux';
import { selectedConversation } from 'redux/slices/conversationSlice';
import './ChatHeader.css';

function ChatHeader() {

  const currentConversation = useSelector(selectedConversation);

  return (
    <div className="chat-header-container">
      <div className="chat-header-title">
        {currentConversation && currentConversation.name}
      </div>
      <div className="chat-header-members">
        <div className="chat-header-member-avatar"></div>
      </div>
    </div>
  )
}

export default ChatHeader