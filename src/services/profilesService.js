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
}

const profilesService = new ProfilesService();

export default profilesService;
