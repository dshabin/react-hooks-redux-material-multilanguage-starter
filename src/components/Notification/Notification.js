import React, { useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useSelector,useDispatch } from 'react-redux';
import { notificationActions } from '../../_actions/notification.actions';


export default function Notification() {
    const [open, setOpen] = React.useState(false);
    const notification = useSelector(state => state.notification);
    const dispatch = useDispatch()

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        if (notification.message) {
            setOpen(true);
        }
    },[notification]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        } 
        dispatch(notificationActions.clear());
        setOpen(false);
    };

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={notification && notification.message}
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
        </div>
    );
}
