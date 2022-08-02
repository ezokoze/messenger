import { GiphyFetch } from '@giphy/js-fetch-api';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CollectionsIcon from '@mui/icons-material/Collections';
import GifIcon from '@mui/icons-material/Gif';
import SearchIcon from '@mui/icons-material/Search';
import SendICon from '@mui/icons-material/Send';
import { debounce, styled } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Popper from '@mui/material/Popper';
import React, { useContext, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from 'redux/slices/userSlice';
import { saveMessage } from 'services/message';
import { selectedConversation } from 'redux/slices/conversationSlice';
import './ChatFooter.css';
import SharedSearchBar from 'components/shared/search-bar/search-bar';
import GifPopover from 'components/gif-popover/gif-popover';

function ChatFooter(props: any) {

    // states
    const [messageInput, setMessageInput] = useState('');
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    // selectors
    const currentConversation = useSelector(selectedConversation);
    const currentUser = useSelector(selectUser);

    // vars
    const open = Boolean(anchorEl);
    const id = open ? 'giphy-popper' : undefined;

    // methods
    const openGifPopup = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(anchorEl ? null : event.currentTarget);

    const handleClose = () => setAnchorEl(null);

    const messageInputChange = (e: any) => setMessageInput(e.target.value);

    const sendMessage = (e: any) => {
        e.preventDefault();
        props.onMessageSend(messageInput);
        setMessageInput('');
    }

    const onGifSelected = (gif: any) => {
        // send message with gif url on a specific field of the message object
        saveMessage(currentUser.uid, new Date(), currentConversation.id, '', gif.images.fixed_height.webp);
    }

    return (
        <div className="chat-footer-container">
            <IconButton sx={{ p: '10px', color: '#0084ff' }} aria-label="menu">
                <AddCircleOutlineIcon />
            </IconButton>
            <IconButton type="button" sx={{ p: '10px', color: '#0084ff' }} aria-label="menu" onClick={openGifPopup}>
                <GifIcon />
            </IconButton>
            <IconButton sx={{ p: '10px', color: '#0084ff' }} aria-label="menu">
                <CollectionsIcon />
            </IconButton>

            <InputBase
                fullWidth
                sx={{ ml: 1, flex: 1 }}
                placeholder="Aa"
                inputProps={{ 'aria-label': 'search google maps' }}
                value={messageInput}
                className="chat-footer-input"
                onChange={e => messageInputChange(e)}
            />

            <IconButton type="submit" sx={{ p: '10px', color: '#0084ff' }} aria-label="search" onClick={e => sendMessage(e)}>
                <SendICon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

            <GifPopover id={id} open={open} anchorEl={anchorEl} onGifClick={onGifSelected} />
        </div >
    )
}

export default ChatFooter;
