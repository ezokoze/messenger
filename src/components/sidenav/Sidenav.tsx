
import { Conversation, GroupModal } from 'components';
import { GroupContext } from 'context/groupContext';
import { onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setConversation } from 'redux/slices/conversationSlice';
import { selectUser } from 'redux/slices/userSlice';
import { fetchGroupsByUserId, saveGroup } from 'services/group';
import SidenavHeader from './header/SidenavHeader';
import './Sidenav.css';

export default function Sidenav(props: any) {

    const user = useSelector(selectUser);
    const dispatch = useDispatch();


    const { theme } = useContext(GroupContext);

    const [open, setOpen] = useState(false);
    const [conversations, setConversations] = useState([]);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        if (user) {
            fetchGroupsByUserId(user.uid).then((groupQuery) => {
                if (groupQuery) {
                    onSnapshot(groupQuery, (snapshot) => {
                        const allConversations = [] as any;
                        snapshot.forEach((doc) => {
                            const data = doc.data();
                            allConversations.push(data);
                        });
                        setConversations(allConversations);
                    });
                }
            });
        }
    }, [user]);

    const conversationOpened = (conversationId: number) => {
        const currentConv = conversations.find((conversation: any) => conversation.id === conversationId);
        dispatch(
            setConversation(currentConv)
        );
    }

    const createConversation = () => {
        handleOpen();
    }

    const onGroupModalClosed = (userIds: any) => {
        saveGroup([user.uid, ...userIds], user.uid, 'troisième conv', 1);
        handleClose();
    };

    return (
        <div className='sidenav'>
            <div className="header">
                <SidenavHeader />
            </div>
            <div className="conversations">
                {conversations.map((conversation: any, index: number) => (
                    <Conversation key={index}
                        conversationId={conversation.id}
                        name={conversation.name}
                        members={conversation.members}
                        recentMessage={conversation.recentMessage}
                        currentUserId={user.uid}
                        conversationClicked={(conversationId: number) => conversationOpened(conversationId)} />
                ))}
            </div>

            <div className="create-conversation">
                <button onClick={createConversation}>add conv</button>
                <GroupModal open={open} onClose={handleClose} onValidated={(userIds: any) => onGroupModalClosed(userIds)} />
            </div>
        </div>
    )
}

