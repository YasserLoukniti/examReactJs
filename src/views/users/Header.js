import React from 'react';
import {
  Grid,
  makeStyles, Typography
} from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {}
}));

function Header({ className, usersCount, ...rest }) {
  const classes = useStyles();

  return (
    <Grid
      className={clsx(classes.root, className)}
      container
      justifyContent="space-between"
      spacing={3}
    >
      <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 5,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 900,
              letterSpacing: '.5rem',
              color: '#f44336',
              textDecoration: 'none',
  
            }}
          >
        Users List (
        {' '}
        {usersCount}
        {' '}
        )
      </Typography>
    </Grid>
  );
}

Header.prototype = {
  className: PropTypes.string,
  usersCount: PropTypes.number,
};

export default Header;
