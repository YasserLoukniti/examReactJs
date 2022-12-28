import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText
} from '@material-ui/core';
import profilesService from 'src/services/profilesService';

function RemoveProfileModal({
  open,
  handleClose,
  userProfile,
  className,
  ...rest
}) {
  const handleSubmit = async () => {
    await profilesService.deleteProfile(userProfile.id)
    window.location.reload(false);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      {...rest}
    >
      <DialogTitle id="alert-dialog-title">Are you sure about removing this profile ?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {userProfile.firstname} {userProfile.lastname}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
      <Button onClick={handleClose} color="primary">
          No
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Yes
        </Button>

      </DialogActions>
    </Dialog>
  );
}

RemoveProfileModal.propTypes = {
  className: PropTypes.string,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  userProfile: PropTypes.object,
};

export default RemoveProfileModal;
