import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useMemo
} from 'react';
import {
  Container,
  makeStyles,
  Box
} from '@material-ui/core';
import Page from 'src/components/Page';
import seriesService from 'src/services/seriesService';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import useAxios from 'src/hooks/useAxios';
import UserContext from 'src/context/UserContext';
import Header from './Header';
import SeriesTable from './SeriesTable';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(6)
  }
}));

const doSomethingBig = (test) => {
  console.log('Processing big data');
};

function SeriesListView() {
  const classes = useStyles();
  const userName = useContext(UserContext);
  const isMountedRef = useIsMountedRef();
  const [data] = useAxios('https://api.tvmaze.com/shows?page=1');

  const [seriesCount, setSeriesCount] = useState(0);
  const [series, setSeries] = useState([]);
  const [test, setTest] = useState('');

  const getData = useMemo(() => {
    doSomethingBig(test);
  }, [test]);

  const getSeries = useCallback(() => {
    seriesService.listSeries()
      .then((res) => {
        if (isMountedRef.current) {
          setSeries(res);
          setSeriesCount(res.length);
        }
      });
  }, []);

  useEffect(() => {
    console.log('Test react context: ');
    console.log(userName);

    getSeries();
  }, [getSeries, data]);

  const testButtonClicked = () => {};

  return (
    <Page
      className={classes.root}
      title="Series List"
    >
      <Container>
        <Header seriesCount={seriesCount} />

        <Box mt={3}>
          <SeriesTable series={data} testButtonClicked={testButtonClicked} />
        </Box>
      </Container>
    </Page>
  );
}

export default SeriesListView;
