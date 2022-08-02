
import { Conversation, GroupModal } from 'components';
import { onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectedConversation, setCurrentConversation, setCurrentRecipient } from 'redux/slices/conversationSlice';
import { selectUser } from 'redux/slices/userSlice';
import { fetchGroupsByUserId, markConversationAsRead, saveGroup } from 'services/group';
import { getUserNameByUserId } from 'services/user';
import SidenavHeader from './header/SidenavHeader';
import './Sidenav.css';

export default function Sidenav(props: any) {

    const dispatch = useDispatch();

    const currentUser = useSelector(selectUser);
    const currentConversation = useSelector(selectedConversation);

    const [open, setOpen] = useState(false);
    const [conversations, setConversations] = useState([] as any);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        if (currentUser) {
            fetchGroupsByUserId(currentUser.uid).then((groupQuery) => {
                if (groupQuery) {
                    onSnapshot(groupQuery, async (snapshot) => {
                        const allConversations = [] as any;
                        snapshot.forEach((doc) => {
                            allConversations.push(doc.data());
                        });
                        setConversations(allConversations);
                    });
                }
            });
        }
    }, [currentUser]);

    useEffect(() => {
        // open first conv by default
        if (!currentConversation && conversations.length > 0) {
            openConversation(conversations[0].id);
        }
    }, [conversations]);

    useEffect(() => {
        if (currentConversation) {
            const memberWithoutCurrentUser = currentConversation.members.filter((x: any) => x !== currentUser.uid);
            getUserNameByUserId(memberWithoutCurrentUser[0]).then((userInfos: any) => {
                dispatch(
                    setCurrentRecipient(userInfos)
                );
            });
        }
    }, [currentConversation]);

    const openConversation = (conversationId: string) => {
        const currentConv = conversations.find((conversation: any) => conversation.id === conversationId);
        markConversationAsRead(conversationId);
        dispatch(
            setCurrentConversation(currentConv)
        );
    }

    const createConversation = () => {
        handleOpen();
    }

    const onGroupModalClosed = (userIds: any) => {
        saveGroup([currentUser.uid, ...userIds], currentUser.uid, '', 1);
        handleClose();
    };

    const getConversationName = async (members: any) => {
        let result = '';
        if (members.length === 2) {
            const memberWithoutCurrentUser = members.filter((x: any) => x !== currentUser.uid);
            await getUserNameByUserId(memberWithoutCurrentUser[0]).then((userInfos: any) => {
                result = userInfos.displayName;
            });
        }
        return result;
    }

    return (
        <div className='sidenav'>
            <div className="header">
                <SidenavHeader onCreateConversationClicked={createConversation} />
            </div>
            <div className="conversations">
                {conversations && conversations.map((conversation: any, index: number) => (
                    <Conversation key={index}
                        conversationId={conversation.id}
                        members={conversation.members}
                        recentMessage={conversation.recentMessage}
                        currentUserId={currentUser.uid}
                        currentlyOpen={currentConversation?.id === conversation.id}
                        readen={conversation.recentMessage.readen || conversation.recentMessage.sentBy === currentUser.uid}
                        conversationClicked={(conversationId: string) => openConversation(conversationId)} />
                ))}
            </div>

            <div className="create-conversation">
                {/* <button onClick={createConversation}>add conv</button> */}
                <GroupModal open={open} onClose={handleClose} onValidated={(userIds: any) => onGroupModalClosed(userIds)} />
            </div>
        </div>
    )
}

