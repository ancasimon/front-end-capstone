import functionsData from './functionsData';
import gearData from './gearData';
import gearSeasonData from './gearSeasonData';
import seasonsData from './seasonsData';
import weatherData from './weatherData';

const getGearProperties = (gearId) => new Promise((resolve, reject) => {
  gearData.getSingleGear(gearId)
    .then((singleGearResponse) => {
      functionsData.getFunctions()
        .then((allFunctions) => {
          const selectedFunction = allFunctions.find((x) => x.id === singleGearResponse.data.functionId);
          weatherData.getWeatherValues()
            .then((allWeatherValues) => {
              const gearMetadata = {};
              const selectedWeather = allWeatherValues.find((y) => y.id === singleGearResponse.data.weatherId);
              gearSeasonData.getGearSeasonsByGearId(gearId)
                .then((gearSeasons) => {
                  seasonsData.getSeasons()
                    .then((allSeasons) => {
                      const selectedGearSeasons = [];
                      gearSeasons.forEach((gearSeasonObject) => {
                        const foundGearSeason = allSeasons.find((seasonValue) => seasonValue.id === gearSeasonObject.seasonId);
                        selectedGearSeasons.push(foundGearSeason);
                      });
                      gearMetadata.function = selectedFunction;
                      gearMetadata.weather = selectedWeather;
                      gearMetadata.seasons = selectedGearSeasons;
                      resolve(gearMetadata);
                      console.log('gear metadata', gearMetadata);
                    });
                });
            });
        });
    })
    .catch((err) => reject(err));
});

export default { getGearProperties };
