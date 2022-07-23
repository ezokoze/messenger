import React from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from 'redux/slices/userSlice';
import './Message.css';

function Message(props: any) {

    const currentUser = useSelector(selectUser);

    const { messageText, sentAt, sentBy } = props.message;

    const isSendByMe = () => {
        return sentBy === currentUser.uid;
    };

    return (
        <div className={`message-container ${isSendByMe() ? 'sent-by-me' : ''}`}>
            <div className="d-flex align-items-center">
                {!isSendByMe() && <div className="message-user-avatar"></div>}
                <div className={`message`}>{messageText}</div>
            </div>
        </div>
    )
}

export default Message