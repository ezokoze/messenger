import { Message, MessageInput, UserInformations } from 'components';
import { onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectedConversation } from 'redux/slices/conversationSlice';
import { selectUser } from 'redux/slices/userSlice';
import { getMessageByConversationId, saveMessage } from 'services/message';
import './Chat.css';
import ChatHeader from './header/ChatHeader';

function Chat(props: any) {
    const [showInformations, setShowInformations] = useState(false);
    const [messages, setMessages] = useState([]);
    const currentConversation = useSelector(selectedConversation);
    const currentUser = useSelector(selectUser);

    useEffect(() => {
        if (currentConversation) {
            getMessageByConversationId(currentConversation.id).then((documentRef) => {
                onSnapshot(documentRef, (snapshot) => {
                    const allMessages = [] as any;
                    snapshot.forEach(document => {
                        allMessages.push(document.data())
                    });
                    setMessages(allMessages);
                });
            })
        }
    }, [currentConversation]);

    const save = (message: string) => {
        saveMessage(currentUser.uid, message, new Date(), currentConversation.id);
    }

    return (
        <div className="chat-container d-flex flex-column">
            <ChatHeader />
            <div className="messages">
                {messages.map((message: any, index: number) => (
                    <Message key={index} message={message} />
                ))}
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