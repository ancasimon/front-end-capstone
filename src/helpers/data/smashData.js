import functionsData from './functionsData';
import gearData from './gearData';
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
              gearMetadata.function = selectedFunction;
              gearMetadata.weather = selectedWeather;
              resolve(gearMetadata);
              console.log('gear metadata', gearMetadata);
            });
        });
    })
    .catch((err) => reject(err));
});

export default { getGearProperties };
