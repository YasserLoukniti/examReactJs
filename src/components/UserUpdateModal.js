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

function UserUpdateModal({
  open,
  handleClose,
  userProfile,
  className,
  ...rest
}){
const updateForm = useRef(null);
const [msg, setMsg] = useState('');

const handleSubmit = async () => {
  let res = await profilesService.updateProfile({id:userProfile.id,firstName : updateForm.current[0].value , lastName:updateForm.current[1].value ,email:updateForm.current[2].value })
  console.log(userProfile.id,res);
  setMsg(res.data)
};
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
        <form ref={updateForm}>
          <FormControl>
            <InputLabel htmlFor="firstname">{userProfile.firstname}</InputLabel>
            <Input id="firstname" aria-describedby="my-helper-text" ref={updateForm.firstname}/>
            <FormHelperText id="my-helper-text">Firstname</FormHelperText>

          </FormControl>
          <FormControl>
            <InputLabel htmlFor="lastname">{userProfile.lastname}</InputLabel>
            <Input id="lastname" aria-describedby="my-helper-text" />
            <FormHelperText id="my-helper-text">lastname</FormHelperText>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="email">{userProfile.email}</InputLabel>
            <Input id="email" aria-describedby="my-helper-text" />
            <FormHelperText id="my-helper-text">Email</FormHelperText>
          </FormControl>
          
        </form>
      </DialogContent> 
      <DialogActions>
        <p>{msg}</p>
        <Button onClick={handleSubmit} color="primary">
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
