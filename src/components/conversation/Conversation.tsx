import moment from 'moment';
import './Conversation.css';

export default function Conversation(props: any) {

    const conversationClicked = () => {
        props.conversationClicked(props.conversationId);
    }

    return (
        <div className="conversation-container" onClick={conversationClicked}>
            <div className="d-flex align-items-center">
                <div className="conversation-avatar"></div>
                <div className="d-flex flex-column">
                    <div className="conversation-name">{props.name}</div>
                    <div className="d-flex">
                        <div className="conversation-message">{props.message}</div>
                        <div className="conversation-time">{moment(Date.now()).fromNow(true)}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}