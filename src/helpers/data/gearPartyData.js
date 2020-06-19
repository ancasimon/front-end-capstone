import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getGearPartiesByGearId = (gearId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/gearParty.json?orderBy="gearId"&equalTo="${gearId}"`)
    .then((response) => {
      const fbGearParties = response.data;
      const gearParties = [];
      if (fbGearParties !== null) {
        Object.keys(fbGearParties).forEach((gearPartyId) => {
          const gearPartyObject = fbGearParties[gearPartyId];
          gearPartyObject.id = gearPartyId;
          gearParties.push(gearPartyObject);
        });
      }
      resolve(gearParties);
    })
    .catch((err) => reject(err));
});

export default { getGearPartiesByGearId };

