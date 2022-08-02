import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, Box, IconButton, InputBase, Menu, MenuItem, styled, Tooltip, Typography } from '@mui/material';
import SettingsPopup from 'components/settings/Popup/SettingsPopup';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from 'redux/slices/userSlice';
import './SidenavHeader.css';

function SidenavHeader(props: any) {

    const currentUser = useSelector(selectUser);

    const settings = ['Profile', 'Logout'];

    const [userAvatar, setUserAvatar] = useState('');

    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [openSettingsPopup, setOpenSettingsPopup] = useState(false);

    useEffect(() => {
        if (currentUser) {
            setUserAvatar(currentUser.photoUrl);
        }
    }, [currentUser]);

    const handleClickOpen = () => {
        setOpenSettingsPopup(true);
    };

    const handleClose = () => {
        setOpenSettingsPopup(false);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: '30px',
        backgroundColor: '#f0f2f5',
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            // marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            borderRadius: '40px',
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            // transition: theme.transitions.create('width'),
            width: '100%',
            // [theme.breakpoints.up('sm')]: {
            //     width: '12ch',
            //     '&:focus': {
            //         width: '20ch',
            //     },
            // },
        },
    }));

    const openMenu = (settingName: string) => {
        switch (settingName) {
            case 'Profile':
                handleClickOpen();
                break;

            default:
                break;
        }
    }

    const onCreateConversationClicked = () => {
        props.onCreateConversationClicked();
    }

    return (
        <div className="header-container">
            <div className="header-first-row ">
                <div className="header-profil-avatar">
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt={currentUser?.displayName} src={userAvatar} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center" onClick={() => openMenu(setting)}>{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </div>
                <div className="header-title">Conversations</div>
                <div className="header-add-button">
                    <IconButton color="primary" aria-label="add conversation" component="label" onClick={() => onCreateConversationClicked()}>
                        <MapsUgcIcon />
                    </IconButton>
                </div>
            </div>

            <div className="header-search">
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search in messenger..."
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
            </div>

            <SettingsPopup isOpen={openSettingsPopup} onSettingsPopupClose={() => handleClose()} />
        </div>
    )
}

export default SidenavHeader