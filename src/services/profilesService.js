import axios from 'axios';
import { API_BASE_URL } from 'src/config';

class ProfilesService {
  listProfiles = () => new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: `${API_BASE_URL}/users`,
      // headers: {}
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
