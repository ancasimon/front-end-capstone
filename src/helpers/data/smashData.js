import functionsData from './functionsData';
import gearData from './gearData';
import gearPartyData from './gearPartyData';
import gearSeasonData from './gearSeasonData';
import partyData from './partyData';
import seasonsData from './seasonsData';
import weatherData from './weatherData';

// QUESTION: IS IT ok that this is a get single call?? Also ok that it is a new promise?
// DO I NEED getGearSeasons instead of getGearSeasonsByGearId below??
// Is it ok that I used the find method below for seasons and parties?? or should I use filter on gearSeasons instead??
const getGearWithProperties = (gearId) => new Promise((resolve, reject) => {
  gearData.getSingleGear(gearId)
    .then((singleGearResponse) => {
      // console.log('single gear resp', singleGearResponse);
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
                        // GOAL: for each gear, have an array of seasons and for each season, indicate if there's a record for it and that gearId in the gearSeasons collectionan and if true, isChecked is then set to true.
                        selectedGearSeasons.push(foundGearSeason);
                        gearPartyData.getGearPartiesByGearId(gearId)
                          .then((gearParties) => {
                            partyData.getPartyValues()
                              .then((allPartyValues) => {
                                const selectedGearParties = [];
                                gearParties.forEach((gearPartyObject) => {
                                  const foundGearParty = allPartyValues.find((partyValue) => partyValue.id === gearPartyObject.partyId);
                                  foundGearParty.isChecked = true;
                                  selectedGearParties.push(foundGearParty);
                                  const gearWithMetadata = { ...singleGearResponse };
                                  gearWithMetadata.function = selectedFunction;
                                  gearWithMetadata.weather = selectedWeather;
                                  gearWithMetadata.seasons = selectedGearSeasons;
                                  gearWithMetadata.allSeasonsArr = [];
                                  gearWithMetadata.parties = selectedGearParties;
                                  allSeasons.forEach((singleSeason) => {
                                    const copySeason = { ...singleSeason};
                                    const isSelected = selectedGearSeasons.find((x) => x.seasonId === copySeason.id);
                                    console.log('isselected val', isSelected);
                                    copySeason.isChecked = isSelected !== undefined;
                                    // if the season is not selected, then we get undefined, which is not equal to undefined > so the value above will be false, which is what we want when the season is not selected.
                                    // NOT WORKING _ I get everythign set to false ....
                                    gearWithMetadata.allSeasonsArr.push(copySeason);
                                  });
                                  console.log('gearmetadata', gearWithMetadata);
                                  resolve(gearWithMetadata);
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

export default { getGearWithProperties };
