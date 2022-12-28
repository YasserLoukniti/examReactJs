import React, { useState } from 'react';
import {
  makeStyles
} from '@material-ui/core';
import PropTypes from 'prop-types';
import Header from './Header';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    marginTop: 300,
    paddingTop: 64,
   
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
}));

function PrimaryLayout({ children }) {
  const classes = useStyles();

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <div
      className={classes.root}
    >
      {/* TopBAR */}
      <Header onMobileNavOpen={() => setIsMobileNavOpen(true)} />

      {/* Children */}
      <div className={classes.wrapper} >
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

PrimaryLayout.propTypes = {
  children: PropTypes.any
};

export default PrimaryLayout;
