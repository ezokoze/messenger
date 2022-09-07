import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';
import { selectedConversationRecipient } from 'redux/slices/conversationSlice';
import { selectUser } from 'redux/slices/userSlice';
import './Message.css';

function Message(props: any) {

    const currentUser = useSelector(selectUser);
    const currentRecipient = useSelector(selectedConversationRecipient);

    const { messageText, mediaUrl, sentAt, sentBy } = props.message;

    const isSendByMe = () => {
        return sentBy === currentUser.uid;
    };

    return (
        <div className={`message-container ${isSendByMe() ? 'sent-by-me' : ''}`}>
            <div className="d-flex align-items-center">
                {!isSendByMe() &&
                    <Avatar className='message-user-avatar'
                        alt={currentRecipient?.displayName}
                        src={currentRecipient?.photoURL}
                        sx={{ width: 28, height: 28 }} />
                }
                {messageText && <div className={`message`}>{messageText}</div>}
                {mediaUrl && <img className="message-media" src={mediaUrl} alt="WebP rules." />}
            </div>
        </div>
    )
}

export default Message;
