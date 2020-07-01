import React from 'react';
import { Table } from 'reactstrap';

import GearChartsRow from './GearChartsRow';

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

  getData = () => {
    const uid = authData.getUid();
    const counts = [];
    functionsData.getFunctions()
      .then((functionsList) => {
        this.setState({ functionsList });
        gearData.getGearByUid(uid)
          .then((gear) => {
            const availableGearItemsOnly = gear.filter((gearItem) => gearItem.isAvailable === true);
            this.setState({ gear: availableGearItemsOnly });
            functionsList.map((functionValue) => {
              const count = {
                functionName: functionValue.name,
                count: gear.filter((gearItem) => gearItem.functionId === functionValue.id).length,
              };
              console.log('countObject', count);
              counts.push(count);
              return (counts);
            });
            console.log('counts list', counts);
            this.setState({ gearFunctionCounts: counts });
          });
      })
      .catch((err) => console.error('unable to get list of function values', err));
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    const { gearFunctionCounts } = this.state;
    const buildCountsList = () => gearFunctionCounts.map((item) => (
        <GearChartsRow key={item.functionName} countObject={item} />
    ));

    return (
      <div className="mt-5">
        <Table dark>
          <thead>
            <tr>
              <th>Category</th>
              <th>Count</th>
            </tr>
          </thead>
            {buildCountsList()}
        </Table>
      </div>
    );
  }
}

export default GearChartsCounts;
