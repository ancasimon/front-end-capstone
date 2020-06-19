import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getSeasons = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/seasons.json`)
    .then((response) => {
      const fbSeasons = response.data;
      const seasons = [];
      if (fbSeasons) {
        Object.keys(fbSeasons).forEach((seasonId) => {
          fbSeasons[seasonId].id = seasonId;
          seasons.push(fbSeasons[seasonId]);
        });
      }
      resolve(seasons);
    })
    .catch((err) => reject(err));
});

export default { getSeasons };
