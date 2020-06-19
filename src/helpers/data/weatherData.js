import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getWeatherValues = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/weather.json`)
    .then((response) => {
      const fbWeatherValues = response.data;
      const weatherObjects = [];
      if (fbWeatherValues) {
        Object.keys(fbWeatherValues).forEach((weatherId) => {
          fbWeatherValues[weatherId].id = weatherId;
          weatherObjects.push(fbWeatherValues[weatherId]);
        });
      }
      resolve(weatherObjects);
    })
    .catch((err) => reject(err));
});

export default { getWeatherValues };
