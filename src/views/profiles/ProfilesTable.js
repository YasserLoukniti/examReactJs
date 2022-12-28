import React, { useState } from 'react';
import {
  makeStyles,
  Card,
  Box,
  TableBody,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Button,
  TablePagination
} from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import UserModal from 'src/components/UserModal';
import UserUpdateModal from 'src/components/UserUpdateModal';
import RemoveProfileModal from 'src/components/RemoveProfileModal';

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// rowPerPage // limit
function applyPagination(profiles, page, rowPerPage) {
  return profiles.slice(page * rowPerPage, page * rowPerPage + rowPerPage);
}

function ProfilesTable({ className, profiles, testButtonClicked, ...rest }) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);
  const [userProfile, setUserProfile] = useState({
    id: '',
    firstanme: '',
    lastname: '',
    email: '',
  });

  const [page, setPage] = useState(0); // page
  const [rowPerPage, setRowPerPage] = useState(5); // limit

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPage = (event) => {
    setRowPerPage(event.target.value);
  };

  const handleUserProfile = (profile) => {
    setUserProfile({
      id: profile.id,
      firstname: profile.firstName,
      lastname: profile.lastName,
      email: profile.email,
    });
    setOpen(true);
  };
  const handleUpdateProfile = (profile) => {
    setUserProfile({
      id: profile.id,
      firstname: profile.firstName,
      lastname: profile.lastName,
      email: profile.email,
    });
    setOpenUpdate(true);
  };
  const handleDeleteProfile = (profile) => {
    setUserProfile({
      id: profile.id,
      firstname: profile.firstName,
      lastname: profile.lastName,
      email: profile.email,
    });
    setOpenRemove(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenUpdate(false);
    setOpenRemove(false);
  };

  const profilesToDisplay = applyPagination(profiles, page, rowPerPage);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Name
              </TableCell>
              <TableCell>
                Email
              </TableCell>
              <TableCell>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              profilesToDisplay && profilesToDisplay.map((profile) => {
                return (
                  <TableRow
                    key={profile.id}
                  >
                    <TableCell>
                      {profile.firstName} {profile.lastName}
                    </TableCell>
                    <TableCell>
                      {profile.email}
                    </TableCell>
                    <TableCell>
                      <Button
                        color="default"
                        size="large"
                        variant="contained"
                        style={{margin:2}}
                        onClick={() => handleUserProfile(profile)}
                      >
                        Profile
                      </Button>

                      <Button
                        color="primary"
                        size="large"
                        variant="contained"
                        style={{margin:2}}
                        onClick={() => handleUpdateProfile(profile)}
                      >
                        Update
                      </Button>


                      <Button
                        color="secondary"
                        size="large"
                        variant="contained"
                        style={{margin:2}}
                        onClick={() => handleDeleteProfile(profile)}
                      >
                        Delete
                      </Button>


                    </TableCell>
                  </TableRow>
                );
              })
            }
          </TableBody>
        </Table>
      </Box>

      <TablePagination
        component="div"
        count={profiles.length}
        page={page}
        rowsPerPage={rowPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPage}
        rowsPerPageOptions={[5, 10, 15]}
      />
      <UserModal
        open={open}
        handleClose={handleClose}
        userProfile={userProfile}
      />
      <UserUpdateModal
        open={openUpdate}
        handleClose={handleClose}
        userProfile={userProfile}
      />
      <RemoveProfileModal
        open={openRemove}
        handleClose={handleClose}
        userProfile={userProfile}
      />
    </Card>
  );
}

ProfilesTable.prototype = {
  className: PropTypes.string,
  profiles: PropTypes.array,
  testButtonClicked: PropTypes.any,
};

ProfilesTable.defaultProps = {
  profiles: []
};

export default ProfilesTable;
