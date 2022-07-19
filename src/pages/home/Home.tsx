import { Chat, Sidenav } from 'components';
import GroupContextProvider from 'context/groupContext';
import { useState } from 'react';
import { fetchGroupsByUserId } from 'services/group';

function Home() {

    const [messages, setMessages] = useState([] as any);

    const conversations = [{
        id: 1,
        messages: [{
            id: 1,
            sender: 'John Doe',
            message: 'Salut tu vas bien ?'
        }]
    }, {
        id: 2,
        messages: [{
            id: 1,
            sender: 'Samantha Proust',
            message: 'Falus'
        }]
    }];

    fetchGroupsByUserId('5ZcOKOBg2Rbb7qiFvFR8TobWSYp2').then(groups => {

    });

    const loadMessages = (conversationId: number) => {
        if (conversations && conversations.length > 0) {
            const mes = conversations.find(x => x.id === conversationId)?.messages;
            setMessages(mes);
        }
    }

    const sendMessage = (message: string) => {
        const messages_copy = [...messages];

        messages_copy.push({
            id: messages_copy.length + 1,
            sender: 'John Doe',
            message: message
        });

        setMessages(messages_copy);
    }

    const createConversation = () => {
    }

    return (
        <GroupContextProvider>
            <div className="layout">
                <Sidenav onConversationOpened={(conversationId: number) => loadMessages(conversationId)}
                    onConversationCreated={() => createConversation()} />
                <Chat />
                {/* <Chat messages={messages} onMessageSend={(e: string) => sendMessage(e)} /> */}
            </div>
        </GroupContextProvider>
    )
}

export default Home