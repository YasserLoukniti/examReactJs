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

function Header({ className, ...rest }) {
  const classes = useStyles();

  return (
    <Grid
      className={clsx(classes.root, className)}
      container
      justifyContent="space-between"
      spacing={3}
    >
      <Typography
        variant="h3"
      >
        Profils
      </Typography>
    </Grid>
  );
}

Header.prototype = {
  className: PropTypes.string,
  
};

export default Header;
