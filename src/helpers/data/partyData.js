import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getPartyValues = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/party.json`)
    .then((response) => {
      const fbPartyValues = response.data;
      const partyValues = [];
      if (fbPartyValues) {
        Object.keys(fbPartyValues).forEach((partyId) => {
          fbPartyValues[partyId].id = partyId;
          partyValues.push(fbPartyValues[partyId]);
        });
      }
      resolve(partyValues);
    })
    .catch((err) => reject(err));
});

export default { getPartyValues };
