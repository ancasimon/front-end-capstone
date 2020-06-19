import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getFunctions = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/functions.json`)
    .then((response) => {
      const fbFunctions = response.data;
      const functions = [];
      if (fbFunctions) {
        Object.keys(fbFunctions).forEach((functionId) => {
          fbFunctions[functionId].id = functionId;
          functions.push(fbFunctions[functionId]);
        });
      }
      resolve(functions);
    })
    .catch((err) => reject(err));
});

export default { getFunctions };
