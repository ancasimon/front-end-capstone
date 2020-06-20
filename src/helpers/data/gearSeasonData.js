import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getGearSeasonsByGearId = (gearId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/gearSeason.json?orderBy="gearId"&equalTo="${gearId}"`)
    .then((response) => {
      const fbGearSeasons = response.data;
      const gearSeasons = [];
      if (fbGearSeasons !== null) {
        Object.keys(fbGearSeasons).forEach((gearSeasonId) => {
          const gearSeasonObject = fbGearSeasons[gearSeasonId];
          gearSeasonObject.id = gearSeasonId;
          gearSeasons.push(gearSeasonObject);
        });
      }
      resolve(gearSeasons);
    })
    .catch((err) => reject(err));
});

const postGearSeason = (newGearSeason) => axios.post(`${baseUrl}/gearSeason.json`, newGearSeason);

export default { getGearSeasonsByGearId, postGearSeason };
