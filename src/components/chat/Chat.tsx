import { Message, MessageInput, UserInformations } from 'components';
import { useState } from 'react';
import { saveMessage } from 'services/message';
import './Chat.css';

function Chat(props: any) {
    const [showInformations, setShowInformations] = useState(false);

    // fetch les messages a chaque changement de groupeId


    const save = (message: string) => {
        saveMessage(1, 'coucou', new Date(), 1);
    }

    return (
        <div className="chat-container">
            <div className="messages">
                <Message />
                <MessageInput onMessageSend={(message: string) => save(message)} />
            </div>
            {showInformations &&
                <div className="informations">
                    <UserInformations />
                </div>
            }
        </div>
    )
}

export default Chat