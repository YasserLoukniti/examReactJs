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
  Box,
  Button
} from '@material-ui/core';
import Page from 'src/components/Page';
import profilesService from 'src/services/profilesService';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import useAxios from 'src/hooks/useAxios';
import UserContext from 'src/context/UserContext';
import Header from './Header';
import ProfilesTable from './ProfilesTable';
import CreateProfileModal from 'src/components/modals/CreateProfileModal';

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

  const getProfiles = useCallback(() => {
    profilesService.listProfiles()
      .then((res) => {
        if (isMountedRef.current) {
          setProfiles(res.data.users);
          setProfilesCount(res.data.users.length);
        }
      });
  }, []);

  useEffect(() => {
    console.log('Test react context: ');
    console.log(userName);

    getProfiles();
  }, [getProfiles, data]);
  const [openModal, setOpenModal] = useState(false);

  const testButtonClicked = () => { };

  return (
    <Page
      className={classes.root}
      title="Profiles List"
    >
      <Container>
        <Header profilesCount={profilesCount} />

        <Box mt={3}>
          <Button
            color="secondary"
            size="large"
            variant="contained"
            style={{ margin: 2 }}
            onClick={() => setOpenModal(true)}
          >
            Create Profile
          </Button>
          
          <ProfilesTable profiles={profiles} testButtonClicked={testButtonClicked} />
        </Box>
      </Container>
      <CreateProfileModal
        open={openModal}
        handleClose={() =>  setOpenModal(false)}
      />
    </Page>
    
  );
}

export default ProfilesListView;
