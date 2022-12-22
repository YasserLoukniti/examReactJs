import React, { useState } from 'react';
import {
  makeStyles,
  Card,
  Box,
  TablePagination,
  Grid
} from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import SerieCard from './SerieCard';

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// rowPerPage // limit
function applyPagination(series, page, rowPerPage) {
  return series.slice(page * rowPerPage, page * rowPerPage + rowPerPage);
}

function SeriesTable({ className, series, testButtonClicked, ...rest }) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [serieInfo, setSerieInfo] = useState({
    name: '',
    type: '',
    language: '',
  });

  const [page, setPage] = useState(0); // page
  const [rowPerPage, setRowPerPage] = useState(12); // limit

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPage = (event) => {
    setRowPerPage(event.target.value);
  };

  const handleSerieInfo = (serie) => {
    setSerieInfo({
      name: serie.name,
      type: serie.type,
      language: serie.language,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const seriesToDisplay = applyPagination(series, page, rowPerPage);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box>
      <Grid container className={classes.root} spacing={2}>
            {
              seriesToDisplay && seriesToDisplay.map((serie) => {
                return (
                  <Grid item xs={3}>
                  <div key={serie.id}>
                  <SerieCard name={serie.name} type={serie.type} language={serie.language} image={serie.image.medium}/>
                  </div>
                  </Grid>

                );
              })
            }
      </Grid>
      </Box>

      <TablePagination
        component="div"
        count={series.length}
        page={page}
        rowsPerPage={rowPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPage}
        rowsPerPageOptions={[10, 20, 50]}
      />
      {/* <UserModal
        open={open}
        handleClose={handleClose}
        serieInfo={serieInfo}
      /> */}
    </Card>
  );
}

SeriesTable.prototype = {
  className: PropTypes.string,
  users: PropTypes.array,
  testButtonClicked: PropTypes.any,
};

SeriesTable.defaultProps = {
  series: []
};

export default SeriesTable;
