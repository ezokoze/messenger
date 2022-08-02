import { Fab } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from 'redux/slices/userSlice';
import { uploadProfilePicture } from 'services/firebase';

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
                <DialogTitle>Profile</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                    />

                    <input
                        accept="image/*"
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={(e) => handleUploadClick(e)}
                    />
                    <label htmlFor="contained-button-file">
                        <Fab component="span" >
                            {/* <AddPhotoAlternateIcon /> */}
                        </Fab>
                    </label>
                    {/* <input type='file' onChange={onSelectFile} />
                    {selectedFile && <img src={preview} />} */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onSettingsPopupClose}>Cancel</Button>
                    <Button onClick={props.onSettingsPopupClose}>Subscribe</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default SettingsPopup