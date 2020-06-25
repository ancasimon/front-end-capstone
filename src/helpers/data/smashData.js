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
                      const allSeasonsWithChecks = [];
                      gearSeasons.forEach((gearSeasonObject) => {
                        const foundGearSeason = allSeasons.find((x) => x.id === gearSeasonObject.seasonId);
                        allSeasons.forEach((seasonValue) => {
                          const newSeasonValue = { ...seasonValue };
                          if (seasonValue.id === gearSeasonObject.seasonId) {
                            newSeasonValue.isChecked = true;
                            newSeasonValue.relatedGearId = gearSeasonObject.gearId;
                            newSeasonValue.relatedGearSeasonId = gearSeasonObject.id;
                          } else {
                            newSeasonValue.isChecked = false;
                          }
                          allSeasonsWithChecks.push(newSeasonValue);
                          // Note for allSeasonsWithChecks array defined above: I am using this array to control the display of CHECKBOXES for the seasons selected for a gear item on the EDIT gear page (both pre-populated and as the user makes changes).
                          // console.log('new season val', newSeasonValue);
                        });
                        gearPartyData.getGearPartiesByGearId(gearId)
                          .then((gearParties) => {
                            partyData.getPartyValues()
                              .then((allPartyValues) => {
                                const selectedGearParties = [];
                                const allPartiesWithChecks = [];
                                gearParties.forEach((gearPartyObject) => {
                                  const foundGearParty = allPartyValues.find((partyValue) => partyValue.id === gearPartyObject.partyId);
                                  allPartyValues.forEach((partyValue) => {
                                    const newPartyValue = { ...partyValue };
                                    if (partyValue.id === gearPartyObject.partyId) {
                                      newPartyValue.isChecked = true;
                                      newPartyValue.relatedGearId = gearPartyObject.gearId;
                                      newPartyValue.relatedGearPartyId = gearPartyObject.id;
                                    } else {
                                      newPartyValue.isChecked = false;
                                    }
                                    allPartiesWithChecks.push(newPartyValue);
                                    // Note for allPartiesWithChecks array defined above: I am using this array to control the display of CHECKBOXES for the parties selected for a gear item on the EDIT gear page (both pre-populated and as the user makes changes).
                                    // console.log('new party array!!!', allPartiesWithChecks);
                                  });
                                  const gearWithMetadata = { ...singleGearResponse.data };
                                  selectedGearSeasons.push(foundGearSeason);
                                  // Note for selectedGearSeasons array defined above: I am using this array to control the display of selected seasons for a gear item on the view pages - both the list of gear and the single gear view page.
                                  selectedGearParties.push(foundGearParty);
                                  // Note for selectedGearParties array defined above: I am using this array to control the display of selected parties (couple/solo/family) for a gear item on the view pages - both the list of gear and the single gear view page.
                                  gearWithMetadata.selectedFunction = selectedFunction;
                                  gearWithMetadata.selectedWeather = selectedWeather;
                                  gearWithMetadata.selectedSeasons = selectedGearSeasons;
                                  gearWithMetadata.selectedParties = selectedGearParties;
                                  gearWithMetadata.allPartiesWithChecks = allPartiesWithChecks;
                                  gearWithMetadata.allSeasonsWithChecks = allSeasonsWithChecks;
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
