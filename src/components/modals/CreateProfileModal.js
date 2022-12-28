import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Input,
  FormHelperText
} from '@material-ui/core';
import { useRef } from 'react';
import profilesService from 'src/services/profilesService';

function CreateProfileModal({
  open,
  handleClose,
  className,
  ...rest
}){
const updateForm = useRef(null);

const handleSubmit = async () => {
  let res = await profilesService.createProfile({firstName : updateForm.current[0].value , lastName:updateForm.current[1].value ,email:updateForm.current[2].value,password:updateForm.current[3].value })
  if(res.code == 201) alert("The Profile has been created")
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
      <DialogTitle id="alert-dialog-title">Create Profile</DialogTitle>
      <DialogContent>
        <form ref={updateForm}>
          <FormControl>
            <InputLabel htmlFor="firstname">Firstname</InputLabel>
            <Input id="firstname" aria-describedby="my-helper-text" />
            <FormHelperText id="my-helper-text">Firstname</FormHelperText>

          </FormControl>
          <FormControl>
            <InputLabel htmlFor="lastname">Lastname</InputLabel>
            <Input id="lastname" aria-describedby="my-helper-text" />
            <FormHelperText id="my-helper-text">lastname</FormHelperText>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input id="email" aria-describedby="my-helper-text" />
            <FormHelperText id="my-helper-text">Email</FormHelperText>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input type='password' id="password" aria-describedby="my-helper-text" />
            <FormHelperText id="my-helper-text">Password</FormHelperText>
          </FormControl>
          
        </form>
      </DialogContent> 
      <DialogActions>

        <Button onClick={handleSubmit} color="primary">
          Create
        </Button>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

CreateProfileModal.propTypes = {
  className: PropTypes.string,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default CreateProfileModal;
