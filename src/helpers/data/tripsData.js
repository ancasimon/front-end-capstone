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

const getSingleTrip = (tripId) => axios.get(`${baseUrl}/trips/${tripId}.json`);

const postNewTrip = (newTrip) => axios.post(`${baseUrl}/trips.json`, newTrip);

const putTrip = (tripId, updatedTrip) => axios.put(`${baseUrl}/trips/${tripId}.json`, updatedTrip);

export default {
  getTripsByUid,
  getSingleTrip,
  postNewTrip,
  putTrip,
};
