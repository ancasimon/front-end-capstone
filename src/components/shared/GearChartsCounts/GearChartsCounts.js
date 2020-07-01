import React from 'react';
import { Table } from 'reactstrap';

import authData from '../../../helpers/data/authData';
import functionsData from '../../../helpers/data/functionsData';
import gearData from '../../../helpers/data/gearData';

import './GearChartsCounts.scss';

class GearChartsCounts extends React.Component {
  state = {
    gear: [],
    gearFunctionCounts: [],
    functionsList: [],
  }

  getFunctionsList = () => {
    functionsData.getFunctions()
      .then((functionsList) => this.setState({ functionsList }))
      .catch((err) => console.error('unable to get list of function values', err));
  }

  getAvailableGear = () => {
    const uid = authData.getUid();
    gearData.getGearByUid(uid)
      .then((gear) => {
        const availableGearItemsOnly = gear.filter((gearItem) => gearItem.isAvailable === true);
        this.setState({ gear: availableGearItemsOnly });
      })
      .catch((err) => console.error('could not get only available gear from firebase', err));
  }

  componentDidMount() {
    this.getAvailableGear();
    this.getFunctionsList();
  }

  gearFunctionCount = () => {
    const { functionsList, gear } = this.state;
    const counts = [];
    functionsList.map((functionValue) => {
      const count = {
        functionName: functionValue.name,
        count: gear.filter((gearItem) => gearItem.functionId === functionValue.id).length,
      };
      console.log('countObject', count);
      counts.push(count);
    });
    console.log('counts list', counts);
    this.setState({ gearFunctionCounts: counts });
  }

  render() {
    const { gearFunctionCounts } = this.state;
    // const buildCountsList = () => gearFunctionCount.map((count) => (
    //   <tbody>
    //     <tr>
    //       <th scope="row">{functionValue.name}</th>
    //       <td>{gearFunctionCount}</td>
    //     </tr>
    //   </tbody>
    // ));
    const buildCountsList = () => {
      gearFunctionCounts.map((item) => (
        // this.gearFunctionCount().map((count) => (
        // this.gearFunctionCount.map((x) => (
        <tbody>
          <tr>
            <th scope="row">{item.functionName}</th>
            {/* <td>{x}</td> */}
            <td>{item.count}</td>
          </tr>
        </tbody>
      ));
    };

    // const gearFunction1 = gear.filter((gearItem) => gearItem.functionId === 'function1');
    // const gearFunction2 = gear.filter((gearItem) => gearItem.functionId === 'function2');
    // const gearFunction3 = gear.filter((gearItem) => gearItem.functionId === 'function3');
    // const gearFunction4 = gear.filter((gearItem) => gearItem.functionId === 'function4');
    // const gearFunction5 = gear.filter((gearItem) => gearItem.functionId === 'function5');
    // const gearFunction6= gear.filter((gearItem) => gearItem.functionId === 'function6');
    // const gearFunction7 = gear.filter((gearItem) => gearItem.functionId === 'function7');
    // const gearFunction8 = gear.filter((gearItem) => gearItem.functionId === 'function8');
    // const gearFunction9 = gear.filter((gearItem) => gearItem.functionId === 'function9');
    // const gearFunction10 = gear.filter((gearItem) => gearItem.functionId === 'function10');
    // const gearFunction11 = gear.filter((gearItem) => gearItem.functionId === 'function11');
    // const gearFunction12 = gear.filter((gearItem) => gearItem.functionId === 'function12');
    // const gearFunction13 = gear.filter((gearItem) => gearItem.functionId === 'function13');
    // console.log('gearFunction1', gearFunction1);

    return (
      <div>
        <h2>Your Gear Count by Category</h2>
        <Table dark>
          <thead>
            <tr>
              <th>Category</th>
              <th>Count</th>
            </tr>
          </thead>
          {/* <tbody> */}
            {/* <tr>
              {/* <th scope="row">{function.name}</th>
              <td>{gearFunctionCount}</td> */}
              {/* <th scope="row">Cat name</th>
              <td>cat count</td> */}
            {/* </tr> */}
            {buildCountsList()}
          {/* </tbody> */}
        </Table>
      </div>
    );
  }
}

export default GearChartsCounts;
