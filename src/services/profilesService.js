import axios from 'axios';
import { API_BASE_URL } from 'src/config';

class ProfilesService {
  listProfiles = () => new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: `${API_BASE_URL}/v1/users?page=30`,
      headers: {
        'x-access-token': localStorage.getItem('accessToken')
      }
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
  updateProfile = (profile) => new Promise((resolve, reject) => {
    axios({
      method: 'PUT',
      url: `${API_BASE_URL}/v1/users/${profile.id}`,
      headers: {
        'x-access-token': localStorage.getItem('accessToken')
      },
      data:{
        'firstName':profile.firstName,
        'email':profile.email,
        'lastName':profile.lastName
      }
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
  deleteProfile = (profileID) => new Promise((resolve, reject) => {
    axios({
      method: 'DELETE',
      url: `${API_BASE_URL}/v1/users/${profileID}`,
      headers: {
        'x-access-token': localStorage.getItem('accessToken')
      }
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
  createProfile = (profile) => new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: `${API_BASE_URL}/v1/users`,
      headers: {
        'x-access-token': localStorage.getItem('accessToken')
      },
      data:{
        'firstName': profile.firstName,
        'lastName': profile.lastName,
        'email': profile.email,
        'password': profile.password
      }
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

const profilesService = new ProfilesService();

export default profilesService;
