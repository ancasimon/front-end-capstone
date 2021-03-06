import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getTripGearByTrip = (tripId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/tripGear.json?orderBy="tripId"&equalTo="${tripId}"`)
    .then((response) => {
      const fbTripGearItems = response.data;
      const tripGearItems = [];
      if (fbTripGearItems !== null) {
        Object.keys(fbTripGearItems).forEach((tripGearId) => {
          const tripGearObject = fbTripGearItems[tripGearId];
          tripGearObject.id = tripGearId;
          tripGearItems.push(tripGearObject);
        });
      }
      resolve(tripGearItems);
    })
    .catch((err) => reject(err));
});

const postTripGear = (newTripGear) => axios.post(`${baseUrl}/tripGear.json`, newTripGear);

const deleteTripGear = (tripGearId) => axios.delete(`${baseUrl}/tripGear/${tripGearId}.json`);

export default { getTripGearByTrip, postTripGear, deleteTripGear };
