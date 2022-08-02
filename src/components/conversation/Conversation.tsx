import Avatar from '@mui/material/Avatar';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectedConversation } from 'redux/slices/conversationSlice';
import { getUserNameByUserId } from 'services/user';
import './Conversation.css';

export default function Conversation(props: any) {

    const [recipient, setRecipient] = useState(null) as any;

    const currentConversation = useSelector(selectedConversation);

    const conversationClicked = () => {
        props.conversationClicked(props.conversationId);
    }

    useEffect(() => {
        getConversationName();
    }, [props]);

    const getConversationName = () => {
        if (props.members.length === 2) {
            const memberWithoutCurrentUser = props.members.filter((x: any) => x !== props.currentUserId);
            getUserNameByUserId(memberWithoutCurrentUser[0]).then((userInfos: any) => {
                setRecipient(userInfos);
            });
        }
    }

    return (
        <div className={`conversation-container ${props.currentlyOpen ? 'active-conversation' : ''}`} onClick={conversationClicked}>
            <div className="d-flex align-items-center">
                {recipient &&
                    <Avatar className='conversation-avatar'
                        alt={recipient?.displayName}
                        src={recipient?.photoURL}
                        sx={{ width: 48, height: 48 }} />
                }
                <div className="d-flex flex-column">
                    {recipient && <div className={`conversation-name ${props.readen ? "" : "unseen"}`}>{recipient.displayName}</div>}
                    <div className="d-flex align-items-center">
                        <div className={`conversation-message ${props.readen ? "" : "unseen"}`}>{props?.recentMessage?.messageText}&nbsp;</div>
                        <div className="conversation-time"> · {moment.unix(props?.recentMessage?.sentAt.seconds).fromNow(true)}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}