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
  const [userProfile, setUserProfile] = useState({
    name: '',
    username: '',
    phone: '',
    companyName: ''
  });

  const [page, setPage] = useState(0); // page
  const [rowPerPage, setRowPerPage] = useState(2); // limit

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPage = (event) => {
    setRowPerPage(event.target.value);
  };

  const handleUserProfile = (profile) => {
    setUserProfile({
      name: profile.name,
      username: profile.username,
      phone: profile.phone,
      companyName: profile.company.name
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
                      {profile.name}
                    </TableCell>
                    <TableCell>
                      {profile.email}
                    </TableCell>
                    <TableCell>
                      <Button
                        color="secondary"
                        fullWidth
                        size="large"
                        variant="contained"
                        onClick={() => handleUserProfile(profile)}
                      >
                        Profile
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
        rowsPerPageOptions={[2, 5, 10]}
      />
      <UserModal
        open={open}
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
