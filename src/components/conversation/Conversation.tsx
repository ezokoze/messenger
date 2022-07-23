import moment from 'moment';
import { useEffect, useState } from 'react';
import { getUserNameByUserId } from 'services/user';
import './Conversation.css';

export default function Conversation(props: any) {

    const [conversationName, setConversationName] = useState('');

    const conversationClicked = () => {
        props.conversationClicked(props.conversationId);
    }

    useEffect(() => {
        getConversationName();
    });

    const getConversationName = async () => {
        let result = '';
        if (props.members.length === 2) {
            const memberWithoutCurrentUser = props.members.filter((x: any) => x !== props.currentUserId);
            await getUserNameByUserId(memberWithoutCurrentUser[0]).then((name) => {
                result = name;
            });
        }
        setConversationName(result);
    }

    return (
        <div className="conversation-container" onClick={conversationClicked}>
            <div className="d-flex align-items-center">
                <div className="conversation-avatar"></div>
                <div className="d-flex flex-column">
                    <div className="conversation-name">{conversationName}</div>
                    <div className="d-flex">
                        <div className="conversation-message">{props?.recentMessage?.messageText}&nbsp;</div>
                        <div className="conversation-time">{moment(Date.now()).fromNow(true)}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}