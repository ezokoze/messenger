
import { GroupModal } from 'components';
import { GroupContext } from 'context/groupContext';
import { useContext, useState } from 'react';
import { saveGroup } from 'services/group';
import './Sidenav.css';

export default function Sidenav(props: any) {

    const { theme } = useContext(GroupContext);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    console.log('userId', theme)

    const conversations = [{
        id: 1,
        recipient: 'John Doe',
        message: 'Salut tu vas bien ?'
    }, {
        id: 2,
        recipient: 'Patricia James',
        message: 'Salut, comment vas-tu ? Joyeux anniversaire !!'
    }];

    const conversationOpened = (conversationId: number) => {
        props.onConversationOpened(conversationId);
    }

    const createConversation = () => {
        handleOpen();
    }

    const onGroupModalClosed = (userIds: any) => {
        // saveGroup([userId, ...userIds], userId, 'Premiere conv', 1);
        handleClose();
    };

    return (
        <div className='sidenav'>
            <div className="conversations">
                {/* {group.map((group: any, index: number) => (
                    <Conversation key={index}
                        conversationId={group.id}
                        name={group.name}
                        message={group?.recentMessage}
                        conversationClicked={(conversationId: number) => conversationOpened(conversationId)} />
                ))} */}
            </div>

            <div className="create-conversation">
                <button onClick={createConversation}>add conv</button>
                <GroupModal open={open} onClose={handleClose} onValidated={(userIds: any) => onGroupModalClosed(userIds)} />
            </div>
        </div>
    )
}

