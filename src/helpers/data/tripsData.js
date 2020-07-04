import axios from 'axios';
import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getTripsByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/trips.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      const fbTrips = response.data;
      const trips = [];
      if (fbTrips) {
        Object.keys(fbTrips).forEach((tripId) => {
          fbTrips[tripId].id = tripId;
          trips.push(fbTrips[tripId]);
        });
      }
      resolve(trips);
    })
    .catch((err) => reject(err));
});

export default { getTripsByUid };
