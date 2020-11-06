import authData from './authData';
import functionsData from './functionsData';
import gearData from './gearData';
import gearPartyData from './gearPartyData';
import gearSeasonData from './gearSeasonData';
import partyData from './partyData';
import seasonsData from './seasonsData';
import weatherData from './weatherData';
import tripGearData from './tripGearData';
import tripsData from './tripsData';

const getTripWithDetails = (tripId) => new Promise((resolve, reject) => {
  tripsData.getSingleTrip(tripId)
    .then((singleTripResponse) => {
      partyData.getPartyValues()
        .then((allPartyValues) => {
          const selectedParty = allPartyValues.find((x) => x.id === singleTripResponse.data.partyId);
          weatherData.getWeatherValues()
            .then((allWeatherValues) => {
              const selectedWeather = allWeatherValues.find((y) => y.id === singleTripResponse.data.weatherId);
              seasonsData.getSeasons()
                .then((allSeasons) => {
                  const selectedSeason = allSeasons.find((z) => z.id === singleTripResponse.data.seasonId);
                  tripGearData.getTripGearByTrip(tripId)
                    .then((allTripGearItems) => {
                      const uid = authData.getUid();
                      gearData.getGearByUid(uid)
                        .then((allGearItems) => {
                          const selectedTripGearItems = [];
                          const allGearWithChecks = [];
                          allGearItems.forEach((gearThing) => {
                            const gearThingCopy = { isChecked: false, ...gearThing };
                            allGearWithChecks.push(gearThingCopy);
                          });
                          allTripGearItems.forEach((gearThingTakenOnTrip) => {
                            const foundGearThingInTripList = allGearItems.find((x) => x.id === gearThingTakenOnTrip.gearId);
                            selectedTripGearItems.push(foundGearThingInTripList);
                            for (let i = 0; i < allGearWithChecks.length; i += 1) {
                              if (allGearWithChecks[i].id === gearThingTakenOnTrip.gearId) {
                                allGearWithChecks[i].isChecked = true;
                                allGearWithChecks[i].parentGear = gearThingTakenOnTrip.gearId;
                                allGearWithChecks[i].parentTripGear = gearThingTakenOnTrip.id;
                              }
                            }
                          });
                          let totalWeight = 0;
                          for (let i = 0; i < selectedTripGearItems.length; i += 1) {
                            totalWeight += selectedTripGearItems[i].weightInGrams;
                          }
                          const tripCopy = { ...singleTripResponse.data };
                          tripCopy.selectedParty = selectedParty;
                          tripCopy.selectedWeather = selectedWeather;
                          tripCopy.selectedSeason = selectedSeason;
                          tripCopy.selectedTripGearObjects = selectedTripGearItems;
                          tripCopy.allGearWithChecks = allGearWithChecks;
                          tripCopy.totalTripWeight = totalWeight;
                          resolve(tripCopy);
                        });
                    });
                });
            });
        });
    })
    .catch((err) => reject(err));
});

