import { Fab } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MetamaskIcon from 'components/shared/metamask-icon/metamask-icon';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from 'redux/slices/userSlice';
import { uploadProfilePicture } from 'services/firebase';
import SettingsIcon from '@mui/icons-material/Settings';

import './SettingsPopup.css';

function SettingsPopup(props: any) {

    const currentUser = useSelector(selectUser);

    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile) as any;
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = (e: any) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
    }

    const handleUploadClick = async (event: any) => {
        console.log(event);
        var file = event.target.files[0];

        uploadProfilePicture(currentUser.uid, file);

        const reader = new FileReader();
        var url = reader.readAsDataURL(file);

        reader.onloadend = function (e) {
            //   setState({
            //     selectedFile: [reader.result]
            //   });
        };

        // setState({
        //   mainState: "uploaded",
        //   selectedFile: event.target.files[0],
        //   imageUploaded: 1
        // });
    };

    return (
        <div>
            {/* <Button variant="outlined" onClick={handleClickOpen}>
                Open form dialog
            </Button> */}
            <Dialog open={props.isOpen} onClose={props.onSettingsPopupClose}>
                <DialogTitle>Settings</DialogTitle>
                <DialogContent>
                    <div className="settings-popup-fields">
                        <div className="settings-popup-picture-field">
                            <input
                                accept="image/*"
                                id="contained-button-file"
                                multiple
                                type="file"
                                hidden
                                onChange={(e) => handleUploadClick(e)}
                            />
                            <label className="settings-popup-picture-container" htmlFor="contained-button-file">
                                <Fab sx={{
                                    height: '128px',
                                    width: '128px',
                                    backgroundImage: `url(${currentUser?.photoUrl})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;'
                                }} component="span" >
                                </Fab>
                            </label>
                        </div>

                        <div className="settings-popup-name-field">
                            <div className="field-label">Name</div>
                            <TextField id="outlined-basic" variant="outlined" value={currentUser?.displayName} />
                        </div>

                        <div className="settings-popup-metamask-field">
                            <div className="field-label">Metamask</div>
                            <Button sx={{ height: '56px' }} variant="outlined" startIcon={<MetamaskIcon />}>
                                Connect metamask
                            </Button>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onSettingsPopupClose}>Cancel</Button>
                    <Button onClick={props.onSettingsPopupClose}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default SettingsPopup