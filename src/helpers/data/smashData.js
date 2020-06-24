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
                        selectedGearSeasons.push(foundGearSeason);
                        gearPartyData.getGearPartiesByGearId(gearId)
                          .then((gearParties) => {
                            partyData.getPartyValues()
                              .then((allPartyValues) => {
                                const selectedGearParties = [];
                                const allGearPartiesWithChecks = [];
                                gearParties.forEach((gearPartyObject) => {
                                  const foundGearParty = allPartyValues.find((partyValue) => partyValue.id === gearPartyObject.partyId);
                                  selectedGearParties.push(foundGearParty);
                                  allPartyValues.forEach((partyValue) => {
                                    const newPartyValue = { ...partyValue };
                                    if (partyValue.id === gearPartyObject.partyId) {
                                      newPartyValue.isChecked = true;
                                    } else {
                                      newPartyValue.isChecked = false;
                                    };
                                    allGearPartiesWithChecks.push(newPartyValue);
                                    console.log('new party array!!!', allGearPartiesWithChecks);
                                  });
                                  const gearWithMetadata = { ...singleGearResponse.data };
                                  gearWithMetadata.selectedFunction = selectedFunction;
                                  gearWithMetadata.selectedWeather = selectedWeather;
                                  gearWithMetadata.selectedSeasons = selectedGearSeasons;
                                  gearWithMetadata.selectedParties = selectedGearParties;
                                  gearWithMetadata.allPartiesWithChecks = allGearPartiesWithChecks;
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
