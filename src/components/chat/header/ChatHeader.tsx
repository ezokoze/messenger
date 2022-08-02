import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';
import { selectedConversationRecipient } from 'redux/slices/conversationSlice';
import './ChatHeader.css';

function ChatHeader() {

  const currentRecipient = useSelector(selectedConversationRecipient);

  return (
    <div className="chat-header-container">
      <div className="chat-header-members">
        {currentRecipient && <Avatar className='chat-header-member-avatar'
          alt={currentRecipient.displayName}
          src={currentRecipient.photoURL}
          sx={{ width: 40, height: 40 }} />}
      </div>
      <div className="chat-header-title">
        <div className="chat-conversation-name">
          {currentRecipient && currentRecipient.displayName}
        </div>
        <div className="chat-conversation-age">
          En ligne il y a 12 min
        </div>
      </div>
    </div>
  )
}

export default ChatHeader