const getGearWithProperties = (gearId) => new Promise((resolve, reject) => {
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
                      const allSeasonsWithChecks = [];
                      allSeasons.forEach((seasonValue) => {
                        const newSeasonValue = { isChecked: false, ...seasonValue };
                        allSeasonsWithChecks.push(newSeasonValue);
                        gearSeasons.forEach((gearSeasonObject) => {
                          // NOTES: The 2 lines below show how I initially controlled the display of selected seasons for a gear. This method was replaced by the push of seasons with a true isChecked property below.
                          // const foundGearSeason = allSeasons.find((x) => x.id === gearSeasonObject.seasonId);
                          // selectedGearSeasons.push(foundGearSeason);
                          for (let i = 0; i < allSeasonsWithChecks.length; i += 1) {
                            if (allSeasonsWithChecks[i].id === gearSeasonObject.seasonId) {
                              allSeasonsWithChecks[i].isChecked = true;
                              allSeasonsWithChecks[i].relatedGearId = gearSeasonObject.gearId;
                              allSeasonsWithChecks[i].relatedGearSeasonId = gearSeasonObject.id;
                            }
                          }
                          // Note for allSeasonsWithChecks array defined above: I am using this array to control the display of CHECKBOXES for the seasons selected for a gear item on the EDIT gear page (both pre-populated and as the user makes changes).
                        });
                      });
                      for (let i = 0; i < allSeasonsWithChecks.length; i += 1) {
                        if (allSeasonsWithChecks[i].isChecked === true) {
                          selectedGearSeasons.push(allSeasonsWithChecks[i]);
                          // Note for selectedGearSeasons array defined above: I am using this array to control the display of selected seasons for a gear item on the view pages - both the list of gear and the single gear view page.
                        }
                      }
                      gearPartyData.getGearPartiesByGearId(gearId)
                        .then((gearParties) => {
                          partyData.getPartyValues()
                            .then((allPartyValues) => {
                              const selectedGearParties = [];
                              const allPartiesWithChecks = [];
                              allPartyValues.forEach((partyValue) => {
                                const newPartyValue = { isChecked: false, ...partyValue };
                                allPartiesWithChecks.push(newPartyValue);
                                gearParties.forEach((gearPartyObject) => {
                                  for (let i = 0; i < allPartiesWithChecks.length; i += 1) {
                                    if (allPartiesWithChecks[i].id === gearPartyObject.partyId) {
                                      allPartiesWithChecks[i].isChecked = true;
                                      allPartiesWithChecks[i].relatedGearId = gearPartyObject.gearId;
                                      allPartiesWithChecks[i].relatedGearPartyId = gearPartyObject.id;
                                    }
                                  }
                                  // Note for allPartiesWithChecks array defined above: I am using this array to control the display of CHECKBOXES for the parties selected for a gear item on the EDIT gear page (both pre-populated and as the user makes changes).
                                });
                              });
                              for (let i = 0; i < allPartiesWithChecks.length; i += 1) {
                                if (allPartiesWithChecks[i].isChecked === true) {
                                  selectedGearParties.push(allPartiesWithChecks[i]);
                                }
                              }
                              // Note for selectedGearParties array defined above: I am using this array to control the display of selected parties (couple/solo/family) for a gear item on the view pages - both the list of gear and the single gear view page.
                              const gearWithMetadata = { ...singleGearResponse.data };
                              gearWithMetadata.selectedFunction = selectedFunction;
                              gearWithMetadata.selectedWeather = selectedWeather;
                              gearWithMetadata.selectedGearSeasons = selectedGearSeasons;
                              gearWithMetadata.selectedGearParties = selectedGearParties;
                              gearWithMetadata.allPartiesWithChecks = allPartiesWithChecks;
                              gearWithMetadata.allSeasonsWithChecks = allSeasonsWithChecks;
                              resolve(gearWithMetadata);
                            });
                        });
                    });
                });
            });
        });
    })
    .catch((err) => reject(err));
});

const completelyRemoveGearItemAndChildren = (gearItemId) => new Promise((resolve, reject) => {
  gearData.deleteGear(gearItemId)
    .then(() => {
      gearSeasonData.getGearSeasonsByGearId(gearItemId)
        .then((gearSeasonsForThisGearItem) => {
          gearPartyData.getGearPartiesByGearId(gearItemId)
            .then((gearPartiesForThisGearItem) => {
              gearSeasonsForThisGearItem.forEach((gearSeason) => gearSeasonData.deleteGearSeason(gearSeason.id));
              gearPartiesForThisGearItem.forEach((gearParty) => gearPartyData.deleteGearParty(gearParty.id));
              resolve();
            });
        });
    })
    .catch((err) => reject(err));
});

const completelyRemoveTripAndTripGear = (tripId) => new Promise((resolve, reject) => {
  tripsData.deleteTrip(tripId)
    .then(() => {
      tripGearData.getTripGearByTrip(tripId)
        .then((tripGearForThisTrip) => {
          tripGearForThisTrip.forEach((tripGearItem) => tripGearData.deleteTripGear(tripGearItem.id));
          resolve();
        });
    })
    .catch((err) => reject(err));
});

export default {
  getGearWithProperties,
  completelyRemoveGearItemAndChildren,
  getTripWithDetails,
  completelyRemoveTripAndTripGear,
};
