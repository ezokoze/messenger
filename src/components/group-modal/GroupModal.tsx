import Autocomplete from '@mui/material/Autocomplete'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Fade from '@mui/material/Fade'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { getUsers } from 'services/user'
import './GroupModal.css'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

function GroupModal(props: any) {

    const [users, setUsers] = useState([] as any);
    const [selectedUsers, setSelectedUsers] = useState([] as any);

    useEffect(() => {
        getUsers('5ZcOKOBg2Rbb7qiFvFR8TobWSYp2').then(users => {
            setUsers(users);
        });
    }, []);

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={props.open}
            onClose={() => props.onClose(selectedUsers)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={props.open}>
                <Box sx={style}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                        Créer une conversation
                    </Typography>
                    <Autocomplete
                        multiple
                        limitTags={2}
                        id="multiple-limit-tags"
                        options={users}
                        getOptionLabel={(option: any) => option.name}
                        onChange={(event: any, value: any) => {
                            setSelectedUsers(value.map((users: any) => users.uid));
                        }}
                        renderInput={(params) => (
                            <TextField {...params} label="Utilisateurs" placeholder="Choisissez des utilisateurs" />
                        )}
                        sx={{ width: '100%' }}
                    />
                    <Button onClick={() => props.onValidated(selectedUsers)}>Créer</Button>
                </Box>
            </Fade>
        </Modal>
    );
}

export default GroupModal