import React, { useState } from 'react'
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import './MessageInput.css';

export default function MessageInput(props: any) {

    const [input, setInput] = useState('');

    const inputChange = (e: any) => {
        setInput(e.target.value);
    }

    const sendMessage = (e: any) => {
        e.preventDefault();
        props.onMessageSend(input);
        setInput('');
    }

    return (
        <Paper className="chat-input"
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
            <IconButton sx={{ p: '10px' }} aria-label="menu">
            </IconButton>
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Google Maps"
                inputProps={{ 'aria-label': 'search google maps' }}
                value={input}
                onChange={e => inputChange(e)}
            />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" onClick={e => sendMessage(e)}>
                prout
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
            </IconButton>
        </Paper>
    )
}
