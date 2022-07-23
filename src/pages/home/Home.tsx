import { Chat, Sidenav } from 'components';
import GroupContextProvider from 'context/groupContext';
import { useState } from 'react';
import { fetchGroupsByUserId } from 'services/group';

function Home() {

    return (
        <GroupContextProvider>
            <div className="layout">
                <Sidenav />
                <Chat />
            </div>
        </GroupContextProvider>
    )
}

export default Home