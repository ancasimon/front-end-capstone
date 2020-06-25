import axios from 'axios';
import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getGearByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/gear.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      const fbGear = response.data;
      const gear = [];
      if (fbGear) {
        Object.keys(fbGear).forEach((gearItemId) => {
          fbGear[gearItemId].id = gearItemId;
          gear.push(fbGear[gearItemId]);
        });
      }
      resolve(gear);
    })
    .catch((err) => reject(err));
});

const getSingleGear = (gearId) => axios.get(`${baseUrl}/gear/${gearId}.json`);

const postGear = (newGear) => axios.post(`${baseUrl}/gear.json`, newGear);

const putGear = (gearItemId, updatedGearItem) => axios.put(`${baseUrl}/gear/${gearItemId}.json`, updatedGearItem);

export default {
  getGearByUid,
  getSingleGear,
  postGear,
  putGear,
};
