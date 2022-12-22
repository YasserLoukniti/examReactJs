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
  const [rowPerPage, setRowPerPage] = useState(5); // limit

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
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Name
              </TableCell>
              <TableCell>
                type
              </TableCell>
              <TableCell>
                language
              </TableCell>
              <TableCell>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              seriesToDisplay && seriesToDisplay.map((serie) => {
                return (
                  <TableRow
                    key={serie.id}
                  >
                    <TableCell>
                      {serie.name}
                    </TableCell>
                    <TableCell>
                      {serie.type}
                    </TableCell>
                    <TableCell>
                      {serie.language}
                    </TableCell>
                    <TableCell>
                      {/* <Button
                        color="secondary"
                        fullWidth
                        size="large"
                        variant="contained"
                        onClick={() => handleSerieInfo(serie)}
                      >
                        Info +
                      </Button> */}
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
        count={series.length}
        page={page}
        rowsPerPage={rowPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPage}
        rowsPerPageOptions={[2, 5, 10]}
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
