import functionsData from './functionsData';
import gearData from './gearData';
import gearPartyData from './gearPartyData';
import gearSeasonData from './gearSeasonData';
import partyData from './partyData';
import seasonsData from './seasonsData';
import weatherData from './weatherData';

const getGearProperties = (gearId) => new Promise((resolve, reject) => {
  console.log('running smash function', gearId);
  gearData.getSingleGear(gearId)
    .then((singleGearResponse) => {
      functionsData.getFunctions()
        .then((allFunctions) => {
          const selectedFunction = allFunctions.find((x) => x.id === singleGearResponse.data.functionId);
          weatherData.getWeatherValues()
            .then((allWeatherValues) => {
              const selectedWeather = allWeatherValues.find((y) => y.id === singleGearResponse.data.weatherId);
              gearSeasonData.getGearSeasonsByGearId(gearId)
                .then((gearSeasons) => {
                  seasonsData.getSeasons()
                    .then((allSeasons) => {
                      const selectedGearSeasons = [];
                      gearSeasons.forEach((gearSeasonObject) => {
                        const foundGearSeason = allSeasons.find((seasonValue) => seasonValue.id === gearSeasonObject.seasonId);
                        // Make a copy of the gear record
                        // create a new array inside the new gear records that holds all the season records
                        // make a copy of the season record
                        // add a new isChecked property to the season record, set to false initially
                        // push the copies season record into the seasons array on the gear record
                        //
                        selectedGearSeasons.push(foundGearSeason);
                        gearPartyData.getGearPartiesByGearId(gearId)
                          .then((gearParties) => {
                            partyData.getPartyValues()
                              .then((allPartyValues) => {
                                const selectedGearParties = [];
                                gearParties.forEach((gearPartyObject) => {
                                  const foundGearParty = allPartyValues.find((partyValue) => partyValue.id === gearPartyObject.partyId);
                                  selectedGearParties.push(foundGearParty);
                                  const gearMetadata = {};
                                  gearMetadata.function = selectedFunction;
                                  gearMetadata.weather = selectedWeather;
                                  gearMetadata.seasons = selectedGearSeasons;
                                  gearMetadata.parties = selectedGearParties;
                                  console.log('gear item after smash', gearId, gearMetadata);
                                  resolve(gearMetadata);
                                });
                              });
                          });
                      });
                    });
                });
            });
        });
    })
    .catch((err) => reject(err));
});

export default { getGearProperties };
