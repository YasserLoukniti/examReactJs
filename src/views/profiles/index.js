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
import profilesService from 'src/services/profilesService';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import useAxios from 'src/hooks/useAxios';
import UserContext from 'src/context/UserContext';
import Header from './Header';
import ProfilesTable from './ProfilesTable';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(6)
  }
}));

const doSomethingBig = (test) => {
  console.log('Processing big data');
};

function ProfilesListView() {
  const classes = useStyles();
  const userName = useContext(UserContext);
  const isMountedRef = useIsMountedRef();
  const [data] = useAxios('https://jsonplaceholder.typicode.com/users');

  const [profilesCount, setProfilesCount] = useState(0);
  const [profiles, setProfiles] = useState([]);
  const [test, setTest] = useState('');

  const getData = useMemo(() => {
    doSomethingBig(test);
  }, [test]);

  const getProfiles = useCallback(() => {
    profilesService.listProfiles()
      .then((res) => {
        if (isMountedRef.current) {
          setProfiles(res);
          setProfilesCount(res.length);
        }
      });
  }, []);

  useEffect(() => {
    console.log('Test react context: ');
    console.log(userName);

    getProfiles();
  }, [getProfiles, data]);

  const testButtonClicked = () => {};

  return (
    <Page
      className={classes.root}
      title="Profiles List"
    >
      <Container>
        <Header profilesCount={profilesCount} />

        <Box mt={3}>
          <ProfilesTable profiles={data} testButtonClicked={testButtonClicked} />
        </Box>
      </Container>
    </Page>
  );
}

export default ProfilesListView;
