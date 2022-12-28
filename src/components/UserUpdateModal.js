import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Input,
  FormHelperText
} from '@material-ui/core';

function UserUpdateModal({
  open,
  handleClose,
  userProfile,
  className,
  ...rest
}) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      {...rest}
    >
      <DialogTitle id="alert-dialog-title">{userProfile.name}</DialogTitle>
      <DialogContent>
        <form action="">
          <FormControl>
            <InputLabel htmlFor="username">{userProfile.username}</InputLabel>
            <Input id="username" aria-describedby="my-helper-text" value={userProfile.username}/>
            <FormHelperText id="my-helper-text">Username</FormHelperText>

          </FormControl>
          <FormControl>
            <InputLabel htmlFor="email">{userProfile.mail}</InputLabel>
            <Input id="email" aria-describedby="my-helper-text" value={userProfile.mail}/>
            <FormHelperText id="my-helper-text">Email</FormHelperText>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="phone">{userProfile.phone}</InputLabel>
            <Input id="phone" aria-describedby="my-helper-text" value={userProfile.phone} />
            <FormHelperText id="my-helper-text">Phone</FormHelperText>
          </FormControl>

        </form>
      </DialogContent> 
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Update
        </Button>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

UserUpdateModal.propTypes = {
  className: PropTypes.string,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  userProfile: PropTypes.object,
};

export default UserUpdateModal;
