import functionsData from './functionsData';
import gearData from './gearData';

const getFunctionForGear = (gearId) => new Promise((resolve, reject) => {
  gearData.getSingleGear(gearId)
    .then((singleGearResponse) => {
      console.log('single gear response', singleGearResponse);
      functionsData.getFunctions().then((allFunctions) => {
        const selectedFunction = allFunctions.find((x) => x.id === singleGearResponse.data.functionId);
        console.log('function found for gear', selectedFunction);
        resolve(selectedFunction);
      });
    })
    .catch((err) => reject(err));
});

export default { getFunctionForGear };
