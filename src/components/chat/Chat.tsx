import { Message, UserInformations } from 'components';
import { onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectedConversation } from 'redux/slices/conversationSlice';
import { selectUser } from 'redux/slices/userSlice';
import { getMessageByConversationId, saveMessage } from 'services/message';
import './Chat.css';
import ChatFooter from './footer/ChatFooter';
import ChatHeader from './header/ChatHeader';

function Chat(props: any) {

    let messagesEnd: any;

    const [showInformations, setShowInformations] = useState(false);
    const [messages, setMessages] = useState([]);

    const currentConversation = useSelector(selectedConversation);
    const currentUser = useSelector(selectUser);

    useEffect(() => {
        let unsubscribe = null as any;
        if (currentConversation) {
            getMessageByConversationId(currentConversation.id).then((documentRef) => {
                unsubscribe = onSnapshot(documentRef, (snapshot) => {
                    let allMessages = [] as any;
                    snapshot.forEach(document => {
                        allMessages.push(document.data())
                    });
                    setMessages(allMessages.reverse());
                });
            }) as any;
            return () => unsubscribe();
        }
    }, [currentConversation]);

    useEffect(() => {
        setTimeout(() => {
            scrollToBottom();
        }, 600);
    }, [messages]);

    const save = (message: string) => {
        saveMessage(currentUser.uid, new Date(), currentConversation.id, message, '');
    };

    const scrollToBottom = () => {
        // messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <div className="chat-container d-flex flex-column">
            <ChatHeader />
            <div className="messages">
                {messages.map((message: any, index: number) => (
                    <Message key={index} message={message} />
                ))}
                <div style={{ float: "left", clear: "both" }}
                    ref={(el) => { messagesEnd = el; }}>
                </div>
            </div>
            <ChatFooter onMessageSend={(message: string) => save(message)} />
            {showInformations &&
                <div className="informations">
                    <UserInformations />
                </div>
            }
        </div>
    )
}

export default Chat