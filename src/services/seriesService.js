import axios from 'axios';
import { TVMAZE_API_BASE_URL } from 'src/config';

class SeriesService {
  listSeries = () => new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: `${TVMAZE_API_BASE_URL}/shows?page=1`,
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

const seriesService = new SeriesService();

export default seriesService;
